import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, MapPin, ShieldCheck, UserCheck } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import {
  ClosingBand,
  PhotoPanel,
  Reveal,
  TrustStrip,
  pillButton,
  primaryButton,
} from "@/components/site/ui";
import {
  FaqSection,
  PageHeroSplit,
  templateHead,
  type Faq,
  type OtherArea,
} from "@/components/site/templates";
import {
  BookingPriceCard,
  MedicalHistoryCard,
  PillCard,
  ReminderTimelineCard,
  TakingsCard,
  TextMessageCard,
} from "@/components/site/cards";
import { featurePages, type FeatureKey } from "@/components/site/featurePages";

/*
 * Features hub (Dentally "Platform" style): split hero, one large panel of alternating feature rows
 * (heading, one paragraph, Explore button, photo with a DentDock card), a security band, FAQ, banner.
 * Wording matches the individual feature pages, which were checked against the app on 12 Nov 2026.
 */

const PATH = "/features";

const L = "absolute left-2 sm:left-3 lg:-left-6";
const R = "absolute right-2 sm:right-3 lg:-right-6";
const T = "top-4 sm:top-6 lg:top-10";
const B = "bottom-4 sm:bottom-6 lg:bottom-10";

type HubRow = { key: FeatureKey; title: string; body: string; explore: string; card: ReactNode };

const rows: HubRow[] = [
  {
    key: "calendar",
    title: "A diary the whole team can work from",
    body: "A column for each clinician, clear visit statuses, and working hours, leave and blocked time, so everyone can see where the day is.",
    explore: "Explore the calendar",
    card: <PillCard className={`${L} ${B}`} icon="dot" text="James T. has arrived · 09:43" />,
  },
  {
    key: "booking",
    title: "Online booking and a patient portal",
    body: "Patients book the right treatment at a time that's really free, see your prices, and manage their own appointments with no password.",
    explore: "Explore online booking",
    card: <BookingPriceCard className={`${L} ${B}`} />,
  },
  {
    key: "reminders",
    title: "Reminders and recalls that send themselves",
    body: "Reminders 72 hours, 24 hours and 2 hours before every appointment, recalls that follow up until patients book, and a waitlist to fill gaps.",
    explore: "Explore reminders and recalls",
    card: <TextMessageCard className={`${R} ${B}`} when="Sent 24 hours before" />,
  },
  {
    key: "forms",
    title: "Forms filled in before patients arrive",
    body: "Health history and consent forms completed online and signed, with allergies, conditions and medications added to the patient's record.",
    explore: "Explore forms",
    card: <MedicalHistoryCard className={`${L} ${T}`} />,
  },
  {
    key: "payments",
    title: "Get paid without chasing",
    body: "Payment links, deposits and fair cancellation fees through your own Stripe account, with numbered receipts and refunds in one place.",
    explore: "Explore payments",
    card: <PillCard className={`${R} ${B}`} icon="dot" text="Payment link paid · £75.00" />,
  },
  {
    key: "reports",
    title: "Know how the practice is really doing",
    body: "Money taken by clinician and treatment, no-show and cancellation rates, where your bookings come from, and an export for your accountant.",
    explore: "Explore reports",
    card: <TakingsCard className={`${L} ${B}`} />,
  },
  {
    key: "switching",
    title: "Switch to DentDock in a day",
    body: "A guided setup, your patients brought across from a CSV with the columns matched for you, and help on WhatsApp if you want it.",
    explore: "Explore switching",
    card: <ReminderTimelineCard className={`${L} ${B}`} />,
  },
];

function HubRows() {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#2563EB] leading-[1.1]">
            Everything you need in one place
          </h2>
          <p className="mt-5 text-[18px] text-[#475569] leading-[1.6]">
            DentDock brings the diary, online booking, reminders, forms, payments and reports
            together, so your practice runs smoothly from the first booking to the last recall.
          </p>
        </Reveal>
        <div className="rounded-[40px] bg-gradient-to-br from-[#E8F0FF] via-[#F3F0FF] to-[#E6F4FF] px-6 py-12 sm:px-10 md:px-14 md:py-16 space-y-16 md:space-y-24">
          {rows.map((r, i) => {
            const f: OtherArea = featurePages[r.key];
            const flip = i % 2 === 1;
            return (
              <div
                key={r.key}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <PhotoPanel
                    src={f.image}
                    alt={f.alt}
                    height={934}
                    position={f.position ?? "object-center"}
                  >
                    {r.card}
                  </PhotoPanel>
                </Reveal>
                <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
                  <h3 className="text-[28px] md:text-[34px] font-semibold tracking-tight text-[#2563EB] leading-[1.18]">
                    {r.title}
                  </h3>
                  <p className="mt-4 text-[17px] text-[#334155] leading-[1.65]">{r.body}</p>
                  <Link to={f.to} className={`mt-7 ${pillButton}`}>
                    {r.explore}
                  </Link>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  const items = [
    { Icon: MapPin, text: "Stored in London, UK" },
    { Icon: Lock, text: "Encrypted in transit and at rest" },
    { Icon: UserCheck, text: "Two-step login for owners and managers" },
    { Icon: ShieldCheck, text: "ICO registered: ZC132966" },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F0FF] via-[#F1EEFF] to-[#E3F2FF] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <PhotoPanel
            src={featurePages.security.image}
            alt={featurePages.security.alt}
            height={1778}
            position={featurePages.security.position ?? ""}
          >
            <PillCard className={`${L} ${B}`} icon="dot" text="Two-step login on" />
          </PhotoPanel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            <span className="text-[#2563EB]">A partner</span> you can trust
          </h2>
          <p className="mt-5 text-[17px] text-[#334155] leading-[1.65]">
            Patient data is stored in the UK, encrypted, and only seen by the people in your team
            who need it. You can download everything at any time.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-2xl bg-white/70 ring-1 ring-white px-4 py-3 text-[15px] text-[#0F172A]"
              >
                <Icon className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/features/security" className={primaryButton}>
              Explore security and data
            </Link>
            <Link to="/dpa" className={pillButton}>
              Read our DPA
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const faq: Faq[] = [
  {
    question: "What does DentDock include?",
    answer:
      "The diary, online booking and a patient portal, reminders and recalls, a waitlist, digital forms and medical history, payments and deposits, and reports, all in one plan at £49 a month per practice.",
  },
  {
    question: "Is DentDock cloud-based?",
    answer:
      "Yes. It runs in your web browser on any computer, tablet or phone, with nothing to install. Your data is stored in London, UK.",
  },
  {
    question: "Does DentDock do NHS claims or charting?",
    answer:
      "No. DentDock is built for private practices and doesn't include NHS claims, UDAs, tooth charting or imaging.",
  },
  {
    question: "Can we bring our patients from our current system?",
    answer:
      "Yes. Export your patient list as a CSV and upload it. DentDock matches the columns for you, and brings across recall dates too.",
  },
  {
    question: "Is there a contract?",
    answer: "No. You pay monthly, there are no setup fees, and you can cancel any time.",
  },
];

export const Route = createFileRoute("/features/")({
  component: FeaturesPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental practice software features | DentDock",
      description:
        "Diary, online booking and patient portal, reminders and recalls, forms and medical history, payments and reports for UK private dental practices. £49 a month.",
      crumbs: [{ name: "Features", path: PATH }],
      faq,
    }),
});

function FeaturesPage() {
  return (
    <PageShell>
      <PageHeroSplit
        hero={{
          crumbs: [{ label: "Features", to: PATH }],
          title: "The software your",
          highlight: "practice runs on",
          intro:
            "Booking, reminders, forms, payments and reports in one simple system, built for UK private dental practices.",
          secondary: { label: "See pricing", to: "/pricing" },
          visual: (
            <PhotoPanel
              src="/images/home/dentist-patient.webp"
              alt="Dentist talking with a smiling patient in a modern surgery"
              height={1050}
              position="object-[45%_50%]"
            >
              <BookingPriceCard className={`${R} ${T}`} />
              <PillCard className={`${L} ${B}`} icon="refresh" text="Recall due · follow-up sent" />
            </PhotoPanel>
          ),
        }}
      />
      <TrustStrip />
      <HubRows />
      <TrustBand />
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
