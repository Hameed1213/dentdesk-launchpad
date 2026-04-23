
Stretch the Custom Forms mockup to match the Analytics card height on tablet, without touching other cells.

Steps:
1. Inspect `FormsVisual` (and the analytics card pattern) to confirm current sizing.
2. Add `md:h-full md:flex md:flex-col` to the FormsVisual root, and `md:flex-1` to the inner white card so it stretches.
3. Tablet only — no desktop or mobile changes.

File: `src/components/home/BentoGrid.tsx`
