import { createFileRoute } from "@tanstack/react-router";
import LegalLayout, { LegalSection } from "@/components/legal/LegalLayout";

export const Route = createFileRoute("/dpa")({
  component: DpaPage,
  head: () => ({
    meta: [
      { title: "Data Processing Agreement — Dent Dock" },
      {
        name: "description",
        content:
          "The Data Processing Agreement between dental practices and Dent Dock under UK GDPR Article 28.",
      },
      { property: "og:title", content: "Data Processing Agreement — Dent Dock" },
      {
        property: "og:description",
        content: "How Dent Dock processes patient data on behalf of dental practices.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://dentdock.co.uk/dpa" },
    ],
  }),
});

function DpaPage() {
  return (
    <LegalLayout title="Data Processing Agreement" updated="20 October 2026">
      <p>
        This Data Processing Agreement ("DPA") is between the dental practice that holds a Dent Dock account (the "Practice") and PARADIGM NETWORK LIMITED, trading as Dent Dock, a company registered in England and Wales (company number 16903048), whose registered office is at 11 Dronfield Road, Salford, M6 7FN ("Dent Dock", "we", "us").
      </p>
      <p>
        It forms part of our <a href="/terms" className="text-[#2563EB] hover:underline">Terms of Service</a> and applies whenever Dent Dock processes personal data on the Practice's behalf. It is accepted when the Practice creates its account. If this DPA and the Terms of Service disagree about personal data, this DPA applies.
      </p>

      <LegalSection heading="1. Roles and the law">
        <p>
          The Practice is the controller of the personal data it puts into Dent Dock, or that its patients give through Dent Dock. Dent Dock is its processor. "UK data protection law" means the UK GDPR and the Data Protection Act 2018. Words such as "controller", "processor", "personal data", "personal data breach" and "data subject" have the meanings given in the UK GDPR.
        </p>
      </LegalSection>

      <LegalSection heading="2. What we process">
        <p>The details of the processing are in Annex 1.</p>
      </LegalSection>

      <LegalSection heading="3. Instructions">
        <p>
          We process personal data only on the Practice's documented instructions. Those instructions are this DPA, the Terms of Service, the Practice's use and settings of Dent Dock, and any other written instructions the Practice gives us that we agree to. We will tell the Practice straight away if we believe an instruction breaks UK data protection law. If the law requires us to process personal data for another reason, we will tell the Practice first, unless the law forbids it.
        </p>
      </LegalSection>

      <LegalSection heading="4. Our people">
        <p>
          Only people who need access to provide, support or secure the service can access personal data, and they are bound by confidentiality. Our team signs in to a Practice's account only to help the Practice or to keep the service working, through a named "Dent Dock Support" user. Each support session is short, is recorded, and the record can be seen by the Practice. Once the Practice's account has closed, we can no longer start a support session, and when the Practice's data is deleted under section 10, the "Dent Dock Support" user is deleted with it. We keep our own record of each support session (who, when and why) for 24 months.
        </p>
      </LegalSection>

      <LegalSection heading="5. Security">
        <p>
          We take the technical and organisational measures required by Article 32 of the UK GDPR. The main measures are listed in Annex 2. We may improve them over time, but we will not reduce the overall level of protection.
        </p>
      </LegalSection>

      <LegalSection heading="6. Sub-processors">
        <p>
          The Practice gives us general permission to use sub-processors. Those we use today are listed in Annex 3. We will tell the Practice at least 30 days before we add or replace a sub-processor, and the Practice may object on reasonable data protection grounds. If we cannot resolve an objection, the Practice may close its account. Each sub-processor is bound by a written contract with data protection obligations equivalent to this DPA, and we remain responsible to the Practice for its work.
        </p>
      </LegalSection>

      <LegalSection heading="7. Transfers outside the UK">
        <p>
          Some sub-processors may process personal data outside the UK. We only allow this where UK data protection law permits it, for example under UK adequacy regulations or the UK International Data Transfer Agreement or Addendum.
        </p>
      </LegalSection>

      <LegalSection heading="8. Helping the Practice">
        <p>Taking into account the nature of the processing, we will help the Practice:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>to respond to patients and others using their rights, including by providing exports of a patient's records. If we receive a request directly, we will pass it to the Practice and not answer it ourselves;</li>
          <li>to keep personal data secure;</li>
          <li>with data protection impact assessments and any consultation with the Information Commissioner's Office, where they relate to Dent Dock.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="9. Personal data breaches">
        <p>
          We will tell the Practice without undue delay, and in any case within 48 hours, after we become aware of a personal data breach affecting the Practice's personal data. We will give the information we have about what happened, the data and people affected, and what we are doing about it, and keep the Practice updated. We will not tell patients or the regulator on the Practice's behalf unless the Practice asks us to or the law requires it.
        </p>
      </LegalSection>

      <LegalSection heading="10. At the end">
        <p>
          When the Practice's account closes, we will, at the Practice's choice, return its personal data in a common electronic format or delete it, within 90 days, unless the law requires us to keep it. Dental records usually have to be kept for many years, so the Practice should ask for a copy of its patient records before its account closes.
        </p>
      </LegalSection>

      <LegalSection heading="11. Showing we comply">
        <p>
          We will give the Practice the information it reasonably needs to show that we meet this DPA. The Practice may audit our compliance, or have an independent auditor bound by confidentiality do so, once a year on at least 30 days' written notice, at its own cost, or more often after a personal data breach or if a regulator requires it. We may first answer a written questionnaire where that gives the Practice what it needs.
        </p>
      </LegalSection>

      <LegalSection heading="12. The Practice's responsibilities">
        <p>
          The Practice is responsible for having a lawful basis for the personal data it processes with Dent Dock, for telling its patients how their data is used (Dent Dock provides a standard patient privacy notice that the Practice can change), for the accuracy of the data, and for making sure its instructions to us are lawful.
        </p>
        <p>
          If the Practice adds its own analytics or advertising accounts (such as Google Analytics, Google Ads or Meta) to its online booking page, those providers act for the Practice and are not our sub-processors. The Practice is responsible for its arrangements with them and for telling its patients (the standard patient privacy notice names them automatically). We only load them after the patient agrees on the booking page, and we never send them patients' names, contact details, dates of birth, health information or form answers.
        </p>
      </LegalSection>

      <LegalSection heading="13. Liability, duration and law">
        <p>
          Liability under this DPA is subject to the limits in the Terms of Service, except where the law does not allow it to be limited. This DPA lasts for as long as we process personal data for the Practice. It is governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction.
        </p>
        <p>
          We may update this DPA to reflect changes in the law or in the service. We will tell the Practice by email before any change that reduces its protection.
        </p>
      </LegalSection>

      <LegalSection heading="Annex 1: Details of the processing">
        <p><strong className="text-[#0F172A] font-semibold">Subject matter</strong> — providing Dent Dock, practice management software for dental practices, to the Practice.</p>
        <p><strong className="text-[#0F172A] font-semibold">Duration</strong> — for as long as the Practice has an account, and until its data is returned or deleted under section 10.</p>
        <p><strong className="text-[#0F172A] font-semibold">Nature and purpose</strong> — storing and organising records; online booking and the patient portal; forms; appointment reminders, recalls and other messages; recording payments; reporting, including counting how many people reach, finish and book after a treatment's health form during online booking (daily totals per treatment, which contain no personal data and use no cookies or device storage); support; and keeping the service secure.</p>
        <p><strong className="text-[#0F172A] font-semibold">Types of personal data</strong> — name, date of birth, contact details, address, appointments, dental and treatment notes, form answers, signatures, files and images, payment records, messages, and communication preferences.</p>
        <p><strong className="text-[#0F172A] font-semibold">Special category data</strong> — health data, including medical history, medicines, allergies and dental records.</p>
        <p><strong className="text-[#0F172A] font-semibold">Data subjects</strong> — the Practice's patients (including children), their parents, guardians or carers, and the Practice's staff.</p>
      </LegalSection>

      <LegalSection heading="Annex 2: Security measures">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Data is stored in London, UK, and encrypted in transit (TLS) and at rest.</li>
          <li>Each practice's data is kept separate by database access rules, and staff permissions within a practice are set by role.</li>
          <li>Records of who did what are kept in the app.</li>
          <li>Our internal tools require two-factor sign-in and do not show patient records. Our team sees a practice's account only through a recorded support session, and direct access to the production database is limited to named administrators.</li>
          <li>Online booking and waitlist forms are protected against automated abuse.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Annex 3: Sub-processors">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong className="text-[#0F172A] font-semibold">Supabase</strong> — database, sign-in, file storage and server functions. Data stored in London, UK.</li>
          <li><strong className="text-[#0F172A] font-semibold">Stripe</strong> — subscription billing and patient payments.</li>
          <li><strong className="text-[#0F172A] font-semibold">Resend</strong> — sending emails.</li>
          <li><strong className="text-[#0F172A] font-semibold">Vercel</strong> — hosting the practice app and the online booking site.</li>
          <li><strong className="text-[#0F172A] font-semibold">Cloudflare</strong> — protecting online booking and waitlist forms from automated abuse.</li>
        </ul>
        <p>
          We do not send text messages yet. We will give 30 days' notice under section 6 before adding a text message provider.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this DPA: hello@dentdock.co.uk
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
