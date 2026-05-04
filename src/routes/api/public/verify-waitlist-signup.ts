import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pyotfmkosyrehtrcurue.supabase.co";

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
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: corsHeaders }),

      POST: async ({ request }) => {
        try {
          // ---- 1. Parse + validate input
          let body: Record<string, unknown>;
          try {
            body = (await request.json()) as Record<string, unknown>;
          } catch {
            return json(400, { error: "Invalid JSON body" });
          }

          const email =
            typeof body.email === "string"
              ? body.email.trim().toLowerCase()
              : "";
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
          const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (!turnstileSecret || !serviceRoleKey) {
            console.error("verify-waitlist-signup: missing server secrets", {
              hasTurnstile: Boolean(turnstileSecret),
              hasServiceRole: Boolean(serviceRoleKey),
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

          if (!verifyRes.ok) {
            console.error("Turnstile verify HTTP error", {
              status: verifyRes.status,
            });
            return json(403, { error: "Verification failed" });
          }

          const verifyData = (await verifyRes.json()) as {
            success: boolean;
            "error-codes"?: string[];
          };

          if (!verifyData.success) {
            console.error("Turnstile verify rejected", {
              errorCodes: verifyData["error-codes"],
            });
            return json(403, { error: "Verification failed" });
          }

          // ---- 3. Insert (service role bypasses RLS)
          const admin = createClient(SUPABASE_URL, serviceRoleKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          });

          const { error: insertError } = await admin
            .from("marketing_waitlist")
            .insert({
              email,
              practice_name: practiceName,
              role,
              source: "marketing-site",
            });

          if (insertError) {
            // 23505 = unique_violation. Treat as success to avoid email-enumeration leak.
            if (insertError.code === "23505") {
              return json(200, { success: true });
            }
            console.error("marketing_waitlist insert failed", {
              code: insertError.code,
              message: insertError.message,
            });
            return json(500, { error: "Could not save signup" });
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
