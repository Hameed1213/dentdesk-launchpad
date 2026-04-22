

## Goal

Right now the dashboard mockup is **completely hidden** on tablet and phone (`hidden md:block`). I'll make it responsive so tablet/mobile users see a meaningful, native-feeling preview — matching the real app screenshots you shared (tablet = condensed dashboard, phone = single-column with bottom tab bar).

## Approach

Use a **breakpoint-based component swap** rather than trying to scale one layout. The desktop dashboard is genuinely a different UI from the tablet/mobile version of your real app — squeezing the desktop layout down to 375px would just look broken (text wrapping, cramped sidebar, tiny fonts). Three tailored variants matching what your actual product looks like at each size.

```text
Mobile (<768px)        Tablet (768-1024px)      Desktop (>1024px)
┌──────────────┐       ┌────────────────────┐   ┌──────────────────────┐
│ ☰  Dent Dock │       │ Dent Dock    🔍 🔔 │   │ [icons] Dashboard    │
├──────────────┤       ├────────────────────┤   │ [bar  ] [4 stat]    │
│ Good after.. │       │ Good afternoon...  │   │ [side ] [cards ]    │
│ ┌─2x2 stat─┐ │       │ ┌─2x2 stat cards─┐│   │         [schedule]  │
│ │  │  │  │ │ │       │ │   │   │   │   ││   │                      │
│ ├──┼──┤    │ │       │ └────────────────┘│   │                      │
│ │  │  │    │ │       │ Today's Schedule  │   │                      │
│ └──────────┘ │       │ [rows...]         │   │                      │
│ Schedule     │       └────────────────────┘   └──────────────────────┘
│ [tab bar   ] │       (no scroll-tilt anim,    (scroll-tilt anim
└──────────────┘        static framed mockup)   ContainerScroll)
(static, no anim)
```

## Changes

### 1. Refactor `DashboardAnimation.tsx`

- Extract the dashboard content (sidebar + topbar + stats grid + schedule) into `DashboardMockup` (already done) and split the **stat cards array + schedule rows + count-up animation logic** into a shared hook `useDashboardCounters()` so all three variants share the animated numbers.
- Export three layout components:
  - `DesktopDashboard` — current desktop layout, wrapped in `ContainerScroll` (unchanged behaviour).
  - `TabletDashboard` — condensed: no sidebar, top bar with logo + search icon + bell + avatar, **2×2 stat grid**, schedule list below. Static frame (no scroll tilt — the tilt feels excessive on smaller screens and the negative margin overlap doesn't make sense without the desktop hero spacing).
  - `MobileDashboard` — phone frame (rounded device bezel like the desktop one but narrower, ~360px wide centered): top bar with logo + bell + avatar, greeting, **2×2 stat grid** matching screenshot 2, "Today's Schedule" card, and a fixed bottom tab bar (Dashboard / Calendar / Patients / Inbox / More) matching the real app.
- Use Tailwind responsive visibility instead of `useIsMobile()` (avoids hydration flicker): `hidden lg:block` for desktop, `hidden md:block lg:hidden` for tablet, `block md:hidden` for mobile.
- Remove the `marginTop: "-206px"` overlap on tablet/mobile (it only makes sense paired with the desktop ContainerScroll). Replace with normal top spacing (`mt-12`).
- Keep `pointer-events-none` so the email input above stays clickable through any overlap zone.

### 2. Tighten `HeroSection.tsx` spacing for small screens

- The hero currently uses `pt-40 md:pt-48`. That's fine. The dashboard section will simply flow naturally below on tablet/mobile instead of overlapping.
- No change to the H1, form, or trust strip — they're already responsive.

### 3. Visual specs for the new variants

**Tablet variant** (matches screenshot 1 condensed):
- Container: `max-w-2xl mx-auto` with the same `border-4 border-[#6C6C6C] bg-[#222222] rounded-[30px]` device frame.
- Inner height: ~520px. No tilt animation, just a fade-in on scroll.
- Stat grid: `grid-cols-2 gap-3`, smaller stat numbers (`text-[28px]` instead of `text-[40px]`).
- Schedule shows 3 rows.

**Mobile variant** (matches screenshot 2):
- Container: `max-w-[360px] mx-auto` with same device frame.
- Inner height: ~640px (taller, phone aspect).
- Top bar: `Dent Dock` logo + bell (with `11` badge) + avatar.
- Greeting wraps to 2 lines.
- Stat grid: `grid-cols-2 gap-2`, compact cards with `text-[24px]` numbers.
- Bottom tab bar fixed inside the frame: 5 icons (LayoutDashboard, Calendar, Users, MessageSquare, Menu) with labels, Dashboard active in blue.
- Optional small floating "Sparkles" pill bottom-right (matches screenshot).

### 4. Keep counter animations everywhere

All three variants use the same animated counters (TODAY → 12, REVENUE → £840, CAPACITY → 78%) so the mockup feels alive on every device.

## Files Touched

- `src/components/home/DashboardAnimation.tsx` — major refactor: extract counter hook, add `TabletDashboard` + `MobileDashboard` components, swap by breakpoint.

## Out of Scope

- Real device-frame chrome (status bar, notch) — stays clean abstract frame.
- Tablet landscape vs portrait — single layout for the whole `md`–`lg` range.
- Reduced-motion preference handling for the counters (existing behaviour preserved).

