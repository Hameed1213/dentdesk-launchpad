import { lazy, Suspense, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FAQ from "@/components/home/FAQ";
import PricingCTA from "@/components/home/PricingCTA";
import Footer from "@/components/home/Footer";
import {
  ClosingBand,
  FeatureRows,
  SolutionsGrid,
  SupportRow,
  SwitchRow,
  TrustStrip,
} from "@/components/home/HomeSections";
import { homeFaq } from "@/lib/homeFaq";
import { ORG_ID, SITE, websiteSchema } from "@/components/site/schema";

const WhatsAppButton = lazy(() => import("@/components/home/WhatsAppButton"));

const TITLE = "DentDock | Dental software for UK private practices";
const DESCRIPTION =
  "Online booking, reminders, recalls, forms, charting and payments for UK private dental practices. £49 a month, no contract, same-day support.";

// Old one-page links (dentdock.co.uk/#pricing and so on) now live on their own pages.
// Browsers never send the # part to the server, so this has to happen in the page.
const MOVED_ANCHORS: Record<string, "/features"> = {
  "#about": "/features",
  "#everything": "/features",
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
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE}/og-image.png` },
      { name: "twitter:site", content: "@dentdock" },
    ],
    links: [{ rel: "canonical", href: SITE }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "DentDock",
          applicationCategory: "BusinessApplication",
          applicationSubCategory: "Dental practice management software",
          operatingSystem: "Web",
          url: SITE,
          inLanguage: "en-GB",
          description:
            "Dental practice software for UK private practices: online booking, reminders, recalls, forms, charting, treatment plans and payments.",
          // Waitlist only until sign-up opens, so the offer is a pre-order. No ratings until real
          // practices have reviewed it.
          offers: {
            "@type": "Offer",
            url: `${SITE}/pricing`,
            price: "49.00",
            priceCurrency: "GBP",
            availability: "https://schema.org/PreOrder",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "49.00",
              priceCurrency: "GBP",
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
            },
          },
          provider: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
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
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <section id="features" className="scroll-mt-24">
          <FeaturesSection />
        </section>
        <FeatureRows />
        <SolutionsGrid />
        <SupportRow />
        <SwitchRow />
        <section id="pricing" className="scroll-mt-24">
          <PricingCTA />
        </section>
        <section id="faq" className="scroll-mt-24">
          <FAQ />
        </section>
        <ClosingBand />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </>
  );
}
