import { useCallback, useEffect, useState } from "react";

/** Whether this browser may open the staff training (src/lib/trainingAccess.ts decides on the server). */
export type Session =
  | { state: "checking" }
  | { state: "closed" } // secrets not set: training is switched off
  | { state: "locked" }
  | { state: "unlocked"; practice: string }
  | { state: "error" };

/*
 * The last answer, kept in memory while the tab is open, so moving between training pages
 * doesn't flash the "checking" screen (Hariss, 25 Nov). The server is still asked on every page;
 * its answer replaces this straight away (a removed code or Lock still takes effect).
 * Only set in the browser: the server never runs the effects or handlers that write it.
 */
let lastKnown: Session | null = null;

/** Asks the server whether this browser holds a training pass. */
export function useTrainingSession() {
  const [session, setLocal] = useState<Session>(() => lastKnown ?? { state: "checking" });

  const setSession = useCallback((s: Session) => {
    if (s.state !== "checking" && s.state !== "error") lastKnown = s;
    setLocal(s);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/training/session", { credentials: "same-origin" });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { open?: boolean; unlocked?: boolean; practice?: string };
      if (!data.open) setSession({ state: "closed" });
      else if (data.unlocked && data.practice)
        setSession({ state: "unlocked", practice: data.practice });
      else setSession({ state: "locked" });
    } catch {
      // Keep what we last knew if the check fails mid-session; otherwise say so.
      if (!lastKnown) setSession({ state: "error" });
    }
  }, [setSession]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const lock = useCallback(async () => {
    try {
      await fetch("/api/training/lock", { method: "POST", credentials: "same-origin" });
    } finally {
      setSession({ state: "locked" });
    }
  }, [setSession]);

  return { session, setSession, refresh, lock };
}
