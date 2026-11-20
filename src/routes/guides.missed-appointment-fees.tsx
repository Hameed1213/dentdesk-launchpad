import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import { ORG_ID, SITE, authorSchema } from "@/components/site/schema";
import { FEES_PATH, FEES_TITLE, FeesGuideBody, feesFaq } from "@/components/site/guideFees";
import { guides } from "@/components/site/guides";
import { GuideLayout } from "@/components/site/guideTemplate";

/*
 * Guide: missed-appointment and late-cancellation fees in UK private dentistry.
 * Sources are linked inline and listed at the end. General information, not legal advice.
 * DentDock facts checked against the app on 12 Nov 2026: free-cancellation window (up to the
 * appointment, 2, 12, 24, 48 or 72 hours), fees shown above the booking button, fees decided by
 * staff per visit (fee link, refund the extra, or waive), deposits count towards fees, NHS-marked
 * patients never charged, deposits on chosen treatments.
 */

const PATH = FEES_PATH;
const TITLE = FEES_TITLE;
const faq = feesFaq;

export const Route = createFileRoute("/guides/missed-appointment-fees")({
  component: GuidePage,
  head: () =>
    templateHead({
      path: PATH,
      // Under 60 characters so the whole title shows in search results.
      title: "Can a dentist charge for a missed appointment? | DentDock",
      description:
        "Missed-appointment and late-cancellation fees in UK private dentistry: what's allowed, NHS rules, notice periods, when to waive a fee, and a policy template.",
      crumbs: [
        { name: "Guides", path: "/guides" },
        { name: "Missed appointment fees", path: PATH },
      ],
      faq,
      ogType: "article",
      scripts: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description:
            "Missed-appointment and late-cancellation fees in UK private dentistry: what's allowed, NHS rules, notice periods, when to waive a fee, and a policy template.",
          image: `${SITE}/og/missed-appointment-fees.jpg`,
          inLanguage: "en-GB",
          datePublished: "2026-11-12",
          dateModified: "2026-11-12",
          author: authorSchema,
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: `${SITE}${PATH}`,
        },
      ],
    }),
});

const guide = guides.find((g) => g.slug === "missed-appointment-fees")!;

function GuidePage() {
  return (
    <GuideLayout guide={guide} faq={feesFaq}>
      <FeesGuideBody />
    </GuideLayout>
  );
}
