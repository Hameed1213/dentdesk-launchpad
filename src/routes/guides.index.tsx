import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/site/PageShell";
import { ClosingBand } from "@/components/site/ui";
import { templateHead } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";
import { guides } from "@/components/site/guides";
import { GuideCard } from "@/components/site/GuideCard";

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
