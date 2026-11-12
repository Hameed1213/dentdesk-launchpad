import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal } from "@/components/site/ui";
import { templateHead } from "@/components/site/templates";
import {
  NoShowCalculator,
  SolutionsHubHero,
  SpendCalculator,
} from "@/components/site/solutionTemplates";

/* Free tools: calculators that run on the practice's own figures, plus the policy template. */

const PATH = "/tools";

export const Route = createFileRoute("/tools")({
  component: ToolsPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Free tools for dental practices | DentDock",
      description:
        "Free tools for UK dental practices: work out what no-shows cost you, compare what you pay for software, and get a cancellation policy template.",
      crumbs: [{ name: "Free tools", path: PATH }],
      faq: [],
    }),
});

function ToolsPage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Free tools for"
        highlight="your practice"
        intro="Quick calculators that use your own figures, and a policy template you can adapt. Nothing to sign up for."
      />
      <NoShowCalculator />
      <div className="border-t border-[#EEF2FB]" />
      <SpendCalculator />
      <section className="bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-16 md:py-20 px-6">
        <Reveal className="mx-auto max-w-4xl">
          <Link
            to={"/guides/missed-appointment-fees" as "/guides"}
            hash="template"
            className="group block rounded-3xl bg-white border border-[#E5EDFB] p-8 md:p-10 transition-colors duration-200 hover:border-[#2563EB]"
          >
            <span className="inline-block rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[12px] font-semibold text-[#2563EB]">
              Template
            </span>
            <h2 className="mt-4 text-[26px] md:text-[32px] font-semibold tracking-tight text-[#0F172A] leading-[1.2]">
              Cancellation and missed appointment policy
            </h2>
            <p className="mt-3 text-[16px] text-[#475569] leading-[1.6]">
              A plain-English policy for private practices, covering notice, late-cancellation fees,
              deposits and genuine reasons. Copy it and adapt it for your practice.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2563EB]">
              Get the template{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>
      <ClosingBand />
    </PageShell>
  );
}
