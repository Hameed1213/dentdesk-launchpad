import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, photoSrcSet, pillButton, primaryButton } from "@/components/site/ui";
import { FaqSection } from "@/components/site/templates";
import { featurePages } from "@/components/site/featurePages";
import { AUTHOR } from "@/components/site/schema";
import {
  FEES_TITLE,
  FeesGuideBody,
  GuideLook,
  feesFaq,
  feesToc,
} from "@/components/site/guideFees";

/*
 * MOCK-UPS ONLY (20 Nov 2026): three layouts for a guide page, for Hariss to choose from. Inspired by
 * Dentally's blog layout (author card, topic tags, bold intro, about-the-author, related cards),
 * with the "share" and "follow us on social media" parts replaced by links to the DentDock solution
 * and feature pages the guide is about. These routes are noindex and are never merged; the chosen
 * layout replaces the live guide template.
 */

const LEAD =
  "Deposits and late-cancellation fees in UK private dentistry: what's allowed, how to tell patients, when to waive a fee, and a policy template you can adapt.";
const TAGS = ["Cancellations and fees", "Private practice"];
const UPDATED = "12 November 2026";
const MINUTES = 7;

/** The DentDock pages this guide is about: shown instead of share buttons and social links. */
const RELATED = [
  {
    kind: "Solution",
    title: "Deposits and late cancellations",
    body: "Deposits on the treatments you choose, and fees your team decides case by case.",
    to: "/solutions/deposits-and-late-cancellations",
    image: "/images/solutions/deposits.webp",
    alt: "Patient paying by card on a card reader",
  },
  {
    kind: "Feature",
    title: featurePages.payments.title,
    body: featurePages.payments.body,
    to: featurePages.payments.to,
    image: featurePages.payments.image,
    alt: featurePages.payments.alt,
  },
  {
    kind: "Solution",
    title: "Reduce no-shows",
    body: "Reminders before every appointment, an easy way to cancel, and a waitlist to refill the gap.",
    to: "/solutions/reduce-no-shows",
    image: "/images/solutions/no-shows.webp",
    alt: "Empty dental chair in a bright surgery",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function Avatar({ size = 56 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] font-semibold text-[#1D4ED8]"
    >
      HH
    </span>
  );
}

function Crumbs() {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B]">
      <Link to="/" className="hover:text-[#2563EB]">
        Home
      </Link>
      {" / "}
      <Link to="/guides" className="hover:text-[#2563EB]">
        Guides
      </Link>
    </nav>
  );
}

function Tags() {
  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map((t) => (
        <span
          key={t}
          className="rounded-full bg-[#EEF4FF] px-4 py-1.5 text-[14px] font-medium text-[#1D4ED8]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function AuthorBlock() {
  return (
    <div className="flex items-center gap-4">
      <Avatar />
      <div>
        <p className="text-[13px] text-[#64748B]">Author</p>
        <Link to="/about" className="text-[17px] font-semibold text-[#0F172A] hover:text-[#2563EB]">
          {AUTHOR.name}
        </Link>
        <p className="text-[13px] text-[#64748B]">{AUTHOR.jobTitle}</p>
      </div>
    </div>
  );
}

/** Sidebar card that replaces "Share this article": the DentDock pages the guide is about. */
function InDentDockCard() {
  return (
    <div className="rounded-3xl bg-[#F1F5FE] p-6">
      <p className="text-[17px] font-semibold text-[#0F172A]">Do this in DentDock</p>
      <ul className="mt-4 space-y-3">
        {RELATED.slice(0, 2).map((r) => (
          <li key={r.to}>
            <Link
              to={r.to}
              className="group flex items-start justify-between gap-3 rounded-2xl border border-transparent bg-white px-4 py-3 transition-colors hover:border-[#2563EB]"
            >
              <span>
                <span className="block text-[12px] font-medium text-[#64748B]">{r.kind}</span>
                <span className="block text-[15px] font-semibold text-[#0F172A]">{r.title}</span>
              </span>
              <ArrowRight className="mt-4 h-4 w-4 flex-shrink-0 text-[#2563EB] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AboutAuthor() {
  return (
    <div className="rounded-[28px] bg-[#F1F5FE] p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <Avatar size={96} />
      <div>
        <p className="text-[14px] text-[#64748B]">About the author</p>
        <p className="mt-1 text-[24px] font-semibold tracking-tight text-[#0F172A]">
          {AUTHOR.name}
        </p>
        <p className="mt-2 text-[16px] text-[#334155] leading-[1.6] max-w-xl">
          {AUTHOR.name} is the founder of DentDock, practice software for UK private dental
          practices.
        </p>
        <Link
          to="/guides"
          className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2563EB]"
        >
          Read more guides <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function RelatedCard({ r }: { r: (typeof RELATED)[number] }) {
  return (
    <Link
      to={r.to}
      className="group h-full flex flex-col rounded-3xl overflow-hidden border border-[#E5EDFB] bg-white transition-colors duration-200 hover:border-[#2563EB]"
    >
      <img
        src={r.image}
        srcSet={photoSrcSet(r.image)}
        sizes="(min-width: 1024px) 360px, calc(100vw - 48px)"
        alt={r.alt}
        width={1400}
        height={933}
        loading="lazy"
        className="w-full aspect-[16/10] object-cover"
      />
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[13px] font-medium text-[#64748B]">{r.kind}</p>
        <h3 className="mt-1 text-[19px] font-semibold text-[#0F172A] tracking-tight">{r.title}</h3>
        <p className="mt-2 text-[15px] text-[#475569] leading-[1.6] flex-1">{r.body}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
          See {r.title.charAt(0).toLowerCase() + r.title.slice(1)}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function H1() {
  return (
    <h1
      className="font-semibold text-[#0F172A] text-[36px] leading-[1.15] md:text-[50px]"
      style={{ letterSpacing: "-0.03em" }}
    >
      {FEES_TITLE}
    </h1>
  );
}

function Meta() {
  return (
    <p className="text-[14px] text-[#64748B]">
      Updated {UPDATED} · {MINUTES} min read
    </p>
  );
}

/** Replaces "Connect with us on social media": the band that sends readers to the product. */
function SeeItInDentDockBand() {
  return (
    <section className="px-6 py-16 md:py-24 bg-gradient-to-br from-[#EAF1FF] via-[#F2F6FF] to-[#E0EAFF]">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#0F172A]">
            See how DentDock handles <span className="text-[#2563EB]">cancellations and fees</span>
          </h2>
          <p className="mt-4 text-[17px] text-[#334155] leading-[1.6]">
            Everything in this guide, set up in your practice software.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {RELATED.map((r) => (
            <RelatedCard key={r.to} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Option A: sidebar (closest to Dentally)                             */
/* ------------------------------------------------------------------ */

export function GuideLayoutA() {
  return (
    <PageShell>
      <article>
        <header className="bg-gradient-to-b from-[#EAF1FF] via-[#F3F7FF] to-white pt-28 lg:pt-36 pb-12 px-6">
          <div className="mx-auto max-w-6xl">
            <Crumbs />
            <div className="mt-6 max-w-4xl">
              <H1 />
              <div className="mt-5">
                <Meta />
              </div>
            </div>
          </div>
        </header>
        <div className="bg-white px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
            <aside className="space-y-6 lg:sticky lg:top-28 self-start">
              <AuthorBlock />
              <InDentDockCard />
            </aside>
            <div className="max-w-3xl">
              <Tags />
              <p className="mt-6 text-[19px] font-semibold italic text-[#0F172A] leading-[1.6]">
                {LEAD}
              </p>
              <div className="mt-8">
                <FeesGuideBody />
              </div>
              <div className="mt-14">
                <AboutAuthor />
              </div>
            </div>
          </div>
        </div>
      </article>
      <SeeItInDentDockBand />
      <FaqSection items={feesFaq} />
      <ClosingBand />
    </PageShell>
  );
}

/* ------------------------------------------------------------------ */
/* Option B: one centred column, inline product callout                */
/* ------------------------------------------------------------------ */

export function GuideLayoutB() {
  const solution = RELATED[0];
  return (
    <PageShell>
      <article>
        <header className="bg-gradient-to-b from-[#EAF1FF] via-[#F3F7FF] to-white pt-28 lg:pt-36 pb-10 px-6">
          <div className="mx-auto max-w-3xl">
            <Crumbs />
            <div className="mt-6">
              <Tags />
            </div>
            <div className="mt-5">
              <H1 />
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-[#E5EDFB] pt-6">
              <Avatar size={48} />
              <div>
                <Link
                  to="/about"
                  className="text-[16px] font-semibold text-[#0F172A] hover:text-[#2563EB]"
                >
                  {AUTHOR.name}
                </Link>
                <p className="text-[14px] text-[#64748B]">
                  {AUTHOR.jobTitle} · Updated {UPDATED} · {MINUTES} min read
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="bg-white px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-[19px] font-semibold italic text-[#0F172A] leading-[1.6]">
              {LEAD}
            </p>
            <FeesGuideBody />
            {/* Product callout card in the reading flow, instead of share buttons. */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-[200px_1fr] overflow-hidden rounded-3xl border border-[#BFDBFE] bg-[#F5F8FF]">
              <img
                src={solution.image}
                srcSet={photoSrcSet(solution.image)}
                sizes="200px"
                alt={solution.alt}
                width={1400}
                height={933}
                loading="lazy"
                className="h-full w-full object-cover aspect-[16/10] sm:aspect-auto"
              />
              <div className="p-6">
                <p className="text-[13px] font-medium text-[#64748B]">
                  DentDock {solution.kind.toLowerCase()}
                </p>
                <p className="mt-1 text-[20px] font-semibold text-[#0F172A]">{solution.title}</p>
                <p className="mt-2 text-[15px] text-[#475569] leading-[1.6]">{solution.body}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to={solution.to} className={primaryButton}>
                    See the solution <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={RELATED[1].to} className={pillButton}>
                    See payments
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <AboutAuthor />
            </div>
          </div>
        </div>
      </article>
      <section className="bg-[#F7F9FF] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl md:text-5xl font-medium tracking-tight text-[#0F172A]">
            Put this <span className="text-[#2563EB]">into practice</span>
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED.map((r) => (
              <RelatedCard key={r.to} r={r} />
            ))}
          </div>
        </div>
      </section>
      <FaqSection items={feesFaq} />
      <ClosingBand />
    </PageShell>
  );
}

/* ------------------------------------------------------------------ */
/* Option C: table of contents on the left, product panel at the end   */
/* ------------------------------------------------------------------ */

export function GuideLayoutC() {
  const solution = RELATED[0];
  return (
    <PageShell>
      <article>
        <header className="bg-gradient-to-b from-[#EAF1FF] via-[#F3F7FF] to-white pt-28 lg:pt-36 pb-12 px-6">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-end">
            <div>
              <Crumbs />
              <div className="mt-6">
                <H1 />
              </div>
              <p className="mt-6 text-[19px] font-semibold italic text-[#0F172A] leading-[1.6] max-w-3xl">
                {LEAD}
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 border border-[#DBEAFE] p-5">
              <AuthorBlock />
              <div className="mt-4 border-t border-[#E5EDFB] pt-4">
                <Meta />
                <div className="mt-3">
                  <Tags />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="bg-white px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
            <aside className="hidden lg:block lg:sticky lg:top-28 self-start">
              <p className="text-[13px] font-semibold text-[#0F172A]">On this page</p>
              <ul className="mt-3 space-y-2 border-l border-[#E5EDFB]">
                {feesToc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="-ml-px block border-l-2 border-transparent pl-4 text-[14px] leading-[1.45] text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB]"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <InDentDockCard />
              </div>
            </aside>
            <div className="max-w-3xl">
              <FeesGuideBody />
              <div className="mt-14">
                <AboutAuthor />
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* One big product panel instead of the social media band. */}
      <section className="bg-white px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 text-white">
            <p className="text-[14px] font-medium text-[#BFDBFE]">
              DentDock {solution.kind.toLowerCase()}
            </p>
            <h2 className="mt-2 text-3xl md:text-[40px] font-semibold tracking-tight leading-[1.15]">
              {solution.title}, handled
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#DBEAFE]">{solution.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={solution.to}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-[#2563EB] hover:bg-[#EFF6FF]"
              >
                See the solution <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={RELATED[1].to}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                See payments
              </Link>
            </div>
          </div>
          <img
            src={solution.image}
            srcSet={photoSrcSet(solution.image)}
            sizes="(min-width: 1024px) 560px, 100vw"
            alt={solution.alt}
            width={1400}
            height={933}
            loading="lazy"
            className="h-full w-full object-cover min-h-[280px]"
          />
        </div>
      </section>
      <FaqSection items={feesFaq} />
      <ClosingBand />
    </PageShell>
  );
}

/* ------------------------------------------------------------------ */
/* Option A variations (Hariss, 20 Nov: "less like AI slop"): only the  */
/* article part changes. No pills, no pastel gradients, fewer boxes;    */
/* dark text with blue kept for links. The parts below stay as Option A. */
/* ------------------------------------------------------------------ */

const TOPICS = TAGS.join(" · ");

function Monogram({
  dark = false,
  blue = false,
  size = 44,
}: {
  dark?: boolean;
  blue?: boolean;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-md font-semibold ${blue ? "bg-[#2563EB] text-white" : dark ? "bg-[#0F172A] text-white" : "bg-[#E2E8F0] text-[#0F172A]"}`}
    >
      HH
    </span>
  );
}

function PlainCrumbs({ onDark = false }: { onDark?: boolean }) {
  const c = onDark ? "text-[#94A3B8] hover:text-white" : "text-[#64748B] hover:text-[#0F172A]";
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-[13px] ${onDark ? "text-[#94A3B8]" : "text-[#64748B]"}`}
    >
      <Link to="/" className={c}>
        Home
      </Link>
      {" / "}
      <Link to="/guides" className={c}>
        Guides
      </Link>
    </nav>
  );
}

/** Text links to the DentDock pages, no boxes. */
function ProductLinks() {
  return (
    <ul className="mt-3 space-y-3">
      {RELATED.slice(0, 2).map((r) => (
        <li key={r.to}>
          <Link to={r.to} className="group block">
            <span className="block text-[13px] text-[#64748B]">{r.kind}</span>
            <span className="text-[15px] font-semibold text-[#2563EB] group-hover:underline underline-offset-4">
              {r.title.slice(0, r.title.lastIndexOf(" ") + 1)}
              {/* The last word and the arrow never split across lines. */}
              <span className="whitespace-nowrap">
                {r.title.slice(r.title.lastIndexOf(" ") + 1)}
                <ArrowRight className="ml-1 inline h-3.5 w-3.5 align-[-2px]" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** About the author, in the quieter style of the A variations: a rule, a monogram, two lines. */
function PlainAboutAuthor({ dark = false, blue = false }: { dark?: boolean; blue?: boolean }) {
  return (
    <div className="border-t border-[#E2E8F0] pt-8 flex items-start gap-5">
      <Monogram dark={dark} blue={blue} size={56} />
      <div>
        <p className="text-[14px] text-[#64748B]">About the author</p>
        <p className="mt-0.5 text-[20px] font-semibold text-[#0F172A]">{AUTHOR.name}</p>
        <p className="mt-2 text-[16px] text-[#334155] leading-[1.6] max-w-xl">
          {AUTHOR.name} is the founder of DentDock, practice software for UK private dental
          practices.
        </p>
        <Link
          to="/guides"
          className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2563EB] hover:underline underline-offset-4"
        >
          Read more guides <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function BelowArticle() {
  return (
    <>
      <SeeItInDentDockBand />
      <FaqSection items={feesFaq} />
      <ClosingBand />
    </>
  );
}

/** A1: editorial. White page, topic line above the title, a plain text sidebar split by rules. */
export function GuideLayoutA1() {
  return (
    <PageShell>
      <GuideLook.Provider value="plain">
        <article className="bg-white">
          <header className="px-6 pt-28 lg:pt-36 pb-10">
            <div className="mx-auto max-w-6xl">
              <PlainCrumbs />
              <p className="mt-8 text-[15px] font-medium text-[#2563EB]">{TOPICS}</p>
              <div className="mt-3 max-w-4xl">
                <H1 />
                <p className="mt-6 text-[20px] text-[#475569] leading-[1.55] max-w-3xl">{LEAD}</p>
              </div>
            </div>
          </header>
          <div className="px-6 pb-16 md:pb-24">
            <div className="mx-auto max-w-6xl border-t border-[#E2E8F0] pt-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
              <aside className="lg:sticky lg:top-28 self-start text-[14px]">
                <p className="text-[#64748B]">Written by</p>
                <Link
                  to="/about"
                  className="mt-1 block text-[16px] font-semibold text-[#0F172A] hover:text-[#2563EB]"
                >
                  {AUTHOR.name}
                </Link>
                <p className="text-[#64748B]">{AUTHOR.jobTitle}</p>
                <p className="mt-4 text-[#64748B]">
                  Updated {UPDATED}
                  <br />
                  {MINUTES} min read
                </p>
                <div className="mt-6 border-t border-[#E2E8F0] pt-6">
                  <p className="text-[14px] font-semibold text-[#0F172A]">In DentDock</p>
                  <ProductLinks />
                </div>
              </aside>
              <div className="max-w-3xl">
                <FeesGuideBody />
                <div className="mt-14">
                  <PlainAboutAuthor />
                </div>
              </div>
            </div>
          </div>
        </article>
      </GuideLook.Provider>
      <BelowArticle />
    </PageShell>
  );
}

/** A4 (Hariss's pick, 20 Nov): A1 with a grey header banner, no rule beside the short answer, blue HH. */
export function GuideLayoutA4() {
  return (
    <PageShell>
      <GuideLook.Provider value="clean">
        <article className="bg-white">
          <header className="px-6 pt-28 lg:pt-36 pb-12 bg-[#F8FAFC]">
            <div className="mx-auto max-w-6xl">
              <PlainCrumbs />
              <p className="mt-8 text-[15px] font-medium text-[#2563EB]">{TOPICS}</p>
              <div className="mt-3 max-w-4xl">
                <H1 />
                <p className="mt-6 text-[20px] text-[#475569] leading-[1.55] max-w-3xl">{LEAD}</p>
              </div>
            </div>
          </header>
          <div className="px-6 pb-16 md:pb-24">
            <div className="mx-auto max-w-6xl pt-12 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
              <aside className="lg:sticky lg:top-28 self-start text-[14px]">
                <p className="text-[#64748B]">Written by</p>
                <Link
                  to="/about"
                  className="mt-1 block text-[16px] font-semibold text-[#0F172A] hover:text-[#2563EB]"
                >
                  {AUTHOR.name}
                </Link>
                <p className="text-[#64748B]">{AUTHOR.jobTitle}</p>
                <p className="mt-4 text-[#64748B]">
                  Updated {UPDATED}
                  <br />
                  {MINUTES} min read
                </p>
                <div className="mt-6 border-t border-[#E2E8F0] pt-6">
                  <p className="text-[14px] font-semibold text-[#0F172A]">In DentDock</p>
                  <ProductLinks />
                </div>
              </aside>
              <div className="max-w-3xl">
                <FeesGuideBody />
                <div className="mt-14">
                  <PlainAboutAuthor blue />
                </div>
              </div>
            </div>
          </div>
        </article>
      </GuideLook.Provider>
      <BelowArticle />
    </PageShell>
  );
}

/** A2: one bordered sidebar card (author, topics, DentDock pages) and an intro with a rule. */
export function GuideLayoutA2() {
  return (
    <PageShell>
      <GuideLook.Provider value="plain">
        <article className="bg-white">
          <header className="px-6 pt-28 lg:pt-36 pb-12 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <div className="mx-auto max-w-6xl">
              <PlainCrumbs />
              <div className="mt-6 max-w-4xl">
                <H1 />
                <p className="mt-5 max-w-3xl text-[20px] text-[#475569] leading-[1.55]">{LEAD}</p>
              </div>
              <div className="mt-6 flex items-center gap-3 text-[14px] text-[#64748B]">
                <Monogram dark size={36} />
                <span>
                  By{" "}
                  <Link to="/about" className="font-semibold text-[#0F172A] hover:text-[#2563EB]">
                    {AUTHOR.name}
                  </Link>
                  {" · "}Updated {UPDATED} · {MINUTES} min read
                </span>
              </div>
            </div>
          </header>
          <div className="px-6 py-12 md:pb-24">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-16">
              <aside className="lg:sticky lg:top-28 self-start rounded-lg border border-[#E2E8F0] bg-white text-[14px]">
                <div className="flex items-center gap-3 p-5">
                  <Monogram dark />
                  <div>
                    <p className="font-semibold text-[#0F172A]">{AUTHOR.name}</p>
                    <p className="text-[#64748B]">{AUTHOR.jobTitle}</p>
                  </div>
                </div>
                <div className="border-t border-[#E2E8F0] p-5">
                  <p className="text-[#64748B]">Topics</p>
                  <p className="mt-1 font-medium text-[#0F172A]">{TOPICS}</p>
                </div>
                <div className="border-t border-[#E2E8F0] p-5">
                  <p className="font-semibold text-[#0F172A]">Do this in DentDock</p>
                  <ProductLinks />
                </div>
              </aside>
              <div className="max-w-3xl">
                <FeesGuideBody />
                <div className="mt-14">
                  <PlainAboutAuthor dark />
                </div>
              </div>
            </div>
          </div>
        </article>
      </GuideLook.Provider>
      <BelowArticle />
    </PageShell>
  );
}

/** A3: dark navy header like the footer, then a quiet sidebar with ruled rows. */
export function GuideLayoutA3() {
  return (
    <PageShell>
      <GuideLook.Provider value="plain">
        <article className="bg-white">
          <header className="px-4 sm:px-6 pt-24 lg:pt-28">
            <div className="mx-auto max-w-6xl rounded-[24px] bg-[#0F162B] px-6 py-10 md:px-12 md:py-14">
              <PlainCrumbs onDark />
              <p className="mt-8 text-[15px] font-medium text-[#93C5FD]">{TOPICS}</p>
              <h1
                className="mt-3 max-w-4xl font-semibold text-white text-[36px] leading-[1.15] md:text-[50px]"
                style={{ letterSpacing: "-0.03em" }}
              >
                {FEES_TITLE}
              </h1>
              <p className="mt-6 max-w-3xl text-[19px] text-[#CBD5E1] leading-[1.55]">{LEAD}</p>
              <div className="mt-8 flex items-center gap-3 text-[14px] text-[#94A3B8]">
                <Monogram size={36} />
                <span>
                  <Link
                    to="/about"
                    className="font-semibold text-white hover:underline underline-offset-4"
                  >
                    {AUTHOR.name}
                  </Link>
                  , {AUTHOR.jobTitle} · Updated {UPDATED} · {MINUTES} min read
                </span>
              </div>
            </div>
          </header>
          <div className="px-6 py-12 md:pb-24">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
              <aside className="lg:sticky lg:top-28 self-start">
                <p className="text-[14px] font-semibold text-[#0F172A]">Do this in DentDock</p>
                <ul className="mt-3 border-t border-[#E2E8F0]">
                  {RELATED.map((r) => (
                    <li key={r.to} className="border-b border-[#E2E8F0]">
                      <Link
                        to={r.to}
                        className="group flex items-center justify-between gap-3 py-3.5"
                      >
                        <span>
                          <span className="block text-[12px] text-[#64748B]">{r.kind}</span>
                          <span className="block text-[15px] font-medium text-[#0F172A] group-hover:text-[#2563EB]">
                            {r.title}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#94A3B8] group-hover:text-[#2563EB]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
              <div className="max-w-3xl">
                <FeesGuideBody />
                <div className="mt-14">
                  <PlainAboutAuthor dark />
                </div>
              </div>
            </div>
          </div>
        </article>
      </GuideLook.Provider>
      <BelowArticle />
    </PageShell>
  );
}
