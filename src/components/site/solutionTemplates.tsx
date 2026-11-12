import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal, pillButton, primaryButton } from "@/components/site/ui";
import {
  Checklist,
  FaqSection,
  Fit,
  OtherAreas,
  Steps,
  type Faq,
  type Fact,
  type InternalLink,
  type OtherArea,
  type Step,
} from "@/components/site/templates";

/*
 * Solutions templates (problem pages and practice-type pages). Deliberately different from the
 * feature pages: problem first, then the fix.
 *   SolutionHero    centred heading, then a wide photo banner with DentDock cards
 *   CostBand        dark band: what the problem costs, in sourced figures
 *   BeforeAfter     "Without DentDock" vs "With DentDock"
 *   FixSteps        three numbered fixes, each with a DentDock card and a link to its feature page
 */

export type SolutionHeroContent = {
  crumbs: InternalLink[];
  title: string;
  highlight: string;
  intro: string;
  photo: { src: string; alt: string; height: number; position: string };
  /** DentDock cards placed over the banner edges (absolute positions from the caller). */
  cards: ReactNode;
};

export function SolutionHero({ hero }: { hero: SolutionHeroContent }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF1FF] via-[#F3F7FF] to-white pt-28 lg:pt-36 pb-12 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#64748B]">
            <Link to="/" className="hover:text-[#2563EB]">
              Home
            </Link>
            {hero.crumbs.map((c) => (
              <span key={c.to}>
                {" / "}
                <Link to={c.to as "/solutions"} className="hover:text-[#2563EB]">
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
          <h1
            className="font-semibold text-[#0F172A] text-[38px] leading-[1.12] md:text-[56px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {hero.title} <span className="text-[#2563EB]">{hero.highlight}</span>
          </h1>
          <p className="mt-6 text-[18px] text-[#334155] leading-[1.6] max-w-2xl mx-auto">
            {hero.intro}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/waitlist" className={primaryButton}>
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className={pillButton}>
              See pricing
            </Link>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="mx-auto max-w-5xl mt-12 md:mt-14">
        <div className="relative rounded-[32px] bg-white/70 ring-1 ring-[#DBEAFE] p-3 sm:p-4">
          <img
            src={hero.photo.src}
            alt={hero.photo.alt}
            width={1400}
            height={hero.photo.height}
            className={`w-full aspect-[16/9] md:aspect-[21/9] object-cover ${hero.photo.position} rounded-[24px]`}
          />
          {hero.cards}
        </div>
      </Reveal>
    </section>
  );
}

export function CostBand({
  title,
  highlight,
  intro,
  facts,
}: {
  title: string;
  highlight?: string;
  intro: string;
  facts: Fact[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#0F162B] py-16 md:py-24 px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 55% at 10% 0%, rgba(37,99,235,0.35), transparent 70%), radial-gradient(40% 50% at 95% 100%, rgba(56,189,248,0.16), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
            {title} {highlight && <span className="text-[#60A5FA]">{highlight}</span>}
          </h2>
          <p className="mt-5 text-[17px] text-[#CBD5E1] leading-[1.65]">{intro}</p>
        </Reveal>
        <div
          className={`mt-12 grid grid-cols-1 gap-5 ${facts.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}
        >
          {facts.map((f, i) => (
            <Reveal key={f.figure} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 flex flex-col">
                <p className="text-[40px] font-semibold tracking-tight text-white leading-none">
                  {f.figure}
                </p>
                <p className="mt-4 text-[15px] text-[#CBD5E1] leading-[1.6] flex-1">{f.text}</p>
                <a
                  href={f.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-[12px] text-[#94A3B8] underline decoration-white/20 underline-offset-2 hover:text-white"
                >
                  Source: {f.source.label}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter({
  title,
  highlight,
  without,
  withDentDock,
}: {
  title: string;
  highlight?: string;
  without: string[];
  withDentDock: string[];
}) {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            {title} {highlight && <span className="text-[#2563EB]">{highlight}</span>}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[28px] overflow-hidden border border-[#E5EDFB]">
          <Reveal className="bg-[#F8FAFC] p-8 md:p-10">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#64748B]">
              Without DentDock
            </p>
            <ul className="mt-6 space-y-4">
              {without.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3 text-[16px] text-[#475569] leading-[1.5]"
                >
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-[#E2E8F0] flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={2.5} />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={0.08}
            className="bg-gradient-to-br from-[#EFF6FF] to-[#E0EAFF] p-8 md:p-10"
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
              With DentDock
            </p>
            <ul className="mt-6 space-y-4">
              {withDentDock.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3 text-[16px] font-medium text-[#0F172A] leading-[1.5]"
                >
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export type Fix = { title: string; body: string; visual: ReactNode; link: InternalLink };

export function FixSteps({
  title,
  highlight,
  fixes,
}: {
  title: string;
  highlight?: string;
  fixes: Fix[];
}) {
  return (
    <section className="bg-gradient-to-b from-[#F7F9FF] via-[#F1F5FE] to-[#F7F9FF] border-y border-[#EEF2FB] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#2563EB] leading-[1.1]">
            {title} {highlight && <span className="text-[#0F172A]">{highlight}</span>}
          </h2>
        </Reveal>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {fixes.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <li className="h-full list-none rounded-3xl bg-white border border-[#E5EDFB] overflow-hidden flex flex-col">
                <div
                  aria-hidden="true"
                  className="relative h-[220px] bg-gradient-to-br from-[#EFF6FF] to-[#E0EAFF] flex items-center justify-center p-6"
                >
                  <span className="absolute left-5 top-5 w-9 h-9 rounded-full bg-[#2563EB] text-white text-[15px] font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {f.visual}
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-[20px] font-semibold text-[#0F172A] tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-[#475569] leading-[1.6] flex-1">{f.body}</p>
                  <Link
                    to={f.link.to as "/features"}
                    className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB] hover:gap-2.5 transition-all"
                  >
                    {f.link.label} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page templates                                                     */
/* ------------------------------------------------------------------ */

type BeforeAfterContent = {
  title: string;
  highlight?: string;
  without: string[];
  withDentDock: string[];
};
type CostContent = { title: string; highlight?: string; intro: string; facts: Fact[] };
type FeatureLinks = { title: string; highlight?: string; items: OtherArea[] };

export type ProblemSolutionContent = {
  hero: SolutionHeroContent;
  cost: CostContent;
  beforeAfter: BeforeAfterContent;
  fixes: { title: string; highlight?: string; items: Fix[] };
  checklist: {
    title: string;
    highlight?: string;
    intro?: string;
    items: { title: string; body: string }[];
  };
  features: FeatureLinks;
  faq: Faq[];
};

/** A practice problem: what it costs, before and after, the three fixes, a checklist, FAQ. */
export function ProblemSolutionPage({ content }: { content: ProblemSolutionContent }) {
  const c = content;
  return (
    <PageShell>
      <SolutionHero hero={c.hero} />
      <CostBand {...c.cost} />
      <BeforeAfter {...c.beforeAfter} />
      <FixSteps title={c.fixes.title} highlight={c.fixes.highlight} fixes={c.fixes.items} />
      <Checklist {...c.checklist} />
      <OtherAreas {...c.features} />
      <FaqSection items={c.faq} />
      <ClosingBand />
    </PageShell>
  );
}

export type AudienceSolutionContent = {
  hero: SolutionHeroContent;
  fit: {
    title: string;
    highlight?: string;
    yesTitle: string;
    yes: string[];
    noTitle: string;
    no: string[];
  };
  cost: CostContent;
  beforeAfter: BeforeAfterContent;
  fixes: { title: string; highlight?: string; items: Fix[] };
  steps: { title: string; highlight?: string; intro?: string; items: Step[] };
  features: FeatureLinks;
  faq: Faq[];
};

/** A type of practice: is it right for you, the market, before and after, what you get, switching, FAQ. */
export function AudienceSolutionPage({ content }: { content: AudienceSolutionContent }) {
  const c = content;
  return (
    <PageShell>
      <SolutionHero hero={c.hero} />
      <Fit {...c.fit} />
      <CostBand {...c.cost} />
      <BeforeAfter {...c.beforeAfter} />
      <FixSteps title={c.fixes.title} highlight={c.fixes.highlight} fixes={c.fixes.items} />
      <Steps
        title={c.steps.title}
        highlight={c.steps.highlight}
        intro={c.steps.intro}
        steps={c.steps.items}
      />
      <OtherAreas {...c.features} />
      <FaqSection items={c.faq} />
      <ClosingBand />
    </PageShell>
  );
}
