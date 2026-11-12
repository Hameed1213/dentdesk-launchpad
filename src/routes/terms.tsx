import { createFileRoute } from "@tanstack/react-router";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service | Dent Dock" },
      {
        name: "description",
        content:
          "The terms governing your use of Dent Dock: accounts, billing, text messages, refunds, patient payments, acceptable use and liability.",
      },
      { property: "og:title", content: "Terms of Service | Dent Dock" },
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
    <LegalLayout title="Terms of Service" updated="4 November 2026">
      <p>
        These Terms of Service govern your use of Dent Dock. Dent Dock is a trading name of PARADIGM NETWORK LIMITED, a company registered in England and Wales (company number 16903048), whose registered office is at 11 Dronfield Road, Salford, M6 7FN.
      </p>
      <p>By creating an account, you agree to these terms.</p>

      <LegalSection heading="1. The Service">
        <p>
          Dent Dock provides dental practice management software, including online booking, calendar management, patient records, appointment reminders, text messages (once switched on for your practice), payments, and recalls.
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
          As a dental practice using Dent Dock, you are the data controller for your patients' personal data. Dent Dock acts as a data processor on your behalf and processes patient data only to provide the service to you, under our <a href="/dpa" className="text-[#2563EB] hover:underline">Data Processing Agreement</a>, which forms part of these terms.
        </p>
        <p>
          The third parties we use to provide the service are listed in the Data Processing Agreement and our Privacy Policy. We will tell you at least 30 days before we add or replace one.
        </p>
        <p>You are responsible for:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Having a lawful basis for the patient data you hold, and telling your patients how you use it.</li>
          <li>Complying with UK GDPR in your use of patient data.</li>
          <li>Ensuring your use of the platform complies with CQC requirements.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Subscription and Billing">
        <p>Subscriptions are billed monthly in advance, at the price shown when you subscribe. All prices exclude VAT.</p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Free trial.</strong> New practices get a 30-day free trial, and each practice can have one free trial only. You need to give card details to start it. We take no subscription payment during the trial. When it ends, billing begins automatically on that card unless you have cancelled.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Cancelling.</strong> You may cancel your subscription at any time via the Billing section in Settings. Cancellation takes effect at the end of the current billing period. Any extra text charges not yet billed (section 6) then go on a final invoice, which we take from your card.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">If a payment fails.</strong> We will show an alert in the app and try the payment again, and your practice can keep working while we do. If it has still not been paid 7 days after it first failed, we will email your practice's owners, and your texts are limited to the amount included in your subscription. If the payment still has not been made when we stop trying, your account is put on hold until your card is updated: your team cannot use Dent Dock and automatic messages to patients stop. Your data is not deleted because of this.
        </p>
      </LegalSection>

      <LegalSection heading="6. Text Messages">
        <p>
          Texts are available once we have set them up and switched them on for your practice. Until then, messages to patients go by email.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">What is included.</strong> Your subscription includes 200 text parts in each billing period. A short text is one part. A longer text is 2 or 3 parts. Unused parts do not carry over.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Extra texts.</strong> Each part over the 200 costs 8p, excluding VAT. There is no spending cap: texts carry on after the 200, and you pay for every extra part. A part counts once a text has been sent to the phone network, whether or not it reaches the patient's phone. Texts that fail before that are not counted.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">How you are billed.</strong> Extra parts are billed in arrears and added to your monthly invoice. We will give you at least 30 days' notice before we start charging for extra texts, and before we change the price.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">During the free trial.</strong> Texts are limited to the 200 included. After that, messages go by email until your subscription starts.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Your responsibilities.</strong> You must only send marketing to patients who have agreed to it. Patients can stop texts from your practice using the link in a text. A stop applies to all texts to that number from your practice, and you must only undo it if the patient asks you to.
        </p>
      </LegalSection>

      <LegalSection heading="7. Refunds and Billing Questions">
        <p>
          Subscription payments are not refunded for partial months. Extra text charges are not refunded unless they were counted in error. If we have charged you by mistake, we will refund the mistake. Nothing in these terms affects any rights you have by law.
        </p>
        <p>
          If you have a question about a charge, or think one is wrong, please email hello@dentdock.co.uk before contacting your bank, so we can look into it and put it right.
        </p>
      </LegalSection>

      <LegalSection heading="8. Taking Payments from Patients">
        <p>
          You can take payments from your patients with Dent Dock, including payment links, deposits and late cancellation or no-show fees. These go through your own Stripe account, which you connect yourself and which is covered by your own agreement with Stripe.
        </p>
        <p>
          The money goes to your Stripe account, not to us. We take no share of it. You pay Stripe's fees.
        </p>
        <p>These payments are between you and your patient. You are responsible for:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Setting your own deposits, fees and cancellation rules, and making sure they are fair and lawful, including under consumer law and any NHS rules that apply to you.</li>
          <li>Telling patients about your deposits, fees and cancellation rules before they book.</li>
          <li>Refunds, disputes and chargebacks.</li>
        </ul>
        <p>
          Dent Dock works out fees from your settings and offers them to your staff, but does not send a fee request by itself. If a patient cancels a booking with an online deposit through the patient portal, outside your free cancellation window, Dent Dock refunds the deposit automatically through your Stripe account. Inside that window, your late cancellation fee is the most you keep, and Dent Dock refunds any amount over it in the same way.
        </p>
      </LegalSection>

      <LegalSection heading="9. Availability">
        <p>
          We aim to maintain high availability, but we do not guarantee uninterrupted access. Planned maintenance will be communicated in advance where possible.
        </p>
      </LegalSection>

      <LegalSection heading="10. Limitation of Liability">
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

      <LegalSection heading="11. Termination">
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

      <LegalSection heading="12. Governing Law">
        <p>
          These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>
      </LegalSection>

      <LegalSection heading="13. Contact">
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
