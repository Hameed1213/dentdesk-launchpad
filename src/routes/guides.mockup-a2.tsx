import { createFileRoute } from "@tanstack/react-router";
import { GuideLayoutA2 } from "@/components/site/guideMocks";

// MOCK-UP ONLY (20 Nov 2026): Option A variation A2 for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-a2")({
  component: GuideLayoutA2,
  head: () => ({
    meta: [
      { title: "Guide layout A2 (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
