import { createFileRoute } from "@tanstack/react-router";
import { GuideLayoutC } from "@/components/site/guideMocks";

// MOCK-UP ONLY (20 Nov 2026): guide layout option C for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-c")({
  component: GuideLayoutC,
  head: () => ({
    meta: [
      { title: "Guide layout option C (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
