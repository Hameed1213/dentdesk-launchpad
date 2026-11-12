import { lazy, Suspense, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FAQ from "@/components/home/FAQ";
import {
  ClosingBand,
  FeatureRows,
  PricingTeaser,
  SolutionsGrid,
  SupportRow,
  SwitchRow,
  TrustStrip,
} from "@/components/home/HomeSections";
import { homeFaq } from "@/lib/homeFaq";

const Footer = lazy(() => import("@/components/home/Footer"));
const WhatsAppButton = lazy(() => import("@/components/home/WhatsAppButton"));

const SITE = "https://dentdock.co.uk";
const TITLE = "DentDock | Dental software for UK private practices";
const DESCRIPTION =
  "Online booking, reminders, recalls, forms and payments for UK private dental practices. £49 a month per practice, no contract, with real support from the people who built it.";

// Old one-page links (dentdock.co.uk/#pricing and so on) now live on their own pages.
// Browsers never send the # part to the server, so this has to happen in the page.
const MOVED_ANCHORS: Record<string, "/features" | "/pricing"> = {
  "#about": "/features",
  "#everything": "/features",
  "#pricing": "/pricing",
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:url", content: SITE },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: `${SITE}/og-image.png` },
      { name: "twitter:image", content: `${SITE}/og-image.png` },
      { name: "twitter:site", content: "@dentdock" },
    ],
    links: [{ rel: "canonical", href: SITE }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "DentDock",
          url: `${SITE}/`,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "DentDock",
          legalName: "Paradigm Network Limited",
          url: SITE,
          email: "hello@dentdock.co.uk",
          areaServed: "GB",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "DentDock",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: SITE,
          description:
            "Dental practice software for UK private practices. Online booking, reminders, recalls, forms and payments.",
          offers: {
            "@type": "Offer",
            price: "49",
            priceCurrency: "GBP",
            priceSpecification: { "@type": "RecurringCharge", billingDuration: "P1M" },
          },
          provider: { "@type": "Organization", name: "DentDock", url: SITE },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const to = MOVED_ANCHORS[window.location.hash];
    if (to) navigate({ to, replace: true });
  }, [navigate]);

  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <section id="features" className="scroll-mt-24">
        <FeaturesSection />
      </section>
      <FeatureRows />
      <SolutionsGrid />
      <SupportRow />
      <SwitchRow />
      <PricingTeaser />
      <section id="faq" className="scroll-mt-24">
        <FAQ />
      </section>
      <ClosingBand />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </main>
  );
}
