import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, photoSrcSet, primaryButton } from "@/components/site/ui";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";
import { guides, type GuideMeta } from "@/components/site/guides";
import { AUTHOR } from "@/components/site/schema";

/*
 * MOCK-UPS ONLY (20 Nov 2026): three designs for the guide card on /guides, because the current
 * card "looks boring and doesn't seem enticing to click" (Hariss). Same quiet style as the guide
 * page: no pills, blue for links, hover = blue border only. Not for merging.
 */

const href = (g: GuideMeta) => `/guides/${g.slug}` as "/guides";

function Monogram({ size = 28 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className="inline-flex flex-shrink-0 items-center justify-center rounded-md bg-[#2563EB] font-semibold text-white"
    >
      HH
    </span>
  );
}

function Byline({ g }: { g: GuideMeta }) {
  return (
    <span className="flex items-center gap-2.5 text-[13px] text-[#64748B]">
      <Monogram />
      <span>
        <span className="font-medium text-[#0F172A]">{AUTHOR.name}</span> · {g.minutes} min read
      </span>
    </span>
  );
}

function Photo({ g, sizes, className }: { g: GuideMeta; sizes: string; className: string }) {
  return (
    <img
      src={g.image}
      srcSet={photoSrcSet(g.image)}
      sizes={sizes}
      alt={g.imageAlt}
      width={1400}
      height={933}
      className={`object-cover ${className}`}
    />
  );
}

function Hub({ children }: { children: ReactNode }) {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Guides for"
        highlight="private dental practices"
        intro="Plain, practical answers to the questions practice managers ask us, with the sources to check them."
      />
      <section className="bg-white pt-6 pb-16 md:pb-24 px-6">
        <div className="mx-auto max-w-6xl">{children}</div>
      </section>
      <ClosingBand />
    </PageShell>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Photo card: picture on top, topic, title, author, arrow          */
/* ------------------------------------------------------------------ */

function PhotoCard({ g }: { g: GuideMeta }) {
  return (
    <Link
      to={href(g)}
      className="group h-full flex flex-col overflow-hidden rounded-3xl border border-[#E5EDFB] bg-white transition-colors duration-200 hover:border-[#2563EB]"
    >
      <Photo
        g={g}
        sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, calc(100vw - 48px)"
        className="w-full aspect-[16/10]"
      />
      <div className="flex flex-1 flex-col p-7">
        <p className="text-[14px] font-medium text-[#2563EB]">{g.topics[0]}</p>
        <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-[#0F172A] leading-[1.3]">
          {g.title}
        </h2>
        <p className="mt-3 flex-1 text-[15px] text-[#475569] leading-[1.6]">{g.summary}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#EEF2F7] pt-5">
          <Byline g={g} />
          <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] text-[#0F172A] transition-colors group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function GuidesHub1() {
  return (
    <Hub>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((g) => (
          <PhotoCard key={g.slug} g={g} />
        ))}
      </div>
    </Hub>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Featured: the newest guide as a wide card with what's inside     */
/* ------------------------------------------------------------------ */

export function GuidesHub2() {
  const [featured, ...rest] = guides;
  return (
    <Hub>
      <Link
        to={href(featured)}
        className="group grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] overflow-hidden rounded-[28px] border border-[#E5EDFB] bg-white transition-colors duration-200 hover:border-[#2563EB]"
      >
        <Photo
          g={featured}
          sizes="(min-width: 1024px) 600px, calc(100vw - 48px)"
          className="h-full w-full aspect-[16/10] lg:aspect-auto lg:min-h-[440px]"
        />
        <div className="flex flex-col p-8 md:p-10">
          <p className="text-[14px] font-medium text-[#2563EB]">{featured.topics.join(" · ")}</p>
          <h2 className="mt-3 text-[28px] md:text-[34px] font-semibold tracking-tight text-[#0F172A] leading-[1.2]">
            {featured.title}
          </h2>
          <p className="mt-4 text-[16px] text-[#475569] leading-[1.6]">{featured.summary}</p>
          <p className="mt-6 text-[14px] font-semibold text-[#0F172A]">Inside this guide</p>
          <ul className="mt-3 space-y-2">
            {featured.inside.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#334155]">
                <Check
                  className="mt-[3px] h-4 w-4 flex-shrink-0 text-[#2563EB]"
                  strokeWidth={2.5}
                />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Byline g={featured} />
            <span className={primaryButton}>
              Read the guide <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
      {rest.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((g) => (
            <PhotoCard key={g.slug} g={g} />
          ))}
        </div>
      )}
    </Hub>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Answer first: the short answer as the hook, with what you get    */
/* ------------------------------------------------------------------ */

function AnswerCard({ g }: { g: GuideMeta }) {
  return (
    <Link
      to={href(g)}
      className="group grid grid-cols-1 md:grid-cols-[260px_1fr] overflow-hidden rounded-3xl border border-[#E5EDFB] bg-white transition-colors duration-200 hover:border-[#2563EB]"
    >
      <Photo
        g={g}
        sizes="(min-width: 768px) 260px, calc(100vw - 48px)"
        className="h-full w-full aspect-[16/10] md:aspect-auto"
      />
      <div className="flex flex-col p-7 md:p-8">
        <p className="text-[14px] font-medium text-[#2563EB]">{g.topics[0]}</p>
        <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-[#0F172A] leading-[1.25]">
          {g.title}
        </h2>
        <p className="mt-4 text-[17px] text-[#0F172A] leading-[1.6]">
          <span className="font-semibold">Short answer: </span>
          {g.shortAnswer}
        </p>
        <p className="mt-2 text-[15px] text-[#64748B]">
          Also inside:{" "}
          {g.inside
            .slice(1)
            .map((x) => x.charAt(0).toLowerCase() + x.slice(1))
            .join(", ")}
          .
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F7] pt-5">
          <span className="text-[13px] text-[#64748B]">
            {g.minutes} min read · {g.sources} sources linked · Updated {g.updated}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2563EB]">
            Read the full guide
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function GuidesHub3() {
  return (
    <Hub>
      <div className="mx-auto max-w-5xl space-y-6">
        {guides.map((g) => (
          <AnswerCard key={g.slug} g={g} />
        ))}
      </div>
    </Hub>
  );
}
