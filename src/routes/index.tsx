import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProductShowcase from "@/components/home/ProductShowcase";

import BentoGrid from "@/components/home/BentoGrid";
import FAQ from "@/components/home/FAQ";
import PricingCTA from "@/components/home/PricingCTA";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";

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
        <ProductShowcase />
      </section>
      <section id="everything">
        <BentoGrid />
      </section>
      <section id="pricing">
        <PricingCTA />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
