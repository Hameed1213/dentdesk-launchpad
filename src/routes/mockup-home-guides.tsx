import { createFileRoute } from "@tanstack/react-router";
import { HomeGuidesOptions } from "@/components/home/homeGuidesMocks";

// MOCK-UP ONLY (20 Nov 2026): four designs for the homepage guides section. Not for merging.
export const Route = createFileRoute("/mockup-home-guides")({
  component: HomeGuidesOptions,
  head: () => ({
    meta: [
      { title: "Homepage guides options (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
