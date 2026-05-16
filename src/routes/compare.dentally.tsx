import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Zap,
  Banknote,
  MessageCircle,
  ArrowRight,
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


const whyBlocks = [
  {
    title: "Live in a day",
    body: "Sign up, set up your practice in 8 steps, go live the same day. No sales call, no implementation consultant. The first thing you'll do tomorrow is take an online booking.",
    note: "Guides for switching systems, and for starting fresh.",
    label: "VISUAL · LIVE IN A DAY",
    textLeft: true,
  },
  {
    title: "Ready on day one",
    body: "The work's already done. Automations, forms, recall sequences, booking confirmations are all running before you log in. Sign up, look around, take your first booking.",
    label: "VISUAL · READY ON DAY ONE",
    textLeft: false,
  },
  {
    title: "Talk to a real human",
    body: "Need help or something not working? Message us on WhatsApp. No ticket queue, no chatbot, no escalation form. Real human, same-day reply.",
    label: "VISUAL · TALK TO A REAL HUMAN",
    textLeft: true,
  },
];

function WhyDentDockBlock({
  title,
  body,
  note,
  label,
  textLeft,
  index,
  total,
}: {
  title: string;
  body: string;
  note?: string;
  label: string;
  textLeft: boolean;
  index: number;
  total: number;
}) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const textMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.5, ease },
      };

  const visualMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.5, ease, delay: 0.1 },
      };

  const isLast = index === total - 1;

  return (
    <div
      className="sticky"
      style={{
        top: `calc(96px + ${index * 24}px)`,
        zIndex: 10 + index,
        marginBottom: isLast ? 0 : 24,
      }}
    >
      <div
        className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-[0_20px_48px_-20px_rgba(15,23,42,0.18)] lg:p-14"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[45%_50%] lg:gap-16">
          <motion.div
            {...textMotion}
            className={textLeft ? "lg:order-1" : "lg:order-2"}
          >
            <h3
              className="text-[28px] font-semibold text-dd-foreground lg:text-[36px]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {title}
            </h3>
            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.65] text-[#475569] lg:text-[18px]">
              {body}
            </p>
            {note && (
              <p className="mt-5 max-w-[520px] text-[15px] italic leading-[1.5] text-[#94A3B8]">
                {note}
              </p>
            )}
          </motion.div>
          <motion.div
            {...visualMotion}
            className={textLeft ? "lg:order-2" : "lg:order-1"}
          >
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F1F5F9]">
              <span
                className="text-[13px] font-medium uppercase text-[#94A3B8]"
                style={{ letterSpacing: "0.08em" }}
              >
                {label}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function WhyDentDockBlocks() {
  return (
    <section className="relative bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-white pt-4 pb-4 md:pt-8 md:pb-8 px-6 [overflow:clip]">
      {/* Top irregular fade to white */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 z-10"
        style={{
          background:
            "radial-gradient(ellipse 45% 120% at 10% 0%, white 55%, transparent 85%), radial-gradient(ellipse 40% 110% at 32% 0%, white 50%, transparent 85%), radial-gradient(ellipse 50% 130% at 55% 0%, white 55%, transparent 85%), radial-gradient(ellipse 45% 115% at 78% 0%, white 50%, transparent 85%), radial-gradient(ellipse 40% 100% at 95% 0%, white 50%, transparent 85%), radial-gradient(ellipse 130% 90% at 50% 0%, white 35%, transparent 80%)",
        }}
      />
      {/* Bottom irregular fade to white */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 z-10"
        style={{
          background:
            "radial-gradient(ellipse 75% 130% at 30% 100%, white 55%, transparent 85%), radial-gradient(ellipse 65% 110% at 80% 100%, white 50%, transparent 85%), radial-gradient(ellipse 120% 90% at 50% 100%, white 35%, transparent 80%)",
        }}
      />
      {/* Center white blobs */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 30% 25% at 15% 40%, rgba(255,255,255,0.85), transparent 70%), radial-gradient(ellipse 35% 30% at 85% 55%, rgba(255,255,255,0.8), transparent 70%), radial-gradient(ellipse 25% 20% at 50% 50%, rgba(255,255,255,0.6), transparent 70%), radial-gradient(ellipse 28% 22% at 35% 65%, rgba(255,255,255,0.7), transparent 70%), radial-gradient(ellipse 30% 25% at 70% 35%, rgba(255,255,255,0.75), transparent 70%)",
        }}
      />
      <div className="relative z-20 mx-auto max-w-[1200px]">
        <div>
          {whyBlocks.map((b, i) => (
            <WhyDentDockBlock key={b.title} {...b} index={i} total={whyBlocks.length} />
          ))}
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
      
      <WhyDentDockBlocks />
      <WhatNextCTA />
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


function WhatNextCTA() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.3, ease, delay },
        };

  const buttonsMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.4, ease, delay: 0.65 },
      };

  return (
    <section
      className="py-16 lg:py-24"
      style={{ background: "linear-gradient(to bottom, #F3F6FD, #FFFFFF)" }}
    >
      <div className="mx-auto max-w-[880px] px-6 text-center">
        <motion.h2
          {...fade(0.2)}
          className="text-[32px] font-semibold text-dd-foreground lg:text-[48px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Want to see more, or just have a chat?
        </motion.h2>
        <motion.p
          {...fade(0.35)}
          className="mx-auto mt-4 max-w-[640px] text-[18px] leading-[1.6] text-[#475569] lg:text-[20px]"
        >
          Explore the rest of Dent Dock, or message us directly with any questions about our
          software.
        </motion.p>

        <motion.div
          {...buttonsMotion}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            to="/"
            hash="features"
            className="group inline-flex w-full items-center justify-center rounded-2xl bg-[#2563EB] px-7 py-[14px] text-[16px] font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[#1D4ED8] sm:w-auto"
            style={{ boxShadow: "0 14px 32px -8px rgba(37,99,235,0.35)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 20px 40px -8px rgba(37,99,235,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 14px 32px -8px rgba(37,99,235,0.35)";
            }}
          >
            See all features
            <ArrowRight className="ml-2 h-[18px] w-[18px]" strokeWidth={2} />
          </Link>
          <a
            href="https://wa.me/447404488089"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-[#2563EB] bg-white px-7 py-[14px] text-[16px] font-semibold text-[#2563EB] shadow-sm transition-all duration-200 ease-out hover:-translate-y-px hover:bg-[#F3F6FD] sm:w-auto"
          >
            Contact us
          </a>
        </motion.div>
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
            background: "linear-gradient(135deg, #EBF1FE 0%, #FFFFFF 100%)",
            border: "2px solid #C7D7FB",
            borderRadius: 20,
            paddingTop: padY,
            paddingBottom: padY,
            paddingLeft: padX,
            paddingRight: padX,
            boxShadow: "0 4px 12px -6px rgba(37,99,235,0.12)",
            transition,
            overflow: "hidden",
          }}
          className="relative mx-auto flex w-full max-w-[300px] flex-col items-center justify-center text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.45]"
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
          <span
            className="relative font-semibold text-[#2563EB]"
            style={{ fontSize: 12, letterSpacing: "0.04em" }}
          >
            Dent Dock
          </span>
          <span
            className="relative font-medium text-[#0F172A] tabular-nums"
            style={{ fontSize: priceSize, letterSpacing: "-0.02em", marginTop: gap, transition, lineHeight: 1.1 }}
          >
            £49
          </span>
          <span
            className="relative font-medium text-[#475569]"
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
    <section id="comparison-table" className="bg-white pt-16 pb-8 lg:pt-24 lg:pb-12 scroll-mt-24">
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

        <p className="mt-8 text-center text-[14px] leading-[1.6] text-dd-muted">
          Spotted something inaccurate? Email{" "}
          <a href="mailto:hello@dentdock.co.uk" className="font-medium text-[#2563EB] hover:underline">
            hello@dentdock.co.uk
          </a>{" "}
          and we'll fix it.
        </p>
      </div>
    </section>
  );
}