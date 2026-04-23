

## Make "Paperless from day one." match "Patients manage themselves." style

The "Paperless from day one." cell currently uses the default vertical layout with a narrow phone-shaped form mockup. The user wants the same overall bento layout (it stays a 3-col cell, icon + title on the left), but the visual on the right should be a **wide** browser/desktop-style mockup that **bleeds off** the card edge — exactly like the Portal screenshot in the "Patients manage themselves." cell.

### Changes (single file: `src/components/home/BentoGrid.tsx`)

**1. Replace `FormVisual` with a new wide `FormsVisual`**

A wide white "card" mockup styled like `PortalVisual`:
- Same outer wrapper: `w-full h-full relative` with the soft drop-shadow filter.
- Inner: `bg-white rounded-lg border border-neutral-200 p-5 overflow-hidden`.
- Content represents a digital medical-history form filled in by a patient:
  - Header row: "Medical history form" title + "Sarah Mitchell" subtext on the left, a green "Signed" pill on the right.
  - Progress bar showing 100% complete.
  - A 2-column grid of completed fields (Allergies → "Penicillin", Medications → "None", Conditions → "None", Pregnant? → "No"), each rendered as a small `bg-[#F3F6FD]` card with label + value, so the screenshot reads as wide and content-rich.
  - A signature block at the bottom with a script-style signature line and a date.
  - A faint "Submitted 14 Apr 2026" footer.

This mirrors `PortalVisual`'s visual density and aspect ratio so it looks like a real software screenshot, not a phone.

**2. Update the cell config** for the "Paperless from day one." entry:
- Change `span` to keep `md:col-span-3 md:row-span-1` (same width as today).
- Add `layout: "side" as const`.
- Add `popOut: true`.
- Add `titleClass: "max-w-[140px]"` so "Paperless from day one." breaks into two lines like "Know your numbers." does.
- Add `popOutClass: "absolute -right-2 left-[30%] top-[5%] pointer-events-none"` — same positioning recipe used by the Analytics cell so the wide screenshot sits to the right of the title and clips off the bottom/right edge of the card.

**3. Remove the now-unused `FormVisual`** (or keep it if simpler; final pass will delete it to avoid dead code).

No other cells, no global layout, and no styles outside this file change.

### Result

The "Paperless from day one." cell will look structurally identical to the Portal cell:
- Icon + two-line title pinned to the left.
- A wide, software-style screenshot of a completed digital form on the right, slightly clipped by the card's edges, giving the same "peeking into the product" feel as "Patients manage themselves."

