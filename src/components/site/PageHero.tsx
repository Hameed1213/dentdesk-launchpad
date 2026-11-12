import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  secondary?: { label: string; to: "/pricing" | "/features" | "/compare" };
};

/** Top of a marketing page: small label, the page's one H1, a line of intro, the waitlist button. */
export default function PageHero({ eyebrow, title, intro, secondary }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-tint to-white pt-28 pb-12 lg:pt-36 lg:pb-16">
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
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-[14px] font-semibold uppercase text-brand-blue" style={{ letterSpacing: "0.14em" }}>
          {eyebrow}
        </p>
        <h1
          className="mt-5 font-semibold text-dd-foreground text-[40px] leading-[1.15] lg:text-[60px]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        <p className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">{intro}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link
            to="/waitlist"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1d4ed8]"
          >
            Join the waitlist <ArrowRight className="w-4 h-4" />
          </Link>
          {secondary && (
            <Link
              to={secondary.to}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2563EB] px-6 py-3 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]"
            >
              {secondary.label}
            </Link>
          )}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] sm:text-[14px] text-dd-subtle">
          <span>No contracts</span>
          <span aria-hidden="true">·</span>
          <span>No setup fees</span>
          <span aria-hidden="true">·</span>
          <span>Live within the day</span>
        </div>
      </div>
    </section>
  );
}
