import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import { ORG_ID, SITE, authorSchema } from "@/components/site/schema";
import { FORMS_PATH, FORMS_TITLE, FormsGuideBody, formsFaq } from "@/components/site/guideForms";
import { guides } from "@/components/site/guides";
import { GuideLayout } from "@/components/site/guideTemplate";

/*
 * Guide: Can dental medical history forms be filled in online?
 * Sources are linked inline and listed at the end. General information, not legal advice.
 * Sources read and DentDock facts checked are recorded at the top of guideForms.tsx.
 */

const DESCRIPTION =
  "Can dental medical history forms be filled in online? UK GDPR basis, GDC and CQC rules, how often to update, who checks the answers, and a set-up checklist.";

export const Route = createFileRoute("/guides/online-medical-history-forms")({
  component: GuidePage,
  head: () =>
    templateHead({
      path: FORMS_PATH,
      // Under 60 characters so the whole title shows in search results.
      title: "Dental medical history forms online: UK guide | DentDock",
      description: DESCRIPTION,
      crumbs: [
        { name: "Guides", path: "/guides" },
        { name: "Online medical history forms", path: FORMS_PATH },
      ],
      faq: formsFaq,
      ogType: "article",
      scripts: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: FORMS_TITLE,
          description: "Can dental medical history forms be filled in online? The UK GDPR basis for health data, the processor contract, GDC and CQC expectations, how often to update a medical history, signatures, retention, and a set-up checklist for UK dental practices.",
          image: `${SITE}/og/online-medical-history-forms.jpg`,
          inLanguage: "en-GB",
          datePublished: "2026-11-25",
          dateModified: "2026-11-25",
          author: authorSchema,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: `${SITE}${FORMS_PATH}`,
        },
      ],
    }),
});

const guide = guides.find((g) => g.slug === "online-medical-history-forms")!;

function GuidePage() {
  return (
    <GuideLayout guide={guide} faq={formsFaq}>
      <FormsGuideBody />
    </GuideLayout>
  );
}
