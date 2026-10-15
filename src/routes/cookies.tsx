import { createFileRoute } from "@tanstack/react-router";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";
import { openCookieSettings } from "@/lib/cookieConsent";

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
    <LegalLayout title="Cookie Policy" updated="15 October 2026">
      <LegalSection heading="What are cookies">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help us provide a working, secure experience.
        </p>
      </LegalSection>

      <LegalSection heading="What cookies we use">
        <p>We use a minimal set of cookies. Analytics cookies are only used if you agree.</p>
      </LegalSection>

      <LegalSection heading="Essential cookies">
        <p>These are required for the platform to work. They cannot be disabled.</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong className="text-[#0F172A] font-semibold">Sign-in</strong> — keeps you signed in to the practice app or patient portal. Stored in your browser's local storage by Supabase Auth, and removed when you sign out.
          </li>
          <li>
            <strong className="text-[#0F172A] font-semibold">Onboarding progress</strong> — stores your setup wizard progress locally so you can resume if you close the browser. Stored in localStorage, not a cookie.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Analytics cookies (only if you accept)">
        <p>
          On dentdock.co.uk we use Google Analytics to see how many people visit and which pages they use. It sets the cookies <strong className="text-[#0F172A] font-semibold">_ga</strong> and <strong className="text-[#0F172A] font-semibold">_ga_RVEYZHHMEC</strong>, which last up to two years. They are only set if you click Accept on the cookie banner, and are removed if you change your mind. Google provides this service for us.
        </p>
        <p>
          We do not use advertising cookies or social media tracking pixels. The practice app and the online booking site do not use analytics cookies.
        </p>
        <p>
          <button type="button" onClick={openCookieSettings} className="text-[#2563EB] hover:underline">Change your cookie choice</button>
        </p>
      </LegalSection>

      <LegalSection heading="Payment cookies">
        <p>
          If you connect Stripe during onboarding, Stripe may set its own cookies to process payments securely. These are governed by Stripe's own cookie policy at stripe.com.
        </p>
      </LegalSection>

      <LegalSection heading="Marketing site (dentdock.co.uk)">
        <p>
          Apart from Google Analytics (only if you accept), the website sets one cookie of its own provider, Cloudflare (<strong className="text-[#0F172A] font-semibold">__cf_bm</strong>), which protects the site from automated abuse and lasts 30 minutes. Your details submitted via the waitlist form are stored in our database only and are not shared with any advertising platform.
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
