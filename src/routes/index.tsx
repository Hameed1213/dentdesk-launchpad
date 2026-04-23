import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";

const ProductShowcase = lazy(() => import("@/components/home/ProductShowcase"));
const BentoGrid = lazy(() => import("@/components/home/BentoGrid"));
const PricingCTA = lazy(() => import("@/components/home/PricingCTA"));
const FAQ = lazy(() => import("@/components/home/FAQ"));
const Footer = lazy(() => import("@/components/home/Footer"));
const WhatsAppButton = lazy(() => import("@/components/home/WhatsAppButton"));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Dent Dock — Dental Practice Management Software for UK Practices",
      },
      {
        name: "description",
        content:
          "Online booking, automated reminders, payments and recalls for UK private dental practices. Set up in under 10 minutes. From £49/month. No contracts.",
      },
      { property: "og:url", content: "https://dentdock.co.uk" },
      { property: "og:title", content: "Dent Dock — Dental Practice Management Software" },
      {
        property: "og:description",
        content:
          "Online booking, automated reminders, payments and recalls for UK private dental practices. From £49/month.",
      },
      { property: "og:image", content: "https://dentdock.co.uk/og-image.png" },
      { name: "twitter:image", content: "https://dentdock.co.uk/og-image.png" },
      { name: "twitter:site", content: "@dentdock" },
    ],
    links: [
      { rel: "canonical", href: "https://dentdock.co.uk" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Dent Dock",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: "https://dentdock.co.uk",
          description:
            "Dental practice management software for UK private practices. Online booking, automated reminders, payments and recalls.",
          offers: {
            "@type": "Offer",
            price: "49",
            priceCurrency: "GBP",
            priceSpecification: {
              "@type": "RecurringCharge",
              billingDuration: "P1M",
            },
          },
          provider: {
            "@type": "Organization",
            name: "Dent Dock",
            url: "https://dentdock.co.uk",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "When is Dent Dock launching?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We're currently in early access with our first practices. Join the waitlist and you'll be among the first to get access — with priority support and early access pricing locked in.",
              },
            },
            {
              "@type": "Question",
              name: "Can I import my existing patients?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We support direct imports from Dentally, Software of Excellence (EXACT), Curve Dental, Carestream R4 and Practiceworks. Upload a CSV and we handle the rest automatically.",
              },
            },
            {
              "@type": "Question",
              name: "Does it work for mixed NHS and private practices?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Dent Dock is built for private and mixed practices. It doesn't include NHS UDA management or claim processing — if you need those, it may not be the right fit. If you're going private or already there, it's built for you.",
              },
            },
            {
              "@type": "Question",
              name: "How long does setup actually take?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Most practices are fully configured and live in under 10 minutes. Your opening hours, services and SMS automations all have smart defaults pre-filled — you just confirm and go.",
              },
            },
            {
              "@type": "Question",
              name: "What happens after I join the waitlist?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You'll get an email from us personally — not an automated sequence. We'll walk you through early access, answer any questions and get you set up when you're ready.",
              },
            },
            {
              "@type": "Question",
              name: "Is there a contract or minimum term?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No contracts. No setup fees. Cancel any time. We believe you should stay because the software is good, not because you're locked in.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="about">
        <Suspense fallback={null}>
          <ProductShowcase />
        </Suspense>
      </section>
      <section id="everything">
        <Suspense fallback={null}>
          <BentoGrid />
        </Suspense>
      </section>
      <section id="pricing">
        <Suspense fallback={null}>
          <PricingCTA />
        </Suspense>
      </section>
      <section id="faq">
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </section>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </main>
  );
}
