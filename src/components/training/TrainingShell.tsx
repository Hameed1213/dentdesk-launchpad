import type { ReactNode } from "react";
import type { Session } from "./session";
import { Link } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";

/*
 * The frame for every /training page: a plain top bar (no marketing navigation), the
 * "practice mode" notice, and the page. Training is never indexed (see the routes' head and
 * src/lib/seoHeaders.ts).
 */

export function TrainingShell({
  practice,
  onLock,
  children,
}: {
  practice?: string;
  onLock?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FF] to-[#EEF3FE] text-[#0F172A]">
      <header className="border-b border-[#E2E8F0] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/training"
            className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-[#2563EB]"
          >
            <ToothIcon size={26} />
            <span className="text-[17px] font-semibold tracking-tight">DentDock</span>
            <span className="hidden rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[12px] font-semibold text-[#1D4ED8] sm:inline">
              Staff training
            </span>
          </Link>
          {practice && (
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="truncate text-[13px] text-[#475569]">{practice}</span>
              {onLock && (
                <button
                  type="button"
                  onClick={onLock}
                  className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#334155] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
                >
                  <Lock className="h-3.5 w-3.5" aria-hidden />
                  Lock
                </button>
              )}
            </div>
          )}
        </div>
        <div className="border-t border-[#FDE68A] bg-[#FFFBEB]">
          <p className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-1.5 text-[12.5px] text-[#92400E] sm:px-6">
            <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden />
            Practice mode: made-up patients, and nothing is ever sent.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">{children}</main>
    </div>
  );
}

export type CoachFace = "smile" | "grin" | "wink" | "gasp";

/** The mascot with a speech bubble. */
export function Coach({ face = "smile", children }: { face?: CoachFace; children: ReactNode }) {
  return (
    <div className="flex items-end gap-3">
      <img
        src={`/images/training/coach-${face}.webp`}
        alt=""
        width={72}
        height={103}
        className="h-[86px] w-auto flex-shrink-0 drop-shadow-sm sm:h-[103px]"
      />
      <div className="relative mb-3 rounded-2xl rounded-bl-md border border-[#DBEAFE] bg-white px-4 py-3 text-[15px] leading-[1.5] text-[#334155] shadow-sm">
        {children}
      </div>
    </div>
  );
}

/** Shown while the session is being checked, or when something went wrong. */
export function SessionNotice({ session, onRetry }: { session: Session; onRetry: () => void }) {
  if (session.state === "checking")
    return (
      <p className="py-24 text-center text-[15px] text-[#64748B]" role="status">
        Opening training…
      </p>
    );
  if (session.state === "closed")
    return (
      <div className="mx-auto max-w-md py-16">
        <Coach face="gasp">Training isn't switched on yet. Please check back soon.</Coach>
      </div>
    );
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <Coach face="gasp">
        Training couldn't open. Check your internet connection and try again.
      </Coach>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
      >
        Try again
      </button>
    </div>
  );
}
