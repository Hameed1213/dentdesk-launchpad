import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ChevronRight } from "lucide-react";
import { SessionNotice, SignInFrame, TrainingShell } from "@/components/training/TrainingShell";
import { useTrainingSession } from "@/components/training/session";
import { ROLES, totalMinutes, type RoleId } from "@/components/training/missions";
import { loadProgress, saveProgress } from "@/lib/trainingProgress";

// Staff training: unlock with the practice's code, then name and role (docs/TRAINING-GAME-PLAN.md).
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

  if (session.state === "locked")
    return <LockScreen onUnlocked={(p) => setSession({ state: "unlocked", practice: p })} />;
  if (session.state !== "unlocked") return <SessionNotice session={session} onRetry={refresh} />;
  return (
    <TrainingShell practice={session.practice} onLock={lock}>
      <RolePicker practice={session.practice} />
    </TrainingShell>
  );
}

const inputClass =
  "h-10 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]";

/* ---------------- Lock screen (the app's sign-in page) ---------------- */

function LockScreen({ onUnlocked }: { onUnlocked: (practice: string) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (code.replace(/[^A-Za-z0-9]/g, "").length < 12) {
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
    <SignInFrame>
      {error && (
        <p
          id="training-code-error"
          role="alert"
          className="mb-4 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2.5 text-[13px] text-[#B91C1C]"
        >
          {error}
        </p>
      )}
      <form onSubmit={submit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="training-code"
            className="mb-1.5 block text-[13px] font-medium text-[#0F172A]"
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
            placeholder="XXXX-XXXX-XXXX-XXXX"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "training-code-error" : undefined}
            className={`${inputClass} font-mono tracking-[0.08em]`}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] text-sm font-semibold text-white shadow-[0_1px_3px_rgba(37,99,235,0.3)] transition-colors hover:bg-[#1D4ED8] disabled:opacity-60"
        >
          {busy ? (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              aria-label="Checking"
            />
          ) : (
            "Unlock training"
          )}
        </button>
      </form>
      <div className="mt-6 border-t border-[#E2E8F0] pt-4">
        <p className="text-center text-[13px] text-[#64748B]">
          Ask your practice manager for the code.
        </p>
      </div>
    </SignInFrame>
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
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Staff training</h1>
      <p className="mt-1 text-sm text-[#64748B]">{practice}</p>

      <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-white p-5">
        <label htmlFor="training-name" className="block text-[13px] font-medium">
          Your first name
        </label>
        <p className="mt-0.5 text-[13px] text-[#64748B]">
          Shown on your certificate. Kept on this computer only.
        </p>
        <input
          id="training-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value.slice(0, 40));
            setNameError(false);
          }}
          autoComplete="given-name"
          aria-invalid={nameError}
          aria-describedby={nameError ? "training-name-error" : undefined}
          className={`${inputClass} mt-2 max-w-xs`}
        />
        {nameError && (
          <p id="training-name-error" role="alert" className="mt-2 text-[13px] text-[#B91C1C]">
            Add your first name first.
          </p>
        )}
      </div>

      <h2 className="mt-8 text-[15px] font-semibold">Choose your role</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
        {ROLES.map((r, i) => {
          const done = r.missions.filter((m) => stars[m.id]).length;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => choose(r.id)}
              className={`group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F8FAFC] focus-visible:bg-[#F8FAFC] focus-visible:outline-none ${
                i > 0 ? "border-t border-[#E2E8F0]" : ""
              }`}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold">{r.name}</span>
                <span className="mt-0.5 block text-[13px] text-[#64748B]">{r.summary}</span>
                <span className="mt-1.5 block text-[12.5px] text-[#64748B]">
                  {r.missions.length} tasks · about {totalMinutes(r)} minutes
                  {done > 0 && ` · ${done} of ${r.missions.length} done`}
                </span>
              </span>
              <ChevronRight
                className="h-5 w-5 flex-shrink-0 text-[#94A3B8] transition-colors group-hover:text-[#2563EB]"
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
