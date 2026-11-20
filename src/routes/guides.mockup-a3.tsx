import { createFileRoute } from "@tanstack/react-router";
import { GuideLayoutA3 } from "@/components/site/guideMocks";

// MOCK-UP ONLY (20 Nov 2026): Option A variation A3 for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-a3")({
  component: GuideLayoutA3,
  head: () => ({
    meta: [
      { title: "Guide layout A3 (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
