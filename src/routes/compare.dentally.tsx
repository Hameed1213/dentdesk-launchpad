import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarCheck,
  Zap,
  FileText,
  MessageSquare,
  Smartphone,
  Headphones,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/compare/dentally")({
  head: () => ({
    meta: [
      { title: "Dent Dock vs Dentally — honest comparison for UK practices" },
      {
        name: "description",
        content:
          "An honest comparison of Dent Dock and Dentally for UK private dental practices. Features, pricing and when to choose which.",
      },
      { property: "og:title", content: "Dent Dock vs Dentally — honest comparison for UK practices" },
      {
        property: "og:description",
        content:
          "An honest comparison of Dent Dock and Dentally for UK private dental practices. Features, pricing and when to choose which.",
      },
    ],
  }),
  component: CompareDentallyPage,
});

function CompareDentallyPage() {
  return (
    <main className="bg-white text-dd-foreground">
      <Hero />
      <HonestAnswer />
      <PricingComparison />
      <FeaturesGrid />
    </main>
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
            Not a teaser. Not a starter tier. Everything below is in our only
            plan.
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
        <h3 className="mt-6 text-[20px] font-semibold text-dd-foreground">
          {title}
        </h3>
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
            Dentally lists prices excluding VAT. Dent Dock is a flat practice
            price. Most UK dental services are VAT-exempt supplies — practices
            generally can't reclaim VAT on inputs — so the real cost to your
            practice is the inc-VAT figure.
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
          Pricing for 1 surgery, taken from dentally.com/en-gb/pricing on 15
          May 2026. Dentally charges per practice based on number of surgeries
          — see the Dentally pricing page for multi-surgery rates.
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
          <FitCard title="Dentally" intro="Dentally is the right fit if you need any of:" items={dentallyFit} />
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
      <h2 className="mt-3 text-[28px] font-semibold leading-tight text-dd-foreground">
        {title}
      </h2>
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
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-tint to-white pt-16 pb-12 lg:pt-24 lg:pb-16">
      {/* Aurora motif, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 85% 15%, rgba(37,99,235,0.20) 0%, rgba(37,99,235,0.10) 35%, rgba(37,99,235,0) 70%)",
          filter: "blur(40px)",
          maskImage:
            "linear-gradient(to bottom left, black 0%, black 35%, transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom left, black 0%, black 35%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="w-full lg:w-3/5">
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
            Dent Dock vs Dentally
          </h1>

          <p className="mt-6 max-w-[640px] text-[20px] leading-[1.6] text-dd-muted lg:text-[24px]">
            An honest comparison for UK private dental practices. We're new.
            Dentally is the market leader. Here's what each does, what each
            costs, and when to choose which.
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
            className="mt-6 inline-flex items-center gap-1 text-[14px] text-dd-muted underline-offset-4 transition-colors hover:text-brand-blue hover:underline"
          >
            Skip to the full feature comparison
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
