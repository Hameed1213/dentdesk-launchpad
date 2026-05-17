import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  Zap,
  Banknote,
  MessageCircle,
  ArrowRight,
  Check,
  Camera,
  Bell,
  Calendar,
  MessageSquare,
  FileText,
  Star,
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
import WhatsAppButton from "@/components/home/WhatsAppButton";
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
  { icon: Banknote, text: "Published price vs sales call", top: "20%", topSm: "12%", left: "-10%", floatDelay: "0s" },
  { icon: CalendarCheck, text: "Sign up online vs demo first", top: "16%", topXs: "8%", right: "0%", floatDelay: "-1.2s" },
  { icon: Zap, text: "Live in a day vs onboarding project", top: "76%", topXs: "86%", left: "-6%", floatDelay: "-2.5s" },
  { icon: MessageCircle, text: "WhatsApp support vs phone consultant", top: "62%", topXs: "70%", right: "-8%", floatDelay: "-3.7s" },
];

function HeroVisual() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const [mounted, setMounted] = useState(true);
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
    setMounted(true);
  }, []);

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
              opacity: 1,
              transform: "translateY(0)",
              animation: prefersReducedMotion
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
    q: "What happens after I sign up?",
    a: "You go through the 8-step onboarding wizard. Practice details, opening hours, services, team, payments setup and brand. By the end, your booking page is live and your automations are running. Most practices finish setup in under 20 minutes. If you get stuck, message us on WhatsApp and we'll help in real time.",
  },
  {
    q: "Do you help me move from my current system?",
    a: "Yes. Export your patient list from your existing software as CSV, drop it into our import flow, and we'll map the columns with you. For the first 30 practices we handle migration personally, including appointment history.",
  },
  {
    q: "What if something breaks?",
    a: "Message us on WhatsApp. Real human, same-day reply, no ticket queue. We handle the fix directly. As we grow we'll add more channels, but the direct-line philosophy stays.",
  },
  {
    q: "Do I have to commit to a contract?",
    a: "No. Month-to-month, cancel any time from your settings.",
  },
  {
    q: "Who actually replies to support messages?",
    a: "Always real humans, always within the same day. We don't use chatbots or AI for support, and we don't outsource. The person who built the product is the person fixing your issue.",
  },
  {
    q: "Can I export my data if I leave?",
    a: "Yes. Patient lists, appointment history, forms, recall data and payments are all exportable as CSV from your settings. Your data is yours, no lock-in, no friction. If you leave, you take everything with you.",
  },
  {
    q: "What if I need a feature you don't have?",
    a: "Tell us. We're a small team building close to our practices, which means we ship features fast when something matters to real customers. We can't promise every request, but we promise to listen and tell you honestly whether it's on the roadmap. Some of our best features came from a practice owner asking for them.",
  },
];

export const Route = createFileRoute("/compare/ismile-dental-software")({
  head: () => ({
    meta: [
      { title: "Dent Dock vs iSmile Dental Software (placeholder)" },
      { name: "description", content: "Placeholder — to be updated." },
      { property: "og:title", content: "Dent Dock vs iSmile Dental Software (placeholder)" },
      { property: "og:description", content: "Placeholder — to be updated." },
      { property: "og:url", content: "https://dentdock.co.uk/compare/ismile-dental-software" },
    ],
    links: [{ rel: "canonical", href: "https://dentdock.co.uk/compare/ismile-dental-software" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What happens after I sign up?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You go through the 8-step onboarding wizard. Practice details, opening hours, services, team, payments setup and brand. By the end, your booking page is live and your automations are running. Most practices finish setup in under 20 minutes. If you get stuck, message us on WhatsApp and we'll help in real time.",
              },
            },
            {
              "@type": "Question",
              name: "Do you help me move from my current system?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Export your patient list from your existing software as CSV, drop it into our import flow, and we'll map the columns with you. For the first 30 practices we handle migration personally, including appointment history.",
              },
            },
            {
              "@type": "Question",
              name: "What if something breaks?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Message us on WhatsApp. Real human, same-day reply, no ticket queue. We handle the fix directly. As we grow we'll add more channels, but the direct-line philosophy stays.",
              },
            },
            {
              "@type": "Question",
              name: "Do I have to commit to a contract?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Month-to-month, cancel any time from your settings.",
              },
            },
            {
              "@type": "Question",
              name: "Who actually replies to support messages?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Always real humans, always within the same day. We don't use chatbots or AI for support, and we don't outsource. The person who built the product is the person fixing your issue.",
              },
            },
            {
              "@type": "Question",
              name: "Can I export my data if I leave?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Patient lists, appointment history, forms, recall data and payments are all exportable as CSV from your settings. Your data is yours, no lock-in, no friction. If you leave, you take everything with you.",
              },
            },
            {
              "@type": "Question",
              name: "What if I need a feature you don't have?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Tell us. We're a small team building close to our practices, which means we ship features fast when something matters to real customers. We can't promise every request, but we promise to listen and tell you honestly whether it's on the roadmap. Some of our best features came from a practice owner asking for them.",
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
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-[1080px] px-6 text-center">
        <p className="text-[12px] italic leading-[1.6] text-[#475569]">
          Last verified 17 May 2026. iSmile feature information is taken from ismiledental.co.uk
          and correct to the best of our knowledge. iSmile pricing is not publicly listed. iSmile
          Dental Software is a trade name of its respective owner. Dent Dock is not affiliated with
          or endorsed by iSmile Dental Software. Spotted an inaccuracy? Email hello@dentdock.co.uk.
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
    visual: "live-in-a-day" as const,
    textLeft: true,
  },
  {
    title: "Ready on day one",
    body: "The work's already done. Automations, forms, recall sequences, booking confirmations are all running before you log in. Sign up, look around, take your first booking.",
    label: "VISUAL · READY ON DAY ONE",
    visual: "ready-on-day-one" as const,
    textLeft: false,
  },
  {
    title: "Talk to a real human",
    body: "Need help or something not working? Message us on WhatsApp. No ticket queue, no chatbot, no escalation form. Real human, same-day reply.",
    label: "VISUAL · TALK TO A REAL HUMAN",
    visual: "talk-to-a-human" as const,
    textLeft: true,
  },
];

function LiveInADayVisual() {
  const fieldLabelStyle = {
    fontSize: "9px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "#94A3B8",
  } as const;
  const inputStyle = {
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    height: "32px",
    padding: "0 10px",
    display: "flex",
    alignItems: "center",
    fontSize: "11px",
    fontWeight: 400,
    color: "#94A3B8",
    background: "#FFFFFF",
  } as const;

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:rounded-2xl"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#1a1f2e",
      }}
    >
      {/* Orbs on the outer canvas so they bleed into the padding */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "-100px",
          left: "-100px",
          width: "340px",
          height: "340px",
          background: "#2445ea",
          opacity: 0.45,
          filter: "blur(110px)",
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          bottom: "-90px",
          right: "-90px",
          width: "260px",
          height: "260px",
          background: "#2445ea",
          opacity: 0.28,
          filter: "blur(130px)",
        }}
      />

      {/* Wizard content (transparent — sits on the navy canvas) */}
      <div className="absolute inset-x-[5%] inset-y-[6%] sm:inset-x-[10%] sm:inset-y-[8%]">
        {/* Step indicator */}
        <div className="relative">
          <p style={{ fontSize: "10px", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
            Step <span style={{ color: "#60a5fa", fontWeight: 700 }}>1</span> of 8
          </p>
          <div
            className="mt-1.5 w-full overflow-hidden rounded-full"
            style={{ height: "4px", background: "rgba(255,255,255,0.12)" }}
          >
            <div style={{ width: "12.5%", height: "100%", background: "#2445ea" }} />
          </div>
        </div>

        {/* StepCard (white) */}
        <div
          className="relative mt-3 rounded-[14px] bg-white"
          style={{
            padding: "18px 20px",
            boxShadow: "0 10px 24px -10px rgba(0,0,0,0.25)",
          }}
        >
          {null}
          <h3
            className="mt-1 text-[13px] text-dd-foreground sm:text-[16px]"
            style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Tell us about your practice
          </h3>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 400,
              color: "#94A3B8",
              marginTop: "3px",
              lineHeight: 1.4,
            }}
          >
            This information appears on your patient booking page.
          </p>

          {/* Stack */}
          <div className="mt-3 flex flex-col" style={{ gap: "12px" }}>
            {/* Logo upload */}
            <div
              className="flex flex-col items-center justify-center"
              style={{
                border: "1px dashed #CBD5E1",
                borderRadius: "12px",
                height: "56px",
              }}
            >
              <Camera className="h-4 w-4" style={{ color: "#94A3B8" }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#94A3B8",
                  marginTop: "3px",
                }}
              >
                Upload your logo
              </span>
            </div>

            {/* Field: Practice name */}
            <div>
              <p style={fieldLabelStyle}>
                PRACTICE NAME <span style={{ color: "#EF4444" }}>*</span>
              </p>
              <div style={{ ...inputStyle, marginTop: "4px" }}>Smile Dental</div>
            </div>

            {/* Field: Phone */}
            <div className="hidden sm:block">
              <p style={fieldLabelStyle}>PHONE</p>
              <div style={{ ...inputStyle, marginTop: "4px" }}>020 7946 0123</div>
            </div>

            {/* City + Postcode */}
            <div className="hidden grid-cols-2 sm:grid" style={{ gap: "8px" }}>
              <div>
                <p style={fieldLabelStyle}>CITY</p>
                <div style={{ ...inputStyle, marginTop: "4px" }}>London</div>
              </div>
              <div>
                <p style={fieldLabelStyle}>POSTCODE</p>
                <div style={{ ...inputStyle, marginTop: "4px" }}>SW1A 1AA</div>
              </div>
            </div>

            {/* Continue */}
            <div className="flex justify-end">
              <div
                className="inline-flex items-center"
                style={{
                  background: "#2445ea",
                  color: "#ffffff",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "11px",
                  fontWeight: 600,
                  gap: "4px",
                }}
              >
                Continue
                <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live-now pop-out */}
      <div
        className="absolute right-[3%] top-[4%] hidden items-start gap-2.5 rounded-xl border border-[#E2E8F0] bg-white sm:flex"
        style={{
          width: "min(210px, 42%)",
          padding: "12px 14px",
          transform: "rotate(3deg)",
          boxShadow: "0 18px 40px -10px rgba(15,23,42,0.22)",
          fontFamily: "Inter, sans-serif",
          zIndex: 10,
        }}
      >
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#16A34A]">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[#16A34A]"
            style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            LIVE NOW
          </p>
          <p
            className="text-dd-foreground"
            style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}
          >
            Your booking page is live
          </p>
          <p
            className="mt-0.5 truncate text-[#2445ea]"
            style={{ fontSize: "9px", fontWeight: 600 }}
          >
            book.dentdock.co.uk/smile-dental
          </p>
        </div>
      </div>
    </div>
  );
}

function ReadyOnDayOneVisual() {
  const rows = [
    {
      Icon: Bell,
      title: "Booking confirmations",
      desc: "Sent the moment a slot is booked",
    },
    {
      Icon: Calendar,
      title: "Appointment reminders",
      desc: "24 h and 1 h before the visit",
    },
    {
      Icon: MessageSquare,
      title: "Recall sequences",
      desc: "Bring patients back at 6 and 12 months",
      mobileHidden: true,
    },
    {
      Icon: FileText,
      title: "New-patient forms",
      desc: "Medical history collected before arrival",
      mobileHidden: true,
    },
    {
      Icon: Star,
      title: "Review requests",
      desc: "Sent the day after each appointment",
      mobileHidden: true,
    },
  ];

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:rounded-2xl"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#1a1f2e",
      }}
    >
      {/* Orbs */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "-100px",
          left: "-100px",
          width: "340px",
          height: "340px",
          background: "#2445ea",
          opacity: 0.45,
          filter: "blur(110px)",
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          bottom: "-90px",
          right: "-90px",
          width: "260px",
          height: "260px",
          background: "#2445ea",
          opacity: 0.28,
          filter: "blur(130px)",
        }}
      />

      {/* Inset content */}
      <div className="absolute inset-x-[5%] inset-y-[6%] sm:inset-x-[10%] sm:inset-y-[8%]">
        <div
          className="relative rounded-[14px] bg-white"
          style={{
            padding: "18px 20px",
            boxShadow: "0 10px 24px -10px rgba(0,0,0,0.25)",
          }}
        >
          <h3
            className="text-[13px] text-dd-foreground sm:text-[16px]"
            style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Automations
          </h3>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 400,
              color: "#94A3B8",
              marginTop: "3px",
              lineHeight: 1.4,
            }}
          >
            Running on your account by default
          </p>

          <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
            {rows.map(({ Icon, title, desc, mobileHidden }) => (
              <div
                key={title}
                className={`flex items-center ${mobileHidden ? "hidden sm:flex" : ""}`}
                style={{
                  border: "1px solid #E2E8F0",
                  borderRadius: "10px",
                  padding: "8px 10px",
                  gap: "10px",
                }}
              >
                <div
                  className="flex flex-shrink-0 items-center justify-center"
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "7px",
                    background: "rgba(36,69,234,0.10)",
                    color: "#2445ea",
                  }}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[10px] text-dd-foreground sm:text-[12px]"
                    style={{ fontWeight: 600, lineHeight: 1.2 }}
                  >
                    {title}
                  </p>
                  <p
                    className="truncate"
                    style={{
                      fontSize: "10px",
                      fontWeight: 400,
                      color: "#94A3B8",
                      marginTop: "1px",
                    }}
                  >
                    {desc}
                  </p>
                </div>
                {/* Toggle (ON) */}
                <div
                  className="relative flex-shrink-0"
                  style={{
                    width: "26px",
                    height: "14px",
                    borderRadius: "999px",
                    background: "#2445ea",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: "2px",
                      left: "14px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "999px",
                      background: "#ffffff",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pop-out */}
      <div
        className="absolute right-[3%] top-[4%] hidden items-start gap-2.5 rounded-xl border border-[#E2E8F0] bg-white sm:flex"
        style={{
          width: "min(210px, 42%)",
          padding: "12px 14px",
          transform: "rotate(3deg)",
          boxShadow: "0 18px 40px -10px rgba(15,23,42,0.22)",
          fontFamily: "Inter, sans-serif",
          zIndex: 10,
        }}
      >
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#16A34A]">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[#16A34A]"
            style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            ALL ACTIVE
          </p>
          <p
            className="text-dd-foreground"
            style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}
          >
            Automations running
          </p>
          <p
            className="mt-0.5 truncate text-[#94A3B8]"
            style={{ fontSize: "9px", fontWeight: 500 }}
          >
            Since you signed up
          </p>
        </div>
      </div>
    </div>
  );
}

function TalkToAHumanVisual() {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:rounded-2xl"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#1a1f2e",
      }}
    >
      {/* Orbs */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "-100px",
          left: "-100px",
          width: "340px",
          height: "340px",
          background: "#2445ea",
          opacity: 0.45,
          filter: "blur(110px)",
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          bottom: "-90px",
          right: "-90px",
          width: "260px",
          height: "260px",
          background: "#2445ea",
          opacity: 0.28,
          filter: "blur(130px)",
        }}
      />

      {/* Inset chat card */}
      <div className="absolute inset-x-[5%] inset-y-[6%] sm:inset-x-[10%] sm:inset-y-[8%]">
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-[14px] bg-white"
          style={{
            boxShadow: "0 10px 24px -10px rgba(0,0,0,0.25)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-2.5"
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #E2E8F0",
              background: "#F8FAFC",
            }}
          >
            <div
              className="relative flex flex-shrink-0 items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "999px",
                background: "#2445ea",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              S
              <span
                className="absolute"
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "999px",
                  background: "#22C55E",
                  border: "2px solid #ffffff",
                  bottom: "-1px",
                  right: "-1px",
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="text-dd-foreground"
                style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.2 }}
              >
                Sarah from Dent Dock
              </p>
              <p style={{ fontSize: "10px", color: "#22C55E", fontWeight: 500, marginTop: "1px" }}>
                Online · replies in minutes
              </p>
            </div>
            <div
              className="flex flex-shrink-0 items-center justify-center"
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "7px",
                background: "rgba(34,197,94,0.12)",
                color: "#16A34A",
              }}
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.2} />
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex flex-1 flex-col"
            style={{ padding: "14px 16px", gap: "10px", background: "#ffffff" }}
          >
            {/* Inbound */}
            <div className="flex max-w-[78%] flex-col" style={{ gap: "2px" }}>
              <div
                style={{
                  background: "#F1F5F9",
                  color: "#0F172A",
                  borderRadius: "12px 12px 12px 4px",
                  padding: "8px 10px",
                  fontSize: "11px",
                  lineHeight: 1.35,
                  fontWeight: 500,
                }}
              >
                Want to take 50% deposits on whitening and Invisalign. Possible?
              </div>
              <p style={{ fontSize: "9px", color: "#94A3B8", fontWeight: 500 }}>You · 09:42</p>
            </div>

            {/* Outbound */}
            <div
              className="ml-auto hidden max-w-[80%] flex-col sm:flex"
              style={{ gap: "2px", alignItems: "flex-end" }}
            >
              <div
                style={{
                  background: "#2445ea",
                  color: "#ffffff",
                  borderRadius: "12px 12px 4px 12px",
                  padding: "8px 10px",
                  fontSize: "11px",
                  lineHeight: 1.35,
                  fontWeight: 500,
                }}
              >
                Yes, set the deposit on each service in Settings → Services. Want me to walk you
                through it on a quick call?
              </div>
              <p style={{ fontSize: "9px", color: "#94A3B8", fontWeight: 500 }}>
                Sarah · 09:46
              </p>
            </div>

            {/* Typing on mobile only — keeps card balanced */}
            <div className="mt-auto flex items-center gap-1.5 sm:hidden">
              <div
                style={{
                  background: "#F1F5F9",
                  borderRadius: "12px",
                  padding: "8px 12px",
                  display: "inline-flex",
                  gap: "3px",
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "999px",
                      background: "#94A3B8",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "9px", color: "#94A3B8", fontWeight: 500 }}>
                Sarah is typing
              </span>
            </div>
          </div>

          {/* Composer */}
          <div
            className="flex items-center gap-2"
            style={{
              padding: "10px 14px",
              borderTop: "1px solid #E2E8F0",
              background: "#F8FAFC",
            }}
          >
            <div
              className="flex flex-1 items-center"
              style={{
                background: "#ffffff",
                border: "1px solid #E2E8F0",
                borderRadius: "999px",
                padding: "6px 12px",
                fontSize: "11px",
                color: "#94A3B8",
              }}
            >
              Message Dent Dock support…
            </div>
            <div
              className="flex flex-shrink-0 items-center justify-center"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "999px",
                background: "#2445ea",
                color: "#ffffff",
              }}
            >
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </div>

      {/* Pop-out */}
      <div
        className="absolute right-[3%] top-[4%] hidden items-start gap-2.5 rounded-xl border border-[#E2E8F0] bg-white sm:flex"
        style={{
          width: "min(210px, 42%)",
          padding: "12px 14px",
          transform: "rotate(3deg)",
          boxShadow: "0 18px 40px -10px rgba(15,23,42,0.22)",
          fontFamily: "Inter, sans-serif",
          zIndex: 10,
        }}
      >
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#16A34A]">
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[#16A34A]"
            style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em" }}
          >
            REPLIED IN 4 MIN
          </p>
          <p
            className="text-dd-foreground"
            style={{ fontSize: "12px", fontWeight: 600, lineHeight: 1.3 }}
          >
            Sarah from Dent Dock
          </p>
          <p
            className="mt-0.5 truncate text-[#94A3B8]"
            style={{ fontSize: "9px", fontWeight: 500 }}
          >
            Same-day, every day
          </p>
        </div>
      </div>
    </div>
  );
}

function WhyDentDockBlock({
  title,
  body,
  note,
  label,
  visual,
  textLeft,
  index,
  total,
}: {
  title: string;
  body: string;
  note?: string;
  label: string;
  visual?: "live-in-a-day" | "ready-on-day-one" | "talk-to-a-human";
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
        transition: { duration: 0.25, ease },
      };

  const visualMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.25, ease, delay: 0.05 },
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
        className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.08)] lg:p-14"
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
            {visual === "live-in-a-day" ? (
              <LiveInADayVisual />
            ) : visual === "ready-on-day-one" ? (
              <ReadyOnDayOneVisual />
            ) : visual === "talk-to-a-human" ? (
              <TalkToAHumanVisual />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F1F5F9]">
                <span
                  className="text-[13px] font-medium uppercase text-[#94A3B8]"
                  style={{ letterSpacing: "0.08em" }}
                >
                  {label}
                </span>
              </div>
            )}
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
      
      <PageDisclaimer />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

function FAQ() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1] mb-4">
            Questions practice owners ask
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#475569]">
            Everything you need to know before switching from iSmile.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.18, delay: 0.05 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[#EEEEEE]"
              >
                <AccordionTrigger className="text-left text-[16px] sm:text-[17px] font-medium text-[#0F172A] py-5 hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#475569]">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.18, delay: 0.05 }}
          className="text-center text-[15px] text-[#475569] mt-12"
        >
          Can't find what you're looking for?{" "}
          <a
            href="https://wa.me/447404488089"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] font-medium hover:underline"
          >
            Get in touch with us directly
          </a>
        </motion.p>
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
          transition: { duration: 0.18, ease, delay },
        };

  const buttonsMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.2, ease, delay: 0.25 },
      };

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[880px] px-6 text-center">
        <motion.h2
          {...fade(0.08)}
          className="text-[32px] font-semibold text-dd-foreground lg:text-[48px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          Want to see more, <span className="text-[#2563EB]">or just have a chat?</span>
        </motion.h2>
        <motion.p
          {...fade(0.16)}
          className="mx-auto mt-4 max-w-[640px] text-[18px] leading-[1.6] text-[#475569] lg:text-[20px]"
        >
          Explore the rest of Dent Dock, or message us directly with any questions about our
          software.
        </motion.p>

        <motion.div
          {...buttonsMotion}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="/#features"
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
          </a>
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
  "Individual practices and corporate groups of every size",
  "Full clinical charting and treatment planning",
  "Cosmetic charting (Botox, dermal filler, PRP)",
  "Imaging integration and waiting room screens",
  "Practices that want a dedicated phone consultant",
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
        transition: { duration: 0.18, ease },
      };

  const panelMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.25, ease },
      };

  const itemMotion = (index: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.2, ease, delay: 0.08 + index * 0.04 },
        };

  return (
    <section className="bg-white pt-16 pb-16 lg:pt-24 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          {...headingMotion}
          className="mx-auto max-w-[720px] text-center"
        >
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            What each one <span className="text-[#2563EB]">is built for</span>
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
                Dent Dock is a flat £49/mo.
              </p>
              </div>
            </div>

            {/* Divider on mobile */}
            <div className="my-8 h-px bg-[rgba(226,232,240,0.6)] lg:hidden" />

            {/* Dentally — right */}
            <div className="lg:pl-12">
              <h3 className="text-[19px] font-semibold tracking-tight leading-snug text-[#94A3B8]">
                iSmile is for
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
                Pricing not publicly listed.
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
            <span style={{ color: "#2563EB" }}>Dent Dock</span> vs iSmile
          </h1>

          <p className="mt-6 text-lg text-neutral-500 max-w-xl leading-relaxed">
            Dent Dock is dental practice software for single-site UK private practices. iSmile is UK-built dental practice software used by individual practices and corporate groups. Compare features, fit and approach.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] sm:text-[14px] text-dd-subtle">
            <span>No contracts</span>
            <span aria-hidden="true">·</span>
            <span>No setup fees</span>
            <span aria-hidden="true">·</span>
            <span>30-day free trial</span>
          </div>

          <a
            href="#comparison-table"
            onClick={(e) => {
              const el = document.getElementById("comparison-table");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1d4ed8]"
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
      { feature: "Online booking page", dentDock: yes(), dentally: yes("Via Patient App") },
      { feature: "Live slot updates", dentDock: yes(), dentally: yes() },
      { feature: "Patient self-reschedule via link", dentDock: yes(), dentally: yes("Via Patient App") },
      { feature: "Patient self-cancel via link", dentDock: yes(), dentally: no("Not specified") },
      { feature: "Custom booking domain", dentDock: no("On the roadmap"), dentally: no("Not specified") },
    ],
  },
  {
    title: "Patient communications",
    rows: [
      { feature: "Automated SMS + email reminders", dentDock: yes(), dentally: yes() },
      { feature: "Pre-built automation flows", dentDock: yes("29 seeded on signup"), dentally: no("Manual configuration") },
      { feature: "SMS sender shows practice name", dentDock: yes(), dentally: yes() },
      { feature: "Two-way SMS inbox", dentDock: yes(), dentally: no("Not specified") },
      { feature: "Internal team chat", dentDock: no("On the roadmap"), dentally: no("Not specified") },
      { feature: "Marketing vs transactional consent classifier", dentDock: yes(), dentally: no("Not specified") },
    ],
  },
  {
    title: "Forms",
    rows: [
      { feature: "Digital forms", dentDock: yes(), dentally: yes("Via Patient App") },
      { feature: "Pre-built dental templates", dentDock: yes(), dentally: no("Build your own") },
      { feature: "Digital signature capture", dentDock: yes(), dentally: yes("Via Patient App") },
      { feature: "Conditional logic", dentDock: yes(), dentally: no("Not specified") },
      { feature: "Auto-sync answers to patient record", dentDock: yes(), dentally: yes("Via Patient App") },
    ],
  },
  {
    title: "Recalls",
    rows: [
      { feature: "Recall list view", dentDock: yes(), dentally: yes() },
      { feature: "5-step automated cascade", dentDock: yes(), dentally: yes("7-step recall manager") },
      { feature: "Per-service recall intervals", dentDock: yes(), dentally: yes() },
      { feature: "Quiet hours for sends", dentDock: yes(), dentally: no("Not specified") },
      { feature: "Recall effectiveness analytics", dentDock: yes(), dentally: yes() },
    ],
  },
  {
    title: "Payments",
    rows: [
      { feature: "Send payment links", dentDock: yes(), dentally: yes("Via Patient App") },
      { feature: "Late-cancellation fees", dentDock: yes(), dentally: no("Not specified") },
      { feature: "Patient receipts", dentDock: yes(), dentally: yes() },
      { feature: "Deposit collection at booking", dentDock: yes(), dentally: no("Not specified") },
    ],
  },
  {
    title: "Clinical",
    rows: [
      { feature: "Tooth / perio chart", dentDock: no(), dentally: yes() },
      { feature: "Treatment plan builder", dentDock: no(), dentally: yes() },
      { feature: "AI clinical note transcription", dentDock: no(), dentally: no("Not specified") },
      { feature: "Imaging integration", dentDock: no(), dentally: yes("Free with X-ray kit") },
    ],
  },
  {
    title: "NHS and multi-site",
    rows: [
      { feature: "NHS UDA / FP17 management", dentDock: no(), dentally: yes() },
      { feature: "NHS number capture", dentDock: yes("Field only"), dentally: yes() },
      { feature: "Multi-site practice management", dentDock: no("On the roadmap"), dentally: yes("Used by corporate groups") },
    ],
  },
  {
    title: "Support",
    rows: [
      { feature: "WhatsApp support line", dentDock: yes(), dentally: no() },
      { feature: "Email support", dentDock: yes(), dentally: yes() },
      { feature: "Phone support", dentDock: no("On the roadmap"), dentally: yes() },
      { feature: "Chat support", dentDock: yes(), dentally: no("Not specified") },
      { feature: "Dedicated consultant", dentDock: no(), dentally: yes("One assigned per practice") },
      { feature: "Customer success manager", dentDock: no(), dentally: yes() },
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
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const update = () => setIsTablet(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  const padY = lerp(16, 8);
  const padX = lerp(20, 16);
  const priceSize = isTablet ? lerp(18, 13) : lerp(22, 15);
  const subSize = isTablet ? lerp(12, 10) : lerp(13, 11);
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
      <div className="relative grid grid-cols-[45%_27.5%_27.5%] px-3 py-2 gap-3 lg:gap-0">
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
            style={{ fontSize: 12, letterSpacing: "0.14em" }}
          >
            ISMILE
          </span>
          <span
            className="font-medium text-[#0F172A]"
            style={{ fontSize: priceSize, letterSpacing: "-0.02em", marginTop: gap, transition, lineHeight: 1.1 }}
          >
            Pricing not listed
          </span>
          <span
            className="font-medium text-[#475569]"
            style={{ fontSize: 14, marginTop: 8, transition }}
          >
            demo and quote required
          </span>
        </div>
      </div>
    </div>
  );
}

function MobilePricingCards() {
  return (
    <div className="md:hidden sticky top-[64px] z-20 relative -mx-6 mt-2 px-6 pt-3 pb-8 mb-8 bg-white border-b border-[#E2E8F0] grid grid-cols-2 gap-3 items-stretch text-center before:pointer-events-none before:absolute before:inset-x-0 before:-top-16 before:h-16 before:-z-10 before:bg-white">
      <div
        style={{
          background: "linear-gradient(135deg, #EBF1FE 0%, #FFFFFF 100%)",
          border: "2px solid #2563EB",
          borderRadius: 14,
          padding: 10,
          boxShadow: "0 6px 16px -8px rgba(37,99,235,0.2)",
        }}
        className="flex flex-col items-center"
      >
        <span className="font-semibold text-[#2563EB]" style={{ fontSize: 11, letterSpacing: "0.02em" }}>
          Dent Dock
        </span>
        <span className="font-bold text-[#0F172A] tabular-nums mt-1" style={{ fontSize: 18, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          £49
        </span>
        <span className="font-medium text-[#475569] mt-0.5" style={{ fontSize: 10 }}>per month</span>
      </div>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 14,
          padding: 10,
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
        }}
        className="flex flex-col items-center"
      >
        <span className="font-semibold text-[#475569]" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
          ISMILE
        </span>
        <span className="font-bold text-[#0F172A] mt-1" style={{ fontSize: 13, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Pricing not listed
        </span>
        <span className="font-medium text-[#475569] mt-0.5" style={{ fontSize: 10 }}>demo and quote required</span>
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
        <div className="mx-auto max-w-[720px] text-center max-md:relative max-md:z-30">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Feature <span className="text-[#2563EB]">comparison</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Verified against ismiledental.co.uk on 17 May 2026.
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
              <div className="flex flex-col gap-8 md:hidden">
                {cat.rows.map((row) => (
                  <div
                    key={row.feature}
                    className="border-b border-[#F1F5F9] pb-8 last:border-0 last:pb-0"
                  >
                    <p className="text-[16px] font-medium text-[#0F172A]">{row.feature}</p>
                    <div className="mt-5 grid grid-cols-2 gap-3 items-start">
                      <div>
                        <StatusCell cell={row.dentDock} />
                      </div>
                      <div>
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