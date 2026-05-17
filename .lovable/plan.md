## /compare hub page

Create a new route at **`/compare`** that acts as a landing page listing every comparison Dent Dock has published. For now it shows one card — Dentally — and is built so more cards can drop in later without restructuring.

### Page structure

Reuse the existing visual language from `/compare/dentally` (Navbar at top, Footer + WhatsApp button at bottom, white background, blue accents).

1. **Navbar** (existing component)
2. **Hero**
   - Eyebrow: `COMPARE`
   - H1: `Dent Dock vs the alternatives`
   - Sub: One sentence: "Honest side-by-side comparisons against the major UK dental practice software, written for private practices choosing what to switch to."
3. **Comparison cards grid**
   - Single column on mobile, 2-up from `md:`, 3-up from `lg:` so it scales as more comparisons are added.
   - Each card: competitor logo/wordmark area at top, "Dent Dock vs **Dentally**" headline, one-line summary ("£49/mo flat vs £220+/mo. Built for private practices going cloud-first."), and a "See comparison →" CTA covering the whole card.
   - Cards use the same rounded-2xl + soft shadow + hover lift treatment used elsewhere on the site for consistency.
   - Today: **1 card (Dentally)** linking to `/compare/dentally`.
4. **Bottom CTA strip** — same "Want to see more, or just have a chat?" pattern that already exists on `/compare/dentally`, with WhatsApp + Waitlist buttons. Keeps the page from ending cold when only one comparison exists.
5. **Footer** + floating **WhatsApp button** (existing components)

### SEO / head metadata

Set per-route `head()` with:
- `title`: `Compare Dent Dock · Honest comparisons vs other UK dental software`
- `description`: One sentence about the hub.
- `og:title`, `og:description`, `og:url` (`https://dentdock.co.uk/compare`)
- `<link rel="canonical">` to the same URL.
- No JSON-LD needed on the hub (the individual comparison pages own that).

### Navigation entry points

- **Navbar** (`src/components/home/Navbar.tsx`): add `{ label: "Compare", href: "/compare" }` to `navLinks`. Render it as a real `<Link to="/compare">` (not the smooth-scroll `<a>`) so it routes properly from any page. Show in both the desktop nav row and the mobile menu.
- **Footer** (`src/components/home/Footer.tsx`): add `Compare` to the Product column alongside Features / Pricing / FAQ, as an internal route link.

### Files

- **New**: `src/routes/compare.index.tsx` → URL `/compare`
- **Edit**: `src/components/home/Navbar.tsx` (add nav link, desktop + mobile)
- **Edit**: `src/components/home/Footer.tsx` (add to product column)
- `routeTree.gen.ts` regenerates automatically — don't touch it.

### What stays unchanged

- `/compare/dentally` page content
- Existing Navbar / Footer behaviour for other links
- Site styling tokens
