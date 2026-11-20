import { createFileRoute } from "@tanstack/react-router";
import { GuideLayoutB } from "@/components/site/guideMocks";

// MOCK-UP ONLY (20 Nov 2026): guide layout option B for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-b")({
  component: GuideLayoutB,
  head: () => ({
    meta: [
      { title: "Guide layout option B (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
