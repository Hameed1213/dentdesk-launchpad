import { createFileRoute } from "@tanstack/react-router";
import { GuidesHub2 } from "@/components/site/guidesHubMocks";

// MOCK-UP ONLY (20 Nov 2026): guides hub card design 2 for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-hub-2")({
  component: GuidesHub2,
  head: () => ({
    meta: [
      { title: "Guides hub design 2 (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
