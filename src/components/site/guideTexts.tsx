import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/components/site/templates";

/*
 * The text of the guide "Can a dental practice text patients without consent?", shown in the
 * guide layout (components/site/guideTemplate.tsx). General information, not legal advice.
 *
 * Sources read on 21 Nov 2026 (quotes checked on the live pages): ICO Guide to PECR (electronic
 * mail marketing, key concepts, identify direct marketing, soft opt-in, recording consent),
 * PECR regs 22 and 23 and UK GDPR Art. 21 on legislation.gov.uk, SI 2026/82 (DUAA commencement,
 * 5 Feb 2026), NHS England "What is and isn't direct marketing" (health and care professionals),
 * SDCEP lawful basis. The £17.5m PECR maximum is from law firms (Blake Morgan, Lewis Silkin):
 * the ICO doesn't state it in its own words yet. MDDUS and the DHCW Wales guidance could not be
 * read, so they are not cited.
 *
 * DentDock facts checked against hub 918f007 and booking ae3a345 on 21 Nov 2026:
 * - Automations page badges: "Transactional", "Healthcare communication", "Requires marketing
 *   consent" (src/pages/Automations.tsx, src/utils/consentChecker.ts).
 * - Birthday, anniversary and review requests need marketing_opted_in (process-automations,
 *   postVisitMessages.ts, _shared/textSend.ts MARKETING_CONTEXTS). Recalls are "clinical": sent
 *   unless the patient opted out.
 * - Booking-site marketing tick box is unticked by default (PatientDetails.tsx); patients change it
 *   in the portal (PatientPortal.tsx), staff on the patient profile.
 * - Birthday/anniversary emails carry Unsubscribe; appointment emails still come
 *   (StopMarketingEmails.tsx).
 * - Preferred channel "Email only" stops texts (textSend.ts).
 * NOT claimed: a dated record of marketing consent (not built, K53), the "Stop texts" line (behind
 * a setting; production texts are off), STOP replies (no inbound texts), WhatsApp (not built).
 */

export const TEXTS_PATH = "/guides/reminder-texts-pecr";
export const TEXTS_TITLE = "Can a dental practice text patients without consent?";

const ICO_EMAIL =
  "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/";
const ICO_KEY =
  "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/key-concepts-for-direct-marketing-using-electronic-mail/";
const ICO_IDENTIFY =
  "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/identify-direct-marketing/";
const ICO_COMPLY =
  "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/";
const ICO_RECORD =
  "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/consent/how-should-we-obtain-record-and-manage-consent/";
const NHS_DM =
  "https://digital.nhs.uk/data-and-information/information-governance/guidance/what-is-and-isnt-direct-marketing/guidance-for-health-and-care-professionals";
const SDCEP =
  "https://www.psm.sdcep.org.uk/topics/ethical-practice/data-protection/general-data-protection-regulations-gdpr/lawful-basis/";
const PECR_22 = "https://www.legislation.gov.uk/uksi/2003/2426/regulation/22";
const GDPR_21 = "https://www.legislation.gov.uk/eur/2016/679/article/21";
const DUAA_SI = "https://www.legislation.gov.uk/uksi/2026/82/regulation/2/made";
const LEWIS_SILKIN =
  "https://www.lewissilkin.com/insights/2026/02/09/uk-data-reform-becomes-reality-what-this-means-for-you-and-what-you-need-to-do-n-102mh5x";

export const textsFaq: Faq[] = [
  {
    question: "Do dental appointment reminder texts need consent?",
    answer:
      "Not under PECR. The ICO treats messages that confirm or remind people about appointments as service messages, not marketing. You still need a lawful basis under UK GDPR to use the patient's number, and you should respect a patient who asks not to get them.",
  },
  {
    question: "Is a dental recall text marketing?",
    answer:
      "A plain recall, telling a patient their check-up is due, is generally treated as a service message about their care. It becomes marketing if you add promotion, such as a whitening offer or a new treatment, so keep recalls factual.",
  },
  {
    question: "Can we text existing patients about offers without asking first?",
    answer:
      "Only if every condition of the PECR soft opt-in is met, and it isn't clear how that applies to dental care. The simplest and safest route is to ask patients to opt in to news and offers, record it, and let them opt out in every message.",
  },
  {
    question: "What are the fines for breaking PECR?",
    answer:
      "Since the Data (Use and Access) Act 2025 changes took effect in 2026, law firms report that PECR fines can reach £17.5 million or 4% of global turnover, the same level as UK GDPR. The old maximum was £500,000.",
  },
];

export const textsSources = [
  { label: "ICO: Electronic mail marketing (Guide to PECR)", url: ICO_EMAIL },
  { label: "ICO: Key concepts for direct marketing using electronic mail", url: ICO_KEY },
  { label: "ICO: How do we identify direct marketing?", url: ICO_IDENTIFY },
  { label: "ICO: How do we comply with the electronic mail marketing rules?", url: ICO_COMPLY },
  { label: "ICO: How should we obtain, record and manage consent?", url: ICO_RECORD },
  {
    label: "NHS England: What is and isn't direct marketing (health and care professionals)",
    url: NHS_DM,
  },
  { label: "SDCEP: Lawful basis for processing", url: SDCEP },
  { label: "PECR 2003, regulation 22", url: PECR_22 },
  { label: "UK GDPR, Article 21: Right to object", url: GDPR_21 },
  {
    label:
      "The Data (Use and Access) Act 2025 (Commencement No. 6 and Transitional and Saving Provisions) Regulations 2026",
    url: DUAA_SI,
  },
  { label: "Lewis Silkin: UK data reform becomes reality (9 Feb 2026)", url: LEWIS_SILKIN },
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

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 text-[20px] font-semibold tracking-tight text-[#0F172A] leading-[1.35]">
      {children}
    </h3>
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

/** A plain table of message types: what it is and whether it needs consent. */
function MessageTable() {
  const rows: [string, string, string][] = [
    ["Appointment reminder", "Service message", "No"],
    ["Booking, change or cancellation confirmation", "Service message", "No"],
    ["Form to fill in before a visit", "Service message", "No"],
    ["Plain recall: your check-up is due", "Service message about care", "No, if kept factual"],
    ["Recall that also offers whitening or a discount", "Marketing", "Yes"],
    ["Birthday message", "Usually marketing", "Treat as yes"],
    ["Review request", "Often marketing", "Treat as yes"],
    ["News, offers, new treatments, newsletters", "Marketing", "Yes"],
  ];
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-[#E2E8F0]">
      <table className="w-full min-w-[480px] text-left text-[15px] leading-[1.5]">
        <caption className="sr-only">Which dental practice texts need consent under PECR</caption>
        <thead className="bg-[#F8FAFC] text-[#0F172A]">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Text
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              What it usually is
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Consent needed?
            </th>
          </tr>
        </thead>
        <tbody className="text-[#334155]">
          {rows.map(([a, b, c]) => (
            <tr key={a} className="border-t border-[#E2E8F0]">
              <td className="px-4 py-3">{a}</td>
              <td className="px-4 py-3">{b}</td>
              <td className="px-4 py-3 font-medium text-[#0F172A]">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The guide's article text, from "The short answer" to the not-legal-advice note. */
export function TextsGuideBody() {
  return (
    <>
      <div>
        <p className="text-[16px] font-semibold text-[#0F172A]">The short answer</p>
        <p className="mt-3 text-[18px] text-[#0F172A] leading-[1.65]">
          Yes, for reminders. Appointment reminders, booking confirmations and plain recall texts
          are service messages, so they don't need marketing consent. Anything that promotes your
          practice, such as offers, new treatments, newsletters and usually birthday messages and
          review requests, is direct marketing. Under PECR that needs the patient's consent, and
          every marketing text must let them opt out.
        </p>
      </div>

      <H2 id="which-rules-apply">Which rules apply to texting patients?</H2>
      <P>Two sets of rules work together:</P>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">
              PECR (the Privacy and Electronic Communications Regulations)
            </strong>{" "}
            controls marketing sent by &ldquo;electronic mail&rdquo;. Despite the name, the{" "}
            <A href={ICO_EMAIL}>ICO</A> says this includes text messages, as well as emails and
            direct messages on social media.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">UK GDPR</strong> controls how you use
            the patient&rsquo;s details at all, including their phone number, whatever the message
            says.
          </>,
        ]}
      />
      <P>
        So the real question for each text is: is this a service message or direct marketing? That
        decides whether PECR&rsquo;s consent rule applies.
      </P>

      <H2 id="reminders-are-service-messages">Reminders and confirmations are service messages</H2>
      <P>
        The ICO defines direct marketing as advertising or marketing material directed at particular
        people. It separates this from service messages, which{" "}
        <A href={ICO_IDENTIFY}>
          &ldquo;aren&rsquo;t promotional but are for administrative or customer services
          purposes&rdquo;
        </A>
        . Its own examples include messages that &ldquo;confirm or remind them about
        appointments&rdquo;.
      </P>
      <P>
        NHS England&rsquo;s <A href={NHS_DM}>guidance for health and care professionals</A> agrees.
        It lists sending appointment reminders, screening invitations and notices of a clinical
        review as things that are not direct marketing.
      </P>
      <P>
        That means you don&rsquo;t need marketing consent to text a patient about an appointment
        they booked, a form to fill in before their visit, or a change to their booking.
      </P>

      <H2 id="are-recalls-marketing">Are recall texts marketing?</H2>
      <P>
        A plain recall, telling a patient their check-up or hygiene visit is due, is about their
        care, not a sale. NHS England treats reminders about clinical reviews as service messages,
        and <A href={SDCEP}>SDCEP</A>, the dental guidance body for Scotland, says practices can
        usually rely on legitimate interests for &ldquo;recall notices and appointment
        reminders&rdquo;, as long as they can justify it.
      </P>
      <P>
        The line is easy to cross. The ICO says that{" "}
        <A href={ICO_IDENTIFY}>
          &ldquo;simply using a neutral tone doesn&rsquo;t necessarily avoid messages being direct
          marketing&rdquo;
        </A>
        , and that a service message becomes marketing as soon as you{" "}
        <A href={ICO_KEY}>add advertising or marketing material</A>. Its example is a factual text
        about a phone data limit: on its own it&rsquo;s a service message, but add an offer to buy
        more data and it&rsquo;s marketing.
      </P>
      <P>For a dental practice, that looks like this:</P>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">Service message:</strong> &ldquo;Hi
            Sam, you&rsquo;re due your check-up at Smile Dental. Book online or call us on 0161 496
            0000.&rdquo;
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Marketing:</strong> &ldquo;Hi Sam,
            you&rsquo;re due your check-up. Book this month and get 20% off whitening!&rdquo;
          </>,
        ]}
      />
      <P>
        Keep recalls factual. If you want to tell patients about treatments or offers, send that as
        a separate message, and only to patients who agreed to it.
      </P>
      <P>
        Not every source puts it the same way. Some older indemnity guidance, written when GDPR
        started in 2018, advised getting consent for any text. If you want to be cautious, telling
        patients clearly that you&rsquo;ll send reminders and recalls, and letting them say no,
        costs you nothing.
      </P>

      <H2 id="which-texts-need-consent">Which texts need consent?</H2>
      <P>A quick guide for the messages most practices send:</P>
      <MessageTable />
      <P>
        Birthday messages and review requests are grey areas. They aren&rsquo;t about the
        patient&rsquo;s care, and their purpose is to keep your practice in mind or to promote it.
        Treating them as marketing is the safe choice.
      </P>

      <H2 id="soft-opt-in">What about the &ldquo;soft opt-in&rdquo;?</H2>
      <P>
        PECR has an exception, often called the soft opt-in, that lets a business send marketing to
        existing customers without asking first. All of these must be true (
        <A href={PECR_22}>regulation 22</A>):
      </P>
      <List
        items={[
          "You got their details while selling them something, or in talks about a sale.",
          "You only market your own similar products or services.",
          "You gave them a simple, free way to refuse when you collected their details, and you do again in every message.",
        ]}
      />
      <P>
        The <A href={ICO_COMPLY}>ICO</A> says the test is whether people would reasonably expect
        marketing about your products or services. How this applies to dental care is untested. A
        private patient who paid for a check-up may not expect texts about whitening, and NHS
        treatment doesn&rsquo;t fit the idea of a sale neatly. Unless your indemnity provider or a
        solicitor tells you otherwise, asking for consent is simpler.
      </P>

      <H2 id="how-to-ask">How to ask for marketing consent, and keep a record</H2>
      <P>Consent has to be a clear, active choice. In practice:</P>
      <List
        items={[
          "Use a separate, unticked box. Don't bundle it into your terms or the box for booking.",
          "Say what you'll send and how: for example news and offers by text and email.",
          "Say they can stop at any time, and make that easy.",
          "Never treat a patient giving you their mobile number as permission to market to them.",
        ]}
      />
      <P>
        The <A href={ICO_RECORD}>ICO</A> expects you to be able to show who consented, when, what
        they were told (a copy of the wording in use at the time) and how, plus whether and when
        they withdrew. If you change your wording, keep the old version.
      </P>
      <P>Wording you can adapt:</P>
      <div className="mt-6 p-6 md:p-8 text-[16px] text-[#0F172A] leading-[1.75] space-y-3 rounded-lg border border-[#E2E8F0] bg-white">
        <p className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-[6px] h-4 w-4 flex-shrink-0 rounded border border-[#94A3B8] bg-white"
          />
          <span>
            Send me news, offers and birthday wishes from [Practice name] by text and email. I can
            stop these at any time.
          </span>
        </p>
        <p className="text-[15px] text-[#475569]">
          We&rsquo;ll always send appointment reminders and recalls, whether or not you tick this
          box. Tell us if you&rsquo;d rather not get them.
        </p>
      </div>

      <H2 id="opting-out">Letting patients opt out</H2>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">Every marketing message</strong> must
            give a simple way to opt out. The <A href={ICO_EMAIL}>ICO</A> says: &ldquo;You must give
            people the chance to opt out in every subsequent message that you send.&rdquo;
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">
              Objections to marketing are final.
            </strong>{" "}
            Under <A href={GDPR_21}>Article 21 of UK GDPR</A>, once someone objects to direct
            marketing you must stop using their details for it. There&rsquo;s no balancing test.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">
              Respect reminder preferences too.
            </strong>{" "}
            Reminders don&rsquo;t need consent, but NHS England&rsquo;s guidance says organisations
            should respect a person&rsquo;s wish not to receive them. Offer email instead where you
            can.
          </>,
        ]}
      />

      <H2 id="what-changed-in-2026">What changed in 2026</H2>
      <P>
        The Data (Use and Access) Act 2025 changed PECR. The main parts came into force on{" "}
        <A href={DUAA_SI}>5 February 2026</A>:
      </P>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">Much bigger fines.</strong> Law firms
            including <A href={LEWIS_SILKIN}>Lewis Silkin</A> report that PECR fines can now reach
            £17.5 million or 4% of global turnover, in line with UK GDPR. The old cap was £500,000.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">
              One definition of direct marketing.
            </strong>{" "}
            The <A href={ICO_IDENTIFY}>ICO</A> notes the Act brought the Data Protection Act&rsquo;s
            definition of direct marketing into PECR.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">A soft opt-in for charities.</strong>{" "}
            This doesn&rsquo;t help dental practices, but you may see it mentioned.
          </>,
        ]}
      />
      <P>
        The ICO has said some of its PECR guidance is under review because of the Act, so check the
        latest version before you change your policy.
      </P>

      <H2 id="checklist">A checklist for your practice</H2>
      <List
        items={[
          "List every message you send and mark each one as a service message or marketing.",
          "Keep reminders, confirmations and recalls factual, with no offers added.",
          "Ask for marketing consent with a separate, unticked box, and record the date and wording.",
          "Send marketing only to patients who opted in, with an easy opt-out in every message.",
          "Stop marketing straight away when someone opts out, and keep a note of it.",
          "Say in your privacy notice that you send reminders and recalls, and how patients can opt out.",
          "Check your approach with your indemnity provider if you're unsure.",
        ]}
      />

      <H2 id="how-dentdock-helps">How DentDock helps</H2>
      <P>
        DentDock is practice software for UK private practices. It keeps service messages and
        marketing apart for you:
      </P>
      <List
        items={[
          "Each automatic message is labelled on the Automations page as transactional, healthcare (like recalls) or needing marketing consent.",
          "Birthday messages and review requests only go to patients who opted in to marketing.",
          "The marketing box on the online booking form starts unticked. Patients can change their choice in their portal, and your team can change it on the patient's record.",
          "Marketing emails carry an Unsubscribe link, and appointment emails still arrive afterwards.",
          "Patients who prefer email can be set to Email only, so they get no texts.",
          "Texts show your practice's name as the sender, so patients know who they're from.",
        ]}
      />
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/features/reminders-and-recalls"
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
        >
          See reminders and recalls <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <H2 id="sources">Sources</H2>
      <ul className="mt-4 space-y-2">
        {textsSources.map((s) => (
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
