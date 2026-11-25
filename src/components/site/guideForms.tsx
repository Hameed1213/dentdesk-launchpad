import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/components/site/templates";

/*
 * The text of the guide "Can dental medical history forms be filled in online?", shown in the
 * guide layout (components/site/guideTemplate.tsx). General information, not legal advice.
 *
 * Sources read on 25 Nov 2026 (wording checked on the live pages):
 * - UK GDPR Art. 5(1)(c) and (e), Art. 9(1), 9(2)(h), 9(3), Art. 28(1) and (3) on legislation.gov.uk.
 * - DPA 2018 Sch. 1 para. 2 (health or social care purposes) on legislation.gov.uk.
 * - ICO "What are the conditions for processing?" section (h): DPA Sch. 1 condition 2, "must not
 *   have more data than you need", Art. 9(3) professional secrecy, dentists listed.
 * - SDCEP Practice Support Manual: Lawful basis (patient records: "contract" + "health care";
 *   data-protection consent "not the same as providing consent for treatment"); Data protection by
 *   design and default ("collecting only relevant social history on patient registration/medical
 *   history forms"); Storage of records (Scotland: 10 years from last contact).
 * - GDC Standards for the Dental Team, principle 4 (4.1.1 "an up-to-date medical history, each
 *   time that you treat patients"; 4.1.5 amendments marked up and dated) and principle 3 (3.1.2 a
 *   signature "is important in verifying" consent but "it is the discussions ... that determine
 *   whether the consent is valid"; 3.1.6 written consent for sedation or GA).
 * - GDC news 2 Jun 2026: consultation on replacing the Standards with a Framework for
 *   Professionalism (ran to 31 Aug 2026). No start date found, so the Standards are cited as current.
 * - CQC Dental mythbuster 8: Dental care records (updated 14 Nov 2023): "An assessment of the
 *   patient which must include a current or updated medical history". (The old URL
 *   .../dental-mythbuster-8-medical-history is a 404; the brief's "mythbuster 8" is this page.)
 * - NHS England Records Management Code of Practice, Appendix II (digital.nhs.uk): dental clinical
 *   care records 11 years; children's records to 25th birthday (26th if 17 when treatment ended).
 * - HIW "Dental practices" page (private dental practices register with HIW); HIS "Information for
 *   service providers: Independent clinics" (wholly private dental practices register with HIS).
 * NOT checked / not cited: a GDC FAQ page on signatures (couldn't find it; the Standards 3.1.2 say
 *   the same thing and are cited instead); RQIA (Northern Ireland) pages (couldn't load, so NI is
 *   not named); ICO contracts and data minimisation pages (URLs 404'd; legislation cited instead);
 *   the BDA regulators page (403); NHS PAR1514 (deliberately not used: the question list is our own).
 *
 * DentDock facts checked read-only against hub 63b6b60 (22 Nov 2026) and booking 3c6e8d7
 * (21 Nov 2026) on 25 Nov 2026:
 * - Health history and consent templates, own questions, "only show if" questions, signature:
 *   website features.forms.tsx (checked 12 Nov) + booking src/lib/formLogic.ts, FormFillPage.tsx.
 * - Send with a booking or on its own, text or email; Form reminder the day before, or 3 days after
 *   sending then 3 days later: hub src/components/automations/automationsData.ts ("form-reminder").
 * - Health form inside online booking with signature: booking src/components/booking/BookingFormStep.tsx,
 *   SignaturePad.tsx.
 * - Adds, never removes; "Nothing was removed ... please check with the patient." note:
 *   hub supabase/functions/sync-form-to-patient/medical.ts.
 * - Completed date and time, "by the patient online" or "in the practice with <name>"; Flag with a
 *   note: hub src/components/forms/ResponsePanel.tsx.
 * - Response keeps the questions it answered (questions_snapshot): hub
 *   src/components/forms/responseSnapshot.test.ts, responseAnswers.ts.
 * - Fill in at the practice, Save and lock, "answers can't be changed afterwards": hub
 *   src/pages/FillFormInPractice.tsx.
 * - Forms completed / Where people stop: hub src/components/analytics/FormsCompletedCard.tsx.
 * - London database and files, Stockholm nightly file backups: website features.security.tsx FAQ.
 * - DentDock as processor, practice as controller: website src/routes/dpa.tsx.
 * - Due for deletion (11 years / 25 for children, owner or manager reviews, nothing deleted
 *   automatically): hub src/pages/DueForDeletion.tsx.
 * NOT claimed: "compliant"/"GDPR compliant", any certification, a staff "reviewed" or "confirmed"
 * button (none exists), file or photo upload in forms (not built), automatic re-sending of the
 * medical history before every visit (not checked), NHS forms, customers or results.
 */

export const FORMS_PATH = "/guides/online-medical-history-forms";
export const FORMS_TITLE = "Can dental medical history forms be filled in online?";

const GDPR_5 = "https://www.legislation.gov.uk/eur/2016/679/article/5";
const GDPR_9 = "https://www.legislation.gov.uk/eur/2016/679/article/9";
const GDPR_28 = "https://www.legislation.gov.uk/eur/2016/679/article/28";
const DPA_SCH1 = "https://www.legislation.gov.uk/ukpga/2018/12/schedule/1/paragraph/2";
const ICO_CONDITIONS =
  "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/what-are-the-conditions-for-processing/";
const SDCEP_BASIS =
  "https://www.psm.sdcep.org.uk/topics/ethical-practice/data-protection/general-data-protection-regulations-gdpr/lawful-basis/";
const SDCEP_DESIGN =
  "https://www.psm.sdcep.org.uk/topics/ethical-practice/data-protection/general-data-protection-regulations-gdpr/data-protection-by-design-and-default/";
const SDCEP_STORAGE = "https://psm.sdcep.org.uk/topics/record-keeping/storage-of-records/";
const GDC_P4 = "https://standards.gdc-uk.org/pages/principle4/principle4.aspx";
const GDC_P3 = "https://standards.gdc-uk.org/pages/principle3/principle3.aspx";
const GDC_CONSULT =
  "https://www.gdc-uk.org/news-blogs/news/detail/2026/06/02/gdc-consults-on-replacing-the-'silver-book'-with-new-professionalism-framework";
const CQC_MB8 =
  "https://www.cqc.org.uk/guidance-providers/dentists/dental-mythbuster-8-dental-care-records";
const NHS_RECORDS =
  "https://digital.nhs.uk/data-and-information/information-governance/guidance/records-management-code-of-practice/appendix-ii/retention-schedule-care-records";
const HIW = "https://www.hiw.org.uk/dental-practices";
const HIS =
  "https://www.healthcareimprovementscotland.scot/inspections-reviews-and-regulation/regulation-of-independent-healthcare/independent-healthcare-find-out-if-you-need-to-register/information-for-service-providers-independent-clinics/";

export const formsFaq: Faq[] = [
  {
    question: "Can patients fill in their dental medical history online?",
    answer:
      "Yes. Nothing in the GDC standards or CQC guidance requires a paper form. What matters is that the history is complete, up to date and checked with the patient by a clinician, and that the health data is handled under UK GDPR.",
  },
  {
    question: "Do we need the patient's consent to process their medical history?",
    answer:
      "Usually not as the data protection basis. Health data for dental care normally relies on Article 9(2)(h) of UK GDPR with the health or social care condition in the Data Protection Act 2018, plus an Article 6 basis such as contract. Consent to treatment is a separate matter.",
  },
  {
    question: "How often should a dental medical history be updated?",
    answer:
      "The GDC says you must keep an up-to-date medical history each time you treat a patient. Many practices ask for a full form at set intervals and confirm with the patient at every visit that nothing has changed, recording that check.",
  },
  {
    question: "Does a dental medical history form need a signature?",
    answer:
      "A signature is a useful record that the patient confirmed their answers. It doesn't replace the clinician's discussion with the patient, and it isn't consent to treatment. The GDC says it's the discussions that decide whether consent is valid.",
  },
  {
    question: "Is there a set UK template for a dental medical history form?",
    answer:
      "Neither the GDC standards nor CQC's dental records guidance sets out a particular form. They say what the record needs. Most practices write their own list, keeping to questions that are relevant to dental care.",
  },
];

export const formsSources = [
  { label: "UK GDPR, Article 5: Principles", url: GDPR_5 },
  { label: "UK GDPR, Article 9: Special categories of personal data", url: GDPR_9 },
  { label: "UK GDPR, Article 28: Processor", url: GDPR_28 },
  { label: "Data Protection Act 2018, Schedule 1, paragraph 2: Health or social care", url: DPA_SCH1 },
  { label: "ICO: What are the conditions for processing?", url: ICO_CONDITIONS },
  { label: "SDCEP: Lawful basis", url: SDCEP_BASIS },
  { label: "SDCEP: Data protection by design and default", url: SDCEP_DESIGN },
  { label: "SDCEP: Storage of records", url: SDCEP_STORAGE },
  { label: "GDC Standards for the Dental Team: Principle 4", url: GDC_P4 },
  { label: "GDC Standards for the Dental Team: Principle 3", url: GDC_P3 },
  {
    label: "GDC: Consultation on replacing the Standards with a Framework for Professionalism (2 June 2026)",
    url: GDC_CONSULT,
  },
  { label: "CQC: Dental mythbuster 8, Dental care records", url: CQC_MB8 },
  {
    label: "NHS England: Records Management Code of Practice, retention schedule (care records)",
    url: NHS_RECORDS,
  },
  { label: "Healthcare Inspectorate Wales: Dental practices", url: HIW },
  { label: "Healthcare Improvement Scotland: Independent clinics", url: HIS },
];

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-14 text-[26px] md:text-[30px] font-semibold tracking-tight text-[#0F172A] leading-[1.25] scroll-mt-24"
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[17px] text-[#334155] leading-[1.75]">{children}</p>;
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]"
    >
      {children}
    </a>
  );
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-[17px] text-[#334155] leading-[1.7]">
          <span
            aria-hidden="true"
            className="mt-[12px] h-1.5 w-1.5 rounded-full flex-shrink-0 bg-[#0F172A]"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** A plain three-column table, in the same style as the texts guide's MessageTable. */
function Table({
  caption,
  head,
  rows,
  minWidth = "min-w-[480px]",
}: {
  caption: string;
  head: [string, string, string];
  rows: [string, string, string][];
  minWidth?: string;
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-[#E2E8F0]">
      <table className={`w-full ${minWidth} text-left text-[15px] leading-[1.5]`}>
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[#F8FAFC] text-[#0F172A]">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#334155]">
          {rows.map(([a, b, c]) => (
            <tr key={a} className="border-t border-[#E2E8F0]">
              <td className="px-4 py-3 font-medium text-[#0F172A]">{a}</td>
              <td className="px-4 py-3">{b}</td>
              <td className="px-4 py-3">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Paper on a clipboard compared with an online form, point by point. */
function PaperOnlineTable() {
  return (
    <Table
      caption="Paper and online dental medical history forms compared"
      head={["", "Paper form", "Online form"]}
      rows={[
        [
          "When it's filled in",
          "In the waiting room, often in a rush",
          "At home before the visit, or at the practice",
        ],
        [
          "Reading the answers",
          "Handwriting can be hard to read",
          "Typed, so nothing to decipher",
        ],
        [
          "Follow-up questions",
          "Every question on the page, whether it applies or not",
          "Can show a follow-up only when the answer is yes",
        ],
        [
          "Getting it into the record",
          "Someone types it up or scans it",
          "Answers are already in the system",
        ],
        [
          "Knowing when it was done",
          "Depends on someone writing the date",
          "The date and time are recorded",
        ],
        [
          "Chasing unfinished forms",
          "Only when the patient arrives",
          "Reminders can go out before the visit",
        ],
        [
          "Storage",
          "Filing, a locked cabinet, then scanning",
          "With your software supplier, under a processor contract",
        ],
        [
          "Patients without a phone or email",
          "Works for everyone",
          "Needs a way to fill it in at the practice as well",
        ],
      ]}
    />
  );
}

/** The usual areas a dental medical history covers. Our own wording, not a copy of any NHS form. */
function QuestionTable() {
  return (
    <Table
      caption="Questions a dental medical history form usually covers"
      head={["Area", "Example question", "Follow-up if yes"]}
      minWidth="min-w-[560px]"
      rows={[
        [
          "Your doctor",
          "Are you currently seeing a doctor, specialist or hospital for anything?",
          "Who, and what for",
        ],
        [
          "Medicines",
          "Do you take any medicines, including inhalers, injections or ones you buy yourself?",
          "Names and doses",
        ],
        [
          "Blood thinners",
          "Do you take anything that thins your blood?",
          "Which one",
        ],
        [
          "Bone medicines",
          "Have you ever had tablets or injections for your bones?",
          "Which one, and when",
        ],
        [
          "Allergies",
          "Are you allergic to anything, such as medicines, latex or foods?",
          "What, and what happens",
        ],
        [
          "Heart and blood pressure",
          "Do you have a heart condition, high blood pressure or a pacemaker?",
          "Details",
        ],
        [
          "Bleeding",
          "Do you bleed for a long time after a cut or after a tooth is taken out?",
          "Details",
        ],
        [
          "Breathing",
          "Do you have asthma or another breathing problem?",
          "Details",
        ],
        [
          "Diabetes",
          "Do you have diabetes?",
          "Type, and how it's managed",
        ],
        [
          "Fits or faints",
          "Do you have epilepsy, or have you ever fainted at the dentist?",
          "Details",
        ],
        [
          "Infections",
          "Do you have an infection we should know about to treat you safely?",
          "Details",
        ],
        [
          "Treatment for cancer",
          "Have you had radiotherapy or chemotherapy?",
          "Where, and when",
        ],
        [
          "Pregnancy",
          "Are you pregnant or breastfeeding?",
          "Weeks, if pregnant",
        ],
        [
          "Smoking and vaping",
          "Do you smoke or vape?",
          "How much",
        ],
        [
          "Anything else",
          "Is there anything else about your health you'd like us to know?",
          "Free text",
        ],
        [
          "Confirmation",
          "I confirm these answers are correct to the best of my knowledge",
          "Signature and date",
        ],
      ]}
    />
  );
}

/** The guide's article text, from "The short answer" to the not-legal-advice note. */
export function FormsGuideBody() {
  return (
    <>
      <div>
        <p className="text-[16px] font-semibold text-[#0F172A]">The short answer</p>
        <p className="mt-3 text-[18px] text-[#0F172A] leading-[1.65]">
          Yes. A UK dental practice can collect medical histories online. You need a lawful basis
          for health data (usually Article 9(2)(h) of UK GDPR, not consent), a processor contract
          with your software supplier, and only the questions you need. A clinician still checks the
          answers with the patient and keeps the history up to date each time they treat.
        </p>
      </div>

      <H2 id="can-it-be-online">Can a dental medical history form be filled in online?</H2>
      <P>
        Yes. Nothing in the GDC standards or CQC&rsquo;s dental records guidance says it has to be on
        paper. What they ask for is a history that is complete, current and part of the
        patient&rsquo;s record.
      </P>
      <P>
        The <A href={GDC_P4}>GDC&rsquo;s Standards for the Dental Team</A> say at 4.1.1:
        &ldquo;You must make and keep complete and accurate patient records, including an
        up-to-date medical history, each time that you treat patients.&rdquo; The standards apply
        to every registered dental professional across the UK. The GDC consulted in 2026 on{" "}
        <A href={GDC_CONSULT}>replacing the Standards</A> with a new Framework for
        Professionalism, but until that happens the Standards are what you work to.
      </P>
      <P>
        In England, CQC&rsquo;s <A href={CQC_MB8}>Dental mythbuster 8</A> lists, as a mandatory
        part of the dental care record, &ldquo;an assessment of the patient which must include a
        current or updated medical history&rdquo;. The CQC regulates England only. In Wales,
        private dental practices register with{" "}
        <A href={HIW}>Healthcare Inspectorate Wales</A>, and in Scotland wholly private dental
        practices register with <A href={HIS}>Healthcare Improvement Scotland</A>. Check your own
        regulator&rsquo;s guidance if you&rsquo;re outside England.
      </P>
      <P>
        So the form can be on paper, on a tablet in the waiting room or on the patient&rsquo;s
        phone the night before. The rest of this guide covers what has to be in place around it.
      </P>

      <H2 id="lawful-basis">What lawful basis covers a patient&rsquo;s health answers?</H2>
      <P>
        Health information is special category data. <A href={GDPR_9}>Article 9 of UK GDPR</A>{" "}
        prohibits processing it unless one of the conditions in Article 9(2) applies, and you also
        need an ordinary lawful basis under Article 6.
      </P>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">The Article 9 condition</strong> for
            dental care is usually 9(2)(h): processing necessary for medical diagnosis or
            &ldquo;the provision of health or social care or treatment&rdquo;. The UK basis for it
            is <A href={DPA_SCH1}>Schedule 1, paragraph 2 of the Data Protection Act 2018</A>, the
            health or social care purposes condition.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">The safeguard.</strong> The{" "}
            <A href={ICO_CONDITIONS}>ICO</A> explains that this condition needs the data to be
            handled by, or under the responsibility of, a professional who owes a duty of
            confidentiality. Dentists are on its list of health professionals.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">The Article 6 basis.</strong>{" "}
            <A href={SDCEP_BASIS}>SDCEP</A>, the dental guidance body for Scotland, gives
            &ldquo;contract&rdquo; as an example for patient records, with &ldquo;health care&rdquo;
            as the special category condition. Choose the one that fits your practice and write it
            down.
          </>,
        ]}
      />
      <P>
        Consent is not the basis for any of this. SDCEP points out that data protection consent
        &ldquo;is not the same as providing consent for treatment&rdquo;. If your form opens with
        &ldquo;I consent to you processing my health data&rdquo;, you suggest the patient could
        withdraw it and you&rsquo;d be expected to stop, which doesn&rsquo;t fit a clinical record you
        are required to keep. Tell patients how you use their information in your privacy notice
        instead, and record your lawful basis and condition in your data protection policy.
      </P>
      <P>
        Marketing is different again. If the same form asks whether patients want news and
        offers, that tick box does need consent. Our guide to{" "}
        <Link to="/guides/reminder-texts-pecr" className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]">
          texting patients without consent
        </Link>{" "}
        covers it.
      </P>

      <H2 id="processor-contract">Do you need a contract with the software supplier?</H2>
      <P>
        Yes. When a supplier stores and handles patient data for you, your practice is the
        controller and the supplier is your processor.{" "}
        <A href={GDPR_28}>Article 28 of UK GDPR</A> says you may only use processors that give
        &ldquo;sufficient guarantees&rdquo; of appropriate security, and the processing must be
        governed by a binding contract. That contract has to cover, among other things:
      </P>
      <List
        items={[
          "that the supplier only acts on your documented instructions;",
          "that its staff are bound by confidentiality;",
          "the security measures it takes;",
          "when it may use other suppliers (sub-processors);",
          "helping you answer patients' requests, such as a subject access request;",
          "deleting or returning the data when you leave, at your choice;",
          "giving you the information you need to show it's meeting these rules.",
        ]}
      />
      <P>
        Ask any forms or practice software supplier for its data processing agreement, its list of
        sub-processors and where the data is stored. If you can&rsquo;t get clear answers, that
        tells you something.
      </P>

      <H2 id="what-to-ask">What should a dental medical history form ask?</H2>
      <P>
        Only what you need to treat the patient safely. UK GDPR&rsquo;s data minimisation principle
        (<A href={GDPR_5}>Article 5(1)(c)</A>) says personal data must be &ldquo;adequate, relevant
        and limited to what is necessary&rdquo;, and the ICO says that under the health condition
        you &ldquo;must not have more data than you need&rdquo;. <A href={SDCEP_DESIGN}>SDCEP</A>{" "}
        gives a dental example: &ldquo;collecting only relevant social history on patient
        registration/medical history forms&rdquo;.
      </P>
      <P>
        There&rsquo;s no set UK template you have to use. Below are the areas a dental medical
        history usually covers, in our own wording, as a starting point for your own list. Your
        clinicians should decide the final questions.
      </P>
      <QuestionTable />
      <P>
        Online forms let you show the follow-up only when the patient answers yes, which keeps the
        form short for patients with nothing to report. Keep personal details (address, phone, GP)
        to what you actually use.
      </P>

      <H2 id="who-reviews">Who should check the answers?</H2>
      <P>
        A clinician. A form is the patient&rsquo;s account of their health. The medical history in
        the record is what the clinician has checked and discussed with them. CQC&rsquo;s wording
        is about &ldquo;an assessment of the patient&rdquo;, and an assessment needs a person.
      </P>
      <List
        items={[
          "Read the answers before the patient is in the chair, so there's time to ask about anything new.",
          "Ask the patient to confirm the answers, especially medicines and allergies, and ask about anything that looks unclear or different from last time.",
          "Record that you checked, with the date and your name or initials. GDC standard 4.1.4 asks you to record the treating clinician's name or initials.",
          "If you change something in the record, mark it clearly and date it (GDC 4.1.5).",
          "Be careful with software that overwrites the record from a form. A patient forgetting to mention an allergy is not proof it has gone.",
        ]}
      />

      <H2 id="how-often">How often should a dental medical history be updated?</H2>
      <P>
        Each time you treat the patient. That&rsquo;s the GDC wording in 4.1.1: an
        &ldquo;up-to-date medical history, each time that you treat patients&rdquo;. CQC asks for
        a &ldquo;current or updated&rdquo; history.
      </P>
      <P>
        Neither sets a fixed interval for a full new form, so that&rsquo;s a decision for your
        practice policy. A common approach:
      </P>
      <List
        items={[
          "a full form for every new patient;",
          "a full form again at a set interval your clinicians agree, and whenever a patient tells you something has changed;",
          "at every other visit, a check with the patient that nothing has changed (new medicines, new diagnoses, pregnancy), recorded in the notes.",
        ]}
      />
      <P>
        Sending the form online before the appointment makes the full update easier, because the
        patient can check their medicine names at home rather than guess in the waiting room.
      </P>

      <H2 id="signatures">Does the patient need to sign it?</H2>
      <P>
        A signature is good practice. It shows the patient confirmed their answers on that date. On
        screen, a drawn signature does the same job as ink on paper for this purpose.
      </P>
      <P>
        But a signature on a medical history is not consent to treatment. The GDC&rsquo;s{" "}
        <A href={GDC_P3}>standard 3.1.2</A> says: &ldquo;Although a signature on a form is important
        in verifying that a patient has given consent, it is the discussions that take place with
        the patient that determine whether the consent is valid.&rdquo; Consent is a separate
        conversation, and written consent is required where treatment involves conscious sedation or
        general anaesthetic (3.1.6).
      </P>

      <H2 id="retention">How long do you keep medical history forms?</H2>
      <P>
        A completed medical history is part of the dental record, so keep it as long as the record.
        UK GDPR (<A href={GDPR_5}>Article 5(1)(e)</A>) says data should be kept &ldquo;for no
        longer than is necessary&rdquo;, so you need a written retention period.
      </P>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">England:</strong> NHS England&rsquo;s{" "}
            <A href={NHS_RECORDS}>Records Management Code of Practice</A> sets 11 years for dental
            clinical care records (changed from 15 years in 2023). Its separate entry for
            children&rsquo;s records says until the 25th birthday, or 26th if the patient was 17
            when treatment ended.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Scotland:</strong>{" "}
            <A href={SDCEP_STORAGE}>SDCEP</A> says to keep adult and child records for 10 years from
            last contact.
          </>,
        ]}
      />
      <P>
        Ask your indemnity provider which periods apply to your patients. When a record reaches the
        end of its period, someone should review it before anything is deleted.
      </P>

      <H2 id="paper-vs-online">Paper or online: how do they compare?</H2>
      <P>Both can meet the same standards. The differences are practical:</P>
      <PaperOnlineTable />
      <P>
        Whichever you use, keep a way to complete the form at the practice for patients who
        can&rsquo;t or would rather not do it online.
      </P>

      <H2 id="checklist">A set-up checklist for online medical history forms</H2>
      <List
        items={[
          "Record your Article 6 lawful basis and Article 9 condition (usually 9(2)(h) with DPA 2018 Schedule 1 paragraph 2) in your data protection policy.",
          "Update your privacy notice to say you collect medical histories online, why, and who your supplier is.",
          "Check you have a data processing agreement with your software supplier, its sub-processor list and where data is stored.",
          "Agree the question list with your clinicians, and remove anything you don't use.",
          "Use follow-up questions that show only when they apply.",
          "Don't rely on a data protection consent tick box for health data. Keep any marketing opt-in separate and unticked.",
          "Decide who reads each completed form, and when, before the appointment.",
          "Confirm the answers with the patient at the visit and record the check.",
          "Set how often a full new form is needed, and check for changes at every visit.",
          "Make sure the form never removes allergies or medicines from the record without a person checking.",
          "Keep a way to fill the form in at the practice, with the patient signing.",
          "Write down your retention period and who reviews records before deletion.",
          "Limit who in the team can see medical answers.",
        ]}
      />

      <H2 id="how-dentdock-helps">How DentDock helps</H2>
      <P>
        DentDock is practice software for UK private practices. Its forms record what the steps
        above need. The checks and decisions stay with your team.
      </P>
      <List
        items={[
          "Start from a health history or consent template, or build your own, with questions that show only if the answer is yes and an on-screen signature.",
          "Send a form with a booking or on its own, by text or email. If a treatment needs a health form, the patient fills it in and signs inside online booking.",
          "If a form isn't done, a reminder goes the day before the appointment (or 3 days after sending, then 3 days later).",
          "Each completed form shows the date and time, and whether the patient did it online or in the practice with a named team member. It keeps a copy of the questions the patient answered, even if you edit the form later.",
          "A completed health form adds allergies, conditions and medicines to the record. It never removes them: if the form disagrees with the record, your team gets a note to check with the patient.",
          "Your team can flag a completed form with a note, and medical alerts show on the diary.",
          "Fill in at the practice: a team member completes the form with the patient, the patient signs on screen, and it's saved and locked.",
          "Analytics shows who hasn't finished a form and, once enough are unfinished, the question where people stop.",
          "Your practice is the controller and DentDock is the processor, under a published data processing agreement. The database and files are in London, UK, with nightly backup copies of files in Stockholm, Sweden.",
          "Due for deletion lists records 11 years after the last treatment (or at 25 for children, if later). Nothing is deleted until an owner or practice manager reviews it.",
        ]}
      />
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/features/forms"
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
        >
          See forms and medical history <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/features/security"
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
        >
          See how DentDock handles data <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <H2 id="sources">Sources</H2>
      <ul className="mt-4 space-y-2">
        {formsSources.map((s) => (
          <li key={s.url} className="text-[15px] leading-[1.6]">
            <A href={s.url}>{s.label}</A>
          </li>
        ))}
      </ul>
      <p className="mt-10 border-t border-[#E2E8F0] pt-5 text-[14px] text-[#64748B] leading-[1.6]">
        This guide is general information, not legal advice. Check your approach with your indemnity
        provider or a solicitor before you rely on it.
      </p>
    </>
  );
}
