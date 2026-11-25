import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import {
  hashCode,
  makePass,
  passCookie,
  practiceForCode,
  sameOrigin,
  trainingConfig,
} from "@/lib/trainingAccess";
import { reply } from "@/lib/trainingApi";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Checks a practice's access code and, if right, gives the browser its training pass.
export const Route = createFileRoute("/api/training/unlock")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!sameOrigin(request)) return reply(403, { error: "Not allowed" });
        const config = trainingConfig(process.env);
        if (!config) return reply(503, { error: "Training isn't switched on yet." });

        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return reply(400, { error: "Invalid request" });
        }

        const practice = await practiceForCode(body.code, config.entries);
        if (!practice) {
          // Slows down anyone trying codes one after another. The code itself is never logged.
          await wait(800);
          return reply(401, {
            error: "That code isn't right. Check it with your practice manager.",
          });
        }

        const pass = await makePass(config.secret, await hashCode(String(body.code)));
        return reply(200, { unlocked: true, practice }, { "Set-Cookie": passCookie(pass) });
      },
    },
  },
});
