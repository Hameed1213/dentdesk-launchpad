import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  Zap,
  FileText,
  MessageSquare,
  Smartphone,
  Headphones,
  Stethoscope,
  Landmark,
  Building2,
  Brain,
  Image as ImageIcon,
  MessagesSquare,
  Banknote,
  MessageCircle,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { useEffect, useRef, useState } from "react";

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

type FloatPill = {
  icon: LucideIcon;
  text: string;
  top: string;
  topSm?: string;
  topXs?: string;
  left?: string;
  right?: string;
  floatDelay: string;
};

const PILLS: FloatPill[] = [
  { icon: Zap, text: "Live in a day vs sales call", top: "20%", topSm: "12%", left: "-10%", floatDelay: "0s" },
  { icon: Banknote, text: "£49 vs £125+", top: "16%", topXs: "8%", right: "0%", floatDelay: "-1.2s" },
  { icon: MessageCircle, text: "WhatsApp support vs ticket queue", top: "76%", topXs: "86%", left: "-6%", floatDelay: "-2.5s" },
  { icon: CalendarCheck, text: "Booking included vs not", top: "62%", topXs: "70%", right: "-8%", floatDelay: "-3.7s" },
];

function HeroVisual() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [mounted, setMounted] = useState(prefersReducedMotion);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia?.("(min-width: 1024px)").matches ?? false : false,
  );
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined"
      ? window.matchMedia?.("(min-width: 640px) and (max-width: 1023px)").matches ?? false
      : false,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqTablet = window.matchMedia("(min-width: 640px) and (max-width: 1023px)");
    const handleDesktop = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    const handleTablet = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    setIsDesktop(mqDesktop.matches);
    setIsTablet(mqTablet.matches);
    mqDesktop.addEventListener("change", handleDesktop);
    mqTablet.addEventListener("change", handleTablet);
    return () => {
      mqDesktop.removeEventListener("change", handleDesktop);
      mqTablet.removeEventListener("change", handleTablet);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [prefersReducedMotion]);

  return (
    <div className="relative mx-auto h-[460px] w-full max-w-[420px] sm:h-[440px] sm:max-w-[520px] lg:h-[520px] lg:max-w-none">
      {/* Layer 1: aurora halo */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[360px] lg:h-[360px] xl:w-[480px] xl:h-[480px]"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.08) 40%, transparent 75%)",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />

      {/* Layer 2: tooth SVG */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 2 }}
      >
        <div className="relative w-[190px] sm:w-[230px] lg:w-[180px] xl:w-[240px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 12px 24px rgba(37,99,235,0.25))" }}
          >
            <path
              d="M28 14C20 14 13 20 16 34C19 46 25 58 32 68C38 78 44 84 50 84C56 84 62 78 68 68C75 58 81 46 84 34C87 20 80 14 72 14C64 14 60 20 60 26C60 32 56 38 50 38C44 38 40 32 40 26C40 20 36 14 28 14Z"
              fill="#2563EB"
            />
          </svg>
        </div>
      </div>

      {/* Layer 4: floating pills */}
      {PILLS.map((p, i) => {
        const Icon = p.icon;
        const left = isDesktop ? p.left : p.left !== undefined ? "0%" : undefined;
        const right = isDesktop ? p.right : p.right !== undefined ? "0%" : undefined;
        const top =
          isTablet && p.topSm
            ? p.topSm
            : !isDesktop && !isTablet && p.topXs
              ? p.topXs
              : p.top;
        return (
          <div
            key={i}
            className="absolute flex items-center gap-2 rounded-full bg-white pl-2 pr-3 py-1.5 sm:pr-4 sm:py-2"
            style={{
              top,
              left,
              right,
              zIndex: 4,
              border: "1px solid #E2E8F0",
              boxShadow: "0 8px 24px -8px rgba(37,99,235,0.15)",
              position: "absolute",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 400ms ${EASING} ${i * 150}ms, transform 400ms ${EASING} ${i * 150}ms`,
              animation:
                prefersReducedMotion || !mounted
                  ? undefined
                  : `pill-float 5s ease-in-out ${p.floatDelay} infinite`,
            }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EFF4FF] sm:h-8 sm:w-8">
              <Icon size={14} strokeWidth={2} color="#2563EB" className="sm:hidden" />
              <Icon size={16} strokeWidth={2} color="#2563EB" className="hidden sm:block" />
            </span>
            <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap sm:text-[13px]">{p.text}</span>
          </div>
        );
      })}
    </div>
  );
}

const faqItems = [
  {
    q: "Is Dent Dock cheaper than Dentally?",
    a: "Yes — significantly. Dent Dock is £49 per month flat for a single-site practice. Dentally's lowest plan that includes online booking is Essentials at £220 per month plus VAT (real cost £264 for a practice that can't reclaim VAT). Dent Dock includes online booking, digital forms, recalls, payments and two-way SMS in our only plan.",
  },
  {
    q: "Does Dent Dock have clinical charting?",
    a: "No, and that's intentional. We deliberately don't build tooth charts, perio charts or treatment plan builders. We focus on everything around the chair — booking, communications, recalls, payments, forms and front-of-house workflow. If you need clinical charting, choose Dentally or another clinical-first system, and either run Dent Dock alongside it or pick a different tool.",
  },
  {
    q: "Does Dent Dock handle NHS practices?",
    a: "Dent Dock is built for UK private practices. We capture NHS number as a field but we don't manage UDA contracts or generate FP17 claims. Mixed practices can use Dent Dock for their private work alongside another system for NHS. If you're predominantly NHS, Dentally is the right choice.",
  },
  {
    q: "Can I switch from Dentally to Dent Dock?",
    a: "Yes. Export your patient list from Dentally as CSV and import it into Dent Dock with our column-mapping importer. During our first-30-practices launch window we'll handle appointment history migration for you directly. Clinical notes can't migrate because Dent Dock doesn't have a clinical chart — most switching practices keep their notes system or use a separate lightweight clinical tool alongside.",
  },
  {
    q: "Does Dent Dock support multi-site practices?",
    a: "Not at launch. Multi-site is on our roadmap. Dentally supports multi-site on every plan, so if you run multiple locations today, Dentally is the right choice.",
  },
  {
    q: "How long does it take to go live with Dent Dock?",
    a: "Most practices can go from signup to a live booking page within a single day. The 8-step onboarding wizard covers practice details, opening hours, services, team and brand. No sales call, no implementation consultant.",
  },
  {
    q: "Is Dent Dock GDPR-compliant?",
    a: "Dent Dock is built around UK GDPR from the ground up. Every patient consent is captured with the exact text version, IP address and user-agent at the time of giving. Every automated message is tagged transactional, clinical or marketing, and marketing-tagged sends honour patient opt-ins automatically. ICO registration and the practice's own DPIA are responsibilities that sit with the practice — Dent Dock provides the technical controls.",
  },
  {
    q: "What if I outgrow Dent Dock?",
    a: "If you grow into a multi-site group or you decide you need clinical charting and NHS UDA management, we'll help you migrate to Dentally or another platform with a clean export of your data. We'd rather you ended up with the right software than have you stuck on the wrong one.",
  },
];

export const Route = createFileRoute("/compare/dentally")({
  head: () => ({
    meta: [
      { title: "Dent Dock vs Dentally · Pricing and features compared (2026)" },
      {
        name: "description",
        content:
          "An honest comparison of Dent Dock and Dentally for UK private dental practices. Pricing from £49 vs £125–£320, features, support and when each is the right fit.",
      },
      {
        property: "og:title",
        content: "Dent Dock vs Dentally · Pricing and features compared (2026)",
      },
      {
        property: "og:description",
        content:
          "An honest comparison of Dent Dock and Dentally for UK private dental practices. Pricing from £49 vs £125–£320, features, support and when each is the right fit.",
      },
      { property: "og:url", content: "https://dentdock.co.uk/compare/dentally" },
    ],
    links: [{ rel: "canonical", href: "https://dentdock.co.uk/compare/dentally" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is Dent Dock cheaper than Dentally?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, significantly. Dent Dock is £49 per month flat for a single-site practice. Dentally's lowest plan that includes online booking is Essentials at £220 per month plus VAT (real cost £264 for a practice that can't reclaim VAT). Dent Dock includes online booking, digital forms, recalls, payments and two-way SMS in our only plan.",
              },
            },
            {
              "@type": "Question",
              name: "Does Dent Dock have clinical charting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No, and that's intentional. Dent Dock deliberately doesn't build tooth charts, perio charts or treatment plan builders. We focus on everything around the chair — booking, communications, recalls, payments, forms and front-of-house workflow. If you need clinical charting, choose Dentally or another clinical-first system.",
              },
            },
            {
              "@type": "Question",
              name: "Does Dent Dock handle NHS practices?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Dent Dock is built for UK private practices. We capture NHS number as a field but we don't manage UDA contracts or generate FP17 claims. Mixed practices can use Dent Dock for their private work alongside another system for NHS. If you're predominantly NHS, Dentally is the right choice.",
              },
            },
            {
              "@type": "Question",
              name: "Can I switch from Dentally to Dent Dock?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Export your patient list from Dentally as CSV and import it into Dent Dock with our column-mapping importer. During our first-30-practices launch window we'll handle appointment history migration for you directly. Clinical notes can't migrate because Dent Dock doesn't have a clinical chart.",
              },
            },
            {
              "@type": "Question",
              name: "Does Dent Dock support multi-site practices?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not at launch. Multi-site is on the Dent Dock roadmap. Dentally supports multi-site on every plan, so if you run multiple locations today, Dentally is the right choice.",
              },
            },
            {
              "@type": "Question",
              name: "How long does it take to go live with Dent Dock?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most practices can go from signup to a live booking page within a single day. The 8-step onboarding wizard covers practice details, opening hours, services, team and brand. No sales call, no implementation consultant required.",
              },
            },
            {
              "@type": "Question",
              name: "Is Dent Dock GDPR-compliant?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Dent Dock is built around UK GDPR from the ground up. Every patient consent is captured with the exact text version, IP address and user-agent at the time of giving. Every automated message is tagged transactional, clinical or marketing, and marketing-tagged sends honour patient opt-ins automatically.",
              },
            },
            {
              "@type": "Question",
              name: "What if I outgrow Dent Dock?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "If you grow into a multi-site group or you decide you need clinical charting and NHS UDA management, Dent Dock will help you migrate to Dentally or another platform with a clean export of your data.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: CompareDentallyPage,
});

function PageDisclaimer() {
  return (
    <section className="w-full border-t border-[#E2E8F0] bg-white py-12">
      <div className="mx-auto max-w-[1080px] px-6">
        <p className="text-[14px] font-medium text-[#475569]">Last verified: 15 May 2026</p>
        <p className="mt-6 text-[14px] leading-[1.65] text-[#475569]">
          Pricing and feature information about Dentally is taken from publicly available sources at
          dentally.com as of 15 May 2026 and is correct to the best of our knowledge. Dentally and
          Dentally Vision are trade marks of Henry Schein One UK Ltd. Dent Dock is not affiliated
          with, endorsed by, or sponsored by Dentally or Henry Schein One. If we've misrepresented
          anything on this page, please email hello@dentdock.co.uk and we'll correct it promptly.
          Dent Dock is a trading name of Paradigm Network Ltd, registered in England & Wales.
        </p>
      </div>
    </section>
  );
}

const switchSteps = [
  {
    number: "01",
    title: "Export from Dentally",
    body: "Export your patient list as CSV from Dentally's settings. Standard feature — no special access needed.",
  },
  {
    number: "02",
    title: "Import into Dent Dock",
    body: "Drop the CSV into our import flow. Auto-mapping handles common columns, the preview shows you what'll land where, and you can roll back if anything looks off.",
  },
  {
    number: "03",
    title: "We migrate the rest",
    body: "For the first 30 practices we'll handle appointment history migration directly. Once we've ironed it out we'll release a self-serve flow.",
  },
];

function SwitchingSteps() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[14px] font-semibold uppercase text-brand-blue"
            style={{ letterSpacing: "0.14em" }}
          >
            Switching
          </p>
          <h2
            className="mt-4 text-[32px] font-semibold leading-tight text-dd-foreground lg:text-[48px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Moving from Dentally is straightforward
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[20px] leading-[1.6] text-dd-muted">
            Most practices are live on Dent Dock the same day they decide to switch.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {switchSteps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-dd-border bg-white p-8 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue-tint">
                <span className="tabular-nums text-[18px] font-bold text-brand-blue">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 text-[20px] font-semibold text-dd-foreground">{step.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-dd-muted">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-brand-blue-tint bg-surface-tint p-7">
          <p className="text-[16px] font-semibold text-dd-foreground">Two honest caveats</p>
          <p className="mt-3 text-[16px] leading-[1.6] text-dd-muted">
            Clinical notes and tooth charts can't migrate — Dent Dock doesn't have a clinical chart
            to migrate them into. Most switching practices keep clinical notes in their existing
            system or use a lightweight clinical-notes tool alongside Dent Dock. And if you're
            mostly NHS, Dentally remains the right software for you.
          </p>
        </div>
      </div>
    </section>
  );
}

function PriceRationale() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[720px] px-6 text-center">
        <p className="text-[14px] font-medium uppercase tracking-[0.14em] text-dd-brand-blue">
          The price
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-dd-foreground lg:text-[40px]">
          Why we're £49
        </h2>
        <div className="mx-auto mt-8 max-w-[640px] space-y-6 text-left">
          <p className="text-[20px] leading-[1.7] text-dd-foreground">
            £49 is what a single-site UK private practice can pay comfortably out of cash flow
            without thinking about it. We deliberately don't build clinical charting, NHS contract
            management or imaging integration — that's where most of the cost of dental software
            comes from, and it's not what reception needs.
          </p>
          <p className="text-[20px] leading-[1.7] text-dd-foreground">
            By scoping the product tightly, we keep the price low. When we add multi-site, clinical
            features or other major capabilities, we'll add tiers above Starter. Customers who join
            on Starter pricing keep Starter pricing.
          </p>
        </div>
      </div>
    </section>
  );
}

function CompareDentallyPage() {
  return (
    <main className="bg-white text-dd-foreground">
      <Navbar />
      <Hero />
      <HonestAnswer />
      
      <FeatureComparison />
      <FeaturesGrid />
      <WhereDentallyWins />
      <FounderNote />
      <PricingComparison />
      <SwitchingSteps />
      <PriceRationale />
      <FAQ />
      <ClosingCTA />
      <PageDisclaimer />
      <Footer />
    </main>
  );
}

function FAQ() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[880px] px-6">
        <p className="text-[14px] font-medium uppercase tracking-[0.14em] text-dd-brand-blue">
          Frequently asked
        </p>
        <h2 className="mt-4 text-[32px] font-semibold tracking-tight text-dd-foreground lg:text-[48px]">
          Questions practice owners ask
        </h2>
        <Accordion type="multiple" className="mt-10 flex flex-col gap-4">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border border-[#E2E8F0] bg-white px-6 [&[data-state=open]]:pb-2"
            >
              <AccordionTrigger className="py-6 text-left text-[18px] font-semibold text-dd-foreground hover:no-underline [&>svg]:text-[#64748B]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="border-t border-[#E2E8F0] pt-4 text-[16px] leading-[1.6] text-[#475569]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FounderNote() {
  return (
    <section className="bg-surface-tint py-16 lg:py-24">
      <div className="mx-auto max-w-[720px] px-6 text-center">
        <p
          className="text-[14px] font-semibold uppercase text-brand-blue"
          style={{ letterSpacing: "0.14em" }}
        >
          A note from the founder
        </p>
        <p
          className="mt-6 text-[24px] leading-[1.6] text-dd-foreground"
          style={{ letterSpacing: "-0.01em" }}
        >
          Dent Dock is new. Dentally has been around for over a decade and is the UK market leader,
          owned by Henry Schein One. We're not trying to be Dentally. We do less, on purpose, for
          single-site UK private practices that don't want to pay £264 a month for online booking.
        </p>
        <p className="mt-6 text-[18px] font-medium text-dd-muted">— Hariss, founder</p>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="bg-[#F3F6FD] py-16 lg:py-24">
      <div className="mx-auto max-w-[720px] px-6 text-center">
        <p className="text-[14px] font-medium uppercase tracking-[0.14em] text-dd-brand-blue">
          Ready?
        </p>
        <h2 className="mt-4 text-[32px] font-semibold tracking-tight text-dd-foreground lg:text-[48px]">
          Try Dent Dock
        </h2>
        <p className="mx-auto mt-6 max-w-[560px] text-[20px] text-dd-muted">
          Join the waitlist and we'll walk you through a live demo. If after seeing both you decide
          Dentally is the better fit, we'd rather you knew today.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-2xl bg-[#2563EB] px-8 py-4 text-[18px] font-semibold text-white shadow-[0_14px_32px_-8px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-px hover:bg-[#1D4ED8]"
          >
            Join the waitlist →
          </a>
          <p className="text-[14px] text-dd-muted">
            30-day trial when you're ready. No card required.
          </p>
        </div>
      </div>
    </section>
  );
}

const dentallyWins: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Stethoscope,
    title: "Clinical charting",
    body: "No tooth chart, no perio chart in Dent Dock. Dentally has full charting on every plan and clinical-grade charting (Dentally Vision) on Pro.",
  },
  {
    icon: Landmark,
    title: "NHS UDA / FP17 management",
    body: "Dentally manages NHS contracts and claim submission on every plan. Dent Dock is built for private practices.",
  },
  {
    icon: Building2,
    title: "Multi-site practice management",
    body: "Dentally supports multi-site on every plan. Dent Dock is single-site at launch — multi-site is on our roadmap.",
  },
  {
    icon: Brain,
    title: "AI clinical note transcription",
    body: "Dentally Essentials includes 45 transcriptions per surgery per month; Pro includes 90. Dent Dock has no equivalent.",
  },
  {
    icon: ImageIcon,
    title: "Imaging integration",
    body: "Dentally Pro integrates with DEXIS, Carestream and other imaging systems via Dentally Vision. Dent Dock doesn't integrate with imaging.",
  },
  {
    icon: MessagesSquare,
    title: "Internal team chat",
    body: "Dentally has practice-wide team chat on every plan. We're working on this — it's on our roadmap.",
  },
];

function WhereDentallyWins() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[880px] px-6">
        <p
          className="text-[14px] font-semibold uppercase text-dd-muted"
          style={{ letterSpacing: "0.14em" }}
        >
          Honest
        </p>
        <h2
          className="mt-4 text-[28px] font-semibold leading-tight text-dd-foreground lg:text-[40px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Where Dentally is the better choice
        </h2>
        <p className="mt-5 text-[20px] leading-[1.6] text-dd-muted">
          We're not going to pretend otherwise. If any of the six things below are critical to how
          you run your practice, Dentally is the right software for you.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {dentallyWins.map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.title}
                className="flex gap-4 rounded-2xl border border-dd-border bg-white p-6"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-tint">
                  <Icon className="h-4 w-4 text-dd-muted" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-[18px] font-semibold text-dd-foreground">{row.title}</h4>
                  <p className="mt-1 text-[16px] leading-[1.55] text-dd-muted">{row.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[16px] text-dd-muted">
          If any of those are critical to how you run your practice, Dentally is the right choice.
          We mean that.
        </p>
      </div>
    </section>
  );
}

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: CalendarCheck,
    title: "Online booking, included",
    body: "Mobile-first patient flow with real-time slot updates. Patients book, reschedule and cancel from their phone in seconds.",
  },
  {
    icon: Zap,
    title: "29 automation flows, pre-built",
    body: "Booking confirmations, 72/24/2 hour reminders, deposit reminders, the 5-step recall sequence and more. Seeded on signup. Edit them, don't configure from scratch.",
  },
  {
    icon: FileText,
    title: "16 dental form templates",
    body: "Invisalign pre-screening, dental anxiety, implant assessment, child new patient, infection control, consent to treatment, and more. Send by SMS or email.",
  },
  {
    icon: MessageSquare,
    title: "Two-way SMS inbox",
    body: "Patient replies come back into a thread your receptionist can see. The SMS sender shows your practice name, not a random number.",
  },
  {
    icon: Smartphone,
    title: "Patient portal",
    body: "Magic-link login. Patients see upcoming appointments, fill forms, view receipts and pay invoices — no password to remember.",
  },
  {
    icon: Headphones,
    title: "WhatsApp line to the founder",
    body: "Real human, 48-hour reply, personally. No ticket queue, no chatbot.",
  },
];

function FeaturesGrid() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-[720px]">
          <p
            className="text-[14px] font-semibold uppercase text-brand-blue"
            style={{ letterSpacing: "0.14em" }}
          >
            Included from day one
          </p>
          <h2
            className="mt-4 text-[32px] font-semibold leading-tight text-dd-foreground lg:text-[48px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            What you get from Dent Dock at £49
          </h2>
          <p className="mt-5 max-w-[640px] text-[20px] leading-[1.6] text-dd-muted">
            Not a teaser. Not a starter tier. Everything below is in our only plan.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureTile key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureTile({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-dd-border bg-white p-8 shadow-sm transition-transform duration-200 hover:-translate-y-px">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120px 120px at 90% 10%, rgba(37,99,235,0.04), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dd-border bg-white shadow-sm">
          <Icon className="h-5 w-5 text-brand-blue" strokeWidth={1.75} />
        </div>
        <h3 className="mt-6 text-[20px] font-semibold text-dd-foreground">{title}</h3>
        <p className="mt-2 text-[16px] leading-[1.55] text-dd-muted">{body}</p>
      </div>
    </div>
  );
}

function PricingComparison() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const cardMotion = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.5, ease, delay },
        };

  const priceMotion = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.4, ease, delay },
        };

  const dentDockIncludes = [
    "Online booking and patient portal",
    "Digital forms with signature",
    "Automated reminders and recalls",
    "Patient payments and deposits",
    "Two-way SMS inbox",
    "29 automations and 16 form templates",
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="text-[14px] font-semibold uppercase text-brand-blue"
            style={{ letterSpacing: "0.14em" }}
          >
            Pricing
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            The price most practices <span className="text-[#2563EB]">actually pay.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Dentally lists prices excluding VAT. Dent Dock is a flat practice price. Below is what
            each actually includes at each price point.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Dent Dock card */}
          <motion.div
            {...cardMotion(0)}
            className="group rounded-[20px] border-2 border-[#2563EB] p-8 lg:p-12 lg:-translate-y-2 transition-all duration-200 ease-out hover:-translate-y-[10px]"
            style={{
              background:
                "linear-gradient(135deg, #EBF1FE 0%, #FFFFFF 100%)",
              boxShadow: "0 20px 48px -12px rgba(37,99,235,0.25)",
            }}
            onHoverStart={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 28px 56px -12px rgba(37,99,235,0.32)";
            }}
            onHoverEnd={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 20px 48px -12px rgba(37,99,235,0.25)";
            }}
          >
            <p
              className="text-[13px] font-semibold uppercase text-[#2563EB]"
              style={{ letterSpacing: "0.14em" }}
            >
              Dent Dock
            </p>
            <motion.p
              {...priceMotion(0.2)}
              className="mt-4 text-[56px] lg:text-[72px] font-bold leading-none text-[#0F172A] tabular-nums"
              style={{ letterSpacing: "-0.03em" }}
            >
              £49
            </motion.p>
            <p className="mt-2 text-[16px] font-medium text-[#475569]">
              per month, flat practice price
            </p>

            <div className="my-8 h-px w-full bg-[#E2E8F0]" />

            <p
              className="text-[14px] font-semibold uppercase text-[#0F172A]"
              style={{ letterSpacing: "0.06em" }}
            >
              Included in your £49
            </p>
            <ul className="mt-4 flex flex-col gap-4">
              {dentDockIncludes.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]"
                  >
                    <Check size={14} strokeWidth={2.5} className="text-white" />
                  </span>
                  <span className="text-[16px] font-medium text-[#0F172A]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Dentally card */}
          <motion.div
            {...cardMotion(0.2)}
            className="rounded-[20px] border border-[#E2E8F0] bg-white p-8 lg:p-12 shadow-sm transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-md"
          >
            <p
              className="text-[13px] font-semibold uppercase text-[#475569]"
              style={{ letterSpacing: "0.14em" }}
            >
              Dentally
            </p>
            <motion.p
              {...priceMotion(0.4)}
              className="mt-4 text-[56px] lg:text-[72px] font-bold leading-none text-[#0F172A] tabular-nums"
              style={{ letterSpacing: "-0.03em" }}
            >
              £125 — £220+
            </motion.p>
            <p className="mt-2 text-[16px] font-medium text-[#475569]">
              per month, ex VAT · scales by surgery count
            </p>

            <div className="my-8 h-px w-full bg-[#E2E8F0]" />

            {/* Starter tier */}
            <p
              className="text-[14px] font-semibold uppercase text-[#0F172A]"
              style={{ letterSpacing: "0.06em" }}
            >
              Starter · £125
            </p>
            <span
              className="mt-2.5 inline-flex items-center rounded-full border border-[#FDE68A] bg-[#FEF3C7] px-3 py-1.5 text-[12px] font-semibold uppercase text-[#92400E]"
              style={{ letterSpacing: "0.04em" }}
            >
              Online booking not included
            </span>
            <p className="mt-3 text-[15px] leading-[1.55] text-[#475569]">
              Dentally Starter doesn't include the Dentally Portal — no online booking, digital
              forms, or patient concierge.
            </p>

            {/* Essentials tier */}
            <p
              className="mt-8 text-[14px] font-semibold uppercase text-[#0F172A]"
              style={{ letterSpacing: "0.06em" }}
            >
              Essentials · £220
            </p>
            <p className="mt-2 text-[15px] leading-[1.55] text-[#475569]">
              To get online booking with Dentally, you'll need the Essentials tier — £220 per month
              ex VAT, per practice (scales further by number of surgeries).
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const dentallyFit = [
  "NHS, mixed and private practices of every size",
  "Full clinical charting and treatment plans",
  "NHS UDA contracts and FP17 claims",
  "Multi-site practices and dental groups",
  "Imaging integration and AI clinical notes",
];

const dentDockFit = [
  "Single-site UK private practices",
  "24/7 patient booking, without the phone calls",
  "Replacing manual reminders, recalls and forms",
  "Taking deposits and reducing no-shows",
  "Putting private treatment and patient experience first",
];

function HonestAnswer() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const headingMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease },
      };

  const panelMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.5, ease },
      };

  const itemMotion = (index: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.4, ease, delay: 0.2 + index * 0.08 },
        };

  return (
    <section className="bg-white pt-16 pb-16 lg:pt-24 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          {...headingMotion}
          className="mx-auto max-w-[720px] text-center"
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            What each one <span className="text-[#2563EB]">is built for.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Different software, built for different practices.
          </p>
        </motion.div>

        <motion.div
          {...panelMotion}
          className="mt-8 md:mt-12 rounded-[20px] border border-[#E2E8F0] p-8 lg:p-14"
          style={{
            background:
              "linear-gradient(to right, #DBEAFE 0%, #F3F6FD 50%, #FFFFFF 100%)",
            boxShadow: "0 14px 32px -8px rgba(37,99,235,0.10)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-[rgba(226,232,240,0.6)]">
            {/* Dent Dock — left */}
            <div className="relative lg:pr-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-2 opacity-[0.45]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                  maskImage:
                    "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                }}
              />
              <div className="relative">
                <h3 className="text-[19px] font-semibold tracking-tight leading-snug text-[#2563EB]">
                  Dent Dock is for
                </h3>
              <ul className="mt-8 flex flex-col gap-5">
                {dentDockFit.map((item, i) => (
                  <motion.li
                    key={item}
                    {...itemMotion(i)}
                    className="flex items-start gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]"
                      style={{ boxShadow: "0 2px 4px -1px rgba(37,99,235,0.3)" }}
                    >
                      <Check size={14} strokeWidth={2.5} className="text-white" />
                    </span>
                    <span className="text-[17px] font-medium leading-[1.5] text-[#0F172A]">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-10 text-[14px] italic leading-[1.5] text-[#94A3B8]">
                Dent Dock is a flat £49/mo per practice.
              </p>
              </div>
            </div>

            {/* Divider on mobile */}
            <div className="my-8 h-px bg-[rgba(226,232,240,0.6)] lg:hidden" />

            {/* Dentally — right */}
            <div className="lg:pl-12">
              <h3 className="text-[19px] font-semibold tracking-tight leading-snug text-[#94A3B8]">
                Dentally is for
              </h3>
              <ul className="mt-8 flex flex-col gap-5">
                {dentallyFit.map((item, i) => (
                  <motion.li
                    key={item}
                    {...itemMotion(dentDockFit.length + i)}
                    className="flex items-start gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#94A3B8]"
                    />
                    <span className="text-[17px] font-normal leading-[1.5] text-[#475569]">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-10 text-[14px] italic leading-[1.5] text-[#94A3B8]">
                £125 to start, £220 for online booking.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-tint to-white pt-28 pb-12 lg:pt-36 lg:pb-16">
      {/* Aurora motif, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 85% 15%, rgba(37,99,235,0.20) 0%, rgba(37,99,235,0.10) 35%, rgba(37,99,235,0) 70%)",
          filter: "blur(40px)",
          maskImage: "linear-gradient(to bottom left, black 0%, black 35%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom left, black 0%, black 35%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 flex flex-col lg:flex-row lg:items-center lg:gap-10">
        <div className="w-full lg:w-[55%] lg:max-w-[640px]">
          <p
            className="text-[14px] font-semibold uppercase text-brand-blue"
            style={{ letterSpacing: "0.14em" }}
          >
            Last updated · May 2026
          </p>

          <h1
            className="mt-6 font-semibold text-dd-foreground text-[44px] leading-[1.15] lg:text-[72px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            <span style={{ color: "#2563EB" }}>Dent Dock</span> vs Dentally
          </h1>

          <p className="mt-6 text-lg text-neutral-500 max-w-xl leading-relaxed">
            Dent Dock is dental practice software for single-site UK private practices. Dentally is
            the UK market leader in cloud dental practice software. Compare price, features, and fit
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-dd-subtle">
            <span>No contracts</span>
            <span aria-hidden="true">·</span>
            <span>No setup fees</span>
            <span aria-hidden="true">·</span>
            <span>30-day free trial</span>
          </div>

          <a
            href="#comparison-table"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1d4ed8]"
          >
            Skip to the full feature comparison
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-10 flex w-full justify-center lg:mt-0 lg:w-[45%]">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

type Cell = { included: boolean; caveat?: string };
type FeatureRow = { feature: string; dentDock: Cell; dentally: Cell };
type Category = { title: string; rows: FeatureRow[] };

const yes = (caveat?: string): Cell => ({ included: true, caveat });
const no = (caveat?: string): Cell => ({ included: false, caveat });

const categories: Category[] = [
  {
    title: "Patient booking",
    rows: [
      { feature: "Online booking page", dentDock: yes(), dentally: yes("Essentials+ only") },
      
      { feature: "Live slot updates", dentDock: yes(), dentally: yes() },
      { feature: "Patient self-reschedule via link", dentDock: yes(), dentally: yes() },
      { feature: "Patient self-cancel via link", dentDock: yes(), dentally: yes() },
      { feature: "Custom booking domain", dentDock: no("On the roadmap"), dentally: yes("Pro tier only") },
    ],
  },
  {
    title: "Patient communications",
    rows: [
      { feature: "Automated SMS + email reminders", dentDock: yes(), dentally: yes() },
      { feature: "Pre-built automation flows", dentDock: yes("29 seeded on signup"), dentally: no() },
      { feature: "SMS sender shows practice name", dentDock: yes(), dentally: yes() },
      { feature: "Two-way SMS inbox", dentDock: yes(), dentally: yes() },
      { feature: "Internal team chat", dentDock: no("On the roadmap"), dentally: yes() },
      { feature: "Marketing vs transactional consent classifier", dentDock: yes(), dentally: yes() },
    ],
  },
  {
    title: "Forms",
    rows: [
      { feature: "Digital forms", dentDock: yes(), dentally: yes("Essentials+ only") },
      { feature: "Pre-built dental templates", dentDock: yes(), dentally: yes() },
      { feature: "Digital signature capture", dentDock: yes(), dentally: yes("Essentials+ only") },
      { feature: "Conditional logic", dentDock: yes(), dentally: yes("Essentials+ only") },
      { feature: "Auto-sync answers to patient record", dentDock: yes(), dentally: yes() },
    ],
  },
  {
    title: "Recalls",
    rows: [
      { feature: "Recall list view", dentDock: yes(), dentally: yes() },
      { feature: "5-step automated cascade", dentDock: yes(), dentally: no() },
      { feature: "Per-service recall intervals", dentDock: yes(), dentally: yes() },
      { feature: "Quiet hours for sends", dentDock: yes(), dentally: yes() },
      { feature: "Recall effectiveness analytics", dentDock: yes(), dentally: yes() },
    ],
  },
  {
    title: "Payments",
    rows: [
      { feature: "Send payment links", dentDock: yes(), dentally: yes() },
      { feature: "Late-cancellation fees", dentDock: yes(), dentally: yes() },
      { feature: "Patient receipts", dentDock: yes(), dentally: yes() },
      { feature: "Deposit collection at booking", dentDock: yes(), dentally: yes("Essentials+ only") },
    ],
  },
  {
    title: "Clinical",
    rows: [
      { feature: "Tooth / perio chart", dentDock: no(), dentally: yes() },
      { feature: "Treatment plan builder", dentDock: no(), dentally: yes() },
      { feature: "AI clinical note transcription", dentDock: no(), dentally: yes("Essentials+ only") },
      { feature: "Imaging integration", dentDock: no(), dentally: yes("Pro tier only") },
    ],
  },
  {
    title: "NHS and multi-site",
    rows: [
      { feature: "NHS UDA / FP17 management", dentDock: no(), dentally: yes() },
      { feature: "NHS number capture", dentDock: yes("Field only"), dentally: yes() },
      { feature: "Multi-site practice management", dentDock: no("On the roadmap"), dentally: yes() },
    ],
  },
  {
    title: "Support",
    rows: [
      { feature: "WhatsApp support line", dentDock: yes(), dentally: no() },
      { feature: "Email support", dentDock: yes(), dentally: yes() },
      { feature: "Phone support", dentDock: no("On the roadmap"), dentally: yes("Essentials+ only") },
      { feature: "Chat support", dentDock: yes(), dentally: yes() },
      { feature: "Customer success manager", dentDock: no(), dentally: yes("Essentials+ only") },
    ],
  },
];

function StatusCell({ cell }: { cell: Cell }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span
        aria-hidden="true"
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          cell.included ? "bg-[#2563EB]" : "bg-[#94A3B8]"
        }`}
      >
        {cell.included ? (
          <Check size={14} strokeWidth={2.5} className="text-white" />
        ) : (
          <X size={14} strokeWidth={2.5} className="text-white" />
        )}
      </span>
      <span className="sr-only">{cell.included ? "Included" : "Not included"}</span>
      {cell.caveat && (
        <span className="mt-2 text-[13px] font-medium leading-snug text-[#475569] line-clamp-2">
          {cell.caveat}
        </span>
      )}
    </div>
  );
}

function StickyPricingCards({ progress }: { progress: number }) {
  // progress: 0 = full/entry state, 1 = compact/sticky state
  const p = progress;
  const lerp = (a: number, b: number) => a + (b - a) * p;
  const padY = lerp(16, 8);
  const padX = lerp(20, 16);
  const priceSize = lerp(22, 15);
  const subSize = lerp(13, 11);
  const gap = lerp(4, 2);
  const subGap = lerp(2, 2);

  const transition = "all 300ms cubic-bezier(0.22, 1, 0.36, 1)";
  // Snap backdrop on as soon as cards begin to compress, so rows never show through
  const backdropOpacity = p > 0.02 ? 1 : 0;

  return (
    <div
      className="hidden md:block sticky z-20"
      style={{ top: 80 }}
    >
      {/* Backdrop strip — only visible when sticky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-100vw] bottom-0 bg-white border-b border-[#E2E8F0]"
        style={{ top: -80, opacity: backdropOpacity, transition: "opacity 200ms ease-out" }}
      />
      <div className="relative grid grid-cols-[45%_27.5%_27.5%] px-3 py-2">
        <div className="flex items-center pl-2">
          <span
            className="font-semibold text-[#475569]"
            style={{ fontSize: 15 }}
          >
            Features
          </span>
        </div>
        {/* Dent Dock card */}
        <div
          style={{
            backgroundColor: "#EBF1FE",
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(135deg, rgba(235,241,254,0.4) 0%, rgba(255,255,255,0.85) 100%)",
            backgroundSize: "16px 16px, 16px 16px, 100% 100%",
            backgroundPosition: "0 0, 0 0, 0 0",
            border: "2px solid #2563EB",
            borderRadius: 20,
            paddingTop: padY,
            paddingBottom: padY,
            paddingLeft: padX,
            paddingRight: padX,
            boxShadow: "0 14px 32px -8px rgba(37,99,235,0.2)",
            transition,
          }}
          className="mx-auto flex w-full max-w-[300px] flex-col items-center justify-center text-center"
        >
          <span
            className="font-semibold text-[#2563EB]"
            style={{ fontSize: 12, letterSpacing: "0.04em" }}
          >
            Dent Dock
          </span>
          <span
            className="font-medium text-[#0F172A] tabular-nums"
            style={{ fontSize: priceSize, letterSpacing: "-0.02em", marginTop: gap, transition, lineHeight: 1.1 }}
          >
            £49
          </span>
          <span
            className="font-medium text-[#475569]"
            style={{ fontSize: subSize, marginTop: subGap, transition }}
          >
            per month
          </span>
        </div>
        {/* Dentally card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 20,
            paddingTop: padY,
            paddingBottom: padY,
            paddingLeft: padX,
            paddingRight: padX,
            boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
            transition,
          }}
          className="mx-auto flex w-full max-w-[300px] flex-col items-center justify-center text-center"
        >
          <span
            className="font-semibold text-[#475569]"
            style={{ fontSize: 12, letterSpacing: "0.04em" }}
          >
            Dentally
          </span>
          <span
            className="font-medium text-[#0F172A] tabular-nums"
            style={{ fontSize: priceSize, letterSpacing: "-0.02em", marginTop: gap, transition, lineHeight: 1.1 }}
          >
            £125 — £220+
          </span>
          <span
            className="font-medium text-[#475569]"
            style={{ fontSize: subSize, marginTop: subGap, transition }}
          >
            per month, ex VAT
          </span>
        </div>
      </div>
    </div>
  );
}

function MobilePricingCards() {
  return (
    <div className="md:hidden mt-8 grid grid-cols-2 gap-4">
      <div
        style={{
          background: "linear-gradient(135deg, #EBF1FE 0%, #FFFFFF 100%)",
          border: "2px solid #2563EB",
          borderRadius: 20,
          padding: 20,
          boxShadow: "0 14px 32px -8px rgba(37,99,235,0.2)",
        }}
        className="flex flex-col items-center text-center"
      >
        <span className="font-semibold text-[#2563EB]" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Dent Dock
        </span>
        <span className="font-bold text-[#0F172A] tabular-nums mt-2" style={{ fontSize: 28, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          £49
        </span>
        <span className="font-medium text-[#475569] mt-1" style={{ fontSize: 13 }}>per month</span>
      </div>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 20,
          padding: 20,
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
        }}
        className="flex flex-col items-center text-center"
      >
        <span className="font-semibold text-[#475569]" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Dentally
        </span>
        <span className="font-bold text-[#0F172A] tabular-nums mt-2" style={{ fontSize: 22, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          £125 — £220+
        </span>
        <span className="font-medium text-[#475569] mt-1" style={{ fontSize: 13 }}>per month, ex VAT</span>
      </div>
    </div>
  );
}

function FeatureComparison() {
  const [progress, setProgress] = useState(0);
  const stickyWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = stickyWrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Sticky offset is 80px. Compress over a 120px window.
      const offset = 80;
      const window = 120;
      const delta = offset - rect.top;
      const p = Math.max(0, Math.min(1, delta / window));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="comparison-table" className="bg-white py-16 lg:py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Feature <span className="text-[#2563EB]">comparison</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Verified against dentally.com on 15 May 2026.
          </p>
        </div>

        <div ref={stickyWrapRef} className="mt-12 relative">
          <StickyPricingCards progress={progress} />
          <MobilePricingCards />

          {categories.map((cat, catIdx) => (
            <div key={cat.title} className={catIdx === 0 ? "mt-6" : "mt-16"}>
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden="true" className="h-8 w-1 rounded-full bg-[#2563EB]" />
                <h3 className="text-[20px] md:text-[24px] font-semibold text-[#0F172A]">
                  {cat.title}
                </h3>
              </div>

              {/* Desktop */}
              <div className="hidden md:block">
                {cat.rows.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-[45%_27.5%_27.5%] items-center px-3 py-4 border-b border-[#F1F5F9] ${
                      i % 2 === 1 ? "bg-[#FAFBFC]" : ""
                    }`}
                  >
                    <div className="text-[16px] font-medium text-[#0F172A]">{row.feature}</div>
                    <div><StatusCell cell={row.dentDock} /></div>
                    <div><StatusCell cell={row.dentally} /></div>
                  </div>
                ))}
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-5 md:hidden">
                {cat.rows.map((row) => (
                  <div
                    key={row.feature}
                    className="border-b border-[#F1F5F9] pb-5 last:border-0 last:pb-0"
                  >
                    <p className="text-[16px] font-medium text-[#0F172A]">{row.feature}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p
                          className="mb-2 text-[11px] font-semibold uppercase text-[#94A3B8]"
                          style={{ letterSpacing: "0.1em" }}
                        >
                          Dent Dock
                        </p>
                        <StatusCell cell={row.dentDock} />
                      </div>
                      <div>
                        <p
                          className="mb-2 text-[11px] font-semibold uppercase text-[#94A3B8]"
                          style={{ letterSpacing: "0.1em" }}
                        >
                          Dentally
                        </p>
                        <StatusCell cell={row.dentally} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-[14px] leading-[1.6] text-dd-muted">
          Last verified: 15 May 2026. Dent Dock checks Dentally's pricing and feature pages
          quarterly. Spotted something inaccurate? Email hello@dentdock.co.uk and we'll correct it.
        </p>
      </div>
    </section>
  );
}