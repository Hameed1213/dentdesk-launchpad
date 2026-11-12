import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/site/PageShell";
import { ClosingBand } from "@/components/site/ui";
import { templateHead } from "@/components/site/templates";
import {
  NoShowCalculator,
  SolutionsHubHero,
  SpendCalculator,
} from "@/components/site/solutionTemplates";

/* Free tools: calculators that run on the practice's own figures. */

const PATH = "/tools";

export const Route = createFileRoute("/tools")({
  component: ToolsPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Free tools for dental practices | DentDock",
      description:
        "Free tools for UK dental practices: work out what no-shows cost you, and compare what you pay for software.",
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
        intro="Quick calculators that use your own figures. Nothing to sign up for."
      />
      <NoShowCalculator />
      <div className="border-t border-[#EEF2FB]" />
      <SpendCalculator />
      <ClosingBand />
    </PageShell>
  );
}
