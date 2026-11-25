import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import ToothIcon from "@/components/icons/ToothIcon";
import type { Session } from "./session";

/*
 * Staff training is part of the software, not the marketing site: it follows the practice app's
 * look (desk-care-hub: Login.tsx, the light page background, plain cards), with no marketing
 * pieces (no mascot, no pills, no marketing navigation). See docs/TRAINING-GAME-PLAN.md.
 */

/** The dark full-page frame the app uses for its sign-in page, with one white card. */
export function SignInFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F172A] px-4 py-10">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:p-10">
        <div className="mb-8 text-center">
          <ToothIcon size={32} className="mx-auto mb-3" />
          <p className="text-[22px] font-extrabold tracking-tight text-[#0F172A]">DentDock</p>
          <p className="text-sm text-[#64748B]">Staff training</p>
        </div>
        {children}
      </div>
    </div>
  );
}

/** The frame once unlocked: a plain top bar and the app's light page background. */
export function TrainingShell({
  practice,
  onLock,
  wide = false,
  children,
}: {
  practice?: string;
  onLock?: () => void;
  /** A task page: the pretend app uses the whole width. */
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="border-b border-[#E2E8F0] bg-white">
        <div
          className={`mx-auto flex h-14 items-center justify-between gap-3 px-4 sm:px-6 ${wide ? "" : "max-w-5xl"}`}
        >
          <Link to="/training" className="flex items-center gap-2 rounded-md">
            <ToothIcon size={22} />
            <span className="text-[15px] font-bold tracking-tight">DentDock</span>
            <span className="hidden border-l border-[#E2E8F0] pl-2 text-[14px] text-[#64748B] sm:inline">
              Staff training
            </span>
          </Link>
          {practice && (
            <div className="flex min-w-0 items-center gap-4">
              <span className="truncate text-[13px] text-[#64748B]">{practice}</span>
              {onLock && (
                <button
                  type="button"
                  onClick={onLock}
                  className="flex-shrink-0 text-[13px] font-medium text-[#2563EB] hover:underline"
                >
                  Lock
                </button>
              )}
            </div>
          )}
        </div>
      </header>
      {wide ? (
        <main>{children}</main>
      ) : (
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
      )}
    </div>
  );
}

/** Shown while the session is being checked, when training is off, or when something failed. */
export function SessionNotice({ session, onRetry }: { session: Session; onRetry: () => void }) {
  return (
    <SignInFrame>
      {session.state === "checking" ? (
        <div className="flex justify-center py-4" role="status" aria-label="Opening training">
          <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-[#2563EB] border-t-transparent" />
        </div>
      ) : session.state === "closed" ? (
        <p className="text-center text-sm text-[#475569]">
          Training isn't switched on yet. Please check back soon.
        </p>
      ) : (
        <div className="text-center">
          <p className="text-sm text-[#475569]">
            Training couldn't open. Check your internet connection and try again.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 h-10 w-full rounded-lg bg-[#2563EB] text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
          >
            Try again
          </button>
        </div>
      )}
    </SignInFrame>
  );
}
