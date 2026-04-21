import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import HowItWorks from "@/components/home/HowItWorks";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Dent Dock — Dental Practice Management Software for UK Private Practices",
      },
      {
        name: "description",
        content:
          "Dent Dock is dental practice management software built for independent UK private practices. Online booking, automated reminders, Stripe payments and recalls — all in one platform.",
      },
      {
        property: "og:title",
        content:
          "Dent Dock — Dental Practice Management Software for UK Private Practices",
      },
      {
        property: "og:description",
        content:
          "Online booking, automated reminders, Stripe payments and recalls — built for independent UK private practices.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Dent Dock — Dental Practice Management Software for UK Private Practices",
      },
      {
        name: "twitter:description",
        content:
          "Online booking, automated reminders, Stripe payments and recalls — built for independent UK private practices.",
      },
    ],
  }),
});

function Index() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ProductShowcase />
      <HowItWorks />
    </main>
  );
}
