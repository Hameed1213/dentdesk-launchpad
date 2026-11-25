import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import { passCookie, sameOrigin } from "@/lib/trainingAccess";
import { reply } from "@/lib/trainingApi";

// "Lock training on this computer": removes the pass.
export const Route = createFileRoute("/api/training/lock")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!sameOrigin(request)) return reply(403, { error: "Not allowed" });
        return reply(200, { unlocked: false }, { "Set-Cookie": passCookie("", 0) });
      },
    },
  },
});
