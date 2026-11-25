import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import { checkPass, closedReason, readCookie, trainingConfig } from "@/lib/trainingAccess";
import { reply } from "@/lib/trainingApi";

// Is this browser let in to the training? Answers only yes (with the practice name) or no.
export const Route = createFileRoute("/api/training/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const config = trainingConfig(process.env);
        if (!config)
          return reply(200, { open: false, unlocked: false, why: closedReason(process.env) });
        const practice = await checkPass(
          config.secret,
          readCookie(request.headers.get("cookie")),
          config.entries,
        );
        return reply(
          200,
          practice ? { open: true, unlocked: true, practice } : { open: true, unlocked: false },
        );
      },
    },
  },
});
