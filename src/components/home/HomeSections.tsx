import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarCheck,
  Check,
  FileDown,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Upload,
  UserRound,
  Wrench,
} from "lucide-react";
import { WaitlistForm } from "@/components/home/HeroSection";

const WHATSAPP = "https://wa.me/447404488089";
const ENTRANCE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

function SectionHeading({ eyebrow, title, intro }: { eyebrow?: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={ENTRANCE}
      className="mx-auto max-w-2xl text-center mb-12 md:mb-16"
    >
      {eyebrow && (
        <p className="text-[13px] font-semibold uppercase text-brand-blue mb-4" style={{ letterSpacing: "0.14em" }}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">{title}</h2>
      {intro && <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{intro}</p>}
    </motion.div>
  );
}

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1d4ed8]";
const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#2563EB] px-6 py-3 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]";

/* ------------------------------------------------------------------ */
/* Trust strip: checkable facts, straight under the hero               */
/* ------------------------------------------------------------------ */

const trustItems = [
  { Icon: MapPin, text: "Data stored in London, UK" },
  { Icon: ShieldCheck, text: "ICO registered (ZC132966)" },
  { Icon: MessageCircle, text: "Same-day WhatsApp support" },
  { Icon: FileDown, text: "Export your data any time" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why practices can trust DentDock" className="bg-white border-y border-neutral-100">
      <ul className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {trustItems.map(({ Icon, text }) => (
          <li key={text} className="flex items-center gap-3 justify-start lg:justify-center">
            <span className="w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-[#2563EB]" strokeWidth={2} />
            </span>
            <span className="text-[14px] font-medium text-[#0F172A]">{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What DentDock does: three blocks, each linking out                  */
/* ------------------------------------------------------------------ */

const featureBlocks = [
  {
    Icon: CalendarCheck,
    label: "Patients",
    title: "Patients book and fill in their forms before they arrive",
    points: [
      "Online booking from your own booking page",
      "Digital forms and medical history",
      "A patient portal, no password or app needed",
    ],
    link: "See patient features",
  },
  {
    Icon: Bell,
    label: "Front desk",
    title: "Reminders and recalls go out on their own",
    points: [
      "Automatic email and text reminders",
      "Recalls that follow up for you",
      "A waitlist to fill cancelled slots",
    ],
    link: "See front desk features",
  },
  {
    Icon: BarChart3,
    label: "Money and numbers",
    title: "Get paid and know your numbers",
    points: [
      "Payments, deposits and payment links",
      "Reports and takings by clinician",
      "See where your bookings come from",
    ],
    link: "See payments and reports",
  },
];

export function FeatureBlocks() {
  return (
    <section className="relative bg-gradient-to-b from-white via-[#F5F8FF] to-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What DentDock does"
          title={
            <>
              One system for your <span className="text-[#2563EB]">whole practice day</span>
            </>
          }
          intro="From the first booking to the last recall, without three separate tools and three separate bills."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featureBlocks.map(({ Icon, label, title, points, link }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...ENTRANCE, delay: i * 0.1 }}
              className="rounded-2xl border border-neutral-200 bg-white p-7 flex flex-col shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
                </span>
                <span className="text-[13px] font-semibold uppercase text-[#2563EB]" style={{ letterSpacing: "0.1em" }}>
                  {label}
                </span>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold text-foreground tracking-tight leading-snug">{title}</h3>
              <ul className="mt-5 space-y-3 flex-1">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] text-[#475569] leading-[1.5]">
                    <Check className="w-4 h-4 text-[#2563EB] mt-1 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to="/features" className="mt-6 text-[14px] font-medium text-[#2563EB] hover:underline">
                {link} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Support                                                             */
/* ------------------------------------------------------------------ */

const supportPoints = [
  {
    Icon: MessageCircle,
    title: "WhatsApp, same-day reply",
    body: "Message us on WhatsApp and a real person replies the same day. No chatbot, no ticket queue, no escalation form.",
  },
  {
    Icon: Wrench,
    title: "The person who built it fixes it",
    body: "Your message goes straight to the person who built DentDock. Nothing is outsourced, and nothing is passed along a chain.",
  },
  {
    Icon: Upload,
    title: "Help moving your patients",
    body: "Export your patient list from your current system as a CSV. We'll help you match the columns so nothing gets lost.",
  },
  {
    Icon: UserRound,
    title: "Set up with you, not left to you",
    body: "The first 30 practices get priority support and help shaping what we build next.",
  },
];

export function SupportSection() {
  return (
    <section id="support" className="relative bg-[#0F162B] py-16 md:py-24 px-6 overflow-hidden scroll-mt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 85% 10%, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%), radial-gradient(40% 50% at 10% 90%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={ENTRANCE}
          className="mx-auto max-w-2xl text-center mb-12 md:mb-16"
        >
          <p className="text-[13px] font-semibold uppercase text-[#60A5FA] mb-4" style={{ letterSpacing: "0.14em" }}>
            Support
          </p>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
            Real support from <span className="text-[#60A5FA]">the people who built it</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-[#CBD5E1] leading-relaxed">
            Most dental software companies sell you the product and disappear. We do the opposite: when you need help,
            you talk to a real person who knows DentDock inside out.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {supportPoints.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...ENTRANCE, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
            >
              <span className="w-10 h-10 rounded-xl bg-[#2563EB]/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#93C5FD]" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-[19px] font-semibold text-white tracking-tight">{title}</h3>
              <p className="mt-2 text-[15px] text-[#CBD5E1] leading-[1.6]">{body}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={primaryButton}>
            <MessageCircle className="w-4 h-4" /> Message us on WhatsApp
          </a>
          <Link
            to="/waitlist"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Join the waitlist <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="mt-4 text-center text-[13px] text-[#94A3B8]">
          Please don't send patient details over WhatsApp.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Switch in a day                                                     */
/* ------------------------------------------------------------------ */

const steps = [
  {
    title: "Set up your practice",
    body: "Add your opening hours, treatments and team. Reminders and automations come ready with sensible defaults.",
  },
  {
    title: "Bring your patients",
    body: "Export your patient list as a CSV from your current system and upload it. DentDock matches the columns for you.",
  },
  {
    title: "Go live",
    body: "Share your booking link and let reminders and recalls start running. Most practices are live within the day.",
  },
];

export function SwitchSteps() {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Switching"
          title={
            <>
              Switch in <span className="text-[#2563EB]">a single day</span>
            </>
          }
          intro="Set it up yourself, with us on WhatsApp if you want a hand."
        />
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...ENTRANCE, delay: i * 0.1 }}
              className="rounded-2xl border border-neutral-200 bg-[#F8FAFC] p-7"
            >
              <span className="w-9 h-9 rounded-full bg-[#2563EB] text-white text-[15px] font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[19px] font-semibold text-foreground tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[15px] text-[#475569] leading-[1.6]">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing teaser                                                      */
/* ------------------------------------------------------------------ */

const included = [
  "Unlimited dentists and staff",
  "Online booking and patient portal",
  "Automated reminders and recalls",
  "200 texts a month included, then 8p",
  "Payments and deposits",
  "Priority WhatsApp support",
];

export function PricingTeaser() {
  return (
    <section className="relative bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl rounded-3xl border border-neutral-200 bg-white p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-[13px] font-semibold uppercase text-brand-blue" style={{ letterSpacing: "0.14em" }}>
            Pricing
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            One plan. <span className="text-[#2563EB]">£49 a month.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Per practice, not per user. No setup fees, no contract, and the price is on the website, not behind a sales call.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/waitlist" className={primaryButton}>
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className={secondaryButton}>
              See full pricing
            </Link>
          </div>
        </div>
        <ul className="space-y-3.5">
          {included.map((item) => (
            <li key={item} className="flex items-center gap-3 text-[15px] text-[#0F172A]">
              <span className="w-6 h-6 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={2.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing band                                                        */
/* ------------------------------------------------------------------ */

export function ClosingBand() {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
          Ready for software that <span className="text-[#2563EB]">works for you?</span>
        </h2>
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
          Join the waitlist and be one of the first 30 practices on DentDock.
        </p>
        <WaitlistForm className="mt-8" />
      </div>
    </section>
  );
}
