import { createFileRoute } from "@tanstack/react-router";
import { GuideLayoutA4 } from "@/components/site/guideMocks";

// MOCK-UP ONLY (20 Nov 2026): A1 with a grey header, no rule by the short answer, blue HH. Not for merging.
export const Route = createFileRoute("/guides/mockup-a4")({
  component: GuideLayoutA4,
  head: () => ({
    meta: [
      { title: "Guide layout A4 (mock-up) | DentDock" },
      { name: "robots", content: "noindex" },
    ],
  }),
});
