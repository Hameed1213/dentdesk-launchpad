import { createFileRoute } from "@tanstack/react-router";
import { GuideLayoutA } from "@/components/site/guideMocks";

// MOCK-UP ONLY (20 Nov 2026): guide layout option A for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-a")({
  component: GuideLayoutA,
  head: () => ({
    meta: [
      { title: "Guide layout option A (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
