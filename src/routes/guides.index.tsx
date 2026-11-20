import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, photoSrcSet } from "@/components/site/ui";
import { templateHead } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";
import { guides, type GuideMeta } from "@/components/site/guides";
import { AUTHOR } from "@/components/site/schema";

/* Guides hub: practical articles for UK private dental practices. */

const PATH = "/guides";

export const Route = createFileRoute("/guides/")({
  component: GuidesPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Guides for UK private dental practices | DentDock",
      description:
        "Practical guides for UK private dental practice managers and owners: cancellation fees, deposits, reminders and recalls, with the sources to check them.",
      crumbs: [{ name: "Guides", path: PATH }],
      faq: [],
    }),
});

function Monogram() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#2563EB] text-[11px] font-semibold text-white"
    >
      HH
    </span>
  );
}

/** Guide card (Hariss chose design 1 on 20 Nov 2026): photo, topic, title, summary, author, arrow. */
function GuideCard({ g }: { g: GuideMeta }) {
  return (
    <Link
      to={`/guides/${g.slug}` as "/guides"}
      className="group h-full flex flex-col overflow-hidden rounded-3xl border border-[#E5EDFB] bg-white transition-colors duration-200 hover:border-[#2563EB]"
    >
      <img
        src={g.image}
        srcSet={photoSrcSet(g.image)}
        sizes="(min-width: 1024px) 370px, (min-width: 768px) 50vw, calc(100vw - 48px)"
        alt={g.imageAlt}
        width={1400}
        height={933}
        className="w-full aspect-[16/10] object-cover"
      />
      <div className="flex flex-1 flex-col p-7">
        <p className="text-[14px] font-medium text-[#2563EB]">{g.topics[0]}</p>
        <h2 className="mt-2 text-[22px] font-semibold tracking-tight text-[#0F172A] leading-[1.3]">
          {g.title}
        </h2>
        <p className="mt-3 flex-1 text-[15px] text-[#475569] leading-[1.6]">{g.summary}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#EEF2F7] pt-5">
          <span className="flex items-center gap-2.5 text-[13px] text-[#64748B]">
            <Monogram />
            <span>
              <span className="font-medium text-[#0F172A]">{AUTHOR.name}</span> · {g.minutes} min
              read
            </span>
          </span>
          <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] text-[#0F172A] transition-colors group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Read the guide</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function GuidesPage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Guides for"
        highlight="private dental practices"
        intro="Plain, practical answers to the questions practice managers ask us, with the sources to check them."
      />
      <section className="bg-white pt-6 pb-16 md:pb-24 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((g) => (
            <GuideCard key={g.slug} g={g} />
          ))}
        </div>
      </section>
      <ClosingBand />
    </PageShell>
  );
}
