
## Fix SMS Bento Card Height Jump on Tablet

**Problem**: The "Every patient message in one inbox" SMS bento card changes height during its animation on tablet view. Messages appear/animate in, causing the card to grow/shrink as content loads.

**Goal**: Lock the card's visual area to the height of the animation's **starting state** so it stays constant throughout the animation cycle. Tablet only — desktop and mobile unchanged.

### Approach

1. Inspect `BentoGrid.tsx` to locate the SMS/inbox cell's visual component and identify which element animates (likely a list of messages with staggered enter/exit).
2. Measure or determine the starting-state height of the message stack (the height when the animation first begins, before any messages enter).
3. Apply a fixed `md:h-[Xpx]` (tablet-only) min-height/height constraint on the visual wrapper inside the SMS cell, with `overflow-hidden` so animated messages don't push the container.
4. Leave `lg:` (desktop) and base (mobile) sizing untouched.

### Files to change
- `src/components/home/BentoGrid.tsx` — add a tablet-only fixed height to the SMS card's visual wrapper.

### Notes
- No content, copy, or desktop layout changes.
- Will verify by checking the rendered card at 768px viewport after the fix.
