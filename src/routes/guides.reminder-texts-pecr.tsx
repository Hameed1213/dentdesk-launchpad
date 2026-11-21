import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import { ORG_ID, SITE, authorSchema } from "@/components/site/schema";
import { TEXTS_PATH, TEXTS_TITLE, TextsGuideBody, textsFaq } from "@/components/site/guideTexts";
import { guides } from "@/components/site/guides";
import { GuideLayout } from "@/components/site/guideTemplate";

/*
 * Guide: reminder, recall and marketing texts under PECR and UK GDPR for UK dental practices.
 * Sources are linked inline and listed at the end. General information, not legal advice.
 * DentDock facts checked against hub 918f007 and booking ae3a345 on 21 Nov 2026 (see guideTexts.tsx).
 */

const DESCRIPTION =
  "Can a dental practice text patients without consent? Reminders, recalls and marketing texts under PECR and UK GDPR, with the ICO's rules and a checklist.";

export const Route = createFileRoute("/guides/reminder-texts-pecr")({
  component: GuidePage,
  head: () =>
    templateHead({
      path: TEXTS_PATH,
      // Under 60 characters so the whole title shows in search results.
      title: "Can a dentist text patients without consent? | DentDock",
      description: DESCRIPTION,
      crumbs: [
        { name: "Guides", path: "/guides" },
        { name: "Reminder texts and consent", path: TEXTS_PATH },
      ],
      faq: textsFaq,
      ogType: "article",
      scripts: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TEXTS_TITLE,
          description: DESCRIPTION,
          image: `${SITE}/og/reminder-texts-pecr.jpg`,
          inLanguage: "en-GB",
          datePublished: "2026-11-21",
          dateModified: "2026-11-21",
          author: authorSchema,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: `${SITE}${TEXTS_PATH}`,
        },
      ],
    }),
});

const guide = guides.find((g) => g.slug === "reminder-texts-pecr")!;

function GuidePage() {
  return (
    <GuideLayout guide={guide} faq={textsFaq}>
      <TextsGuideBody />
    </GuideLayout>
  );
}
