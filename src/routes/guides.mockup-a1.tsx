import { createFileRoute } from "@tanstack/react-router";
import { GuideLayoutA1 } from "@/components/site/guideMocks";

// MOCK-UP ONLY (20 Nov 2026): Option A variation A1 for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-a1")({
  component: GuideLayoutA1,
  head: () => ({
    meta: [
      { title: "Guide layout A1 (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
