import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";

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
          "Dent Dock is the modern dental practice management platform for independent UK dental practices. Online booking, automated reminders, Stripe payments and recalls — built for practices going private.",
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
    </main>
  );
}
