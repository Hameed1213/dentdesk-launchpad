import { createContext, useContext, type ReactNode } from "react";
import { WaitlistForm } from "@/components/home/HeroSection";

/* Shared building blocks for every marketing page (see docs/STYLE-GUIDE.md). */

export const WHATSAPP = "https://wa.me/447404488089";
export const ENTRANCE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

/** Outline pill, like the "See all … features" buttons on Dentally's rows. */
export const pillButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#2563EB] px-6 py-3 text-[15px] font-medium text-[#2563EB] transition-colors hover:bg-[#2563EB] hover:text-white";

/** Floating white card used on the pastel panels. z-10 keeps the absolutely placed ones in front. */
export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1d4ed8]";
export const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#2563EB] px-6 py-3 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]";

/** Phones: cards shrink a little, anchored to the corner they sit in, so they cover less of the photo. */
function phoneScale(className: string) {
  const left = className.includes("left-2");
  const right = className.includes("right-2");
  const top = className.includes("top-4");
  const bottom = className.includes("bottom-4");
  if (top && left) return "origin-top-left";
  if (top && right) return "origin-top-right";
  if (bottom && left) return "origin-bottom-left";
  if (bottom && right) return "origin-bottom-right";
  if (left) return "origin-left";
  if (right) return "origin-right";
  return "origin-center";
}

export function FloatCard({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`z-10 rounded-2xl bg-white/95 backdrop-blur border border-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.22)] max-sm:scale-[0.8] ${phoneScale(className)} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Fades its content in once as it scrolls into view. The text is always in the server HTML at
 * full opacity: the fade only applies when the inline script in __root.tsx has added the "js"
 * class to <html> (so crawlers, AI bots and anyone without JavaScript see everything), and that
 * same script marks each block data-shown as it enters the viewport. Never wrap a page's hero,
 * H1 or main photo in this: it would delay Largest Contentful Paint.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      data-reveal=""
      // The inline script adds data-watched / data-shown before React hydrates; that is expected.
      suppressHydrationWarning
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-3 text-[17px] text-[#0F172A] leading-[1.5]">
          <span
            aria-hidden="true"
            className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#0F172A] flex-shrink-0"
          />
          {p}
        </li>
      ))}
    </ul>
  );
}

export const rowHeading =
  "text-3xl md:text-[40px] font-semibold tracking-tight text-[#2563EB] leading-[1.15]";
/** Panel for rows that sit on a tinted background: lighter, with an edge, so it stands off the tint. */
export const panelOnTint =
  "rounded-[28px] bg-gradient-to-br from-white to-[#EEF4FF] ring-1 ring-[#DBEAFE]";

/* ------------------------------------------------------------------ */
/* Trust strip: three checkable facts in one bar                       */
/* ------------------------------------------------------------------ */

const trustItems = [
  { title: "Stored in Europe", detail: "Practice and patient records kept in Europe" },
  { title: "Encrypted", detail: "In transit and at rest" },
  { title: "ICO registered", detail: "Registration ZC132966" },
  { title: "No lock-in", detail: "No contract. Export your data any time" },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why practices can trust DentDock"
      className="bg-white border-y border-neutral-200"
    >
      <ul className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ title, detail }, i) => (
          <li
            key={title}
            className={`px-6 py-6 lg:py-7 text-center border-neutral-200 ${i < 3 ? "lg:border-r" : ""} ${
              i % 2 === 0 ? "border-r" : ""
            } ${i < 2 ? "border-b lg:border-b-0" : ""}`}
          >
            <p className="text-[16px] font-semibold tracking-tight text-[#0F172A]">{title}</p>
            <p className="mt-1 text-[13px] text-[#64748B] leading-snug">{detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Smaller copies of every photo in public/images sit next to it as name-640.webp and name-960.webp
 * (SEO audit 20 Nov 2026), so phones and tablets don't download the full-size file.
 * When adding a photo, make both copies:
 *   cwebp -resize 640 0 -q 68 x.webp -o x-640.webp && cwebp -resize 960 0 -q 66 x.webp -o x-960.webp
 */
const FULL_1200 = new Set([
  "/images/pages/contactless-payment.webp",
  "/images/pages/manager-laptop.webp",
  "/images/pages/tablet-form.webp",
]);
export function photoSrcSet(src: string): string | undefined {
  if (!/^\/images\/.+\.webp$/.test(src)) return undefined;
  const base = src.slice(0, -".webp".length);
  const full = FULL_1200.has(src) ? 1200 : 1400;
  return `${base}-640.webp 640w, ${base}-960.webp 960w, ${src} ${full}w`;
}
/** Display width of a photo panel: half the page on laptops, the full width (less padding) on phones. */
export const PANEL_SIZES = "(min-width: 1024px) 520px, calc(100vw - 48px)";

/** Photo inside a light panel, with DentDock cards placed over the edges (kept off the person). */
/** True inside a page hero: the hero photo loads first instead of lazily (faster largest paint). */
export const HeroImage = createContext(false);

export function PhotoPanel({
  src,
  alt,
  height,
  position,
  children,
}: {
  src: string;
  alt: string;
  height: number;
  position: string;
  children: ReactNode;
}) {
  const hero = useContext(HeroImage);
  return (
    <div className={`relative ${panelOnTint} p-6 sm:p-8`}>
      <img
        src={src}
        srcSet={photoSrcSet(src)}
        sizes={PANEL_SIZES}
        alt={alt}
        width={1400}
        height={height}
        loading={hero ? "eager" : "lazy"}
        fetchPriority={hero ? "high" : "auto"}
        className={`w-full aspect-[4/3] object-cover ${position} rounded-2xl`}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Closing band                                                        */
/* ------------------------------------------------------------------ */

export function ClosingBand() {
  return (
    <section className="bg-white pt-8 md:pt-10 pb-16 md:pb-24 px-6">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] px-6 py-14 md:py-20 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(40% 60% at 85% 0%, rgba(255,255,255,0.22), transparent 70%), radial-gradient(35% 50% at 10% 100%, rgba(255,255,255,0.12), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
              Ready for software that works for your practice?
            </h2>
            <p className="mt-5 text-[17px] text-white/85 leading-[1.6]">
              Join the waitlist and be one of the first 30 practices on DentDock.
            </p>
            <WaitlistForm className="mt-8" onDark />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
