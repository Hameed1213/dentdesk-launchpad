import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Star } from "lucide-react";
import { Coach, SessionNotice, TrainingShell } from "@/components/training/TrainingShell";
import { useTrainingSession } from "@/components/training/session";
import { roleById, totalMinutes, type Role } from "@/components/training/missions";
import { loadProgress, type Progress } from "@/lib/trainingProgress";

// One role's mission map (docs/TRAINING-GAME-PLAN.md §3).
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
  const practice = session.state === "unlocked" ? session.practice : undefined;

  return (
    <TrainingShell practice={practice} onLock={practice ? lock : undefined}>
      {session.state === "locked" ? (
        <div className="mx-auto max-w-md py-10 text-center">
          <Coach face="wink">
            This computer is locked. Unlock training with your practice's code.
          </Coach>
          <Link
            to="/training"
            className="mt-6 inline-flex rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
          >
            Unlock training
          </Link>
        </div>
      ) : session.state !== "unlocked" ? (
        <SessionNotice session={session} onRetry={refresh} />
      ) : !role ? (
        <div className="mx-auto max-w-md py-10 text-center">
          <Coach face="gasp">That role doesn't exist.</Coach>
          <Link to="/training" className="mt-6 inline-flex font-semibold text-[#2563EB]">
            Choose your role
          </Link>
        </div>
      ) : (
        <MissionMap role={role} />
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
          className={`h-4 w-4 ${i <= count ? "fill-[#FBBF24] text-[#F59E0B]" : "text-[#CBD5E1]"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

function MissionMap({ role }: { role: Role }) {
  const [progress, setProgress] = useState<Progress>({ name: "", stars: {} });
  useEffect(() => setProgress(loadProgress()), []);

  const earned = role.missions.reduce((n, m) => n + (progress.stars[m.id] ?? 0), 0);
  const possible = role.missions.length * 3;
  const pct = Math.round((earned / possible) * 100);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/training"
        className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#2563EB] hover:text-[#1D4ED8]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Change role
      </Link>

      <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[30px] font-semibold tracking-tight md:text-[38px]">
            {role.name} training
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-[15px] text-[#475569]">
            {role.missions.length} missions
            <span aria-hidden>·</span>
            <Clock className="h-4 w-4" aria-hidden /> about {totalMinutes(role)} minutes
          </p>
        </div>
        <div className="w-full max-w-xs rounded-2xl border border-[#DBEAFE] bg-white p-4">
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-medium text-[#334155]">Your stars</span>
            <span className="font-semibold text-[#0F172A]">
              {earned} / {possible}
            </span>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#EEF2F7]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={possible}
            aria-valuenow={earned}
            aria-label="Stars earned"
          >
            <div
              className="h-full rounded-full bg-[#2563EB] transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Coach face="smile">
          {progress.name ? `Hi ${progress.name}! ` : ""}The missions are being built now and will
          open here very soon. Here's what you'll learn.
        </Coach>
      </div>

      <ol className="relative mt-8 space-y-4 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-0.5 before:bg-[#DBEAFE] sm:before:left-[31px]">
        {role.missions.map((m, i) => (
          <li key={m.id} className="relative flex gap-4 sm:gap-5">
            <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#DBEAFE] bg-white text-[18px] font-semibold text-[#2563EB] sm:h-16 sm:w-16 sm:text-[20px]">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <h2 className="text-[17px] font-semibold tracking-tight">{m.title}</h2>
                <Stars count={progress.stars[m.id] ?? 0} />
              </div>
              <p className="mt-1.5 text-[14.5px] italic leading-[1.5] text-[#475569]">
                "{m.story}"
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.5] text-[#334155]">
                <span className="font-medium text-[#0F172A]">You'll learn: </span>
                {m.learn}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 text-[13px] text-[#64748B]">
                  <Clock className="h-3.5 w-3.5" aria-hidden /> about {m.minutes} min
                </span>
                <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-[12px] font-semibold text-[#475569]">
                  Coming soon
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
