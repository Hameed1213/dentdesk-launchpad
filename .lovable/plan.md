

## Redesign Pricing section to match reference

I'll rebuild `src/components/home/PricingCTA.tsx` to mirror the screenshot: a centered header, then a two-column layout with **stacked selectable plan cards on the left** and a **single "Includes" card on the right**.

### Layout

```text
                    ┌─────────┐
                    │ Pricing │      <- small pill
                    └─────────┘

           Simple pricing for every practice    <- big H2 (Inter medium, tight)

      One plan today, more coming as DentDock grows.
        Start with a 30-day free trial — no card needed.

  ┌────────────────────────────────┐   ┌────────────────────────────────┐
  │ ◯  Solo                        │   │ Includes:                       │
  │    Coming soon         £29/mo  │   │                                 │
  ├────────────────────────────────┤   │  Unlimited dentists & staff  ✓  │
  │ ◉  Practice  ★ Most popular   │   │  Online booking & scheduling ✓  │
  │    Save 20%            £49/mo  │   │  Patient records & notes     ✓  │
  ├────────────────────────────────┤   │  Automated reminders & recall✓  │
  │ ◯  Multi-site                  │   │  Payments, deposits & forms  ✓  │
  │    Coming soon         £99/mo  │   │  SMS reminders included      ✓  │
  ├────────────────────────────────┤   │  Custom forms                ✓  │
  │ ◯  Enterprise                  │   │  30-day free trial           ✓  │
  │    Talk to us         Custom   │   │                                 │
  └────────────────────────────────┘   └────────────────────────────────┘

   ┌──────────────┐                    ◉ Billed monthly · cancel anytime
   │ Start trial →│
   └──────────────┘
```

### Plan card details (left column)

Four stacked cards, each in its own rounded `border border-neutral-200 bg-white` row, vertical gap ~12px:

| Plan | State | Price | Note |
|---|---|---|---|
| Solo | unselected | £29/month | "Coming soon" pill |
| **Practice** | **selected (filled `#2563EB`, white text)** | £49/month | "Most popular" pill |
| Multi-site | unselected | £99/month | "Coming soon" pill |
| Enterprise | unselected | Custom | "Talk to us" pill |

- Each row: radio-style circle on the left (filled white check on the selected card, hollow on others), plan name + small note pill stacked, price right-aligned in `text-2xl font-medium`.
- Selected card uses `bg-[#2563EB] text-white` with subtle inner shadow; pill becomes `bg-white/20 text-white`.
- Only the Practice card is interactive for now (others marked `aria-disabled`, muted look). Selection is purely visual — no toggling logic needed since one plan is live.

### Includes card (right column)

- Same `rounded-2xl border border-neutral-200 bg-white p-8` container as the left stack's outer height.
- Heading: "Includes:" in `text-[15px] font-semibold text-foreground`, small bottom border separator.
- Features list: same items already in the file, each row = label on the left, blue `Check` icon on the right (matching screenshot's right-aligned checks), divided by a faint `divide-y divide-neutral-100`.

### Footer row (below the two columns)

- Left: primary CTA `Start free trial →` (existing button styles, `#2563EB`).
- Right: small toggle-style indicator `● Billed monthly · cancel anytime` (purely decorative — visual nod to the "Renewed at..." pill in the reference, no real toggle since there's only one plan).

### Section header

- Centered "Pricing" pill: `inline-flex px-3 py-1 rounded-full bg-neutral-100 text-[12px] text-foreground/70`.
- H2: `text-4xl md:text-5xl font-medium tracking-tight` — "Simple pricing for every practice."
- Subtitle: muted-foreground, max-w-xl, centered.

### Files touched

- `src/components/home/PricingCTA.tsx` — full rewrite of the card body. No new dependencies (Check, ArrowRight already imported; will add `Circle` / `CheckCircle2` from lucide-react for the radio dots).
- No other files change.

### Out of scope

- No real plan switching / billing-period toggle logic (single live plan).
- No copy changes to the £49 price or feature list.
- No changes to BentoGrid, FAQ, routes, or section order.

