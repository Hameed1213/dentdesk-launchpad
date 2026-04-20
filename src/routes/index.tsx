import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "DentDesk — Practice management software that actually makes sense",
      },
      {
        name: "description",
        content:
          "DentDesk handles bookings, reminders, payments and recalls for independent UK dental practices going private. Free 30-day trial, no credit card.",
      },
      { property: "og:title", content: "DentDesk — Modern dental practice management" },
      {
        property: "og:description",
        content:
          "Bookings, reminders, payments and recalls — built for independent UK practices going private.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "DentDesk — Modern dental practice management" },
      {
        name: "twitter:description",
        content:
          "Bookings, reminders, payments and recalls — built for independent UK practices going private.",
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
