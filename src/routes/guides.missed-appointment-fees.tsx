import { createFileRoute, Link } from "@tanstack/react-router";
import PageShell from "@/components/site/PageShell";
import { ClosingBand } from "@/components/site/ui";
import { FaqSection, templateHead } from "@/components/site/templates";
import { FEES_PATH, FEES_TITLE, FeesGuideBody, feesFaq } from "@/components/site/guideFees";
import { AUTHOR, ORG_ID, SITE, authorSchema } from "@/components/site/schema";

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

function GuidePage() {
  return (
    <PageShell>
      <article>
        <header className="bg-gradient-to-b from-[#EAF1FF] via-[#F3F7FF] to-white pt-28 lg:pt-36 pb-10 px-6">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B]">
              <Link to="/" className="hover:text-[#2563EB]">
                Home
              </Link>
              {" / "}
              <Link to="/guides" className="hover:text-[#2563EB]">
                Guides
              </Link>
            </nav>
            <h1
              className="mt-6 font-semibold text-[#0F172A] text-[36px] leading-[1.15] md:text-[50px]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {TITLE}
            </h1>
            <p className="mt-5 text-[14px] text-[#64748B]">
              By{" "}
              <Link to="/about" className="font-medium text-[#334155] hover:text-[#2563EB]">
                {AUTHOR.name}
              </Link>
              , {AUTHOR.jobTitle} · Updated 12 November 2026 · 7 min read
            </p>
          </div>
        </header>

        <div className="bg-white px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <FeesGuideBody />
          </div>
        </div>
      </article>
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
