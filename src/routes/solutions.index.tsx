import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/site/PageShell";
import { ClosingBand } from "@/components/site/ui";
import { FaqSection, OtherAreas, templateHead, type Faq } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";

/* Solutions hub: links to each Solutions page, grouped by problem and by type of practice. */

const PATH = "/solutions";

const faq: Faq[] = [
  {
    question: "What's the difference between Features and Solutions?",
    answer:
      "Features explain what each part of DentDock does. Solutions start from a problem your practice has, such as no-shows, and show how DentDock helps fix it.",
  },
  {
    question: "Is DentDock right for a mixed NHS and private practice?",
    answer:
      "DentDock doesn't do NHS claims, UDAs or banding, so a mixed practice would still need its NHS system for claims. It's built for private practices and practices moving that way.",
  },
  {
    question: "How much does it cost?",
    answer: "£49 a month per practice, with no setup fees and no contract.",
  },
];

export const Route = createFileRoute("/solutions/")({
  component: SolutionsPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Solutions for UK private dental practices | DentDock",
      description:
        "How DentDock helps UK private dental practices reduce no-shows, fill the diary and run smoothly, with online booking, reminders, recalls and payments. £49 a month.",
      crumbs: [{ name: "Solutions", path: PATH }],
      faq,
    }),
});

function SolutionsPage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Fixes for the problems"
        highlight="your practice faces"
        intro="Start from what's getting in the way, and see how DentDock helps."
      />
      <OtherAreas
        title="By"
        highlight="problem"
        items={[
          {
            title: "Reduce no-shows",
            body: "Reminders, an easy way to cancel, a waitlist to refill gaps, and a fair fee policy.",
            to: "/solutions/reduce-no-shows",
            image: "/images/pages/empty-surgery.webp",
            alt: "An empty, modern dental surgery",
            position: "object-[50%_55%]",
          },
        ]}
      />
      <OtherAreas
        title="By type of"
        highlight="practice"
        items={[
          {
            title: "Private practices",
            body: "Everything a UK private practice runs on, for £49 a month with no contract.",
            to: "/solutions/private-practices",
            image: "/images/pages/hero-calendar.webp",
            alt: "Dentist matching a shade guide for a smiling patient",
            position: "object-[45%_35%]",
          },
        ]}
      />
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
