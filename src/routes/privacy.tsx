import { createFileRoute } from "@tanstack/react-router";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Dent Dock" },
      {
        name: "description",
        content:
          "How Dent Dock collects, stores and processes data under UK GDPR. Patient data, retention, and your rights.",
      },
      { property: "og:title", content: "Privacy Policy — Dent Dock" },
      {
        property: "og:description",
        content:
          "How Dent Dock collects, stores and processes data under UK GDPR.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://dentdock.co.uk/privacy" },
    ],
  }),
});

function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="April 2026">
      <LegalSection heading="Who we are">
        <p>
          Dent Dock is a dental practice management platform operated by PARADIGM NETWORK LIMITED, registered in England and Wales. Our platform is available at dentdock.co.uk and app.dentdock.co.uk.
        </p>
        <p>Contact: hello@dentdock.co.uk</p>
      </LegalSection>

      <LegalSection heading="What data we collect">
        <p>We collect the following categories of data:</p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Practice account data</strong> — practice name, address, phone, email, opening hours and branding preferences provided during onboarding.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">User account data</strong> — name, email address and role for each staff member added to a practice account.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Patient data</strong> — name, date of birth, contact details, appointment history, medical notes, form responses and communication preferences. This data is entered by practice staff or submitted directly by patients via the online booking flow.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Payment data</strong> — transaction records, deposit amounts and payment status. Card details are processed directly by Stripe and never stored on Dent Dock servers.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Usage data</strong> — how you interact with the platform, including pages visited, features used and error logs. Used to improve the product.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Communications data</strong> — SMS messages sent and received via the Inbox feature.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your data">
        <p>We use data to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Provide and operate the Dent Dock platform</li>
          <li>Send appointment reminders and recalls on behalf of dental practices</li>
          <li>Process payments via Stripe</li>
          <li>Provide customer support</li>
          <li>Improve and develop the platform</li>
          <li>Comply with legal obligations</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Legal basis for processing">
        <p>We process data under the following lawful bases under UK GDPR:</p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Contract</strong> — to deliver the service you have signed up for.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Legitimate interests</strong> — to improve the platform, prevent fraud and ensure security.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Consent</strong> — for marketing communications to waitlist subscribers.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Legal obligation</strong> — where required by law.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share data with">
        <p>
          We share data only with the following third-party processors, all operating under appropriate data processing agreements:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong className="text-[#0F172A] font-semibold">Supabase</strong> — database and authentication. Data stored in EU West 2 (London), UK.</li>
          <li><strong className="text-[#0F172A] font-semibold">Stripe</strong> — payment processing.</li>
          <li><strong className="text-[#0F172A] font-semibold">The SMS Works</strong> — SMS delivery. UK-based, UK data residency.</li>
          <li><strong className="text-[#0F172A] font-semibold">Resend</strong> — transactional email delivery.</li>
          <li><strong className="text-[#0F172A] font-semibold">Vercel</strong> — platform hosting and edge network.</li>
        </ul>
        <p>
          We do not sell data to third parties. We do not use patient data for advertising.
        </p>
      </LegalSection>

      <LegalSection heading="Data retention">
        <p>
          Practice and user account data is retained for the duration of the subscription and deleted within 90 days of account closure upon request.
        </p>
        <p>
          Patient data is retained in accordance with CQC guidelines for dental records — a minimum of 10 years for adults, until age 25 for patients treated as children.
        </p>
      </LegalSection>

      <LegalSection heading="Where data is stored">
        <p>
          All data is stored on Supabase infrastructure in the EU West 2 (London) region. Data does not leave the United Kingdom.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights under UK GDPR">
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at hello@dentdock.co.uk. We will respond within 30 days.
        </p>
        <p>
          You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We implement appropriate technical and organisational measures to protect your data, including encryption at rest and in transit, row-level security policies and access controls.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. We will notify account holders of material changes by email.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
