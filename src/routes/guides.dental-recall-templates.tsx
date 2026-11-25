import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import { ORG_ID, SITE, authorSchema } from "@/components/site/schema";
import { RECALLS_PATH, RECALLS_TITLE, RecallsGuideBody, recallsFaq } from "@/components/site/guideRecalls";
import { guides } from "@/components/site/guides";
import { GuideLayout } from "@/components/site/guideTemplate";

/*
 * Guide: Dental recall messages: UK templates and when to send them
 * Sources are linked inline and listed at the end. General information, not legal advice.
 * Sources read and DentDock facts checked are recorded at the top of guideRecalls.tsx.
 */

const DESCRIPTION =
  "Copy-ready dental recall texts, emails and letters for NHS and private patients, when to send each one, and NICE recall intervals of 3 to 24 months by risk.";

export const Route = createFileRoute("/guides/dental-recall-templates")({
  component: GuidePage,
  head: () =>
    templateHead({
      path: RECALLS_PATH,
      // Under 60 characters so the whole title shows in search results.
      title: "Dental recall messages: UK templates | DentDock",
      description: DESCRIPTION,
      crumbs: [
        { name: "Guides", path: "/guides" },
        { name: "Dental recall templates", path: RECALLS_PATH },
      ],
      faq: recallsFaq,
      ogType: "article",
      scripts: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: RECALLS_TITLE,
          description: "Dental recall text, email and letter templates for UK practices: invitation, reminder, overdue and lapsed wording for NHS and private patients, when to send each, NICE CG19 intervals and how to measure results.",
          image: `${SITE}/og/dental-recall-templates.jpg`,
          inLanguage: "en-GB",
          datePublished: "2026-11-25",
          dateModified: "2026-11-25",
          author: authorSchema,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: `${SITE}${RECALLS_PATH}`,
        },
      ],
    }),
});

const guide = guides.find((g) => g.slug === "dental-recall-templates")!;

function GuidePage() {
  return (
    <GuideLayout guide={guide} faq={recallsFaq}>
      <RecallsGuideBody />
    </GuideLayout>
  );
}
