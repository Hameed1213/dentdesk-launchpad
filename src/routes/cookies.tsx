import { createFileRoute } from "@tanstack/react-router";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Cookie Policy — Dent Dock" },
      {
        name: "description",
        content:
          "How Dent Dock uses cookies. Minimal essential cookies only, no tracking or advertising cookies.",
      },
      { property: "og:title", content: "Cookie Policy — Dent Dock" },
      {
        property: "og:description",
        content:
          "Minimal essential cookies only. No tracking or advertising cookies.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://dentdock.co.uk/cookies" },
    ],
  }),
});

function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="April 2026">
      <LegalSection heading="What are cookies">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help us provide a working, secure experience.
        </p>
      </LegalSection>

      <LegalSection heading="What cookies we use">
        <p>We use a minimal set of cookies:</p>
      </LegalSection>

      <LegalSection heading="Essential cookies">
        <p>These are required for the platform to work. They cannot be disabled.</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong className="text-[#0F172A] font-semibold">Session cookie</strong> — keeps you logged in during your session. Expires when you close your browser.
          </li>
          <li>
            <strong className="text-[#0F172A] font-semibold">Authentication token</strong> — maintains your authenticated session across pages. Set by Supabase Auth.
          </li>
          <li>
            <strong className="text-[#0F172A] font-semibold">Onboarding progress</strong> — stores your setup wizard progress locally so you can resume if you close the browser. Stored in localStorage, not a cookie.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Analytics cookies">
        <p>
          We do not currently use any third-party analytics or tracking cookies. We do not use Google Analytics, Meta Pixel or any advertising cookies.
        </p>
      </LegalSection>

      <LegalSection heading="Payment cookies">
        <p>
          If you connect Stripe during onboarding, Stripe may set its own cookies to process payments securely. These are governed by Stripe's own cookie policy at stripe.com.
        </p>
      </LegalSection>

      <LegalSection heading="Marketing site (dentdock.co.uk)">
        <p>
          The marketing site uses no tracking cookies. Your email address submitted via the waitlist form is stored in our database only and is not shared with any advertising platform.
        </p>
      </LegalSection>

      <LegalSection heading="Managing cookies">
        <p>
          You can control cookies via your browser settings. Disabling essential cookies will prevent the platform from functioning correctly.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>For Chrome: Settings → Privacy → Cookies</li>
          <li>For Safari: Preferences → Privacy</li>
          <li>For Firefox: Options → Privacy &amp; Security</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy as we add new features. Changes will be posted here with an updated date.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          If you have questions about our use of cookies, contact us at hello@dentdock.co.uk.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
