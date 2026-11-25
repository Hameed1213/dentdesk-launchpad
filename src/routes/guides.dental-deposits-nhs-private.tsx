import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import { ORG_ID, SITE, authorSchema } from "@/components/site/schema";
import { DEPOSITS_PATH, DEPOSITS_TITLE, DepositsGuideBody, depositsFaq } from "@/components/site/guideDeposits";
import { guides } from "@/components/site/guides";
import { GuideLayout } from "@/components/site/guideTemplate";

/*
 * Guide: Can a dentist ask for a deposit? NHS and private rules
 * Sources are linked inline and listed at the end. General information, not legal advice.
 * Sources read and DentDock facts checked are recorded at the top of guideDeposits.tsx.
 */

const DESCRIPTION =
  "Can a dentist ask for a deposit? NHS rules in England, fair private deposits, refunds and transfers, with a decision table and a deposit policy template.";

export const Route = createFileRoute("/guides/dental-deposits-nhs-private")({
  component: GuidePage,
  head: () =>
    templateHead({
      path: DEPOSITS_PATH,
      // Under 60 characters so the whole title shows in search results.
      title: "Can a dentist ask for a deposit? NHS and private | DentDock",
      description: DESCRIPTION,
      crumbs: [
        { name: "Guides", path: "/guides" },
        { name: "Dental deposits: NHS and private", path: DEPOSITS_PATH },
      ],
      faq: depositsFaq,
      ogType: "article",
      scripts: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: DEPOSITS_TITLE,
          description: "Can a dentist ask for a deposit? The NHSBSA rules for NHS patients in England, fair private deposits under the Consumer Rights Act 2015, refunds and a policy template.",
          image: `${SITE}/og/dental-deposits-nhs-private.jpg`,
          inLanguage: "en-GB",
          datePublished: "2026-11-26",
          dateModified: "2026-11-26",
          author: authorSchema,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: `${SITE}${DEPOSITS_PATH}`,
        },
      ],
    }),
});

const guide = guides.find((g) => g.slug === "dental-deposits-nhs-private")!;

function GuidePage() {
  return (
    <GuideLayout guide={guide} faq={depositsFaq}>
      <DepositsGuideBody />
    </GuideLayout>
  );
}
