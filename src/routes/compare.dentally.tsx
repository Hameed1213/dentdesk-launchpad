import { createFileRoute } from "@tanstack/react-router";

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
    </main>
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
