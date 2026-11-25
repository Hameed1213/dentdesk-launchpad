import { useEffect, useRef, useState, type RefObject } from "react";

/*
 * Guided clicks (Hariss, 25 Nov: show first, then let them do it). Inside the pretend app:
 * - a ring around the thing to click (elements marked data-tour="…");
 * - a short note beside it, with Next on steps that only explain;
 * - clicks anywhere else in the pretend app are held back, with a nudge.
 * The task decides when an action step is done (from the pretend app's state).
 */

export type TourStep = {
  /** data-tour value(s) to ring; none = a note in the middle. */
  target?: string | string[];
  title: string;
  text: string;
  /** Explains only: shows Next instead of waiting for a click. */
  next?: boolean;
};

type Box = { top: number; left: number; width: number; height: number };

function measure(root: HTMLElement, targets: string[]): Box | null {
  const r = root.getBoundingClientRect();
  const rects = targets
    .flatMap((t) => [...root.querySelectorAll(`[data-tour="${t}"]`)])
    .map((el) => el.getBoundingClientRect())
    .filter((b) => b.width > 0 && b.height > 0);
  if (rects.length === 0) return null;
  const top = Math.min(...rects.map((b) => b.top));
  const left = Math.min(...rects.map((b) => b.left));
  const bottom = Math.max(...rects.map((b) => b.bottom));
  const right = Math.max(...rects.map((b) => b.right));
  return { top: top - r.top, left: left - r.left, width: right - left, height: bottom - top };
}

export function Walkthrough({
  rootRef,
  step,
  index,
  total,
  onNext,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  step: TourStep;
  index: number;
  total: number;
  onNext: () => void;
}) {
  const [box, setBox] = useState<Box | null>(null);
  const [rootSize, setRootSize] = useState({ w: 0, h: 0 });
  const [nudge, setNudge] = useState(false);
  const boxRef = useRef<Box | null>(null);
  const targets = step.target ? (Array.isArray(step.target) ? step.target : [step.target]) : [];
  const key = targets.join("|");

  // Bring the target into view once, then follow it (the pretend app can move under it).
  useEffect(() => {
    setNudge(false);
    const root = rootRef.current;
    if (!root || !key) return;
    // Every part of the target in view (the last one too, e.g. date and time under the dentist).
    for (const k of key.split("|")) {
      root
        .querySelector(`[data-tour="${k}"]`)
        ?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }, [key, rootRef]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const root = rootRef.current;
      if (root) {
        const b = key ? measure(root, key.split("|")) : null;
        const prev = boxRef.current;
        const changed =
          (b === null) !== (prev === null) ||
          (b &&
            prev &&
            (Math.abs(b.top - prev.top) > 0.5 ||
              Math.abs(b.left - prev.left) > 0.5 ||
              Math.abs(b.width - prev.width) > 0.5 ||
              Math.abs(b.height - prev.height) > 0.5));
        if (changed) {
          boxRef.current = b;
          setBox(b);
        }
        const w = root.clientWidth;
        const h = root.clientHeight;
        setRootSize((s) => (s.w === w && s.h === h ? s : { w, h }));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key, rootRef]);

  // Hold back clicks that aren't on the target (or on this note).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const allowed = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-tour-card]")) return true;
      if (step.next || !key) return false;
      if (t && key.split("|").some((k) => t.closest(`[data-tour="${k}"]`))) return true;
      const b = boxRef.current;
      const r = root.getBoundingClientRect();
      if (b && "clientX" in e) {
        const x = (e as MouseEvent).clientX - r.left;
        const y = (e as MouseEvent).clientY - r.top;
        if (x >= b.left && x <= b.left + b.width && y >= b.top && y <= b.top + b.height)
          return true;
      }
      return false;
    };
    const guard = (e: Event) => {
      if (allowed(e)) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "pointerdown") setNudge(true);
    };
    const types = ["pointerdown", "mousedown", "click", "dblclick"];
    types.forEach((t) => root.addEventListener(t, guard, true));
    return () => types.forEach((t) => root.removeEventListener(t, guard, true));
  }, [key, step.next, rootRef]);

  // Where the note goes: left of the target if there's room, otherwise below (or above).
  const CARD_W = 320;
  let cardStyle: React.CSSProperties;
  if (!box) {
    cardStyle = {
      left: Math.max(16, rootSize.w / 2 - CARD_W / 2),
      top: Math.max(16, rootSize.h / 2 - 90),
    };
  } else if (box.left > CARD_W + 28) {
    cardStyle = {
      left: box.left - CARD_W - 16,
      top: Math.min(Math.max(12, box.top), Math.max(12, rootSize.h - 200)),
    };
  } else if (box.top + box.height + 190 < rootSize.h) {
    cardStyle = {
      left: Math.min(Math.max(12, box.left), Math.max(12, rootSize.w - CARD_W - 12)),
      top: box.top + box.height + 12,
    };
  } else {
    cardStyle = {
      left: Math.min(Math.max(12, box.left), Math.max(12, rootSize.w - CARD_W - 12)),
      top: Math.max(12, box.top - 190),
    };
  }

  return (
    <>
      {box && (
        <div
          className="pointer-events-none absolute z-[80] rounded-lg border-[3px] border-[#2563EB] transition-all duration-200"
          style={{
            top: box.top - 5,
            left: box.left - 5,
            width: box.width + 10,
            height: box.height + 10,
            boxShadow: "0 0 0 4px rgba(37,99,235,0.25), 0 0 0 9999px rgba(15,23,42,0.18)",
          }}
          aria-hidden
        />
      )}
      {!box && (
        <div
          className="pointer-events-none absolute inset-0 z-[80] bg-[rgba(15,23,42,0.18)]"
          aria-hidden
        />
      )}
      <div
        data-tour-card
        className="absolute z-[81] rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.18)]"
        style={{ ...cardStyle, width: CARD_W }}
        role="dialog"
        aria-label={step.title}
        aria-live="polite"
      >
        <p className="text-[12px] font-medium text-[#64748B]">
          Step {index + 1} of {total}
        </p>
        <p className="mt-1 text-[15px] font-semibold text-[#0F172A]">{step.title}</p>
        <p className="mt-1 text-[13.5px] leading-[1.5] text-[#334155]">{step.text}</p>
        {nudge && !step.next && (
          <p className="mt-2 text-[12.5px] font-medium text-[#B45309]">
            Click the part with the blue ring to carry on.
          </p>
        )}
        {step.next && (
          <button
            type="button"
            onClick={onNext}
            className="mt-3 h-9 rounded-lg bg-[#2563EB] px-4 text-[13px] font-semibold text-white hover:bg-[#1D4ED8]"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
