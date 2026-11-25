import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { SessionNotice, SignInFrame, TrainingShell } from "@/components/training/TrainingShell";
import { useTrainingSession } from "@/components/training/session";
import { roleById, totalMinutes, type Role } from "@/components/training/missions";
import { loadProgress, type Progress } from "@/lib/trainingProgress";

// One role's list of tasks (docs/TRAINING-GAME-PLAN.md §3).
export const Route = createFileRoute("/training/$role")({
  component: RoleMap,
  head: () => ({
    meta: [
      { title: "Staff training | DentDock" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function RoleMap() {
  const { role: roleId } = Route.useParams();
  const role = roleById(roleId);
  const { session, refresh, lock } = useTrainingSession();

  if (session.state === "locked")
    return (
      <SignInFrame>
        <p className="text-center text-sm text-[#475569]">This computer is locked.</p>
        <Link
          to="/training"
          className="mt-5 flex h-10 w-full items-center justify-center rounded-lg bg-[#2563EB] text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
        >
          Unlock training
        </Link>
      </SignInFrame>
    );
  if (session.state !== "unlocked") return <SessionNotice session={session} onRetry={refresh} />;

  return (
    <TrainingShell practice={session.practice} onLock={lock}>
      {role ? (
        <TaskList role={role} />
      ) : (
        <div className="py-10 text-center">
          <p className="text-sm text-[#475569]">That role doesn't exist.</p>
          <Link to="/training" className="mt-3 inline-block text-sm font-medium text-[#2563EB]">
            Choose your role
          </Link>
        </div>
      )}
    </TrainingShell>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${count} of 3 stars`}>
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= count ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

function TaskList({ role }: { role: Role }) {
  const [progress, setProgress] = useState<Progress>({ name: "", stars: {} });
  useEffect(() => setProgress(loadProgress()), []);

  const earned = role.missions.reduce((n, m) => n + (progress.stars[m.id] ?? 0), 0);
  const possible = role.missions.length * 3;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/training"
        className="inline-flex items-center gap-1 text-[13px] font-medium text-[#2563EB] hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Change role
      </Link>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{role.name}</h1>
          <p className="mt-1 text-sm text-[#64748B]">
            {role.missions.length} tasks · about {totalMinutes(role)} minutes
          </p>
        </div>
        <div className="w-full max-w-[220px]">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#64748B]">Stars</span>
            <span className="font-medium">
              {earned} of {possible}
            </span>
          </div>
          <div
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={possible}
            aria-valuenow={earned}
            aria-label="Stars earned"
          >
            <div
              className="h-full bg-[#2563EB]"
              style={{ width: `${Math.round((earned / possible) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <ol className="mt-6 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
        {role.missions.map((m, i) => (
          <li
            key={m.id}
            className={`flex gap-4 px-5 py-4 ${i > 0 ? "border-t border-[#E2E8F0]" : ""}`}
          >
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] text-[13px] font-semibold text-[#475569]">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <h2 className="text-[15px] font-semibold">{m.title}</h2>
                <Stars count={progress.stars[m.id] ?? 0} />
              </div>
              <p className="mt-1 text-[13.5px] leading-[1.5] text-[#475569]">{m.story}</p>
              <p className="mt-1.5 text-[12.5px] text-[#64748B]">
                About {m.minutes} minutes · Not open yet
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
