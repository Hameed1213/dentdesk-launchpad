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
import {
  Bullets,
  FloatCard,
  PhotoPanel,
  Reveal,
  WHATSAPP,
  panelOnTint,
  pillButton,
  rowHeading,
} from "@/components/site/ui";

export { ClosingBand, TrustStrip } from "@/components/site/ui";

/* ------------------------------------------------------------------ */
/* Feature rows: three alternating rows, text one side, panel the other */
/* ------------------------------------------------------------------ */

function BookingVisual() {
  return (
    <PhotoPanel
      src="/images/home/patient-booking.webp"
      alt="Woman smiling while booking on her phone"
      height={933}
      position="object-[50%_40%]"
    >
      <FloatCard className="absolute right-2 sm:right-3 lg:-right-6 bottom-4 sm:bottom-6 lg:bottom-10 w-[220px] p-4">
        <p className="text-[13px] font-semibold text-[#0F172A]">Book an appointment</p>
        <p className="mt-0.5 text-[11px] text-[#64748B]">Check-up · 30 min · Thu 14 Nov</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["9:00", "9:30", "10:15"].map((t) => (
            <span
              key={t}
              className={`rounded-md border px-1 py-1.5 text-center text-[11px] font-medium ${
                t === "9:30"
                  ? "border-[#2563EB] bg-[#2563EB] text-white"
                  : "border-neutral-200 text-[#334155]"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-md bg-[#2563EB] py-1.5 text-center text-[11px] font-semibold text-white">
          Confirm booking
        </div>
      </FloatCard>
      <FloatCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10 w-[180px] p-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-[#EFF6FF] flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
          </span>
          <p className="text-[12px] font-semibold text-[#0F172A]">Medical history</p>
        </div>
        <ul className="mt-2.5 space-y-1.5">
          {["Medications", "Allergies", "Conditions"].map((l) => (
            <li key={l} className="flex items-center gap-2 text-[11px] text-[#475569]">
              <span className="w-3.5 h-3.5 rounded bg-[#2563EB] flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
              </span>
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-2.5 text-[11px] font-semibold text-emerald-600">
          Completed before the visit
        </p>
      </FloatCard>
    </PhotoPanel>
  );
}

function FrontDeskVisual() {
  return (
    <PhotoPanel
      src="/images/home/dentist-patient.webp"
      alt="Dentist talking with a smiling patient in a modern surgery"
      height={1050}
      position="object-[45%_50%]"
    >
      <FloatCard className="absolute right-2 sm:right-3 lg:-right-6 top-4 sm:top-6 lg:top-10 px-4 py-2.5 flex items-center gap-2">
        <Bell className="w-4 h-4 text-[#2563EB]" />
        <span className="text-[12px] font-medium text-[#0F172A]">Reminder sent to Sarah M.</span>
      </FloatCard>
      <FloatCard className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10 w-[240px] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-[#0F172A]">Cancelled slot</p>
          <span className="text-[10px] text-[#64748B]">Thu · 10:30</span>
        </div>
        <div className="mt-2.5 space-y-1.5">
          {[
            { n: "James T.", offer: true },
            { n: "Priya K.", offer: false },
          ].map((r) => (
            <div
              key={r.n}
              className="flex items-center justify-between rounded-lg border border-neutral-100 px-2.5 py-1.5 text-[11px] text-[#334155]"
            >
              <span>{r.n}</span>
              {r.offer ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2 py-0.5 text-[10px] font-semibold text-white">
                  Offer slot <ArrowRight className="w-3 h-3" />
                </span>
              ) : (
                <span className="text-[10px] text-[#94A3B8]">On waitlist</span>
              )}
            </div>
          ))}
        </div>
      </FloatCard>
      <FloatCard className="absolute right-2 sm:right-3 lg:-right-6 bottom-4 sm:bottom-6 lg:bottom-10 px-4 py-2.5 flex items-center gap-2">
        <RefreshCw className="w-4 h-4 text-[#2563EB]" />
        <span className="text-[12px] font-medium text-[#0F172A]">Recall due · follow-up sent</span>
      </FloatCard>
    </PhotoPanel>
  );
}

function MoneyVisual() {
  const bars = [38, 52, 46, 64, 58, 72, 80];
  return (
    <PhotoPanel
      src="/images/home/practice-laptop.webp"
      alt="Practice manager working on a laptop at her desk"
      height={933}
      position="object-[70%_40%]"
    >
      <FloatCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10 w-[210px] p-4">
        <p className="text-[13px] font-semibold text-[#0F172A]">Takings by clinician</p>
        <p className="mt-0.5 text-[11px] text-[#64748B]">This month</p>
        <div className="mt-3 flex items-end gap-1.5 h-[56px]">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t ${i === bars.length - 1 ? "bg-[#2563EB]" : "bg-[#BFDBFE]"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex gap-1.5">
          {["Google", "Instagram", "Direct"].map((src) => (
            <span
              key={src}
              className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-medium text-[#2563EB]"
            >
              {src}
            </span>
          ))}
        </div>
      </FloatCard>
      <FloatCard className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10 px-4 py-3">
        <p className="text-[11px] text-[#64748B]">Deposit paid</p>
        <p className="text-[18px] font-semibold text-[#0F172A]">£50.00</p>
        <p className="mt-0.5 text-[11px] font-semibold text-emerald-600">Paid online ✓</p>
      </FloatCard>
    </PhotoPanel>
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
                <Visual />
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
/* (CPs2X8JYmS8, HBMPQZZondc, eL4xIEuHzzk, Bg81yWKZlMg, iNiGA6063y8).                                         */
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
              src="/images/home/support-dev.webp"
              alt="Developers working at their screens in a bright office"
              width={1400}
              height={933}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover object-[70%_50%] rounded-2xl"
            />
            <FloatCard className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10 w-[210px] p-4">
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
            <FloatCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10 px-4 py-2.5 flex items-center gap-2">
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
            <FloatCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10 w-[180px] p-4">
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
            <div className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10 z-10 flex flex-col items-start gap-2">
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
