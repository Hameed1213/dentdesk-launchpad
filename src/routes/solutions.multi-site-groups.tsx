import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal, pillButton, primaryButton } from "@/components/site/ui";
import { FaqSection, templateHead, type Faq } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";

/*
 * Solutions page (practice type): Multi-site groups. Coming soon, register interest only.
 * The planned list matches the Multi-site plan on /pricing (no price, no date).
 */

const PATH = "/solutions/multi-site-groups";

const planned = [
  "Up to 5 sites, one login",
  "An owner overview of every site",
  "Shared patient records",
  "Book any site from one reception",
  "Team messaging",
  "Membership plans",
];

const faq: Faq[] = [
  {
    question: "When will multi-site be ready?",
    answer:
      "We don't have a date yet. Register your interest and we'll tell you as soon as it's ready to try.",
  },
  {
    question: "How much will it cost?",
    answer:
      "We haven't set a price yet. Today DentDock is £49 a month per practice for single sites.",
  },
  {
    question: "Can we use DentDock at one of our sites now?",
    answer:
      "Yes. Each site can run its own DentDock account today. Sharing patients and reporting across sites is what's coming.",
  },
];

export const Route = createFileRoute("/solutions/multi-site-groups")({
  component: MultiSitePage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental software for multi-site groups (coming soon) | DentDock",
      description:
        "DentDock for dental groups is coming soon: one login for every site, an owner overview, shared patient records and booking across sites. Register your interest.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Multi-site groups", path: PATH },
      ],
      faq,
    }),
});

function MultiSitePage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Multi-site groups:"
        highlight="coming soon"
        intro="We're building DentDock for groups of up to five sites. Register your interest and help shape what comes first."
      />
      <section className="bg-white pt-6 pb-16 md:pb-24 px-6">
        <Reveal className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-[#E5EDFB] bg-gradient-to-br from-[#F5F8FF] to-white p-8 md:p-10">
            <span className="inline-block rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-[12px] font-semibold text-[#2563EB]">
              Planned
            </span>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {planned.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[16px] text-[#0F172A]">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/waitlist" className={primaryButton}>
                Register interest <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/solutions/private-practices" className={pillButton}>
                DentDock for a single practice
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
