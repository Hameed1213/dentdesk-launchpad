import { useEffect, useRef, useState } from "react";
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
import {
  BALANCE_QUESTION,
  BOOKINGS,
  HINTS,
  PRACTICE,
  REAL_APP_RECAP,
  SERVICES,
  TODAY,
  checkBooking,
  type Booking,
} from "./bookPhone";
import { loadProgress, recordStars, starsFor } from "@/lib/trainingProgress";

/*
 * Reception task 2 (docs/TRAINING-GAME-PLAN.md): the phone call, the pretend diary and drawer,
 * hints, checks, the balance question, and the result. Nothing here leaves the browser.
 */

const TASK_ID = "book-phone";

type Phase = "brief" | "play" | "question" | "done";
type Message = { tone: "warning" | "danger" | "info"; title: string; text: string } | null;

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

export function BookPhoneTask({
  role,
  position,
  total,
}: {
  role: string;
  position: number;
  total: number;
}) {
  const [phase, setPhase] = useState<Phase>("brief");
  const [view, setView] = useState<DiaryView>("week");
  const [date, setDate] = useState(TODAY);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [drawer, setDrawer] = useState<DrawerPrefill | null>(null);
  const [drawerKey, setDrawerKey] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(0);
  const [message, setMessage] = useState<Message>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [newId, setNewId] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [finalStars, setFinalStars] = useState(0);
  const [best, setBest] = useState(0);
  const mistakeKeys = useRef(new Set<string>());

  useEffect(() => setBest(loadProgress().stars[TASK_ID] ?? 0), []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const stars = starsFor(mistakes, hints);

  const restart = () => {
    setPhase("play");
    setView("week");
    setDate(TODAY);
    setBookings(BOOKINGS);
    setDrawer(null);
    setMistakes(0);
    setHints(0);
    setMessage(null);
    setToast(null);
    setNewId(null);
    setAnswer(null);
    mistakeKeys.current = new Set();
  };

  const other = (what: string) =>
    setMessage({
      tone: "info",
      title: `${what} isn't needed for this task`,
      text: "Book Mrs Patel's appointment from the Calendar.",
    });

  const openDrawer = (p: DrawerPrefill) => {
    setMessage(null);
    setDrawerKey((k) => k + 1);
    setDrawer(p);
  };

  const pickSlot = (p: SlotPick) =>
    openDrawer({ date: p.date, start: p.start, clinicianId: p.clinicianId });

  const hint = () => {
    if (hints >= HINTS.length) return;
    setMessage({ tone: "info", title: `Hint ${hints + 1} of ${HINTS.length}`, text: HINTS[hints] });
    setHints((h) => h + 1);
  };

  const book: Parameters<typeof AppointmentDrawer>[0]["onBook"] = async (a) => {
    const v = checkBooking(a);
    if (!v.ok) {
      if (v.kind === "mistake") {
        // The same mistake twice only costs once.
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
    const id = `new-${Date.now()}`;
    setBookings((b) => [
      ...b,
      {
        id,
        clinicianId: a.clinicianId,
        date: a.date,
        start: a.start!,
        minutes: SERVICES.find((x) => x.name === a.service)?.minutes ?? 30,
        patient: "Meena Patel",
        treatment: a.service,
      },
    ]);
    setNewId(id);
    setDate(a.date);
    setMessage(null);
    setToast("Appointment booked for Meena Patel");
    setTimeout(() => setPhase("question"), 1600);
    return true;
  };

  const answerQuestion = (id: string) => {
    if (answer) return;
    setAnswer(id);
    const correct = BALANCE_QUESTION.options.find((o) => o.id === id)?.correct;
    const s = starsFor(mistakes + (correct ? 0 : 1), hints);
    setFinalStars(s);
    setBest(recordStars(TASK_ID, s).stars[TASK_ID] ?? s);
  };

  const call = (
    <p className="text-[14px] leading-[1.55] text-[#334155]">
      "Hello, it's Meena Patel. Could I book a check-up with Dr Shah next Thursday, please? Any time
      before 11 in the morning is fine."
    </p>
  );

  /* ---------------- Brief ---------------- */
  if (phase === "brief")
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
        <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-white p-5">
          <div className="mb-2 flex items-center gap-2 text-[13px] font-semibold">
            <Phone size={15} className="text-[#2563EB]" aria-hidden /> The phone rings
          </div>
          {call}
        </div>
        <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-white p-5 text-[14px] leading-[1.6] text-[#334155]">
          <p className="font-semibold text-[#0F172A]">How it works</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              You'll be in a copy of the DentDock Calendar for {PRACTICE}, a made-up practice. Book
              the appointment as you would for real.
            </li>
            <li>You start on 3 stars. A mistake or a hint costs one star.</li>
            <li>Start again at any time.</li>
          </ul>
          {best > 0 && (
            <p className="mt-3 flex items-center gap-2 text-[13px] text-[#64748B]">
              Your best so far: <StarsRow count={best} size={14} />
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={restart}
          className="mt-6 h-10 w-full rounded-lg bg-[#2563EB] text-sm font-semibold text-white shadow-[0_1px_3px_rgba(37,99,235,0.3)] transition-colors hover:bg-[#1D4ED8] sm:w-auto sm:px-8"
        >
          Start
        </button>
      </div>
    );

  /* ---------------- Result ---------------- */
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
            {mistakes + (BALANCE_QUESTION.options.find((o) => o.id === answer)?.correct ? 0 : 1)}{" "}
            mistake
            {mistakes + (BALANCE_QUESTION.options.find((o) => o.id === answer)?.correct ? 0 : 1) ===
            1
              ? ""
              : "s"}{" "}
            · {hints} hint
            {hints === 1 ? "" : "s"}
          </span>
        </div>
        <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-white p-5">
          <p className="text-[14px] font-semibold">In the real DentDock</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-[1.55] text-[#334155]">
            {REAL_APP_RECAP.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/training/$role"
            params={{ role }}
            className="flex h-10 items-center justify-center rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
          >
            Back to tasks
          </Link>
          <button
            type="button"
            onClick={restart}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-6 text-sm font-semibold hover:bg-[#F8FAFC]"
          >
            <RotateCcw size={15} aria-hidden /> Try again
          </button>
        </div>
      </div>
    );

  /* ---------------- Play (and the question on top) ---------------- */
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
              Task {position} of {total}: Book a phoned-in appointment
            </span>
          </div>
          <div className="flex items-center gap-3">
            <StarsRow count={stars} />
            <button
              type="button"
              onClick={hint}
              disabled={hints >= HINTS.length || phase !== "play"}
              className="h-8 rounded-lg border border-[#E2E8F0] bg-white px-3 text-[13px] font-medium hover:bg-[#F8FAFC] disabled:opacity-50"
            >
              Hint ({HINTS.length - hints} left)
            </button>
            <button
              type="button"
              onClick={restart}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 text-[13px] font-medium hover:bg-[#F8FAFC]"
            >
              <RotateCcw size={14} aria-hidden /> Start again
            </button>
          </div>
        </div>
        <div className="flex items-start gap-2 border-t border-[#F1F5F9] px-4 py-2.5 sm:px-6">
          <Phone size={15} className="mt-1 flex-shrink-0 text-[#2563EB]" aria-hidden />
          {call}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-x-auto" data-sim-root>
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
            />
            {drawer && (
              <AppointmentDrawer
                key={drawerKey}
                prefill={drawer}
                bookings={bookings}
                onClose={() => setDrawer(null)}
                onBook={book}
                onOther={other}
              />
            )}
            <Toast message={toast} />
          </AppChrome>
        </div>

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
          <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
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
                  const picked = answer === o.id;
                  const show = answer !== null;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => answerQuestion(o.id)}
                      disabled={show}
                      className={`w-full rounded-lg border px-4 py-3 text-left text-[14px] transition-colors ${
                        show && o.correct
                          ? "border-[#16a34a] bg-[#f0fdf4]"
                          : show && picked
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
                    onClick={() => setPhase("done")}
                    className="mt-5 h-10 w-full rounded-lg bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#1D4ED8]"
                  >
                    See how you did
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
