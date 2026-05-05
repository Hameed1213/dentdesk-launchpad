## Problem

On mobile, clicking Features / Pricing / FAQ in the header or footer menu scrolls those sections to the very top of the viewport. Because the navbar is `position: fixed`, the section title ends up tucked right under (and partly behind) the navbar with no breathing room.

The scroll is triggered by `el.scrollIntoView({ block: "start" })` in `Navbar.tsx` and `Footer.tsx`, which scrolls the element flush to the top — it doesn't know about the fixed header.

## Fix

Use the standard CSS `scroll-margin-top` mechanism. It applies to `scrollIntoView()` and to native hash navigation (e.g. landing on `/#pricing` from another page), so it covers both the header menu, the footer menu, and direct URL hits — no JS changes needed.

### Change

In `src/styles.css`, add a small rule targeting the three landing-page section anchors:

```css
#about,
#pricing,
#faq {
  scroll-margin-top: 88px; /* mobile: clears the fixed navbar + a bit of breathing room */
}

@media (min-width: 1024px) {
  #about,
  #pricing,
  #faq {
    scroll-margin-top: 96px; /* desktop navbar is slightly taller when not scrolled */
  }
}
```

That's the only change. No edits to `Navbar.tsx`, `Footer.tsx`, or any section component.

## Why this approach

- One small, scoped CSS rule — no JS offset math, no per-link special casing.
- Works for both the smooth-scroll path (header/footer click handlers) and for arriving at `/#pricing` from another route.
- Easy to tune later by changing the pixel value in one place.