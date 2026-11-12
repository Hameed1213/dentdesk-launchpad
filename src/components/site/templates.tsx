import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageShell from "@/components/site/PageShell";
import {
  Bullets,
  ClosingBand,
  Reveal,
  TrustStrip,
  pillButton,
  primaryButton,
  rowHeading,
} from "@/components/site/ui";

/*
 * Page templates for the Platform and Solutions pages (docs/STYLE-GUIDE.md).
 * Each page passes its own content; the layout and styling stay the same everywhere.
 *
 *  PlatformPage   one feature area      (/features/...)
 *  ProblemPage    one practice problem   (/solutions/...)
 *  AudiencePage   one type of practice   (/solutions/...)
 */

/* ------------------------------------------------------------------ */
/* Content types                                                       */
/* ------------------------------------------------------------------ */

export type InternalLink = { label: string; to: string };

export type HeroContent = {
  /** Optional breadcrumb trail shown above the H1 (Home is added automatically). */
  crumbs?: InternalLink[];
  /** The page's one H1. `highlight` is shown in blue after `title`. */
  title: string;
  highlight: string;
  intro: string;
  secondary?: InternalLink;
  visual: ReactNode;
};

export type Row = {
  title: string;
  lead: string;
  points: string[];
  visual: ReactNode;
  link?: InternalLink;
};
export type Step = { title: string; body: string };
export type Faq = { question: string; answer: string };
export type Related = { title: string; body: string; to: string };
export type Fact = { figure: string; text: string; source: { label: string; url: string } };

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function SectionTitle({
  title,
  highlight,
  intro,
}: {
  title: string;
  highlight?: string;
  intro?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center mb-12 md:mb-14">
      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
        {title} {highlight && <span className="text-[#2563EB]">{highlight}</span>}
      </h2>
      {intro && <p className="mt-5 text-[17px] text-[#475569] leading-[1.6]">{intro}</p>}
    </Reveal>
  );
}

/** Split hero: H1, intro and buttons on the left, photo panel with DentDock cards on the right. */
export function PageHeroSplit({ hero }: { hero: HeroContent }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF1FF] via-[#F3F7FF] to-white pt-28 pb-16 lg:pt-36 lg:pb-20 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          {hero.crumbs && (
            <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-[#64748B]">
              <Link to="/" className="hover:text-[#2563EB]">
                Home
              </Link>
              {hero.crumbs.map((c) => (
                <span key={c.to}>
                  {" / "}
                  <Link to={c.to} className="hover:text-[#2563EB]">
                    {c.label}
                  </Link>
                </span>
              ))}
            </nav>
          )}
          <h1
            className="font-semibold text-[#0F172A] text-[38px] leading-[1.12] md:text-[52px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {hero.title} <span className="text-[#2563EB]">{hero.highlight}</span>
          </h1>
          <p className="mt-6 text-[18px] text-[#334155] leading-[1.6] max-w-xl">{hero.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/waitlist" className={primaryButton}>
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            {hero.secondary && (
              <Link to={hero.secondary.to} className={pillButton}>
                {hero.secondary.label}
              </Link>
            )}
          </div>
          <p className="mt-5 text-[14px] text-[#64748B]">
            £49 a month per practice · No contract · Live within the day
          </p>
        </Reveal>
        <Reveal delay={0.1}>{hero.visual}</Reveal>
      </div>
    </section>
  );
}

/** Alternating photo rows (text one side, photo panel the other). */
export function Rows({ rows }: { rows: Row[] }) {
  return (
    <section className="bg-gradient-to-b from-[#F7F9FF] via-[#F1F5FE] to-[#F7F9FF] border-y border-[#EEF2FB] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl space-y-16 md:space-y-24">
        {rows.map((r, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={r.title}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              <Reveal className={flip ? "lg:order-2" : ""}>
                <h2 className={rowHeading}>{r.title}</h2>
                <p className="mt-5 text-[17px] text-[#334155] leading-[1.6]">{r.lead}</p>
                <Bullets items={r.points} />
                {r.link && (
                  <Link to={r.link.to} className={`mt-8 ${pillButton}`}>
                    {r.link.label}
                  </Link>
                )}
              </Reveal>
              <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                {r.visual}
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Three (or so) numbered steps. */
export function Steps({
  title,
  highlight,
  intro,
  steps,
}: {
  title: string;
  highlight?: string;
  intro?: string;
  steps: Step[];
}) {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={title} highlight={highlight} intro={intro} />
        <ol
          className={`grid grid-cols-1 gap-5 ${steps.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}
        >
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="h-full rounded-3xl border border-[#E5EDFB] bg-gradient-to-b from-[#F5F8FF] to-white p-7 list-none">
                <span className="w-9 h-9 rounded-full border-2 border-[#2563EB] text-[#2563EB] text-[15px] font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[19px] font-semibold text-[#0F172A] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] text-[#475569] leading-[1.6]">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The problem, in the practice's words, with sourced facts. */
export function Challenge({
  title,
  highlight,
  paragraphs,
  facts,
}: {
  title: string;
  highlight?: string;
  paragraphs: string[];
  facts: Fact[];
}) {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            {title} {highlight && <span className="text-[#2563EB]">{highlight}</span>}
          </h2>
          <div className="mt-6 space-y-4">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-[17px] text-[#334155] leading-[1.7]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.figure} delay={i * 0.08}>
              <div className="rounded-3xl border border-[#E5EDFB] bg-gradient-to-b from-[#F5F8FF] to-white p-6">
                <p className="text-[34px] font-semibold tracking-tight text-[#2563EB] leading-none">
                  {f.figure}
                </p>
                <p className="mt-3 text-[15px] text-[#334155] leading-[1.6]">{f.text}</p>
                <a
                  href={f.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[13px] text-[#64748B] underline decoration-[#CBD5E1] underline-offset-2 hover:text-[#2563EB]"
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

/** A practical checklist with ticks (real DentDock settings where they apply). */
export function Checklist({
  title,
  highlight,
  intro,
  items,
}: {
  title: string;
  highlight?: string;
  intro?: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section className="bg-gradient-to-b from-[#EAF1FF] to-[#F2F6FF] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionTitle title={title} highlight={highlight} intro={intro} />
        <Reveal>
          <ul className="rounded-[28px] bg-white ring-1 ring-[#DBEAFE] divide-y divide-[#EEF2FB]">
            {items.map((it) => (
              <li key={it.title} className="flex gap-4 p-6 md:p-7">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-[17px] font-semibold text-[#0F172A]">{it.title}</p>
                  <p className="mt-1 text-[15px] text-[#475569] leading-[1.6]">{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Honest fit: who it's for, who it isn't for (or what it doesn't do yet). */
export function Fit({
  title,
  highlight,
  yesTitle,
  yes,
  noTitle,
  no,
}: {
  title: string;
  highlight?: string;
  yesTitle: string;
  yes: string[];
  noTitle: string;
  no: string[];
}) {
  return (
    <section className="bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionTitle title={title} highlight={highlight} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Reveal>
            <div className="h-full rounded-3xl border border-[#BFDBFE] bg-gradient-to-b from-[#EFF6FF] to-white p-7">
              <p className="text-[18px] font-semibold text-[#0F172A]">{yesTitle}</p>
              <ul className="mt-5 space-y-3">
                {yes.map((y) => (
                  <li
                    key={y}
                    className="flex items-start gap-3 text-[15px] text-[#334155] leading-[1.55]"
                  >
                    <Check
                      className="w-4 h-4 mt-1 text-[#2563EB] flex-shrink-0"
                      strokeWidth={2.5}
                    />
                    {y}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-neutral-200 bg-[#F8FAFC] p-7">
              <p className="text-[18px] font-semibold text-[#0F172A]">{noTitle}</p>
              <ul className="mt-5 space-y-3">
                {no.map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-3 text-[15px] text-[#475569] leading-[1.55]"
                  >
                    <X className="w-4 h-4 mt-1 text-[#94A3B8] flex-shrink-0" strokeWidth={2.5} />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** FAQ: every answer stays in the page HTML (Google and AI tools read it), closed ones hidden. */
export function FaqSection({
  title = "Frequently asked questions",
  items,
}: {
  title?: string;
  items: Faq[];
}) {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            {title}
          </h2>
        </Reveal>
        <Accordion type="single" collapsible className="w-full faq-accordion">
          {items.map((f, i) => (
            <AccordionItem key={f.question} value={`q${i}`} className="border-b border-[#EEEEEE]">
              <AccordionTrigger className="text-left text-[16px] sm:text-[17px] font-medium text-[#0F172A] py-5 hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent forceMount className="pb-5">
                <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#475569]">
                  {f.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/** Cards linking to related pages. Hover = blue border only. */
export function RelatedLinks({
  title,
  highlight,
  items,
}: {
  title: string;
  highlight?: string;
  items: Related[];
}) {
  return (
    <section className="bg-gradient-to-b from-white via-[#F5F8FF] to-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={title} highlight={highlight} />
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
        >
          {items.map((r, i) => (
            <Reveal key={r.to + r.title} delay={i * 0.06}>
              <Link
                to={r.to}
                className="group h-full rounded-3xl border border-[#E5EDFB] bg-white p-7 flex flex-col transition-colors duration-200 hover:border-[#2563EB]"
              >
                <h3 className="text-[19px] font-semibold text-[#0F172A] tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-2 text-[15px] text-[#475569] leading-[1.6] flex-1">{r.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
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

/** Feature rows (Jane style): an open row with a large DentDock screen, a heading, one line and short ticks. */
export type FeatureCard = { title: string; body: string; points?: string[]; visual: ReactNode };

export function FeatureCards({ items }: { items: FeatureCard[] }) {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-28 px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 30% at 100% 25%, rgba(219,234,254,0.7), transparent 70%), radial-gradient(45% 30% at 0% 70%, rgba(224,231,255,0.6), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl space-y-24 md:space-y-32">
        {items.map((f, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={f.title}
              className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center"
            >
              <Reveal className={flip ? "lg:order-2" : ""}>
                <h2 className="text-3xl md:text-[38px] font-semibold tracking-tight text-[#0F172A] leading-[1.15]">
                  {f.title}
                </h2>
                <p className="mt-4 text-[17px] text-[#475569] leading-[1.6]">{f.body}</p>
                {f.points && (
                  <ul className="mt-6 space-y-3">
                    {f.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-3 text-[16px] text-[#0F172A] leading-[1.5]"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#2563EB]" strokeWidth={3} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
              <Reveal delay={0.1} className={`${flip ? "lg:order-1" : ""} pb-6`}>
                <div aria-hidden="true">{f.visual}</div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** "How DentDock supports the rest of your practice": photo cards linking to other pages. */
export type OtherArea = { title: string; body: string; to: string; image: string; alt: string };

export function OtherAreas({
  title,
  highlight,
  items,
}: {
  title: string;
  highlight?: string;
  items: OtherArea[];
}) {
  return (
    <section className="bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            {title} {highlight && <span className="text-[#2563EB]">{highlight}</span>}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08}>
              <Link
                to={o.to}
                className="group h-full flex flex-col rounded-3xl overflow-hidden border border-[#E5EDFB] bg-white transition-colors duration-200 hover:border-[#2563EB]"
              >
                <img
                  src={o.image}
                  alt={o.alt}
                  width={1400}
                  height={933}
                  loading="lazy"
                  className="w-full aspect-[16/10] object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[19px] font-semibold text-[#0F172A] tracking-tight">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-[#475569] leading-[1.6] flex-1">{o.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
                    Find out more
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page templates                                                      */
/* ------------------------------------------------------------------ */

export type PlatformContent = {
  hero: HeroContent;
  features: FeatureCard[];
  others: { title: string; highlight?: string; items: OtherArea[] };
  faq: Faq[];
};

/** One feature area, kept short (Dentally style): hero, split feature cards, other areas, FAQ. */
export function PlatformPage({ content }: { content: PlatformContent }) {
  const c = content;
  return (
    <PageShell>
      <PageHeroSplit hero={c.hero} />
      <TrustStrip />
      <FeatureCards items={c.features} />
      <OtherAreas {...c.others} />
      <FaqSection items={c.faq} />
      <ClosingBand />
    </PageShell>
  );
}

export type ProblemContent = {
  hero: HeroContent;
  challenge: { title: string; highlight?: string; paragraphs: string[]; facts: Fact[] };
  rows: Row[];
  checklist: {
    title: string;
    highlight?: string;
    intro?: string;
    items: { title: string; body: string }[];
  };
  faq: Faq[];
  related: { title: string; highlight?: string; items: Related[] };
};

/** One practice problem: the challenge (sourced), how DentDock helps, a practical checklist, FAQ. */
export function ProblemPage({ content }: { content: ProblemContent }) {
  const c = content;
  return (
    <PageShell>
      <PageHeroSplit hero={c.hero} />
      <TrustStrip />
      <Challenge {...c.challenge} />
      <Rows rows={c.rows} />
      <Checklist {...c.checklist} />
      <RelatedLinks {...c.related} />
      <FaqSection items={c.faq} />
      <ClosingBand />
    </PageShell>
  );
}

export type AudienceContent = {
  hero: HeroContent;
  /** Optional market context with sourced facts, shown after the fit section. */
  context?: { title: string; highlight?: string; paragraphs: string[]; facts: Fact[] };
  fit: {
    title: string;
    highlight?: string;
    yesTitle: string;
    yes: string[];
    noTitle: string;
    no: string[];
  };
  rows: Row[];
  steps: { title: string; highlight?: string; intro?: string; items: Step[] };
  faq: Faq[];
  related: { title: string; highlight?: string; items: Related[] };
};

/** One type of practice: who it's for (and not), what they get, how to switch, FAQ. */
export function AudiencePage({ content }: { content: AudienceContent }) {
  const c = content;
  return (
    <PageShell>
      <PageHeroSplit hero={c.hero} />
      <TrustStrip />
      <Fit {...c.fit} />
      {c.context && <Challenge {...c.context} />}
      <Rows rows={c.rows} />
      <Steps
        title={c.steps.title}
        highlight={c.steps.highlight}
        intro={c.steps.intro}
        steps={c.steps.items}
      />
      <RelatedLinks {...c.related} />
      <FaqSection items={c.faq} />
      <ClosingBand />
    </PageShell>
  );
}

/* ------------------------------------------------------------------ */
/* Head (SEO) helper                                                   */
/* ------------------------------------------------------------------ */

const SITE = "https://dentdock.co.uk";

/** Title, description, canonical, Open Graph, breadcrumbs and FAQPage data for a template page. */
export function templateHead({
  path,
  title,
  description,
  crumbs,
  faq,
}: {
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  faq: Faq[];
}) {
  const url = `${SITE}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE}/og-image.png` },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${SITE}${c.path}`,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  };
}
