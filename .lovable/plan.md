

## Current state — "Your software is working against you" cards

**What's there now:**
- 3 plain white cards on a white section background (`bg-card` on `bg-background`)
- Thin gray border, no shadow, no depth
- Small blue icon top-left, headline, body text, then a nested mini-preview card at the bottom
- The nested previews already animate (bars, typing dots, fade-ups), but the outer card is static and visually flat
- Cards feel like documents, not like a product — nothing draws the eye, nothing differentiates the three "problems"

**Why it feels dull:**
1. White-on-white = zero contrast or visual rhythm
2. Every card looks identical — no thematic color tying each problem to its preview
3. No hover state, no depth, no motion at the card level
4. The icon is tiny and lost in the corner
5. The nested preview is the most interesting thing on the card but it's buried

---

## Proposed direction

Pick **one** of these three styling directions. I'd recommend **Option A** as it matches the clean, modern aesthetic of the rest of the page while adding personality.

### Option A — Themed cards with subtle gradient + glow (recommended)
Each card gets a **distinct accent color** tied to its problem (so the eye reads them as three different pains, not three identical boxes):

- Card 1 "Overpaying" → **rose/red** accent (already used in preview)
- Card 2 "On your own" → **amber** accent (already used in preview)
- Card 3 "Software's job" → **orange** accent (already used in preview)

Per card:
- Soft gradient background: from white → very faint accent tint at top-right
- A larger icon in a **rounded square chip** with accent-tinted background and accent-colored icon (instead of a tiny floating icon)
- Subtle accent-colored top border (2px) OR a soft accent glow behind the card
- Soft drop shadow (`shadow-sm` → `shadow-lg` on hover)
- Hover: card lifts (`-translate-y-1`), shadow grows, accent glow intensifies
- Section background switches to a very light gray (`bg-muted/30`) so the white cards pop instead of blending in

### Option B — Dark cards on light section (high contrast)
- Section stays light, cards become **near-black** (`bg-neutral-950`) with white text
- Accent color used for icon chip and preview accents
- Nested preview stays light/white — creating a "card within a card" depth effect
- Bold, editorial feel — more aggressive, more "anti-status-quo" messaging

### Option C — Bento-style asymmetric layout
- Break the equal 3-column grid into a 2-column bento (one large card + two stacked smaller ones, or 1+2 layout)
- First card (overpaying) gets more visual weight since it's the strongest pain point
- Each card still gets the themed accent treatment from Option A
- More magazine-like, more memorable, but bigger structural change

---

## Additional polish (applies to any option)

1. **Section heading** — add a small eyebrow label above the H2 (e.g. "THE PROBLEM" in small caps, accent color) to frame the section
2. **Icon treatment** — wrap the Lucide icon in a `w-11 h-11` rounded square with tinted background, increase icon size to `w-5 h-5` with `strokeWidth={2}`
3. **Card entrance animation** — staggered fade-up on scroll (each card delays 100ms after the previous)
4. **Hover micro-interaction** — on card hover, the inner preview's bar/animation re-triggers (subtle but delightful)
5. **Section background** — light gray (`bg-muted/30`) or a very faint dotted/grid pattern so the cards have somewhere to "sit"

---

## Technical notes (for implementation)

- All changes scoped to `src/components/home/FeaturesSection.tsx`
- Add a `theme` field to each `problems[]` entry: `{ accent: "rose" | "amber" | "orange", iconBg, border, glow }` to drive the accent treatment from data
- Use Tailwind arbitrary values for accent tints (e.g. `bg-rose-50/60`, `ring-rose-200/50`) — no new tokens needed in `styles.css`
- Add a `group` class to each `<Card>` and use `group-hover:` for the lift + glow + shadow transitions
- Use `transition-all duration-300 ease-out` for smooth hover
- For the staggered scroll-in, use the existing `animate-fade-in` from `tw-animate-css` with inline `animationDelay`
- No new dependencies, no changes to other sections

**Pick A, B, or C and I'll implement it.**

