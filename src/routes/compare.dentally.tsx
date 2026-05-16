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
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { useEffect, useState } from "react";

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
      <PricingComparison />
      <FeaturesGrid />
      <WhereDentallyWins />
      <FounderNote />
      <FeatureComparison />
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
          <h2
            className="mt-4 text-[32px] font-semibold leading-tight text-dd-foreground lg:text-[48px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            What each actually costs
          </h2>
          <p className="mt-5 text-[20px] leading-[1.6] text-dd-muted">
            Dentally lists prices excluding VAT. Dent Dock is a flat practice price. Most UK dental
            services are VAT-exempt supplies — practices generally can't reclaim VAT on inputs — so
            the real cost to your practice is the inc-VAT figure.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <PriceCard
            highlighted
            eyebrow="Dent Dock · Starter"
            price="£49"
            subline="per month, no VAT charged today"
            summary="Online booking, forms, recalls, payments, two-way SMS and 29 automations included."
            pills={[
              { label: "Online booking included", tone: "success" },
              { label: "Digital forms included", tone: "success" },
              { label: "Patient portal included", tone: "success" },
            ]}
          />
          <PriceCard
            eyebrow="Dentally · Starter"
            price="£125"
            subline="per month plus VAT · real cost £150"
            summary="Practice management without the Dentally Portal."
            pills={[
              { label: "Online booking not included", tone: "attention" },
              { label: "Digital forms not included", tone: "attention" },
              { label: "Patient portal not included", tone: "attention" },
            ]}
          />
          <PriceCard
            eyebrow="Dentally · Essentials"
            price="£220"
            subline="per month plus VAT · real cost £264"
            summary="Practice management with the Dentally Portal included."
            pills={[
              { label: "Online booking included", tone: "success" },
              { label: "Digital forms included", tone: "success" },
              { label: "Patient portal included", tone: "success" },
            ]}
          />
        </div>

        <p className="mx-auto mt-10 max-w-[760px] text-center text-[14px] leading-[1.6] text-dd-muted">
          Pricing for 1 surgery, taken from dentally.com/en-gb/pricing on 15 May 2026. Dentally
          charges per practice based on number of surgeries — see the Dentally pricing page for
          multi-surgery rates.
        </p>
      </div>
    </section>
  );
}

type Pill = { label: string; tone: "success" | "attention" };

function PriceCard({
  highlighted = false,
  eyebrow,
  price,
  subline,
  summary,
  pills,
}: {
  highlighted?: boolean;
  eyebrow: string;
  price: string;
  subline: string;
  summary: string;
  pills: Pill[];
}) {
  return (
    <div
      className={
        highlighted
          ? "rounded-2xl border-2 border-brand-blue bg-white p-7 shadow-cta lg:-translate-y-2 lg:p-10"
          : "rounded-2xl border border-dd-border bg-white p-7 shadow-sm lg:p-10"
      }
    >
      <p
        className={
          highlighted
            ? "text-[14px] font-semibold uppercase text-brand-blue"
            : "text-[14px] font-semibold uppercase text-dd-muted"
        }
        style={{ letterSpacing: "0.14em" }}
      >
        {eyebrow}
      </p>
      <p className="tabular-nums mt-5 text-[56px] font-bold leading-none text-dd-foreground">
        {price}
      </p>
      <p className="mt-3 text-[16px] text-dd-muted">{subline}</p>
      <p className="mt-5 max-w-[280px] text-[18px] font-medium leading-[1.4] text-dd-foreground">
        {summary}
      </p>

      <div className="my-6 h-px bg-dd-border" />

      <div className="flex flex-col gap-2">
        {pills.map((pill) => (
          <span
            key={pill.label}
            className={
              pill.tone === "success"
                ? "inline-flex w-fit items-center rounded-xl bg-success-fill px-3 py-1.5 text-[14px] text-success-foreground"
                : "inline-flex w-fit items-center rounded-xl bg-attention-fill px-3 py-1.5 text-[14px] text-attention-foreground"
            }
          >
            {pill.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const dentallyFit = [
  "Clinical charting, tooth charts or treatment plan builders",
  "NHS UDA / FP17 management",
  "Multi-site practice management",
  "AI clinical note transcription",
  "Imaging integration (DEXIS, Carestream, Sirona)",
  "A long-established platform with thousands of UK customers",
];

const dentDockFit = [
  "Single-site UK private practice",
  "You want online booking, digital forms, recalls and patient comms",
  "You don't need clinical charting or NHS contract management",
  "You'd rather pay £49 than £264 a month",
  "You want to be live this week, not after a multi-week implementation",
];

function HonestAnswer() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <FitCard
            title="Dentally"
            intro="Dentally is the right fit if you need any of:"
            items={dentallyFit}
          />
          <FitCard
            title="Dent Dock"
            intro="Dent Dock is the right fit if all of these describe you:"
            items={dentDockFit}
          />
        </div>

        <p className="mx-auto mt-10 max-w-[640px] text-center text-[16px] text-dd-muted">
          If both lists describe you, talk to both. We won't be offended.
        </p>
      </div>
    </section>
  );
}

function FitCard({ title, intro, items }: { title: string; intro: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-dd-border bg-white p-7 shadow-sm lg:p-10">
      <p
        className="text-[14px] font-semibold uppercase text-dd-muted"
        style={{ letterSpacing: "0.14em" }}
      >
        When to choose
      </p>
      <h2 className="mt-3 text-[28px] font-semibold leading-tight text-dd-foreground">{title}</h2>
      <p className="mt-5 text-[18px] leading-[1.6] text-dd-foreground">{intro}</p>
      <ul className="mt-5 flex flex-col gap-3 text-[18px] leading-[1.6] text-dd-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="select-none text-dd-subtle">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
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

type PillTone = "included" | "not-included" | "roadmap" | "limited" | "neutral";

function StatusPill({ label, tone }: { label: string; tone: PillTone }) {
  const cls =
    tone === "included"
      ? "bg-success-fill text-success-foreground"
      : tone === "roadmap"
        ? "bg-brand-blue-tint text-brand-blue"
        : tone === "limited"
          ? "bg-attention-fill text-attention-foreground"
          : tone === "not-included"
            ? "bg-slate-100 text-dd-muted"
            : "bg-slate-100 text-dd-muted";
  return (
    <span className={`inline-flex w-fit items-center rounded-xl px-3 py-1.5 text-[14px] ${cls}`}>
      {label}
    </span>
  );
}

type Cell = { label: string; tone: PillTone };
type FeatureRow = { feature: string; dentDock: Cell; dentally: Cell };
type Category = { title: string; rows: FeatureRow[] };

const included = (label = "Included"): Cell => ({ label, tone: "included" });
const notIncluded = (label = "Not included"): Cell => ({ label, tone: "not-included" });
const roadmap = (label = "Roadmap"): Cell => ({ label, tone: "roadmap" });
const limited = (label: string): Cell => ({ label, tone: "limited" });
const neutral = (label: string): Cell => ({ label, tone: "neutral" });

const categories: Category[] = [
  {
    title: "Patient booking",
    rows: [
      { feature: "Online booking page", dentDock: included(), dentally: neutral("Essentials+") },
      { feature: "Mobile-first design", dentDock: included(), dentally: neutral("Available") },
      { feature: "Live slot updates", dentDock: included(), dentally: neutral("Available") },
      { feature: "Patient self-reschedule via link", dentDock: included(), dentally: included() },
      { feature: "Patient self-cancel via link", dentDock: included(), dentally: included() },
      { feature: "Custom booking domain", dentDock: roadmap(), dentally: neutral("Pro only") },
    ],
  },
  {
    title: "Patient communications",
    rows: [
      { feature: "Automated SMS + email reminders", dentDock: included(), dentally: included() },
      {
        feature: "Pre-built automation flows",
        dentDock: included("29 seeded on signup"),
        dentally: neutral("Configure your own"),
      },
      {
        feature: "SMS sender shows practice name",
        dentDock: limited("At launch"),
        dentally: neutral("Available"),
      },
      { feature: "Two-way SMS inbox", dentDock: included(), dentally: neutral("Available") },
      { feature: "Internal team chat", dentDock: roadmap(), dentally: included() },
      {
        feature: "Marketing vs transactional consent classifier",
        dentDock: included(),
        dentally: neutral("Available"),
      },
    ],
  },
  {
    title: "Forms",
    rows: [
      { feature: "Digital forms", dentDock: included(), dentally: neutral("Essentials+") },
      {
        feature: "Pre-built dental templates",
        dentDock: included("16 included"),
        dentally: neutral("Available"),
      },
      {
        feature: "Digital signature capture",
        dentDock: included(),
        dentally: neutral("Essentials+"),
      },
      { feature: "Conditional logic", dentDock: included(), dentally: neutral("Essentials+") },
      {
        feature: "Auto-sync answers to patient record",
        dentDock: included(),
        dentally: neutral("Available"),
      },
    ],
  },
  {
    title: "Recalls",
    rows: [
      { feature: "Recall list view", dentDock: included(), dentally: included() },
      {
        feature: "5-step automated cascade",
        dentDock: included("Pre-built"),
        dentally: neutral("Configure your own"),
      },
      { feature: "Per-service recall intervals", dentDock: included(), dentally: included() },
      { feature: "Quiet hours for sends", dentDock: included(), dentally: neutral("Available") },
      { feature: "Recall effectiveness analytics", dentDock: included(), dentally: included() },
    ],
  },
  {
    title: "Payments",
    rows: [
      {
        feature: "Practice owns its Stripe account",
        dentDock: included(),
        dentally: neutral("Partner-dependent"),
      },
      { feature: "Send payment links", dentDock: included(), dentally: included() },
      {
        feature: "Late-cancellation fees",
        dentDock: included("Auto via cancel link"),
        dentally: neutral("Available"),
      },
      { feature: "Patient receipts", dentDock: included("Auto-generated"), dentally: included() },
      {
        feature: "Deposit collection at booking",
        dentDock: limited("Rolling out"),
        dentally: neutral("Essentials+"),
      },
    ],
  },
  {
    title: "Clinical",
    rows: [
      { feature: "Tooth / perio chart", dentDock: notIncluded(), dentally: included() },
      { feature: "Treatment plan builder", dentDock: roadmap(), dentally: included() },
      {
        feature: "AI clinical note transcription",
        dentDock: notIncluded(),
        dentally: neutral("Essentials+"),
      },
      { feature: "Imaging integration", dentDock: notIncluded(), dentally: neutral("Pro only") },
    ],
  },
  {
    title: "NHS and multi-site",
    rows: [
      { feature: "NHS UDA / FP17 management", dentDock: notIncluded(), dentally: included() },
      {
        feature: "NHS number capture",
        dentDock: included("Included (field only)"),
        dentally: included(),
      },
      { feature: "Multi-site practice management", dentDock: roadmap(), dentally: included() },
    ],
  },
  {
    title: "Support",
    rows: [
      {
        feature: "WhatsApp support line to founder",
        dentDock: included(),
        dentally: notIncluded(),
      },
      { feature: "Email support", dentDock: included(), dentally: included() },
      { feature: "Phone support", dentDock: roadmap(), dentally: neutral("Essentials+") },
      { feature: "Chat support", dentDock: included(), dentally: included() },
      {
        feature: "Customer success manager",
        dentDock: notIncluded(),
        dentally: neutral("Essentials+"),
      },
    ],
  },
];

function FeatureComparison() {
  return (
    <section id="comparison-table" className="bg-white py-16 lg:py-24 scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-[720px]">
          <p
            className="text-[14px] font-semibold uppercase text-brand-blue"
            style={{ letterSpacing: "0.14em" }}
          >
            Side by side
          </p>
          <h2
            className="mt-4 text-[32px] font-semibold leading-tight text-dd-foreground lg:text-[48px]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Feature comparison
          </h2>
          <p className="mt-5 max-w-[640px] text-[20px] leading-[1.6] text-dd-muted">
            Verified against dentally.com/en-gb/pricing on 15 May 2026. We've left out anything we
            couldn't substantiate.
          </p>
        </div>

        {/* Desktop table */}
        <div className="mt-12 hidden lg:block">
          {categories.map((cat) => (
            <div key={cat.title} className="mt-8 first:mt-0">
              <h3 className="text-[24px] font-semibold text-dd-foreground">{cat.title}</h3>
              <div
                className="mt-4 grid grid-cols-[45%_27.5%_27.5%] border-b border-dd-border text-[14px] font-semibold uppercase text-dd-subtle"
                style={{ letterSpacing: "0.08em" }}
              >
                <div className="px-2 pb-3">Feature</div>
                <div className="px-2 pb-3">Dent Dock</div>
                <div className="px-2 pb-3">Dentally</div>
              </div>
              {cat.rows.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[45%_27.5%_27.5%] items-center border-b border-dd-border py-4"
                >
                  <div className="px-2 text-[16px] font-medium text-dd-foreground">
                    {row.feature}
                  </div>
                  <div className="px-2">
                    <StatusPill label={row.dentDock.label} tone={row.dentDock.tone} />
                  </div>
                  <div className="px-2">
                    <StatusPill label={row.dentally.label} tone={row.dentally.tone} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="mt-10 lg:hidden">
          {categories.map((cat, idx) => (
            <details
              key={cat.title}
              className="group border-b border-dd-border py-4"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-[20px] font-semibold text-dd-foreground">
                <span>{cat.title}</span>
                <span
                  className="text-dd-subtle transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 flex flex-col gap-5">
                {cat.rows.map((row) => (
                  <div key={row.feature}>
                    <p className="text-[16px] font-medium text-dd-foreground">{row.feature}</p>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <div>
                        <p
                          className="text-[12px] uppercase text-dd-subtle"
                          style={{ letterSpacing: "0.1em" }}
                        >
                          Dent Dock
                        </p>
                        <div className="mt-1.5">
                          <StatusPill label={row.dentDock.label} tone={row.dentDock.tone} />
                        </div>
                      </div>
                      <div>
                        <p
                          className="text-[12px] uppercase text-dd-subtle"
                          style={{ letterSpacing: "0.1em" }}
                        >
                          Dentally
                        </p>
                        <div className="mt-1.5">
                          <StatusPill label={row.dentally.label} tone={row.dentally.tone} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </details>
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
