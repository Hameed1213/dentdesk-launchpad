import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import PageHero from "@/components/site/PageHero";
import { OtherAreas } from "@/components/site/templates";
import { allFeaturePages } from "@/components/site/featurePages";
import ProductShowcase from "@/components/home/ProductShowcase";
import BentoGrid from "@/components/home/BentoGrid";

const TITLE = "Features | DentDock dental software for UK private practices";
const DESCRIPTION =
  "Online booking, a patient portal, reminders and recalls, digital forms and medical history, payments and deposits, and reports. One system for UK private dental practices.";

export const Route = createFileRoute("/features/")({
  component: FeaturesPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://dentdock.co.uk/features" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://dentdock.co.uk/features" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://dentdock.co.uk/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Features",
              item: "https://dentdock.co.uk/features",
            },
          ],
        }),
      },
    ],
  }),
});

function FeaturesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Everything your practice runs on, <span className="text-[#2563EB]">in one place</span>
          </>
        }
        intro="Online booking, a patient portal, reminders and recalls, digital forms, payments and reports. One system for UK private dental practices, from first booking to last recall."
        secondary={{ label: "See pricing", to: "/pricing" }}
      />
      <OtherAreas title="Explore" highlight="each feature" cols={4} items={allFeaturePages} />
      <ProductShowcase hideHeading />
      <BentoGrid />
      <section className="bg-background pb-20 md:pb-28 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground leading-[1.15]">
            One plan. <span className="text-[#2563EB]">£49 a month.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-500 leading-relaxed">
            Every feature on this page is in the Starter plan, with unlimited dentists and staff.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              to="/waitlist"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#1d4ed8]"
            >
              Join the waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2563EB] px-6 py-3 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
