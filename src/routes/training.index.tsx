import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Clock, KeyRound, Loader2 } from "lucide-react";
import { Coach, SessionNotice, TrainingShell } from "@/components/training/TrainingShell";
import { useTrainingSession, type Session } from "@/components/training/session";
import { ROLES, totalMinutes, type RoleId } from "@/components/training/missions";
import { loadProgress, saveProgress } from "@/lib/trainingProgress";

// Staff training: lock screen, then name and role (docs/TRAINING-GAME-PLAN.md).
export const Route = createFileRoute("/training/")({
  component: TrainingHome,
  head: () => ({
    meta: [
      { title: "Staff training | DentDock" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "DentDock staff training for practice teams." },
    ],
  }),
});

function TrainingHome() {
  const { session, setSession, refresh, lock } = useTrainingSession();
  const practice = session.state === "unlocked" ? session.practice : undefined;

  return (
    <TrainingShell practice={practice} onLock={practice ? lock : undefined}>
      {session.state === "locked" ? (
        <LockScreen onUnlocked={(p) => setSession({ state: "unlocked", practice: p })} />
      ) : session.state === "unlocked" ? (
        <RolePicker practice={session.practice} />
      ) : (
        <SessionNotice session={session as Session} onRetry={refresh} />
      )}
    </TrainingShell>
  );
}

/* ---------------- Lock screen ---------------- */

function LockScreen({ onUnlocked }: { onUnlocked: (practice: string) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    const clean = code.replace(/[^A-Za-z0-9]/g, "");
    if (clean.length < 12) {
      setError("Enter the whole code: four groups of four letters and numbers.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/training/unlock", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json().catch(() => ({}))) as { practice?: string; error?: string };
      if (res.ok && data.practice) onUnlocked(data.practice);
      else setError(data.error || "Training couldn't open. Please try again.");
    } catch {
      setError("Training couldn't open. Check your internet connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div>
        <h1 className="text-[34px] font-semibold leading-[1.1] tracking-tight md:text-[46px]">
          Learn DentDock by <span className="text-[#2563EB]">doing it</span>
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-[#334155]">
          Short missions on a made-up practice. Book, move and finish appointments, take payments
          and set up your team, with a coach beside you. Nothing you do here touches real patients.
        </p>
        <ul className="mt-6 hidden space-y-2.5 text-[15px] text-[#334155] lg:block">
          {[
            "8 missions for reception, 9 for practice managers",
            "The same screens and buttons as the real DentDock",
            "Stars for each mission, and a certificate at the end",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0F172A]" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={submit}
        className="rounded-[28px] border border-[#DBEAFE] bg-white p-6 shadow-[0_10px_40px_-20px_rgba(37,99,235,0.35)] sm:p-8"
        noValidate
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
            <KeyRound className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-[18px] font-semibold">Unlock training</h2>
            <p className="text-[13px] text-[#64748B]">Your practice manager has the code.</p>
          </div>
        </div>

        <label
          htmlFor="training-code"
          className="mt-6 block text-[13px] font-medium text-[#334155]"
        >
          Access code
        </label>
        <input
          id="training-code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 24))}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          inputMode="text"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "training-code-error" : undefined}
          className="mt-1.5 w-full rounded-xl border border-[#CBD5E1] bg-white px-4 py-3 font-mono text-[17px] tracking-[0.12em] text-[#0F172A] outline-none transition-colors placeholder:text-[#CBD5E1] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
        />
        {error && (
          <p id="training-code-error" role="alert" className="mt-2 text-[13px] text-[#B91C1C]">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1D4ED8] disabled:cursor-wait disabled:opacity-80"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Checking…
            </>
          ) : (
            <>
              Unlock training <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
        <p className="mt-4 text-[12.5px] leading-[1.5] text-[#64748B]">
          This computer stays unlocked for 30 days. Your name and stars are kept on this computer
          only.
        </p>
      </form>
    </div>
  );
}

/* ---------------- Name and role ---------------- */

function RolePicker({ practice }: { practice: string }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [stars, setStars] = useState<Record<string, number>>({});
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    setName(p.name);
    setStars(p.stars);
  }, []);

  const choose = (role: RoleId) => {
    const clean = name.trim().replace(/\s+/g, " ").slice(0, 40);
    if (!clean) {
      setNameError(true);
      document.getElementById("training-name")?.focus();
      return;
    }
    saveProgress({ ...loadProgress(), name: clean });
    void navigate({ to: "/training/$role", params: { role } });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Coach face="grin">
        Welcome to <strong className="font-semibold text-[#0F172A]">{practice}</strong>'s training!
        I'll be with you on every mission. Tell me your first name, then pick your role.
      </Coach>

      <div className="mt-8 rounded-[24px] border border-[#DBEAFE] bg-white p-5 sm:p-6">
        <label htmlFor="training-name" className="block text-[14px] font-semibold">
          Your first name
        </label>
        <p className="text-[13px] text-[#64748B]">
          It goes on your certificate. It stays on this computer.
        </p>
        <input
          id="training-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value.slice(0, 40));
            setNameError(false);
          }}
          autoComplete="given-name"
          placeholder="e.g. Sarah"
          aria-invalid={nameError}
          aria-describedby={nameError ? "training-name-error" : undefined}
          className="mt-2 w-full max-w-sm rounded-xl border border-[#CBD5E1] px-4 py-2.5 text-[16px] outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15"
        />
        {nameError && (
          <p id="training-name-error" role="alert" className="mt-2 text-[13px] text-[#B91C1C]">
            Add your first name first.
          </p>
        )}
      </div>

      <h1 className="mt-10 text-[26px] font-semibold tracking-tight md:text-[32px]">
        What's your role?
      </h1>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {ROLES.map((r) => {
          const done = r.missions.filter((m) => stars[m.id]).length;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => choose(r.id)}
              className="group flex flex-col rounded-[24px] border-2 border-[#DBEAFE] bg-white p-6 text-left transition-colors hover:border-[#2563EB] focus-visible:border-[#2563EB] focus-visible:outline-none"
            >
              <span className="text-[13px] font-medium text-[#64748B]">{r.who}</span>
              <span className="mt-1 text-[22px] font-semibold tracking-tight">{r.name}</span>
              <span className="mt-2 text-[15px] leading-[1.5] text-[#334155]">{r.summary}</span>
              <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#475569]">
                <span>{r.missions.length} missions</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden /> about {totalMinutes(r)} minutes
                </span>
                {done > 0 && (
                  <span className="font-medium text-[#166534]">
                    {done} of {r.missions.length} done
                  </span>
                )}
              </span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2563EB]">
                {done > 0 ? "Carry on" : "Start"}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
