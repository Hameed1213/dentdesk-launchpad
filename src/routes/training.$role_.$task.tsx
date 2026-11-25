import { createFileRoute, Link } from "@tanstack/react-router";
import type { ComponentType } from "react";
import { SessionNotice, SignInFrame, TrainingShell } from "@/components/training/TrainingShell";
import { useTrainingSession } from "@/components/training/session";
import { roleById } from "@/components/training/missions";
import { BookPhoneTask } from "@/components/training/tasks/BookPhoneTask";

// One training task (docs/TRAINING-GAME-PLAN.md). Only tasks listed here can be played.
const TASKS: Record<string, ComponentType<{ role: string; position: number; total: number }>> = {
  "book-phone": BookPhoneTask,
};

export const Route = createFileRoute("/training/$role_/$task")({
  component: TaskPage,
  head: () => ({
    meta: [
      { title: "Staff training | DentDock" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function TaskPage() {
  const { role: roleId, task: taskId } = Route.useParams();
  const { session, refresh, lock } = useTrainingSession();
  const role = roleById(roleId);
  const index = role?.missions.findIndex((m) => m.id === taskId) ?? -1;
  const Task = role && index >= 0 && role.missions[index].ready ? TASKS[taskId] : undefined;

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
    <TrainingShell practice={session.practice} onLock={lock} wide>
      {Task && role ? (
        <Task role={role.id} position={index + 1} total={role.missions.length} />
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm text-[#475569]">This task isn't open yet.</p>
          <Link
            to="/training/$role"
            params={{ role: roleId }}
            className="mt-3 inline-block text-sm font-medium text-[#2563EB]"
          >
            Back to tasks
          </Link>
        </div>
      )}
    </TrainingShell>
  );
}
