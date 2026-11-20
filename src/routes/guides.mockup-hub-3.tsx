import { createFileRoute } from "@tanstack/react-router";
import { GuidesHub3 } from "@/components/site/guidesHubMocks";

// MOCK-UP ONLY (20 Nov 2026): guides hub card design 3 for Hariss to choose. Not for merging.
export const Route = createFileRoute("/guides/mockup-hub-3")({
  component: GuidesHub3,
  head: () => ({
    meta: [
      { title: "Guides hub design 3 (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
