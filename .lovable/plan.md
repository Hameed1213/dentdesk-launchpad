

## Match "Know your numbers." card to the "Patients manage themselves." layout

Two adjustments to the Analytics cell in `src/components/home/BentoGrid.tsx`:

### 1. Image position — center-bottom, slightly cut off
Today both `popOut` cards share the same offset (`left-[32%] -top-[4%]`). On the wider 4-col Portal card this looks centered and bleeds off the bottom; on the narrower 3-col Analytics card it looks shoved up and to the right.

Fix by giving the Analytics card its own popOut positioning:
- Horizontally center the image inside the right-hand area (instead of left-aligning it at 32%).
- Push it **down** so the bottom is clipped by the card edge, matching the Portal visual.

Implementation: render the popOut wrapper conditionally. For the Analytics cell use:
```
absolute right-4 left-[38%] top-[18%] pointer-events-none
```
(Portal keeps its current `left-[32%] -top-[4%]`.)

The simplest way is to add an optional `popOutClass` field on the cell config and fall back to the current Portal positioning when it isn't set.

### 2. Title on two lines
Tighten the title's max width on the Analytics card so "Know your numbers." breaks naturally into two lines:
- Add `max-w-[140px]` (or similar) to the `<h3>` for the Analytics cell only, via an optional `titleClass` field on the cell config.

### Files
- `src/components/home/BentoGrid.tsx` — add `popOutClass` and `titleClass` optional fields, apply them in the `cell.layout === "side"` branch, and set them on the `TrendingUp` (Know your numbers) cell entry.

No other components or styles change.

