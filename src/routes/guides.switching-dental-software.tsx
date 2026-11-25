import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import { ORG_ID, SITE, authorSchema } from "@/components/site/schema";
import { SWITCHING_PATH, SWITCHING_TITLE, SwitchingGuideBody, switchingFaq } from "@/components/site/guideSwitching";
import { guides } from "@/components/site/guides";
import { GuideLayout } from "@/components/site/guideTemplate";

/*
 * Guide: How to switch dental practice software: a UK checklist
 * Sources are linked inline and listed at the end. General information, not legal advice.
 * Sources read and DentDock facts checked are recorded at the top of guideSwitching.tsx.
 */

const DESCRIPTION =
  "Switching dental practice software in the UK? What to ask any supplier, how to get your data out, a migration timeline, and what to do with old records.";

export const Route = createFileRoute("/guides/switching-dental-software")({
  component: GuidePage,
  head: () =>
    templateHead({
      path: SWITCHING_PATH,
      // Under 60 characters so the whole title shows in search results.
      title: "Switching dental software: a UK checklist | DentDock",
      description: DESCRIPTION,
      crumbs: [
        { name: "Guides", path: "/guides" },
        { name: "Switching dental software", path: SWITCHING_PATH },
      ],
      faq: switchingFaq,
      ogType: "article",
      scripts: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: SWITCHING_TITLE,
          description: "A vendor-neutral UK checklist for switching dental practice software: when to switch, supplier questions on data hosting, processor contracts, exit terms, security, price and NHS claims, exporting data, a migration timeline, keeping old records and telling patients.",
          image: `${SITE}/og/switching-dental-software.jpg`,
          inLanguage: "en-GB",
          datePublished: "2026-11-27",
          dateModified: "2026-11-27",
          author: authorSchema,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: `${SITE}${SWITCHING_PATH}`,
        },
      ],
    }),
});

const guide = guides.find((g) => g.slug === "switching-dental-software")!;

function GuidePage() {
  return (
    <GuideLayout guide={guide} faq={switchingFaq}>
      <SwitchingGuideBody />
    </GuideLayout>
  );
}
