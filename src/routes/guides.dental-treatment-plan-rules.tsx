import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import { ORG_ID, SITE, authorSchema } from "@/components/site/schema";
import { PLANS_PATH, PLANS_TITLE, PlansGuideBody, plansFaq } from "@/components/site/guidePlans";
import { guides } from "@/components/site/guides";
import { GuideLayout } from "@/components/site/guideTemplate";

/*
 * Guide: What must a dental treatment plan include? (UK rules and a template)
 * Sources are linked inline and listed at the end. General information, not legal advice.
 * Sources read and DentDock facts checked are recorded at the top of guidePlans.tsx.
 */

const DESCRIPTION =
  "What a UK dental treatment plan must include under the GDC Standards: costs, NHS or private, estimate or quote, signatures and consent, plus a template.";

export const Route = createFileRoute("/guides/dental-treatment-plan-rules")({
  component: GuidePage,
  head: () =>
    templateHead({
      path: PLANS_PATH,
      // Under 60 characters so the whole title shows in search results.
      title: "What must a dental treatment plan include? | DentDock",
      description: DESCRIPTION,
      crumbs: [
        { name: "Guides", path: "/guides" },
        { name: "Treatment plan rules", path: PLANS_PATH },
      ],
      faq: plansFaq,
      ogType: "article",
      scripts: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: PLANS_TITLE,
          description: "What a UK dental treatment plan must include under the GDC Standards (2.3.6 to 2.3.8 and 2.4), estimates versus fixed quotes, NHS and private treatment on one plan including the FP17DC in England, why a signature isn't consent, keeping plans up to date, a plan template, and following up undecided patients.",
          image: `${SITE}/og/dental-treatment-plan-rules.jpg`,
          inLanguage: "en-GB",
          datePublished: "2026-11-26",
          dateModified: "2026-11-26",
          author: authorSchema,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: `${SITE}${PLANS_PATH}`,
        },
      ],
    }),
});

const guide = guides.find((g) => g.slug === "dental-treatment-plan-rules")!;

function GuidePage() {
  return (
    <GuideLayout guide={guide} faq={plansFaq}>
      <PlansGuideBody />
    </GuideLayout>
  );
}
