import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal } from "@/components/site/ui";
import { templateHead } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";

/* Compare hub: one card per comparison. Text kept from the original page. */

const PATH = "/compare";

const comparisons = [
  {
    to: "/compare/dentally",
    tagline: "DentDock vs Dentally",
    summary: "£49/mo flat vs £220+/mo per user. Built for private practices going cloud-first.",
  },
  {
    to: "/compare/ismile-dental-software",
    tagline: "DentDock vs iSmile",
    summary:
      "Published £49/mo vs demo-and-quote pricing. Self-serve setup vs dedicated consultant onboarding.",
  },
  {
    to: "/compare/software-of-excellence",
    tagline: "DentDock vs Software of Excellence",
    summary:
      "Transparent £49/mo vs sales-quote pricing. Modern cloud workflow vs the UK's longest-established PMS.",
  },
] as const;

export const Route = createFileRoute("/compare/")({
  component: CompareHubPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Compare DentDock with UK dental software | DentDock",
      description:
        "Honest, side-by-side comparisons of DentDock and the major UK dental practice systems: pricing, features and setup, head-to-head.",
      crumbs: [{ name: "Compare", path: PATH }],
      faq: [],
    }),
});

function CompareHubPage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="DentDock vs"
        highlight="the alternatives"
        intro="Honest side-by-side comparisons against the major UK dental practice software, written for private practices choosing what to switch to."
      />
      <section className="bg-white pt-6 pb-16 md:pb-24 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-5">
          {comparisons.map((c, i) => (
            <Reveal key={c.to} delay={i * 0.06} className="h-full">
              <Link
                to={c.to}
                className="group h-full rounded-3xl bg-white border border-[#E5EDFB] p-7 flex flex-col transition-colors duration-200 hover:border-[#2563EB]"
              >
                <h2 className="text-[21px] font-semibold tracking-tight text-[#0F172A] leading-[1.3]">
                  {c.tagline}
                </h2>
                <p className="mt-3 text-[15px] text-[#475569] leading-[1.6] flex-1">{c.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2563EB]">
                  Read the comparison{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <ClosingBand />
    </PageShell>
  );
}
