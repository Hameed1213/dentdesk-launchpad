import { createFileRoute } from "@tanstack/react-router";
import { GuidesHubPhotos } from "@/components/site/guidesHubMocks";

// MOCK-UP ONLY (20 Nov 2026): photo options for the design-1 guide card. Not for merging.
export const Route = createFileRoute("/guides/mockup-photos")({
  component: GuidesHubPhotos,
  head: () => ({
    meta: [
      { title: "Guide card photo options (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
