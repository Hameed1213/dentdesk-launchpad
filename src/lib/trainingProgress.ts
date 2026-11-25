/*
 * The learner's name and stars, kept in this browser only (localStorage). Nothing here is sent
 * anywhere. Every read and write is wrapped: private windows and blocked storage simply mean
 * progress isn't remembered.
 */
const KEY = "dd_training_progress_v1";

export type Progress = {
  name: string;
  /** missionId -> best stars (1-3). */
  stars: Record<string, number>;
};

const EMPTY: Progress = { name: "", stars: {} };

export function loadProgress(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY, stars: {} };
    const p = JSON.parse(raw) as Partial<Progress>;
    const stars: Record<string, number> = {};
    if (p.stars && typeof p.stars === "object")
      for (const [k, v] of Object.entries(p.stars))
        if (typeof v === "number" && v >= 1 && v <= 3) stars[k.slice(0, 40)] = Math.round(v);
    return { name: typeof p.name === "string" ? p.name.slice(0, 40) : "", stars };
  } catch {
    return { ...EMPTY, stars: {} };
  }
}

export function saveProgress(p: Progress): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* not remembered; the training still works */
  }
}

export function clearProgress(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* nothing to clear */
  }
}

/** Stars for a task (Hariss, 25 Nov): start on 3, lose 1 per mistake or hint, never below 1. */
export function starsFor(mistakes: number, hints: number): number {
  return Math.max(1, 3 - mistakes - hints);
}

/** Keeps the best stars for a task. */
export function recordStars(taskId: string, stars: number): Progress {
  const p = loadProgress();
  const best = Math.max(p.stars[taskId] ?? 0, Math.min(3, Math.max(1, stars)));
  const next = { ...p, stars: { ...p.stars, [taskId]: best } };
  saveProgress(next);
  return next;
}
