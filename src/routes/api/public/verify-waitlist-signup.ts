import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import { alertEmail, thankYouEmail, type WaitlistSignup } from "@/lib/waitlistEmails";

// Sign-ups are kept on the OPS Supabase project (DentDock's own business
// data), through marketing_waitlist_join(): callable with the ops project's
// public anon key, but refused unless given WAITLIST_KEY, which only this
// server holds. The website holds no service_role key for any project.
// Both overridable by env only so the whole flow can be tested against stand-ins.
const opsUrl = () => process.env.OPS_SUPABASE_URL || "https://befyhizctaqhtlebzsdj.supabase.co";
const resendUrl = () => process.env.RESEND_URL || "https://api.resend.com/emails";
const FROM = "Dent Dock <noreply@dentdock.co.uk>";
const TEAM = "hello@dentdock.co.uk";

async function sendEmail(
  apiKey: string,
  to: string,
  msg: { subject: string; text: string; html: string },
) {
  const res = await fetch(resendUrl(), {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], reply_to: TEAM, ...msg }),
  });
  if (!res.ok)
    console.error("waitlist email not sent", { status: res.status, subject: msg.subject });
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitiseOptional(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > maxLen) return trimmed.slice(0, maxLen);
  return trimmed;
}

export const Route = createFileRoute("/api/public/verify-waitlist-signup")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),

      POST: async ({ request }) => {
        try {
          // ---- 1. Parse + validate input
          let body: Record<string, unknown>;
          try {
            body = (await request.json()) as Record<string, unknown>;
          } catch {
            return json(400, { error: "Invalid JSON body" });
          }

          const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
          const turnstileToken =
            typeof body.turnstile_token === "string" ? body.turnstile_token : "";

          if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
            return json(400, { error: "Invalid email" });
          }
          if (!turnstileToken || turnstileToken.length > 4096) {
            return json(400, { error: "Missing verification token" });
          }

          // Optional fields — sanitise; unknown extras silently ignored.
          const practiceName = sanitiseOptional(body.practice_name, 200);
          const role = sanitiseOptional(body.role, 100);

          // ---- 2. Verify Turnstile
          const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
          const waitlistKey = process.env.WAITLIST_KEY;
          const opsAnonKey = process.env.OPS_SUPABASE_ANON_KEY;
          const resendKey = process.env.RESEND_API_KEY;
          if (!turnstileSecret || !waitlistKey || !opsAnonKey) {
            console.error("verify-waitlist-signup: missing server secrets", {
              hasTurnstile: Boolean(turnstileSecret),
              hasWaitlistKey: Boolean(waitlistKey),
              hasOpsAnonKey: Boolean(opsAnonKey),
            });
            return json(500, { error: "Server not configured" });
          }

          const form = new URLSearchParams();
          form.set("secret", turnstileSecret);
          form.set("response", turnstileToken);
          const verifyRes = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            { method: "POST", body: form },
          );
          const verifyData = (await verifyRes.json().catch(() => null)) as {
            success?: boolean;
            "error-codes"?: string[];
          } | null;
          if (!verifyRes.ok || !verifyData?.success) {
            console.error("Turnstile verify rejected", {
              status: verifyRes.status,
              errorCodes: verifyData?.["error-codes"],
            });
            return json(403, { error: "Verification failed" });
          }

          // ---- 3. Save on the ops project
          const joinRes = await fetch(`${opsUrl()}/rest/v1/rpc/marketing_waitlist_join`, {
            method: "POST",
            headers: {
              apikey: opsAnonKey,
              Authorization: `Bearer ${opsAnonKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              p_key: waitlistKey,
              p_email: email,
              p_practice_name: practiceName,
              p_role: role,
              p_source: "marketing-site",
            }),
          });
          if (!joinRes.ok) {
            console.error("marketing_waitlist_join failed", { status: joinRes.status });
            return json(500, { error: "Could not save signup" });
          }
          const outcome = await joinRes.json().catch(() => null);

          // ---- 4. Emails, for a NEW sign-up only. A repeat answers the same
          // success (no way to tell from outside whether an email was already
          // on the list) and sends nothing. A failed email never fails the
          // sign-up: it is saved either way.
          if (outcome === "new") {
            if (resendKey) {
              const signup: WaitlistSignup = { email, practiceName, role };
              await Promise.all([
                sendEmail(resendKey, email, thankYouEmail(signup)),
                sendEmail(resendKey, TEAM, alertEmail(signup)),
              ]);
            } else {
              console.error("verify-waitlist-signup: RESEND_API_KEY not set, no emails sent");
            }
          }

          return json(200, { success: true });
        } catch (err) {
          console.error("verify-waitlist-signup unexpected error", err);
          return json(500, { error: "Unexpected error" });
        }
      },
    },
  },
});
