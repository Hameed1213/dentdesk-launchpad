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
    <LegalLayout title="Privacy Policy" updated="20 October 2026">
      <LegalSection heading="Who we are">
        <p>
          Dent Dock is a dental practice management platform. Dent Dock is a trading name of PARADIGM NETWORK LIMITED, a company registered in England and Wales (company number 16903048), whose registered office is at 11 Dronfield Road, Salford, M6 7FN. Our ICO registration number is ZC132966.
        </p>
        <p>Contact: hello@dentdock.co.uk</p>
      </LegalSection>

      <LegalSection heading="Our two roles">
        <p>
          <strong className="text-[#0F172A] font-semibold">For dental practices and their staff</strong>, we are the data controller. This policy explains how we use your account information.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">For patients</strong>, the dental practice is the data controller and we are its data processor. We hold patient information only so the practice can use Dent Dock, and only on the practice's instructions, under our <a href="/dpa" className="text-[#2563EB] hover:underline">Data Processing Agreement</a>. If you are a patient, your practice's privacy notice explains how your information is used, and your practice is the first place to go with any request about it.
        </p>
      </LegalSection>

      <LegalSection heading="What data we hold">
        <p>
          <strong className="text-[#0F172A] font-semibold">Practice account data</strong> — practice name, address, phone, email, opening hours and branding provided during setup.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Staff account data</strong> — name, email address and role for each person added to a practice account, and a record of sign-ins and actions taken in the app.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Patient data (held for the practice)</strong> — name, date of birth, contact details, appointments, medical history and notes, form answers, payments and communication preferences. This is entered by practice staff or given by patients when they book online, fill in a form or use the patient portal.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Online booking form totals (for the practice)</strong> — when a patient books online for a treatment that has a health form, we count, for the practice, how many people reach the form, how many finish it and how many go on to book. These are daily totals for each treatment. They contain no names, contact details, answers or other details about anyone, we cannot tell who a count came from, and we do not use cookies or store anything on the patient's device to make them. Every visitor is counted, whether or not they accept cookies.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Payment data</strong> — subscription and payment records. Card details are handled by Stripe and are never stored by Dent Dock.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Messages</strong> — emails (and, once available, text messages) sent to patients through Dent Dock, and messages you send to our support team.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Website visit totals</strong> — for dentdock.co.uk, we count daily totals of visits and page views, by page, by where visitors came from, by device type and by country. They contain nothing about any one person, we cannot tell who a count came from, and we do not use cookies or store anything on your device to make them. Every visitor is counted, whether or not they accept cookies.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Technical data</strong> — error reports from the app, used to find and fix problems. On dentdock.co.uk only, and only if you accept analytics cookies, Google Analytics records how the website is used. We do not use advertising tools. See our <a href="/cookies" className="text-[#2563EB] hover:underline">Cookie Policy</a>.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Website waitlist</strong> — if you join the waitlist on dentdock.co.uk, your email address, practice name and role. To see how people find us, we also keep where you came from: the page you signed up on, the first page you visited, the website or link that brought you (including any campaign tags on that link and whether it came from an advert, but not the advert's click ID), whether you used a phone, tablet or computer, and your country. We do not keep your IP address. This is worked out when you sign up; nothing is stored on your device to do it.
        </p>
      </LegalSection>

      <LegalSection heading="How we use it and our legal basis">
        <p>
          <strong className="text-[#0F172A] font-semibold">Contract</strong> — to provide Dent Dock to your practice, including billing and support.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Legitimate interests</strong> — to keep the service secure, prevent fraud and misuse, and improve the product.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Consent</strong> — to contact you about Dent Dock if you join the website waitlist. You can withdraw this at any time.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Legal obligation</strong> — to keep financial records and meet other legal duties.
        </p>
        <p>
          We do not sell data, and we never use patient data for advertising or for any purpose other than providing the service to the practice.
        </p>
      </LegalSection>

      <LegalSection heading="Support access">
        <p>
          If a practice needs help, a member of the Dent Dock team may sign in to that practice's account through a named "Dent Dock Support" user. Each support session is short, is recorded, and the record can be seen by the practice.
        </p>
        <p>
          Once a practice's account has closed, we can no longer sign in to it this way. When the practice's data is deleted, the "Dent Dock Support" user is deleted with it. We keep our own record of each support session (who signed in, when and why) for 24 months.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share data with">
        <p>We use the following companies to provide the service:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong className="text-[#0F172A] font-semibold">Supabase</strong> — database, sign-in, file storage and server functions. Data stored in London, UK.</li>
          <li><strong className="text-[#0F172A] font-semibold">Stripe</strong> — subscription billing and patient payments.</li>
          <li><strong className="text-[#0F172A] font-semibold">Resend</strong> — sending emails.</li>
          <li><strong className="text-[#0F172A] font-semibold">Vercel</strong> — hosting the practice app and the online booking site.</li>
          <li><strong className="text-[#0F172A] font-semibold">Cloudflare</strong> — protecting online booking and waitlist forms from automated abuse, and hosting dentdock.co.uk.</li>
          <li><strong className="text-[#0F172A] font-semibold">Google</strong> — website analytics on dentdock.co.uk, only if you accept analytics cookies, and website fonts. Google never receives patient data from us.</li>
        </ul>
        <p>
          A practice can choose to add its own Google Analytics, Google Ads or Meta account to its online booking page. Those companies then work for the practice, not for Dent Dock, and are only used if the patient accepts cookies on that page. We never send them a patient's name, contact details, date of birth, health information or form answers. See our <a href="/cookies" className="text-[#2563EB] hover:underline">Cookie Policy</a>.
        </p>
        <p>
          We do not send text messages yet. Before we do, we will add the text message provider to this list and tell practices.
        </p>
      </LegalSection>

      <LegalSection heading="Where data is stored">
        <p>
          Our database and files are stored in London, UK. Some of the companies above (Stripe, Resend, Vercel, Cloudflare and Google) may process data outside the UK, including in the United States. Where that happens, we rely on the protections UK data protection law requires, such as UK adequacy regulations or the UK International Data Transfer Agreement.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep data">
        <p>
          <strong className="text-[#0F172A] font-semibold">Practice and staff account data</strong> — for as long as the practice has an account, and deleted within 90 days after the account closes.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Financial records</strong> — six years, as required by UK tax law.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Error reports</strong> — until 12 months after the problem is marked as fixed. If the same problem happens again, it is reopened and kept.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Records of support sessions</strong> — 24 months.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Online booking form totals</strong> — for as long as the practice has an account. They contain no personal data.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Website waitlist</strong> — until you ask us to remove you, or two years after you joined if you have not become a customer by then.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Website visit totals</strong> — for as long as they are useful to us. They contain no personal data.
        </p>
        <p>
          <strong className="text-[#0F172A] font-semibold">Patient data</strong> — kept on the practice's instructions. UK guidance is that dental records are kept for 11 years after the last treatment for adults, and for children until they are 25 or for 11 years, whichever is longer. When a practice's account closes, we return its data or delete it, as the practice chooses, within 90 days.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights under UK GDPR">
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Ask us to delete your data</li>
          <li>Object to or restrict how we use it</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time, where we rely on consent</li>
        </ul>
        <p>
          To use any of these rights, contact us at hello@dentdock.co.uk. We will respond within one month. If you are a patient, please contact your dental practice; we will pass on any request we receive to them.
        </p>
        <p>
          You can also complain to the Information Commissioner's Office (ICO) at ico.org.uk or on 0303 123 1113.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We protect data with encryption in transit and at rest, access rules that keep each practice's data separate, and records of who did what in the app.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          In the app we only use what is needed to keep you signed in. On dentdock.co.uk we use analytics cookies only if you accept them. A practice's online booking page may use the practice's own analytics and advertising cookies, only if the patient accepts them. See our <a href="/cookies" className="text-[#2563EB] hover:underline">Cookie Policy</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. We will email account holders about important changes.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
