## Goal

On mobile (the horizontally scrolling tab strip in `ProductShowcase`), when the user taps a tab, that tab should move to the first position on the left, with the remaining tabs following in their original order. On tablet/desktop (`sm:` and above) nothing changes — tabs stay in their fixed grouped pill.

## Current Behaviour

In `src/components/home/ProductShowcase.tsx`:
- `tabs`, `tabIcons`, `tabDescriptions`, `tabUrls` are parallel arrays indexed 0–4.
- `activeTab` is the active index.
- On mobile, the active tab is auto-centered via `container.scrollTo` (lines 1079–1089).
- All tabs render in fixed order via `tabs.map((tab, i) => ...)` (line 1173).

## Change

1. Build a mobile-only display order where the active tab comes first, followed by the others in their original order. Example: if `activeTab = 3`, mobile order = `[3, 0, 1, 2, 4]`. Desktop order stays `[0, 1, 2, 3, 4]`.
2. Render the tab list using this order. Use a `useIsMobile`-style check (or a CSS-driven approach) so only the mobile view reorders.
3. Remove the horizontal auto-scroll-to-center effect on mobile (it's no longer needed since the active tab is always first). Keep behaviour intact on desktop.
4. Keep the data arrays (`tabs`, `tabIcons`, `tabDescriptions`, `tabUrls`, `mockups`, `tabContent`) unchanged — only the render order changes. Active state, content, mockup, URL all continue to be looked up by the original index `i`.

## Technical Details

- Use the existing `useIsMobile` hook from `src/hooks/use-mobile.tsx` to detect mobile (`< sm` breakpoint).
- Compute `displayOrder`:
  - Mobile: `[activeTab, ...tabs.map((_,i)=>i).filter(i => i !== activeTab)]`
  - Desktop: `[0, 1, 2, 3, 4]`
- In the `.map`, iterate over `displayOrder` and look up `tabs[i]`, `tabIcons[i]`, etc., by the original index.
- Remove (or gate to desktop-only) the `useEffect` that calls `container.scrollTo` to auto-center, since on mobile the active tab will already be at the left edge. Keep `tabRefs` if needed only for desktop; otherwise remove.
- Auto-advance interval (`setInterval` cycling through tabs every 35s) stays unchanged.

## Files to Edit

- `src/components/home/ProductShowcase.tsx` — only this file.

## Out of Scope

- No changes to tab content, icons, copy, styling, colors, animations, or desktop layout.
- No changes to other components.
