import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CalendarX,
  Check,
  FileText,
  MessageCircle,
  PhoneOff,
  RefreshCw,
  Upload,
} from "lucide-react";
import { WaitlistForm } from "@/components/home/HeroSection";

const WHATSAPP = "https://wa.me/447404488089";
const ENTRANCE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

/** Outline pill, like the "See all … features" buttons on Dentally's rows. */
const pillButton =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#2563EB] px-6 py-3 text-[15px] font-medium text-[#2563EB] transition-colors hover:bg-[#2563EB] hover:text-white";

/** Floating white card used on the pastel panels. z-10 keeps the absolutely placed ones in front. */
function FloatCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`z-10 rounded-2xl bg-white/95 backdrop-blur border border-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.22)] ${className}`}
    >
      {children}
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...ENTRANCE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Bullets({ items }: { items: string[] }) {
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

const rowHeading =
  "text-3xl md:text-[40px] font-semibold tracking-tight text-[#2563EB] leading-[1.15]";
const panel =
  "rounded-[28px] bg-gradient-to-br from-[#EFF6FF] via-[#E0EAFF] to-[#DBEAFE] ring-1 ring-white";
/** Panel for rows that sit on a tinted background: lighter, with an edge, so it stands off the tint. */
const panelOnTint =
  "rounded-[28px] bg-gradient-to-br from-white to-[#EEF4FF] ring-1 ring-[#DBEAFE]";

/* ------------------------------------------------------------------ */
/* Trust strip: three checkable facts in one bar                       */
/* ------------------------------------------------------------------ */

const trustItems = [
  { title: "UK data storage", detail: "Practice and patient records kept in London" },
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

/* ------------------------------------------------------------------ */
/* Feature rows: three alternating rows, text one side, panel the other */
/* ------------------------------------------------------------------ */

function BookingVisual() {
  return (
    <div className="relative h-full min-h-[360px] flex items-center justify-center p-6">
      <FloatCard className="w-[80%] max-w-[340px] p-5">
        <p className="text-[15px] font-semibold text-[#0F172A]">Book an appointment</p>
        <p className="mt-1 text-[12px] text-[#64748B]">Check-up · 30 min · Thu 14 Nov</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["9:00", "9:30", "10:15", "11:00", "14:30", "15:45"].map((t) => (
            <span
              key={t}
              className={`rounded-lg border px-2 py-2 text-center text-[12px] font-medium ${
                t === "9:30"
                  ? "border-[#2563EB] bg-[#2563EB] text-white"
                  : "border-neutral-200 text-[#334155]"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-[#2563EB] py-2 text-center text-[12px] font-semibold text-white">
          Confirm booking
        </div>
      </FloatCard>
      <FloatCard className="absolute right-[4%] bottom-[7%] w-[190px] p-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
          </span>
          <p className="text-[12px] font-semibold text-[#0F172A]">Medical history</p>
        </div>
        <ul className="mt-3 space-y-1.5">
          {["Medications", "Allergies", "Conditions"].map((l) => (
            <li key={l} className="flex items-center gap-2 text-[11px] text-[#475569]">
              <span className="w-3.5 h-3.5 rounded bg-[#2563EB] flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </span>
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] font-semibold text-emerald-600">
          Completed before the visit
        </p>
      </FloatCard>
    </div>
  );
}

function FrontDeskVisual() {
  return (
    <div className="relative h-full min-h-[360px] flex items-center justify-center p-6">
      <FloatCard className="absolute left-[6%] top-[8%] px-4 py-2.5 flex items-center gap-2">
        <Bell className="w-4 h-4 text-[#2563EB]" />
        <span className="text-[12px] font-medium text-[#0F172A]">Reminder sent to Sarah M.</span>
      </FloatCard>
      <FloatCard className="w-[84%] max-w-[360px] p-5 mt-6">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold text-[#0F172A]">Cancelled slot</p>
          <span className="text-[11px] text-[#64748B]">Thu 14 Nov · 10:30</span>
        </div>
        <div className="mt-4 rounded-xl border border-neutral-100">
          <div className="grid grid-cols-3 px-3 py-2 text-[11px] font-medium text-[#64748B] border-b border-neutral-100">
            <span>Patient</span>
            <span>Waiting for</span>
            <span className="text-right">Status</span>
          </div>
          {[
            { n: "James T.", w: "Check-up", offer: true },
            { n: "Priya K.", w: "Hygiene", offer: false },
            { n: "Tom R.", w: "Check-up", offer: false },
          ].map((r) => (
            <div
              key={r.n}
              className="grid grid-cols-3 items-center px-3 py-2.5 text-[12px] text-[#334155]"
            >
              <span>{r.n}</span>
              <span>{r.w}</span>
              <span className="text-right">
                {r.offer ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2.5 py-1 text-[11px] font-semibold text-white">
                    Offer slot <ArrowRight className="w-3 h-3" />
                  </span>
                ) : (
                  <span className="text-[11px] text-[#94A3B8]">On waitlist</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </FloatCard>
      <FloatCard className="absolute right-[5%] bottom-[7%] px-4 py-2.5 flex items-center gap-2">
        <RefreshCw className="w-4 h-4 text-[#2563EB]" />
        <span className="text-[12px] font-medium text-[#0F172A]">Recall due · follow-up sent</span>
      </FloatCard>
    </div>
  );
}

function MoneyVisual() {
  const bars = [38, 52, 46, 64, 58, 72, 80];
  return (
    <div className="relative h-full min-h-[360px] flex items-center justify-center p-6">
      <FloatCard className="w-[80%] max-w-[350px] p-5 mt-6">
        <p className="text-[15px] font-semibold text-[#0F172A]">Takings by clinician</p>
        <p className="mt-1 text-[12px] text-[#64748B]">This month</p>
        <div className="mt-5 flex items-end gap-2.5 h-[110px]">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-[#2563EB]" : "bg-[#BFDBFE]"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="mt-4 text-[11px] text-[#64748B]">Bookings from</p>
        <div className="mt-2 flex gap-2">
          {["Google", "Instagram", "Direct"].map((s) => (
            <span
              key={s}
              className="rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-medium text-[#2563EB]"
            >
              {s}
            </span>
          ))}
        </div>
      </FloatCard>
      <FloatCard className="absolute right-[5%] top-[7%] px-4 py-3">
        <p className="text-[11px] text-[#64748B]">Deposit paid</p>
        <p className="text-[18px] font-semibold text-[#0F172A]">£50.00</p>
        <p className="mt-0.5 text-[11px] font-semibold text-emerald-600">Paid online ✓</p>
      </FloatCard>
    </div>
  );
}

const featureRows = [
  {
    title: "Patients book and get ready before they arrive",
    lead: "Give patients a simple way to book and prepare with:",
    points: [
      "Online booking from your own booking page",
      "Digital forms and medical history",
      "A patient portal, no password or app needed",
    ],
    button: "See all patient features",
    Visual: BookingVisual,
  },
  {
    title: "Reminders and recalls that run on their own",
    lead: "Take the chasing off your practice team with:",
    points: [
      "Automatic email and text reminders",
      "Recalls that follow up for you",
      "A waitlist to fill cancelled slots",
    ],
    button: "See all reminder and recall features",
    Visual: FrontDeskVisual,
  },
  {
    title: "Get paid on time and know your numbers",
    lead: "See exactly how the practice is doing with:",
    points: [
      "Payments, deposits and payment links",
      "Reports and takings by clinician",
      "See where your bookings come from",
    ],
    button: "See payments and reports",
    Visual: MoneyVisual,
  },
];

export function FeatureRows() {
  return (
    <section className="bg-gradient-to-b from-[#F7F9FF] via-[#F1F5FE] to-[#F7F9FF] border-y border-[#EEF2FB] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl space-y-16 md:space-y-24">
        {featureRows.map(({ title, lead, points, button, Visual }, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={title}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <Reveal className={flip ? "lg:order-2" : ""}>
                <h2 className={rowHeading}>{title}</h2>
                <p className="mt-5 text-[17px] text-[#334155]">{lead}</p>
                <Bullets items={points} />
                <Link to="/features" className={`mt-8 ${pillButton}`}>
                  {button}
                </Link>
              </Reveal>
              <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                <div className={`${panel} overflow-hidden`} aria-hidden="true">
                  <Visual />
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What it solves: heading on the left, four tinted cards on the right */
/* ------------------------------------------------------------------ */

const solutions = [
  {
    Icon: CalendarX,
    title: "Reduce no-shows",
    body: "Patients get a reminder by email and text before every appointment, so fewer forget and fewer chairs sit empty.",
    tint: "from-[#EFF6FF] to-white",
  },
  {
    Icon: RefreshCw,
    title: "Fill cancelled appointments",
    body: "When a patient cancels, offer the free slot to patients on your waitlist in a couple of clicks, so the time isn't lost.",
    tint: "from-[#F0F9FF] to-white",
  },
  {
    Icon: PhoneOff,
    title: "Spend less time on the phone",
    body: "Patients book online and fill in their forms before they arrive, so your team isn't stuck on calls or chasing paperwork.",
    tint: "from-[#F0F9FF] to-white",
  },
  {
    Icon: Bell,
    title: "Bring patients back",
    body: "Recalls go out on time and follow up on their own, and you can send happy patients your Google review link.",
    tint: "from-[#EFF6FF] to-white",
  },
];

export function SolutionsGrid() {
  return (
    <section className="bg-white py-16 md:py-28 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-10 lg:gap-14 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Fixes for the problems{" "}
            <span className="text-[#2563EB]">your practice faces every day</span>
          </h2>
          <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">
            The everyday jobs that slow a practice down, handled by the software instead.
          </p>
          <Link to="/features" className={`mt-8 ${pillButton}`}>
            See all features
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {solutions.map(({ Icon, title, body, tint }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Link
                to="/features"
                className={`group h-full rounded-3xl border border-[#E5EDFB] bg-gradient-to-b ${tint} p-7 flex flex-col transition-colors duration-200 hover:border-[#2563EB]`}
              >
                <span className="w-12 h-12 rounded-2xl bg-white shadow-sm ring-1 ring-[#DBEAFE] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#2563EB]" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-[20px] font-semibold text-[#0F172A] tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] text-[#475569] leading-[1.6] flex-1">{body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
                  Find out more
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Support: photo with floating cards, text alongside                  */
/* Photos: Unsplash, free under the Unsplash licence                   */
/* (QzY81G7dbOo, HBMPQZZondc).                                         */
/* ------------------------------------------------------------------ */

export function SupportRow() {
  return (
    <section
      id="support"
      className="bg-gradient-to-b from-[#EAF1FF] to-[#F2F6FF] pt-16 md:pt-24 pb-14 md:pb-20 px-6 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal>
          <div className={`relative ${panelOnTint} p-6 sm:p-8`}>
            <img
              src="/images/home/support-phone.webp"
              alt="Woman smiling on a phone call at her desk"
              width={1400}
              height={788}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover object-[65%_50%] rounded-2xl"
            />
            <FloatCard className="absolute -left-3 sm:-left-6 bottom-6 sm:bottom-10 w-[210px] p-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <p className="text-[12px] font-semibold text-[#0F172A]">WhatsApp</p>
              </div>
              <p className="mt-3 rounded-xl rounded-tl-sm bg-neutral-100 px-3 py-2 text-[12px] text-[#334155]">
                How do I change our opening hours for Christmas?
              </p>
              <p className="mt-2 ml-5 rounded-xl rounded-tr-sm bg-[#DCFCE7] px-3 py-2 text-[12px] text-[#14532D]">
                Settings, then Opening hours. I'll walk you through it now.
              </p>
            </FloatCard>
            <FloatCard className="absolute -left-3 sm:-left-6 top-6 sm:top-10 px-4 py-2.5 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#2563EB]" />
              <span className="text-[12px] font-medium text-[#0F172A]">
                Real person, same-day reply
              </span>
            </FloatCard>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className={rowHeading}>Support from the people who built it</h2>
          <p className="mt-5 text-[17px] text-[#334155] leading-[1.6]">
            When you need help, you message us on WhatsApp and talk to someone who knows DentDock
            inside out, because they built it. No chatbot, no ticket number, no waiting days for an
            answer.
          </p>
          <Bullets
            items={[
              "Same-day replies on WhatsApp",
              "Help importing your patients from your current system",
              "Priority support for the first 30 practices",
            ]}
          />
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 ${pillButton}`}
          >
            Message us on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Switch in a day: text alongside a photo with floating cards         */
/* ------------------------------------------------------------------ */

const steps = [
  {
    title: "Set up your practice",
    body: "Opening hours, treatments and team. Reminders come ready to go.",
  },
  {
    title: "Bring your patients",
    body: "Upload your patient list as a CSV and DentDock matches the columns.",
  },
  {
    title: "Go live",
    body: "Share your booking link and let reminders and recalls start running.",
  },
];

export function SwitchRow() {
  return (
    <section className="bg-gradient-to-b from-[#F2F6FF] to-[#EAF1FF] pt-14 md:pt-20 pb-16 md:pb-24 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal className="lg:order-2">
          <div className={`relative ${panelOnTint} p-6 sm:p-8`}>
            <img
              src="/images/home/switching-laptop.webp"
              alt="Woman smiling while working on a laptop"
              width={1400}
              height={933}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover object-[70%_40%] rounded-2xl"
            />
            <FloatCard className="absolute -left-3 sm:-left-6 top-6 sm:top-10 w-[180px] p-4">
              <p className="text-[12px] font-semibold text-[#0F172A]">Practice setup</p>
              <ul className="mt-3 space-y-2">
                {["Opening hours", "Treatments", "Team"].map((l) => (
                  <li key={l} className="flex items-center gap-2 text-[12px] text-[#334155]">
                    <span className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
            </FloatCard>
            <div className="absolute -left-3 sm:-left-6 bottom-6 sm:bottom-10 z-10 flex flex-col items-start gap-2">
              <FloatCard className="px-4 py-2.5 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[12px] font-medium text-[#0F172A]">
                  patients.csv · columns matched
                </span>
              </FloatCard>
              <FloatCard className="px-4 py-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-medium text-[#0F172A]">Booking page is live</span>
              </FloatCard>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:order-1">
          <h2 className={rowHeading}>Switch in a single day</h2>
          <p className="mt-5 text-[17px] text-[#334155] leading-[1.6]">
            No kick-off calls and no site visits. Set it up yourself, with us on WhatsApp if you
            want a hand.
          </p>
          <ol className="mt-6 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="w-8 h-8 rounded-full border-2 border-[#2563EB] text-[#2563EB] text-[14px] font-semibold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[17px] font-semibold text-[#0F172A]">{s.title}</p>
                  <p className="mt-1 text-[15px] text-[#475569] leading-[1.6]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link to="/waitlist" className={`mt-8 ${pillButton}`}>
            Join the waitlist
          </Link>
        </Reveal>
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
