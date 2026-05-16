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
    </main>
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
