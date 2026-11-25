import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Info,
  Lightbulb,
  Phone,
  RotateCcw,
  Star,
  X,
  XCircle,
} from "lucide-react";
import { AppChrome, Notice, Toast } from "@/components/training/sim/AppChrome";
import { Diary, type DiaryView, type SlotPick } from "@/components/training/sim/Diary";
import { AppointmentDrawer, type DrawerPrefill } from "@/components/training/sim/AppointmentDrawer";
import { Walkthrough, type TourStep } from "@/components/training/sim/Walkthrough";
import {
  BALANCE_QUESTION,
  BOOKINGS,
  PATEL,
  PRACTICE,
  REID,
  SERVICES,
  TARGET_DAY,
  TODAY,
  checkAttempt,
  type Attempt,
  type Booking,
  type Scenario,
} from "./bookPhone";
import { loadProgress, recordStars, recordWalked, starsFor } from "@/lib/trainingProgress";

/*
 * Reception task 2 (docs/TRAINING-GAME-PLAN.md §9-§10). Hariss, 25 Nov: show first, then let them
 * do it. 1 intro, 2 walkthrough (Mrs Patel, guided clicks, no stars), 3 the £45 question, 4 your
 * turn (Tom Reid, a different call, hints and stars), 5 result. Nothing leaves the browser.
 */

const TASK_ID = "book-phone";
const SLOT_930 = { clinicianId: "shah", date: TARGET_DAY, start: 9 * 60 + 30 };

const TOUR: TourStep[] = [
  {
    next: true,
    title: "This is the DentDock Calendar",
    text: "It opens on this week. Mrs Patel wants a check-up with Dr Shah next Thursday, before 11am. I'll show you each click, then it's your turn.",
  },
  {
    target: "weekday-2026-12-10",
    title: "Open Thursday",
    text: "Click THU 10. Thursday opens with a column for each dentist, so you can see who is free.",
  },
  {
    target: "slot",
    title: "Pick a free time",
    text: "Dr Shah is free at 9:30am, before 11. Click the free space at 9:30am in Dr. Shah's column.",
  },
  {
    target: "menu-book",
    title: "Book it",
    text: "Click Book appointment. The booking form opens with the dentist, date and time filled in.",
  },
  { target: "patient-search", title: "Find the patient", text: "Type Patel in the search box." },
  {
    target: "patient-meena",
    title: "Choose the right Patel",
    text: "Three Patels come up. The caller is Meena: check the first name, and the phone number or date of birth if you're unsure. Click Meena Patel.",
  },
  {
    target: "balance",
    next: true,
    title: "She owes £45",
    text: "DentDock warns you when a patient has an unpaid balance. The booking can still go ahead. We'll come back to this at the end.",
  },
  {
    target: "service",
    title: "Choose the treatment",
    text: "Choose Check-up from the Service list.",
  },
  {
    target: ["dentist", "when"],
    next: true,
    title: "Check the details",
    text: "The dentist, date and time came from the slot you clicked: Dr. Shah, 10/12/2026, 9:30am. Always check them against what the caller asked.",
  },
  { target: "book", title: "Book the appointment", text: "Click Book appointment." },
];

type Phase = "intro" | "tour" | "question" | "turnBrief" | "play" | "done";
type Message = { tone: "warning" | "danger" | "info"; title: string; text: string } | null;
type DrawerState = { search: string; patientId: string | null; service: string };

function StarsRow({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${count} of 3 stars`}>
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= count ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"}
          aria-hidden
        />
      ))}
    </span>
  );
}

const primary =
  "flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(37,99,235,0.3)] transition-colors hover:bg-[#1D4ED8]";
const secondary =
  "flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-6 text-sm font-semibold hover:bg-[#F8FAFC]";
const small =
  "flex h-8 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 text-[13px] font-medium hover:bg-[#F8FAFC] disabled:opacity-50";

function CallCard({ sc, label }: { sc: Scenario; label: string }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold">
        <Phone size={15} className="text-[#2563EB]" aria-hidden /> {label}
      </div>
      <p className="text-[14px] leading-[1.55] text-[#334155]">"{sc.call}"</p>
    </div>
  );
}

export function BookPhoneTask({
  role,
  position,
  total,
}: {
  role: string;
  position: number;
  total: number;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [walked, setWalked] = useState(false);
  const [best, setBest] = useState(0);

  // The pretend app
  const [view, setView] = useState<DiaryView>("week");
  const [date, setDate] = useState(TODAY);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [drawer, setDrawer] = useState<DrawerPrefill | null>(null);
  const [drawerKey, setDrawerKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerState, setDrawerState] = useState<DrawerState>({
    search: "",
    patientId: null,
    service: "",
  });
  const [toast, setToast] = useState<string | null>(null);
  const [newId, setNewId] = useState<string | null>(null);
  const simRef = useRef<HTMLDivElement>(null);

  // Walkthrough
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);

  // Your turn
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(0);
  const [message, setMessage] = useState<Message>(null);
  const [finalStars, setFinalStars] = useState(0);
  const mistakeKeys = useRef(new Set<string>());

  useEffect(() => {
    const p = loadProgress();
    setWalked(p.walked.includes(TASK_ID));
    setBest(p.stars[TASK_ID] ?? 0);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const resetApp = () => {
    setView("week");
    setDate(TODAY);
    setBookings(BOOKINGS);
    setDrawer(null);
    setMenuOpen(false);
    setDrawerState({ search: "", patientId: null, service: "" });
    setToast(null);
    setNewId(null);
    setMessage(null);
  };

  const startTour = () => {
    resetApp();
    setStep(0);
    setAnswer(null);
    setPhase("tour");
  };

  const startTurn = () => {
    resetApp();
    setMistakes(0);
    setHints(0);
    mistakeKeys.current = new Set();
    setPhase("play");
  };

  // Walkthrough: move on when the step's click has been done.
  useEffect(() => {
    if (phase !== "tour") return;
    const done: Record<number, boolean> = {
      1: view === "day" && date === TARGET_DAY,
      2: menuOpen,
      3: drawer !== null,
      4: drawerState.search.toLowerCase().includes("patel"),
      5: drawerState.patientId === "meena",
      7: drawerState.service === "Check-up",
    };
    if (done[step]) setStep((s) => s + 1);
    // Lost the menu or the form (Escape, closing it): go back to picking the time.
    else if ((step === 3 && !menuOpen && !drawer) || (step >= 4 && step <= 9 && !drawer))
      setStep(2);
  }, [phase, step, view, date, menuOpen, drawer, drawerState]);

  const sc = phase === "tour" || phase === "question" ? PATEL : REID;
  const stars = starsFor(mistakes, hints);

  const other = (what: string) => {
    if (phase !== "play") return;
    setMessage({
      tone: "info",
      title: `${what} isn't needed for this task`,
      text: "Book the appointment from the Calendar.",
    });
  };

  const openDrawer = (p: DrawerPrefill) => {
    setMessage(null);
    setDrawerKey((k) => k + 1);
    setDrawerState({ search: "", patientId: null, service: "" });
    setDrawer(p);
  };
  const pickSlot = (p: SlotPick) =>
    openDrawer({ date: p.date, start: p.start, clinicianId: p.clinicianId });
  const onMenu = useCallback((open: boolean) => setMenuOpen(open), []);
  const onDrawerState = useCallback((s: DrawerState) => setDrawerState(s), []);

  const hint = () => {
    if (hints >= REID.hints.length) return;
    setMessage({
      tone: "info",
      title: `Hint ${hints + 1} of ${REID.hints.length}`,
      text: REID.hints[hints],
    });
    setHints((h) => h + 1);
  };

  const book = async (a: Attempt & { note: string }) => {
    const v = checkAttempt(sc, a);
    if (!v.ok) {
      if (v.kind === "mistake" && phase === "play") {
        if (!mistakeKeys.current.has(v.key)) {
          mistakeKeys.current.add(v.key);
          setMistakes((m) => m + 1);
        }
        setMessage({
          tone: "danger",
          title: "Not quite",
          text: `${v.message} The real DentDock would have booked it, so you'd then need to move it.`,
        });
      }
      return false;
    }
    const name = sc === PATEL ? "Meena Patel" : "Tom Reid";
    const id = `new-${Date.now()}`;
    setBookings((b) => [
      ...b,
      {
        id,
        clinicianId: a.clinicianId,
        date: a.date,
        start: a.start!,
        minutes: SERVICES.find((x) => x.name === a.service)?.minutes ?? 30,
        patient: name,
        treatment: a.service,
      },
    ]);
    setNewId(id);
    setDate(a.date);
    setMessage(null);
    setToast(`Appointment booked for ${name}`);
    if (phase === "tour") {
      setStep(TOUR.length);
      setTimeout(() => setPhase("question"), 1600);
    } else {
      const s = starsFor(mistakes, hints);
      setFinalStars(s);
      setTimeout(() => {
        setBest(recordStars(TASK_ID, s).stars[TASK_ID] ?? s);
        setPhase("done");
      }, 1600);
    }
    return true;
  };

  const finishWalkthrough = () => {
    recordWalked(TASK_ID);
    setWalked(true);
    setPhase("turnBrief");
  };

  /* ---------------- 1. Intro ---------------- */
  if (phase === "intro")
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          to="/training/$role"
          params={{ role }}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[#2563EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Tasks
        </Link>
        <p className="mt-4 text-[13px] text-[#64748B]">
          Task {position} of {total}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Book a phoned-in appointment</h1>
        <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-white p-5 text-[14px] leading-[1.6] text-[#334155]">
          <p className="font-semibold text-[#0F172A]">How it works</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>
              First I'll show you how, one click at a time, on a copy of the DentDock Calendar for{" "}
              {PRACTICE}, a made-up practice.
            </li>
            <li>
              Then a different patient rings, and you book it on your own. You start on 3 stars, and
              a mistake or a hint costs one.
            </li>
          </ol>
          {best > 0 && (
            <p className="mt-3 flex items-center gap-2 text-[13px] text-[#64748B]">
              Your best so far: <StarsRow count={best} size={14} />
            </p>
          )}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {walked ? (
            <>
              <button type="button" onClick={() => setPhase("turnBrief")} className={primary}>
                Your turn
              </button>
              <button type="button" onClick={startTour} className={secondary}>
                Show me again
              </button>
            </>
          ) : (
            <button type="button" onClick={startTour} className={primary}>
              Show me how
            </button>
          )}
        </div>
      </div>
    );

  /* ---------------- 4a. Your turn: the new call ---------------- */
  if (phase === "turnBrief")
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          to="/training/$role"
          params={{ role }}
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[#2563EB] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Tasks
        </Link>
        <p className="mt-4 text-[13px] text-[#64748B]">
          Task {position} of {total}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Your turn</h1>
        <p className="mt-2 text-[14px] text-[#475569]">
          A different patient is on the phone. Book it on your own.
        </p>
        <div className="mt-5">
          <CallCard sc={REID} label="The phone rings" />
        </div>
        <p className="mt-4 text-[13px] text-[#64748B]">
          You start on 3 stars. A mistake or a hint costs one. You can start again at any time.
        </p>
        <div className="mt-6">
          <button type="button" onClick={startTurn} className={primary}>
            Start
          </button>
        </div>
      </div>
    );

  /* ---------------- 5. Result ---------------- */
  if (phase === "done")
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-[13px] text-[#64748B]">
          Task {position} of {total}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Appointment booked</h1>
        <div className="mt-4 flex items-center gap-3">
          <StarsRow count={finalStars} size={26} />
          <span className="text-[14px] text-[#475569]">
            {mistakes} mistake{mistakes === 1 ? "" : "s"} · {hints} hint{hints === 1 ? "" : "s"}
          </span>
        </div>
        <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-white p-5">
          <p className="text-[14px] font-semibold">In the real DentDock</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-[1.55] text-[#334155]">
            {REID.recap.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/training/$role" params={{ role }} className={primary}>
            Back to tasks
          </Link>
          <button type="button" onClick={startTurn} className={secondary}>
            <RotateCcw size={15} aria-hidden /> Try again
          </button>
          <button type="button" onClick={startTour} className={secondary}>
            Show me again
          </button>
        </div>
      </div>
    );

  /* ---------------- 2-4. The pretend app (walkthrough or your turn) ---------------- */
  const touring = phase === "tour";
  const icon =
    message?.tone === "danger"
      ? XCircle
      : message?.tone === "warning"
        ? AlertTriangle
        : message?.title.startsWith("Hint")
          ? Lightbulb
          : Info;

  return (
    <div className="flex h-[calc(100vh-56px)] min-h-[640px] flex-col">
      <div className="flex-shrink-0 border-b border-[#E2E8F0] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/training/$role"
              params={{ role }}
              className="text-[13px] font-medium text-[#2563EB] hover:underline"
            >
              ← Tasks
            </Link>
            <span className="truncate text-[14px] font-semibold">
              Book a phoned-in appointment ·{" "}
              {touring || phase === "question" ? "Watch how" : "Your turn"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {touring || phase === "question" ? (
              <>
                <button type="button" onClick={startTour} className={small}>
                  <RotateCcw size={14} aria-hidden /> Start the walkthrough again
                </button>
                {walked && (
                  <button type="button" onClick={() => setPhase("turnBrief")} className={small}>
                    Skip to your turn
                  </button>
                )}
              </>
            ) : (
              <>
                <StarsRow count={stars} />
                <button
                  type="button"
                  onClick={hint}
                  disabled={hints >= REID.hints.length}
                  className={small}
                >
                  Hint ({REID.hints.length - hints} left)
                </button>
                <button type="button" onClick={startTurn} className={small}>
                  <RotateCcw size={14} aria-hidden /> Start again
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-start gap-2 border-t border-[#F1F5F9] px-4 py-2.5 sm:px-6">
          <Phone size={15} className="mt-1 flex-shrink-0 text-[#2563EB]" aria-hidden />
          <p className="text-[14px] leading-[1.55] text-[#334155]">"{sc.call}"</p>
        </div>
      </div>

      <div ref={simRef} className="relative min-h-0 flex-1 overflow-x-auto" data-sim-root>
        <div className="h-full min-w-[720px]">
          <AppChrome
            practice={PRACTICE}
            page="Calendar"
            user={{ first: "Sam", last: "Reception", role: "Staff" }}
            onOther={other}
            onNewAppointment={() => openDrawer({ date: TODAY, start: null, clinicianId: "" })}
          >
            <Diary
              view={view}
              date={date}
              bookings={bookings}
              onView={setView}
              onDate={setDate}
              onPickSlot={pickSlot}
              onBlockTime={() => other("Block time")}
              onOther={other}
              highlightId={newId}
              markSlot={touring ? SLOT_930 : null}
              onMenu={onMenu}
            />
            {drawer && (
              <AppointmentDrawer
                key={drawerKey}
                prefill={drawer}
                bookings={bookings}
                onClose={() => setDrawer(null)}
                onBook={book}
                onOther={other}
                onState={onDrawerState}
              />
            )}
            <Toast message={toast} />
          </AppChrome>
        </div>

        {touring && step < TOUR.length && (
          <Walkthrough
            rootRef={simRef}
            step={TOUR[step]}
            index={step}
            total={TOUR.length}
            onNext={() => setStep((s) => s + 1)}
          />
        )}

        {message && phase === "play" && (
          <div className="absolute bottom-4 left-4 z-[65] w-[min(400px,calc(100%-32px))] shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
            <Notice tone={message.tone} icon={icon} title={message.title} className="pr-8">
              <span role="status">{message.text}</span>
            </Notice>
            <button
              type="button"
              onClick={() => setMessage(null)}
              aria-label="Close message"
              className="absolute right-2 top-2 rounded p-1 text-[#64748B] hover:text-[#0F172A]"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {phase === "question" && (
          <div className="absolute inset-0 z-[90] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div
              className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-xl sm:p-7"
              role="dialog"
              aria-label="One more thing"
            >
              <h2 className="text-[18px] font-bold">One more thing</h2>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#334155]">
                {BALANCE_QUESTION.prompt}
              </p>
              <div className="mt-4 space-y-2">
                {BALANCE_QUESTION.options.map((o) => {
                  const show = answer !== null;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => !answer && setAnswer(o.id)}
                      disabled={show}
                      className={`w-full rounded-lg border px-4 py-3 text-left text-[14px] transition-colors ${
                        show && o.correct
                          ? "border-[#16a34a] bg-[#f0fdf4]"
                          : show && answer === o.id
                            ? "border-[#dc2626] bg-[#fef2f2]"
                            : "border-[#E2E8F0] hover:border-[#2563EB]"
                      }`}
                    >
                      {o.text}
                    </button>
                  );
                })}
              </div>
              {answer && (
                <>
                  <p className="mt-4 text-[14px] leading-[1.55] text-[#334155]">
                    {BALANCE_QUESTION.options.find((o) => o.id === answer)?.why}
                  </p>
                  <button
                    type="button"
                    onClick={finishWalkthrough}
                    className={`${primary} mt-5 w-full`}
                  >
                    Now it's your turn
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
