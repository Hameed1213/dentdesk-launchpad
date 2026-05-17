## Plan: "Ready on day one" visual

Add a second product-screenshot-style visual for Block 2 ("Ready on day one") in the "What £49 a month actually looks like." section on `/compare/dentally`. Match the visual language of `LiveInADayVisual`: navy `#1a1f2e` canvas, two brand-blue radial orbs, a white card sitting inset on top, a green "LIVE NOW"-style pop-out toast in the top-right corner, same Inter typography and brand-blue `#2445ea` accents.

## What the visual shows

A miniature snapshot of the Dent Dock **Automations / Settings** panel — the metaphor: "all the automations are already turned on the moment you sign up."

White inset card contains:

- Small heading (foreground, 13px/16px responsive, bold): "Automations"
- Sub-text (muted #94A3B8, 11px): "Running on your account by default"
- A list of 4 automation rows, each with:
  - Left: small icon in a brand-blue-tinted square (16px) — Bell / Calendar / MessageSquare / FileText
  - Middle: row title (foreground, 12px, 600) + tiny description (muted, 10px)
  - Right: a small toggle pill rendered in the ON state (brand-blue `#2445ea` background, white knob on the right)

Rows:
1. **Booking confirmations** — "Sent the moment a slot is booked"
2. **Appointment reminders** — "24 h and 1 h before the visit"
3. **Recall sequences** — "Bring patients back at 6 and 12 months"
4. **New-patient forms** — "Medical history collected before arrival"

Pop-out toast (top-right, +3deg rotation, hidden on phone — matching the Live-in-a-day pattern):
- Green check badge
- "ALL ACTIVE" label (green, uppercase, tracked)
- "4 automations running" headline
- Small muted sub-text: "Since you signed up"

## Responsive behaviour (mirrors Live in a Day)

- On mobile: hide the pop-out toast, hide rows 3 and 4 so the card stays readable, shrink heading from 16px → 13px.
- Tighter side inset on mobile (`inset-x-[5%]`) → wider on desktop (`sm:inset-x-[10%]`).

## Implementation

In `src/routes/compare.dentally.tsx`:

1. Add `Bell`, `Calendar`, `MessageSquare`, `FileText` to the existing `lucide-react` import.
2. Add `visual: "ready-on-day-one" as const` to the second `whyBlocks` entry.
3. Create a new `ReadyOnDayOneVisual` component, structurally identical to `LiveInADayVisual` (same outer container, orbs, inset wrapper, pop-out shell) but with the automations content described above.
4. Extend the `visual` type union on `WhyDentDockBlock` to `"live-in-a-day" | "ready-on-day-one"` and add a second conditional branch that renders `<ReadyOnDayOneVisual />`.

No other files change. No new dependencies. Static composition, no animation, same design tokens.
