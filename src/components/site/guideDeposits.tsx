import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/components/site/templates";

/*
 * The text of the guide "Can a dentist ask for a deposit? NHS and private rules", shown in the
 * guide layout (components/site/guideTemplate.tsx). General information, not legal advice.
 * Covers England (NHS) and private practice. Scotland gets one verified line; Wales and Northern
 * Ireland are not covered (no official source read), and the guide says so.
 *
 * Sources read on 25 Nov 2026 (wording checked on the live pages):
 * - NHSBSA FAQ KA-02002 "At which point of a Course of Treatment (CoT) will I be asked to pay the
 *   NHS dental charge?": "Practices cannot charge any additional fees above the NHS charge bands
 *   ... This would include taking a deposit before an initial assessment of your treatment.
 *   Deposits can be taken after the examination has been completed, this should be deducted from
 *   the total charge band due." Also: payment may be asked "at any point during a Course of
 *   Treatment". No date shown on the page.
 * - nhs.uk "What happens when you visit the dentist" (reviewed 13 Mar 2025): should not "charge a
 *   deposit before assessing your mouth and teeth or checking your symptoms"; should not "ask you
 *   to pay privately for an appointment to check if you will be accepted for NHS dental treatment".
 * - NHS inform (Scotland) "Receiving NHS dental treatment in Scotland": "A dentist can ask for
 *   payment in advance." and "You don't need to pay a deposit for an appointment to register."
 * - Consumer Rights Act 2015 s62(1), s62(4), s68(1)-(2), Sch 2 Part 1 paras 4 and 5
 *   (legislation.gov.uk).
 * - CMA via GOV.UK "Cancelling goods or services: guide for consumers" (2 Mar 2016):
 *   "Non-refundable deposits should only be a small percentage of the total price.";
 *   "Cancellation charges must be a genuine estimate of the business' direct loss.";
 *   "Businesses must take reasonable steps to reduce their losses". This is consumer-facing CMA
 *   guidance, labelled as such in the text, not law.
 * - GDC "Dental costs" (patients): clear price information in practice literature and website.
 * NOT verified, so NOT claimed: what happens to an NHS deposit if the patient never comes back
 * (no official source found; the guide says to ask the BDA or commissioner); Wales and Northern
 * Ireland rules; Consumer Contracts Regulations 2013 cancellation rights for booked dental care
 * (not checked, so not mentioned); any VAT point.
 *
 * DentDock facts checked read-only against .sources/desk-care-hub 63b6b60 (22 Nov 2026) and
 * .sources/booking-for-patients-dentist 3c6e8d7 (21 Nov 2026) on 25 Nov 2026:
 * - Deposit set per treatment, needs a free-cancellation window, a late-cancellation fee and a
 *   no-show fee first (hub src/lib/depositRules.ts; src/components/services/AddServiceDrawer.tsx).
 * - Booking page shows "£X deposit required" on the treatment, and the fee line above the
 *   booking button (booking src/components/booking/ServiceSelect.tsx, src/lib/depositHold.ts
 *   feeNoticeText).
 * - Slot held 10 minutes while the patient pays (hub supabase/functions/_shared/depositHold.ts
 *   HOLD_MINUTES = 10); pay page says the deposit "comes off the cost of your treatment"
 *   (booking src/pages/DepositPayment.tsx).
 * - Patient cancels online: in time, the online deposit goes back to the card; late, the late fee
 *   is the most kept and the rest goes back; NHS-marked patients keep nothing back from them;
 *   refund email (hub supabase/functions/_shared/cancelRefund.ts, portal-cancel/index.ts;
 *   booking src/pages/PatientPortal.tsx).
 * - Fees listed for staff to decide, never automatic; NHS-marked patients never charged a fee
 *   (hub src/lib/fees.ts). Part or full refunds with their own receipt number; own Stripe
 *   account, no DentDock cut (site features.payments.tsx, checked 12 Nov).
 * - Online deposits are built but switched off in production until launch (hub
 *   src/lib/paymentsWording.ts; brand/facts.md 2.12). Described the way the deposits solution
 *   page and features/payments do, never as "live" or "today".
 * NOT claimed: instalments, payment plans, finance, Klarna, card-machine integration, Apple Pay or
 * Google Pay, card on file, automatic fees, NHS claims, deposits moving with a rearranged booking
 * (not checked), customers, results, "compliant".
 */

export const DEPOSITS_PATH = "/guides/dental-deposits-nhs-private";
export const DEPOSITS_TITLE = "Can a dentist ask for a deposit? NHS and private rules";

const NHSBSA_FAQ = "https://faq.nhsbsa.nhs.uk/knowledgebase/article/KA-02002/en-us";
const NHS_VISIT = "https://www.nhs.uk/nhs-services/dentists/what-happens-when-you-visit-the-dentist/";
const NHS_INFORM =
  "https://www.nhsinform.scot/care-support-and-rights/nhs-services/dental/receiving-nhs-dental-treatment-in-scotland";
const CRA_62 = "https://www.legislation.gov.uk/ukpga/2015/15/section/62";
const CRA_68 = "https://www.legislation.gov.uk/ukpga/2015/15/section/68";
const CRA_SCH2 = "https://www.legislation.gov.uk/ukpga/2015/15/schedule/2";
const CMA_CANCEL =
  "https://www.gov.uk/government/publications/cancelling-goods-or-services-guide-for-consumers/cancelling-goods-or-services";
const GDC_COSTS = "https://www.gdc-uk.org/standards-guidance/information-for-patients-public/dental-costs";

export const depositsFaq: Faq[] = [
  {
    question: "Can an NHS dentist ask for a deposit?",
    answer:
      "In England, not before the examination. The NHSBSA says a deposit can be taken after the examination has been completed, and it should be deducted from the NHS band charge the patient owes. It can't be an extra fee on top.",
  },
  {
    question: "Can a dentist ask for a deposit to register as an NHS patient?",
    answer:
      "No. NHS guidance in England says a dentist shouldn't charge a deposit before assessing your mouth and teeth, or ask you to pay privately to find out whether you'll be accepted for NHS treatment.",
  },
  {
    question: "Are private dental deposits refundable?",
    answer:
      "It depends on your terms, which must be fair. Most practices refund a deposit when the patient cancels in good time or the practice cancels, and keep some or all of it for a late cancellation or missed appointment.",
  },
  {
    question: "How much should a private dental deposit be?",
    answer:
      "There's no set amount. Keep it proportionate to the appointment it protects. CMA guidance for consumers says non-refundable deposits should only be a small percentage of the total price.",
  },
  {
    question: "Does a deposit count towards the cost of treatment?",
    answer:
      "It should. For NHS patients in England it comes off the band charge. For private patients, say in your policy that the deposit is part of the treatment price, not an extra charge.",
  },
];

export const depositsSources = [
  {
    label: "NHSBSA: At which point of a course of treatment will I be asked to pay the NHS dental charge?",
    url: NHSBSA_FAQ,
  },
  { label: "NHS: What happens when you visit the dentist", url: NHS_VISIT },
  { label: "NHS inform: Receiving NHS dental treatment in Scotland", url: NHS_INFORM },
  { label: "Consumer Rights Act 2015, section 62: Requirement for contract terms to be fair", url: CRA_62 },
  { label: "Consumer Rights Act 2015, section 68: Requirement for transparency", url: CRA_68 },
  { label: "Consumer Rights Act 2015, Schedule 2: Terms which may be regarded as unfair", url: CRA_SCH2 },
  { label: "CMA on GOV.UK: Cancelling goods or services, guide for consumers", url: CMA_CANCEL },
  { label: "GDC: Information for patients about dental costs", url: GDC_COSTS },
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

/** Appointment type, whether a deposit makes sense, and what happens on cancellation. */
function DepositTable() {
  const rows: [string, string, string][] = [
    [
      "NHS check-up or first NHS assessment (England)",
      "No",
      "No deposit before the examination. Missed NHS appointments can't be charged.",
    ],
    [
      "NHS course of treatment after the exam (England)",
      "Allowed, optional",
      "Counts towards the band charge. Get advice before keeping any of it.",
    ],
    [
      "Private check-up or hygiene visit",
      "Usually no",
      "Short slots are easier to refill. A fee policy is often enough.",
    ],
    [
      "Private new patient consultation",
      "Optional",
      "Refund with 24 to 48 hours' notice; deposit counts towards the fee.",
    ],
    [
      "Whitening, bonding or other cosmetic work",
      "Yes, commonly",
      "Refund with your notice period; keep up to your late fee inside it.",
    ],
    [
      "Long private treatment (implants, crowns, aligners)",
      "Yes, commonly",
      "Longer notice may be fair. Lab costs already spent should be explained up front.",
    ],
    [
      "Practice cancels or moves the appointment",
      "Not applicable",
      "Refund the deposit in full, or move it with the patient's agreement.",
    ],
  ];
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-[#E2E8F0]">
      <table className="w-full min-w-[560px] text-left text-[15px] leading-[1.5]">
        <caption className="sr-only">When a dental practice might ask for a deposit</caption>
        <thead className="bg-[#F8FAFC] text-[#0F172A]">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">
              Appointment
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Deposit?
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Notice and refund
            </th>
          </tr>
        </thead>
        <tbody className="text-[#334155]">
          {rows.map(([a, b, c]) => (
            <tr key={a} className="border-t border-[#E2E8F0]">
              <td className="px-4 py-3">{a}</td>
              <td className="px-4 py-3 font-medium text-[#0F172A]">{b}</td>
              <td className="px-4 py-3">{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The guide's article text, from "The short answer" to the not-legal-advice note. */
export function DepositsGuideBody() {
  return (
    <>
      <div>
        <p className="text-[16px] font-semibold text-[#0F172A]">The short answer</p>
        <p className="mt-3 text-[18px] text-[#0F172A] leading-[1.65]">
          Yes, with limits. In England, an NHS dentist can't take a deposit before the examination.
          After it, a deposit can be taken but must come off the NHS band charge. Private practices
          can ask for deposits on the appointments they choose, as long as the amount is fair and
          patients see the terms, including refunds, before they pay.
        </p>
      </div>

      <H2 id="nhs-deposits">Can an NHS dentist ask for a deposit?</H2>
      <P>
        In England, yes, but only after the examination. The NHS Business Services Authority (
        <A href={NHSBSA_FAQ}>NHSBSA</A>) says practices &ldquo;cannot charge any additional fees
        above the NHS charge bands&rdquo;, and that this includes &ldquo;taking a deposit before an
        initial assessment of your treatment&rdquo;. It goes on: &ldquo;Deposits can be taken after
        the examination has been completed&rdquo;, and &ldquo;this should be deducted from the
        total charge band due.&rdquo;
      </P>
      <P>So for an NHS patient in England:</P>
      <List
        items={[
          "No deposit to book a first appointment, a check-up or an assessment.",
          "Once the examination is done, you can ask for part of the band charge in advance.",
          "Whatever you take counts towards the band charge. It's never an extra amount on top.",
        ]}
      />
      <P>
        The same NHSBSA page says patients may be asked to pay &ldquo;at any point during a Course
        of Treatment&rdquo;, so some practices take the whole charge up front and others take it at
        the end. A deposit is one way of doing it in between.
      </P>

      <H2 id="registering">Can a practice charge to join as an NHS patient?</H2>
      <P>
        No. The NHS website says a dentist{" "}
        <A href={NHS_VISIT}>
          &ldquo;should not charge a deposit before assessing your mouth and teeth or checking your
          symptoms&rdquo;
        </A>
        . It also says a dentist should not ask a patient to pay privately for an appointment to
        check whether they&rsquo;ll be accepted for NHS treatment. If your practice keeps a waiting
        list for NHS places, don&rsquo;t attach a fee or a deposit to it.
      </P>

      <H2 id="nhs-no-return">What if an NHS patient doesn&rsquo;t come back?</H2>
      <P>
        We couldn&rsquo;t find official guidance that says what happens to a deposit when an NHS
        patient stops attending partway through a course of treatment. It depends on how the course
        is closed and what was charged, so check with the BDA, your NHS commissioner or your
        indemnity provider before you keep any of it. What is clear is that missed NHS appointments
        can&rsquo;t be charged as a fee in England, so a deposit shouldn&rsquo;t be used as one.
      </P>

      <H2 id="other-nations">Is it the same in Scotland, Wales and Northern Ireland?</H2>
      <P>
        Not always. In Scotland, <A href={NHS_INFORM}>NHS inform</A> says &ldquo;a dentist can ask
        for payment in advance&rdquo;, and that patients don&rsquo;t need to pay a deposit for an
        appointment to register. Scotland also allows charges for missed appointments without due
        notice, which England doesn&rsquo;t. This guide covers NHS rules in England and private
        practice. If you work in Wales or Northern Ireland, check your own NHS contract and health
        board guidance.
      </P>

      <H2 id="private-deposits">Can a private practice ask for a deposit?</H2>
      <P>
        Yes. A deposit is part of your agreement with a private patient, so you set the terms. Those
        terms still have to be fair under consumer law. Under the{" "}
        <A href={CRA_62}>Consumer Rights Act 2015</A>, an unfair term &ldquo;is not binding on the
        consumer&rdquo;, and a term is unfair if it causes a significant imbalance in the
        parties&rsquo; rights to the patient&rsquo;s detriment. Written terms must also be{" "}
        <A href={CRA_68}>transparent</A>: plain, intelligible and legible.
      </P>
      <P>
        The Act&rsquo;s <A href={CRA_SCH2}>list of terms that may be unfair</A> includes two that
        matter for deposits:
      </P>
      <List
        items={[
          "Keeping money when the patient cancels, without the patient getting an equivalent amount back when the practice is the one cancelling.",
          "Making a patient who cancels pay a disproportionately high sum, or pay for services they never received.",
        ]}
      />
      <P>
        The Competition and Markets Authority&rsquo;s <A href={CMA_CANCEL}>guide for consumers</A>{" "}
        (written for the public, not for practices) sums it up: &ldquo;Non-refundable deposits
        should only be a small percentage of the total price&rdquo;, cancellation charges should be
        a genuine estimate of the business&rsquo;s direct loss, and businesses should take
        reasonable steps to reduce their losses, for example by offering the time to someone else.
      </P>

      <H2 id="setting-a-deposit">How should a private practice set a deposit?</H2>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">Pick the appointments.</strong>{" "}
            Deposits suit long or high-value slots that are hard to refill, such as whitening,
            bonding and longer cosmetic work. They&rsquo;re rarely worth it for short check-ups.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Set a fair amount.</strong> A fixed sum
            per treatment is easier to explain than a percentage. Keep it in proportion to what you
            stand to lose.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Say what it counts towards.</strong>{" "}
            The deposit should come off the treatment price, not sit on top of it.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Set the refund terms.</strong> Say how
            much notice gets a full refund, and what you keep inside that window.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Show it before payment.</strong> The{" "}
            <A href={GDC_COSTS}>GDC</A> expects clear price information on your website and in your
            practice literature. Show the deposit and refund terms on the booking page, on the phone
            and in the confirmation.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Keep it private only.</strong> In a
            mixed practice, make it clear that the deposit policy applies to private appointments.
          </>,
        ]}
      />

      <H2 id="refunds">When should a deposit be refunded or moved?</H2>
      <P>Most private practices use rules like these:</P>
      <List
        items={[
          "Patient cancels with enough notice: refund in full, or move it to the new date if the patient prefers.",
          "Practice cancels or moves the appointment: refund in full, or move it with the patient's agreement.",
          "Patient cancels late: keep up to your stated late-cancellation fee and refund the rest.",
          "Patient doesn't attend: keep up to your stated missed-appointment fee and refund the rest.",
          "Genuine emergency, such as illness or a bereavement: use judgement and consider a full refund.",
        ]}
      />
      <P>
        Late-cancellation and missed-appointment fees have their own rules. Our guide on{" "}
        <Link to="/guides/missed-appointment-fees" className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]">
          whether a private dentist can charge for a missed appointment
        </Link>{" "}
        covers notice periods, fee amounts and when to waive. In short, the fee must be fair and
        agreed before booking, and NHS patients in England can&rsquo;t be charged for missed NHS
        appointments.
      </P>

      <H2 id="what-to-say">What should the practice team say about deposits?</H2>
      <P>
        Most questions about deposits come in by phone, so give the practice team the same few
        lines to use every time. Patients are more likely to accept a deposit when they hear the
        reason, the amount and the refund rule together, before they commit.
      </P>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">Private booking:</strong> &ldquo;Your
            whitening appointment needs a £50 deposit. It comes off the cost of your treatment, and
            if you give us 48 hours&rsquo; notice to cancel or change, you get it all back.&rdquo;
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">NHS patient (England):</strong>{" "}
            &ldquo;There&rsquo;s nothing to pay to book your check-up. If you need treatment after
            the examination, we&rsquo;ll explain the NHS charge and when we take it.&rdquo;
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Mixed course of treatment:</strong>{" "}
            explain which parts are NHS and which are private, say which part the deposit is for,
            and confirm that anything paid towards the NHS part comes off the NHS charge.
          </>,
        ]}
      />
      <P>
        Write the deposit on the patient&rsquo;s record and in the booking confirmation, so the
        amount and the terms are easy to find if the patient cancels later.
      </P>

      <H2 id="decision-table">Which appointments need a deposit?</H2>
      <P>A starting point you can adjust to your own practice:</P>
      <DepositTable />
      <P>
        The NHS rows reflect England only. For anything you keep from a deposit, write down why at
        the time.
      </P>

      <H2 id="template">How should a deposit policy be worded?</H2>
      <P>
        Copy this, change the parts in brackets, and check it with your indemnity provider before
        you use it.
      </P>
      <div className="mt-6 p-6 md:p-8 text-[16px] text-[#0F172A] leading-[1.75] space-y-4 rounded-lg border border-[#E2E8F0] bg-white">
        <p className="font-semibold">Deposit policy (private appointments)</p>
        <p>
          Some private treatments need a deposit when you book: [whitening £50, composite bonding
          £60]. We&rsquo;ll tell you the amount before you pay.
        </p>
        <p>Your deposit comes off the cost of your treatment. It isn&rsquo;t an extra charge.</p>
        <p>
          If you cancel or change your appointment at least [48 hours] before, we&rsquo;ll refund
          your deposit in full or move it to your new appointment. If we cancel or move your
          appointment, we&rsquo;ll refund it in full.
        </p>
        <p>
          If you cancel with less than [48 hours&rsquo;] notice, we may keep up to [£X] of your
          deposit. If you don&rsquo;t attend, we may keep up to [£Y]. We&rsquo;ll refund anything
          above that.
        </p>
        <p>If something serious stops you coming, please tell us and we&rsquo;ll take it into account.</p>
        <p>
          We don&rsquo;t take deposits for NHS appointments before your examination. Any amount
          paid towards NHS treatment comes off your NHS charge.
        </p>
      </div>

      <H2 id="checklist">A checklist for your practice</H2>
      <List
        items={[
          "No deposits for NHS check-ups, assessments or NHS waiting lists (England).",
          "Any NHS deposit after the exam is recorded as part of the band charge.",
          "A list of private treatments that need a deposit, with a fixed amount for each.",
          "A clear notice period, and what you keep inside it, written in plain words.",
          "Deposit and refund terms shown on the booking page, on the phone and in confirmations.",
          "Refunds in full when the practice cancels or moves an appointment.",
          "A note on the patient's record whenever you keep or waive part of a deposit.",
          "Your policy checked by your indemnity provider.",
        ]}
      />

      <H2 id="how-dentdock-helps">How DentDock helps</H2>
      <P>
        DentDock is practice software for UK private practices. For deposits it lets you:
      </P>
      <List
        items={[
          "Ask for a deposit on the treatments you choose, paid by card through your own Stripe account when patients book online. DentDock takes no cut.",
          "Show the deposit on the treatment and your late-cancellation and missed-appointment fees above the booking button, before patients pay.",
          "Hold the slot for 10 minutes while the patient pays, and tell them the deposit comes off the cost of their treatment.",
          "Set your rules once: a deposit needs a free-cancellation window and both fees set first, so there's always a rule to apply.",
          "Refund a deposit paid online when a patient cancels online in time. Inside your window, your late fee is the most kept and the rest goes back. Patients marked as NHS aren't charged a fee.",
          "Decide every other case yourself: send a fee link, refund in part or in full, or waive it. Each refund gets its own receipt number.",
        ]}
      />
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/solutions/deposits-and-late-cancellations"
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
        >
          See deposits and late cancellations <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/features/payments"
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
        >
          See payments and deposits <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <H2 id="sources">Sources</H2>
      <ul className="mt-4 space-y-2">
        {depositsSources.map((s) => (
          <li key={s.url} className="text-[15px] leading-[1.6]">
            <A href={s.url}>{s.label}</A>
          </li>
        ))}
      </ul>
      <p className="mt-10 border-t border-[#E2E8F0] pt-5 text-[14px] text-[#64748B] leading-[1.6]">
        This guide is general information, not legal advice. It covers NHS rules in England and
        private practice. Check your policy with your indemnity provider or a solicitor before you
        rely on it.
      </p>
    </>
  );
}
