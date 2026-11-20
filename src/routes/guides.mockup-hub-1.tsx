import { createFileRoute } from "@tanstack/react-router";
import { GuidesHub1 } from "@/components/site/guidesHubMocks";

// MOCK-UP ONLY (20 Nov 2026): guides hub card design 1 for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-hub-1")({
  component: GuidesHub1,
  head: () => ({
    meta: [
      { title: "Guides hub design 1 (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
