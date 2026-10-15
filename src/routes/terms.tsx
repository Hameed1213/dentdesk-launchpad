import { createFileRoute } from "@tanstack/react-router";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — Dent Dock" },
      {
        name: "description",
        content:
          "The terms governing your use of Dent Dock — accounts, billing, acceptable use and liability.",
      },
      { property: "og:title", content: "Terms of Service — Dent Dock" },
      {
        property: "og:description",
        content: "The terms governing your use of Dent Dock.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://dentdock.co.uk/terms" },
    ],
  }),
});

function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="15 October 2026">
      <p>
        These Terms of Service govern your use of Dent Dock. Dent Dock is a trading name of PARADIGM NETWORK LIMITED, a company registered in England and Wales (company number 16903048), whose registered office is at 11 Dronfield Road, Salford, M6 7FN.
      </p>
      <p>By creating an account, you agree to these terms.</p>

      <LegalSection heading="1. The Service">
        <p>
          Dent Dock provides dental practice management software, including online booking, calendar management, patient records, appointment reminders, payments, and recalls.
        </p>
        <p>
          The platform is provided as-is on a subscription basis. We reserve the right to update, modify, or discontinue features with reasonable notice.
        </p>
      </LegalSection>

      <LegalSection heading="2. Your Account">
        <p>
          You are responsible for maintaining the security of your account credentials. You must not share login details or allow unauthorised access to your account.
        </p>
        <p>You must provide accurate information during signup and keep it up to date.</p>
        <p>You must be 18 or over and authorised to enter into contracts on behalf of your practice.</p>
      </LegalSection>

      <LegalSection heading="3. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Use the platform for any unlawful purpose.</li>
          <li>Attempt to access data belonging to other practices.</li>
          <li>Reverse engineer, copy, or resell the platform.</li>
          <li>Upload malicious code or attempt to disrupt the service.</li>
          <li>Use email or text messages to send unsolicited marketing.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Patient Data Responsibilities">
        <p>
          As a dental practice using Dent Dock, you are the data controller for your patients' personal data. Dent Dock acts as a data processor on your behalf and processes patient data only to provide the service to you.
        </p>
        <p>
          The third parties we use to provide the service are listed in our Privacy Policy. We will tell you before we add a new one.
        </p>
        <p>You are responsible for:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Having a lawful basis for the patient data you hold, and telling your patients how you use it.</li>
          <li>Complying with UK GDPR in your use of patient data.</li>
          <li>Ensuring your use of the platform complies with CQC requirements.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Payments and Billing">
        <p>Subscriptions are billed monthly in advance. All prices exclude VAT.</p>
        <p>
          The 30-day free trial requires no payment upfront. After the trial period, billing begins automatically unless cancelled.
        </p>
        <p>
          You may cancel your subscription at any time via the Billing section in Settings. Cancellation takes effect at the end of the current billing period. No refunds are issued for partial months.
        </p>
      </LegalSection>

      <LegalSection heading="6. Availability">
        <p>
          We aim to maintain high availability, but we do not guarantee uninterrupted access. Planned maintenance will be communicated in advance where possible.
        </p>
      </LegalSection>

      <LegalSection heading="7. Limitation of Liability">
        <p>To the maximum extent permitted by law, PARADIGM NETWORK LIMITED shall not be liable for:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Loss of revenue or profits.</li>
          <li>Loss of patient data beyond our reasonable control.</li>
          <li>Indirect or consequential losses.</li>
        </ul>
        <p>
          Our total liability to you shall not exceed the fees paid in the 3 months preceding the claim.
        </p>
      </LegalSection>

      <LegalSection heading="8. Termination">
        <p>
          We may suspend or terminate your account if you breach these terms, fail to pay, or use the platform in a way that puts other users or patient data at risk.
        </p>
        <p>
          You may terminate your account at any time by contacting hello@dentdock.co.uk.
        </p>
        <p>
          When your account closes, we will, at your choice, return your practice's data to you or delete it, within 90 days. Dental records usually have to be kept for many years, so please ask us for a copy of your patient records before your account closes.
        </p>
      </LegalSection>

      <LegalSection heading="9. Governing Law">
        <p>
          These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>
      </LegalSection>

      <LegalSection heading="10. Contact">
        <p>
          PARADIGM NETWORK LIMITED (trading as Dent Dock)<br />
          11 Dronfield Road, Salford, M6 7FN<br />
          Company number 16903048<br />
          hello@dentdock.co.uk<br />
          dentdock.co.uk
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
