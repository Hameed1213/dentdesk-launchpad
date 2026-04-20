
## DentDesk — Hero + Navbar

Building only the navbar and hero section for the DentDesk marketing homepage. Light theme, professional dental practice management SaaS aesthetic with brand blue `#2563EB`.

### What gets built

**1. Dependencies**
- `framer-motion`, `lucide-react`, `@radix-ui/react-slot`, `class-variance-authority`

**2. Animation primitives** (`src/components/ui/`)
- `animated-group.tsx` — staggered children entrance animations (framer-motion variants, blur+slide presets)
- `text-effect.tsx` — per-character/word text reveal animation

**3. Navbar** (`src/components/home/Navbar.tsx`)
- Sticky, two visual states based on `scrollY > 50`
  - Top: transparent, full-width
  - Scrolled: floating pill — `bg-white/80 backdrop-blur-lg`, rounded, shadow, centred max-w-4xl
- Left: inline SVG tooth-arc logo + "DentDesk" wordmark (Inter 800, blue)
- Centre (lg+): Features · Pricing · About · How it works
- Right: "Log in" link + "Start free trial →" primary button
- Mobile: hamburger toggle, slide-down drawer with stacked links + CTAs
- External CTAs → `https://app.dentdock.co.uk/signup` and `https://app.dentdock.co.uk`

**4. Hero** (`src/components/home/HeroSection.tsx`)

Centered column on `bg-white`, `min-h-screen`, padded. All entrance animation via `AnimatedGroup` with cascading delays (0.0 → 0.65s).

- **Announcement pill** — "✦ Launching 2025 — Free migration from Dentally & EXACT" with divider + animated double-arrow that slides on hover (clip-overflow trick)
- **H1** — "Practice management software that actually makes sense." (last 2 words in blue), Inter 800, large fluid sizing, tight tracking
- **Subheadline** — neutral-500, max-w-2xl
- **CTA row** — primary "Start your free trial" (wrapped in subtle bezel `bg-neutral-900/10 p-0.5` frame) + ghost "Watch 2-min demo"
- **Trust strip** — 4 items separated by tiny dots: No credit card · 30-day trial · UK data residency · GDPR
- **Social proof** — 5 amber stars + italic quote from Dr Sarah Okafor

**5. Dashboard mockup** (inside Hero, item 7)
Pure CSS/HTML, no images:
- Browser chrome: traffic-light dots + faux URL bar showing `app.dentdock.co.uk/calendar`
- Dark left rail with 5 lucide icons (CalendarDays active in blue, then Users, CreditCard, RefreshCw, FileText)
- Header: "Wednesday, 15 April" + "8 appointments · 2 slots free"
- 3-stat row: £1,240 (green) · 8/10 (blue) · 7 confirmed (neutral)
- 4 appointment rows: James Thompson (blue), Maria Lombardi (green), Free slot (dashed), Robert Keane (purple)
- **Scroll-tilt effect**: starts at `rotateX(18deg)`, eases to `0deg` as it enters viewport (scroll listener on `#dashboard-preview`)
- Top fade-out gradient overlay for cinematic merge into white

**6. Decorative background**
Behind everything in hero, `pointer-events-none -z-10`:
- Two large soft blue radial gradients (top-left + top-right)
- Faint dot grid pattern (28px spacing, 2.5% opacity)

**7. Wire-up**
Replace placeholder content in `src/routes/index.tsx` to render `<Navbar />` + `<HeroSection />`. Update route `head()` with DentDesk-specific title/description/OG tags.

### Stops here
No features section, pricing, footer, or other content. Will pause for your confirmation before continuing.
