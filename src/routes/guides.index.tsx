import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal, pillButton } from "@/components/site/ui";
import { templateHead } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";
import { guides } from "@/components/site/guides";

/* Guides hub: practical articles for UK private dental practices. */

const PATH = "/guides";

export const Route = createFileRoute("/guides/")({
  component: GuidesPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Guides for UK private dental practices | DentDock",
      description:
        "Practical guides for UK private dental practice managers and owners: cancellation fees, deposits, reminders, recalls and running the front desk.",
      crumbs: [{ name: "Guides", path: PATH }],
      faq: [],
    }),
});

function GuidesPage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Guides for"
        highlight="private dental practices"
        intro="Plain, practical answers to the questions practice managers ask us, with the sources to check them."
      />
      <section className="bg-white pt-6 pb-16 md:pb-24 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.06} className="h-full">
              <Link
                to={`/guides/${g.slug}` as "/guides"}
                className="group h-full rounded-3xl bg-white border border-[#E5EDFB] p-7 flex flex-col transition-colors duration-200 hover:border-[#2563EB]"
              >
                <span className="self-start rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[12px] font-semibold text-[#2563EB]">
                  {g.topic}
                </span>
                <h2 className="mt-5 text-[21px] font-semibold tracking-tight text-[#0F172A] leading-[1.3]">
                  {g.title}
                </h2>
                <p className="mt-3 text-[15px] text-[#475569] leading-[1.6] flex-1">{g.summary}</p>
                <p className="mt-5 text-[13px] text-[#64748B]">
                  {g.minutes} min read · Updated {g.updated}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
                  Read the guide{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
          <Reveal delay={0.1} className="h-full">
            <div className="h-full rounded-3xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-7 flex flex-col justify-center">
              <h2 className="text-[19px] font-semibold text-[#0F172A]">More guides on the way</h2>
              <p className="mt-2 text-[15px] text-[#475569] leading-[1.6]">
                Reminder texts and PECR, recall intervals, and switching dental software. Is there
                something you'd like us to cover?
              </p>
              <Link to="/contact" className={`mt-6 self-start ${pillButton}`}>
                Suggest a guide
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <ClosingBand />
    </PageShell>
  );
}
