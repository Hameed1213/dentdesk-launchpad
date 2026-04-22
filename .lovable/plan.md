
## Stacked Toast Notifications

Restyle the "Most practices are overpaying" preview so toasts stack on top of each other (like the iOS notification stack in the reference), instead of one replacing another.

### Behaviour
- A new toast slides in from the bottom every ~2.5s.
- Previously shown toasts stay visible and shift upward + scale down slightly, creating a layered stack (newest in front, oldest behind).
- Once 3 toasts are stacked, the whole stack fades out and the loop restarts — giving a continuous "money keeps coming out" feel.

### Visual stack
```text
┌──────────────────────────┐  ← oldest, smallest, most faded
│  ┌────────────────────┐  │
│  │  ┌──────────────┐  │  │  ← newest, full size, in front
│  │  │ BARCLAYS  now│  │  │
│  │  │ −£120         │  │  │
└──┴──┴──────────────┴──┴──┘
```

### Technical changes

**`src/styles.css`**
- Remove `toast-cycle` keyframes (single-toast swap).
- Add 3 new keyframe sets, one per stack position:
  - `toast-stack-1` (front): slides up from below, stays at `translateY(0) scale(1)`, fades out at end.
  - `toast-stack-2` (middle): starts at front position, then shifts to `translateY(-14px) scale(0.94)` with reduced opacity when toast 2 arrives.
  - `toast-stack-3` (back): goes through front → middle → back (`translateY(-26px) scale(0.88)`, more faded), then exits.
- All three share the same total duration (~9s) so they loop in sync.

**`src/components/home/FeaturesSection.tsx` — `PricePreview`**
- Keep the 3 charges array.
- Replace `animate-toast-cycle` + `animationDelay` with per-index animation classes (`animate-toast-stack-1/2/3`).
- Use `bottom-4` anchor so stack grows upward.
- Add `transform-gpu` and `will-change-transform` for smoother motion.
- Keep `min-h-[168px]` on the container so card height stays aligned with the others.

No other components or files are affected.
