import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/site/PageShell";
import PricingCTA from "@/components/home/PricingCTA";

const TITLE = "Pricing | DentDock, £49 a month per practice, no contract";
const DESCRIPTION =
  "DentDock is £49 a month per practice: unlimited dentists and staff, online booking, reminders, recalls, forms and payments, 200 texts a month included then 8p each. No contracts, no setup fees.";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://dentdock.co.uk/pricing" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://dentdock.co.uk/pricing" }],
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
              name: "Pricing",
              item: "https://dentdock.co.uk/pricing",
            },
          ],
        }),
      },
    ],
  }),
});

function PricingPage() {
  return (
    <PageShell>
      <PricingCTA asPage />
    </PageShell>
  );
}
