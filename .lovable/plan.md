

## Match the portal style across all bento visuals

Right now I wrapped the other software mockups in a grey outer frame, but each mockup is itself one big white panel — so the result is "white box inside grey frame" (your screenshots 2–4), not the portal's "grey panel with white sub-cards floating on it" (screenshot 1).

I'll fix this by changing each visual's own background to grey and converting its inner sections into individual white cards, matching the portal pattern exactly.

### Changes to `src/components/home/BentoGrid.tsx`

**1. Remove the grey wrapper I added**
In the standard (non-side) layout branch, drop the grey `bg-[#f5f6fb] p-3 border` wrapper around `cell.visual` and render `{cell.visual}` directly inside `mt-6 flex-1 flex items-end`. Each visual will now own its background.

**2. Update each visual's outer container** — change from `bg-white/80 backdrop-blur-md border border-white shadow-sm` to `bg-[#f5f6fb] border border-neutral-200` with the soft drop-shadow filter (matching PortalVisual).

**3. Convert inner sections to white cards** for each visual:

- **PatientRecordVisual** — split into stacked white cards on grey:
  - Card 1: header (avatar + name + Active badge)
  - Card 2: Last visit / Next appt grid
  - Card 3: Appointment history list
  - Each card: `bg-white border border-[#e2e8f0] rounded-lg p-2.5`

- **AnalyticsVisual** — replace the inner `bg-[#2563EB]/5` tinted boxes with `bg-white border border-[#e2e8f0]` cards:
  - Two white KPI cards (Revenue, Bookings) on grey
  - One white chart card containing the SVG line chart

- **StaffVisual** — wrap the team list in a single white card on the grey panel (matches your screenshot 3 where the staff list is one rounded white container on grey).

- **SmsVisual** — convert into a white "conversation" card sitting on grey (matches screenshot 4):
  - White card with header (avatar, Smile Dental, SMS · Today 09:00, message icon)
  - The message bubble below stays as-is

- **FormVisual** — keep the phone-frame mockup as-is (it's already a device frame, not a flat panel — leaves it consistent with how a phone naturally looks against grey).

### Result
All bento visuals will share the portal's signature look: a soft grey `#f5f6fb` panel with crisp white sub-cards (`#e2e8f0` borders) floating on top — matching screenshot 1 exactly.

