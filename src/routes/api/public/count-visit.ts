import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import { channelFor, cleanTracking, countryFrom, deviceFrom, isBot, sitePath } from "@/lib/visitSource";

// Counts one page view of dentdock.co.uk (and one visit, for the first page of
// a visit) into DAILY TOTALS on the ops project: marketing_site_count(),
// guarded by the same website key as the waitlist. Nothing about the visitor
// is stored; the user agent is read to tell a phone from a computer and to
// skip bots, then dropped. Always answers 204 so it can't be used to probe.
const opsUrl = () => process.env.OPS_SUPABASE_URL || "https://befyhizctaqhtlebzsdj.supabase.co";
const done = () => new Response(null, { status: 204 });

export const Route = createFileRoute("/api/public/count-visit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ua = request.headers.get("user-agent");
          if (isBot(ua)) return done();
          const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
          const path = sitePath(body?.path);
          if (!path) return done();
          const key = process.env.WAITLIST_KEY;
          const anon = process.env.OPS_SUPABASE_ANON_KEY;
          if (!key || !anon) return done();
          const t = cleanTracking(body);
          await fetch(`${opsUrl()}/rest/v1/rpc/marketing_site_count`, {
            method: "POST",
            headers: { apikey: anon, "Content-Type": "application/json" },
            body: JSON.stringify({
              p_key: key,
              p_path: path,
              p_channel: channelFor(t),
              p_device: deviceFrom(ua),
              p_country: countryFrom(request.headers.get("cf-ipcountry")),
              p_new_visit: body?.first === true,
            }),
          }).catch(() => null);
        } catch {
          /* counting must never fail loudly */
        }
        return done();
      },
    },
  },
});
