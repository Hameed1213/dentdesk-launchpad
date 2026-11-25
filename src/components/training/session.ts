import { useCallback, useEffect, useState } from "react";

/** Whether this browser may open the staff training (src/lib/trainingAccess.ts decides on the server). */
export type Session =
  | { state: "checking" }
  | { state: "closed" } // secrets not set: training is switched off
  | { state: "locked" }
  | { state: "unlocked"; practice: string }
  | { state: "error" };

/** Asks the server whether this browser holds a training pass. */
export function useTrainingSession() {
  const [session, setSession] = useState<Session>({ state: "checking" });

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
      setSession({ state: "error" });
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const lock = useCallback(async () => {
    try {
      await fetch("/api/training/lock", { method: "POST", credentials: "same-origin" });
    } finally {
      setSession({ state: "locked" });
    }
  }, []);

  return { session, setSession, refresh, lock };
}
