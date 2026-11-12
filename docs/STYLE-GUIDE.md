# DentDock website style guide

Set by the homepage rebuild (12 Nov 2026, Hariss's notes, Dentally used as inspiration with DentDock's own colours). Every new page follows this so the site reads as one product.

## 1. Words

- **DentDock**, one word, everywhere.
- UK spelling. No em dashes in site copy.
- Say **practice** / **practice team**, not "front desk" or "reception", when talking about who it helps.
- No small labels above sections (no "FEATURES", "SUPPORT" eyebrows). The heading does the job.
- Only true claims. Check the app before writing a feature line. Things staff do are written as staff actions ("offer the slot in a couple of clicks", "send your Google review link"), never as automatic.
- Main button text: **Join the waitlist** (until sign-up opens).
- Never imply a photo shows a customer: no names, no quotes on photos.
- Keep these as they are (Hariss): the "£150 to £250" pain card line; the compare pages' text.

## 2. Colours

| Use | Value |
|---|---|
| Brand blue (buttons, links, row headings, highlight words) | `#2563EB`, hover `#1D4ED8` |
| Light blue on dark | `#60A5FA` |
| Headings / strong text | `#0F172A` |
| Body text | `#334155`, secondary `#475569`, muted `#64748B` |
| Lines | `neutral-200` / `#DBEAFE` / `#E5EDFB` |
| Tinted section backgrounds | `#F7F9FF` → `#F1F5FE` (feature rows), `#EAF1FF` → `#F2F6FF` (support/switching) |
| Panel tints | `#EFF6FF`, `#E0EAFF`, `#DBEAFE`, `#EEF4FF` |
| Dark band (footer) | `#0F162B` |

Never leave two plain-white sections next to each other when one of them is a row of photos: give it a tint.

## 3. Type

- Page H1 (one per page): the homepage hero style, or `PageHero` on inner pages.
- Big centred section heading: `text-3xl md:text-5xl font-medium tracking-tight`, dark, with the key words in a blue `<span>`.
- Row heading (text beside a photo): `text-3xl md:text-[40px] font-semibold tracking-tight text-[#2563EB]`.
- Body: `text-[17px] leading-[1.6]` in `#334155`. Lead-in line ending in "with:" before bullets.
- Bullets: small dark dots (`Bullets` component), not ticks. Ticks only in pricing lists.

## 4. Layout

- Container `max-w-6xl mx-auto px-6`; sections `py-16 md:py-24`.
- **Photo rows**: two columns on large screens (`lg:grid-cols-2 gap-10 lg:gap-16`), text one side, photo panel the other, alternating left/right. Stack on phones (text first).
- **Photo panel** (`PhotoPanel` / `panelOnTint`): light rounded panel (`rounded-[28px]`, thin `#DBEAFE` ring, no shadow), photo inside `aspect-[4/3] object-cover rounded-2xl`, DentDock cards (`FloatCard`) on top.
- **FloatCards**: small white cards showing a real DentDock screen idea (booking times, medical history, waitlist, reminder sent, deposit paid, takings). Kept **off people's faces** (move the card or the photo framing). Positions: inside the panel on phones/tablets (`left-2 sm:left-3`, `top-4 sm:top-6`), hanging over the edge only from `lg:` (`lg:-left-6`, `lg:top-10`). On phones they shrink to 80% from their corner automatically. Absolutely placed cards are always in front (z-10).
- **Card grids** (e.g. problems/fixes): heading on the left, 2×2 tinted cards on the right; whole card is a link; hover = **blue border only** (no lift, no shadow).
- **Trust strip**: full width, grey lines top/bottom/between, four short facts each with a one-line detail, no icons.
- **Closing band**: contained blue gradient banner (`rounded-[32px]`) with the waitlist form (`WaitlistForm onDark`).
- Animations: fade/slide in once (`Reveal`). Nothing that moves on hover except colours and arrows.

## 5. Buttons and links

- Primary: solid blue, `rounded-xl`, "Join the waitlist →".
- Row buttons: outline **pill** (`pillButton`, `rounded-full`), e.g. "See all patient features".
- Text links: blue, `font-medium`, arrow "→" that slides on hover in cards.
- Link text says where it goes ("See payments and reports"), never "Read more".

## 6. Photos

- Real people, bright modern UK-looking settings, matched to the text beside them (patient booking → person on a phone; recalls → dentist with patient; support → developers in an office).
- Source: Unsplash, **free** photos only (not Unsplash+). Record each photo ID in a code comment.
- Save as WebP, 1400px wide, about 100 to 200 KB, in `public/images/<page>/`. Set `width`/`height` and `loading="lazy"`.
- Download with: `https://unsplash.com/photos/<ID>/download?w=1400` → swap `fm=jpg` for `fm=webp` and `q=85` for `q=65` in the redirect URL.

## 7. Every new page (SEO)

- One H1. `title` "Topic | DentDock …", a unique meta description, canonical URL, `og:` tags, BreadcrumbList JSON-LD.
- Server-rendered content (don't lazy-load sections with the main text).
- Add the page to `public/sitemap.xml` and `public/llms.txt` in the same PR.
- Link to it from the homepage body or footer, and from related pages.
- Waitlist forms only send `signup_form` = `hero` or `waitlist_page` (ops database constraint).

## 8. Checks before a PR

- `npx -p node@22 vite build` passes; prettier on new files.
- Look at it at laptop width, and at **390px and 820px** (phone/tablet) with no sideways scroll. The browser window can't go that narrow, so use puppeteer-core with installed Chrome (`setViewport({ width: 390 })`) and compare `innerWidth` with `scrollWidth`.
- Every claim checked against the app; nothing patient-facing changed.

## 9. Shared pieces

Live in `src/components/home/HomeSections.tsx` today (`FloatCard`, `Reveal`, `Bullets`, `PhotoPanel`, `pillButton`, `TrustStrip`, `ClosingBand`, …) plus `src/components/site/PageShell.tsx` and `PageHero.tsx`. When a second page needs them, move the shared ones to `src/components/site/` first (move only, no visual change), then build the page.
