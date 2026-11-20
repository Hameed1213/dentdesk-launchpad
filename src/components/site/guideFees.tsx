import { createContext, useContext, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { primaryButton } from "@/components/site/ui";
import type { Faq } from "@/components/site/templates";

/*
 * The text of the guide "Can a private dentist charge for a missed appointment?", shared by the
 * live guide page and the layout mock-ups (20 Nov 2026). Sources are linked inline and listed at the
 * end. General information, not legal advice.
 * DentDock facts checked against the app on 12 Nov 2026: free-cancellation window (up to the
 * appointment, 2, 12, 24, 48 or 72 hours), fees shown above the booking button, fees decided by
 * staff per visit (fee link, refund the extra, or waive), deposits count towards fees, NHS-marked
 * patients never charged, deposits on chosen treatments.
 */

export const FEES_PATH = "/guides/missed-appointment-fees";
export const FEES_TITLE = "Can a private dentist charge for a missed appointment?";

export const feesFaq: Faq[] = [
  {
    question: "Can a private dentist charge for a missed appointment?",
    answer:
      "Yes, as long as the fee is part of a clear policy the patient agreed to before booking, and the amount is fair. NHS patients in England can't be charged for missed NHS appointments.",
  },
  {
    question: "How much notice should a dental practice ask for?",
    answer:
      "Many private practices ask for 24 or 48 hours, which usually leaves enough time to offer the slot to another patient. Choose a period you can apply consistently.",
  },
  {
    question: "How much should a late-cancellation fee be?",
    answer:
      "There's no set amount. Keep the fee proportionate to the appointment it covers, apply it consistently, and make sure patients see it before they book.",
  },
  {
    question: "Should we take a deposit instead?",
    answer:
      "Deposits work best for longer or higher-value appointments, such as whitening or cosmetic work. The deposit can then count towards any fee if the patient cancels late.",
  },
];

export const feesSources = [
  {
    label: "BDA: Managing non-attendance in practices providing NHS care in England",
    url: "https://www.bda.org/advice/nhs-contracts-and-tendering/nhs-dentistry-in-england/managing-non-attendance-in-dental-practices-providing-nhs-care-in-england/",
  },
  {
    label: "DDU: Avoiding confusion over dental charges and exemptions",
    url: "https://www.theddu.com/guidance-and-advice/guides/avoiding-confusion-over-dental-charges-and-exemptions",
  },
  {
    label: "Dental Protection: Missed appointments and how to minimise no-shows",
    url: "https://www.dentalprotection.org/uk/articles/missed-appointments-and-how-to-minimise-no-shows",
  },
  {
    label: "GDC: Information for patients about dental costs",
    url: "https://www.gdc-uk.org/standards-guidance/information-for-patients-public/dental-costs",
  },
  {
    label: "Consumer Rights Act 2015, Part 2: Unfair terms",
    url: "https://www.legislation.gov.uk/ukpga/2015/15/part/2",
  },
];

/**
 * How the article body is styled. "soft" is the current live look (tinted boxes, blue dots).
 * "plain" is the quieter editorial look being tried in the Option A variations (20 Nov 2026).
 */
export const GuideLook = createContext<"soft" | "plain">("soft");

/** The guide's sections, for a table of contents. */
export const feesToc = [
  { id: "when-can-a-private-practice-charge", label: "When can a private practice charge?" },
  { id: "what-about-nhs-patients", label: "What about NHS patients?" },
  { id: "how-much-notice-should-you-ask-for", label: "How much notice should you ask for?" },
  { id: "how-much-should-the-fee-be", label: "How much should the fee be?" },
  { id: "how-to-tell-patients-about-your-policy", label: "How to tell patients about your policy" },
  { id: "when-to-waive-a-fee", label: "When to waive a fee" },
  { id: "template", label: "A policy template you can adapt" },
  { id: "how-dentdock-helps", label: "How DentDock helps" },
  { id: "sources", label: "Sources" },
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
  const plain = useContext(GuideLook) === "plain";
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-[17px] text-[#334155] leading-[1.7]">
          <span
            aria-hidden="true"
            className={`mt-[12px] h-1.5 w-1.5 rounded-full flex-shrink-0 ${plain ? "bg-[#0F172A]" : "bg-[#2563EB]"}`}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** The guide's article text, from "The short answer" to the not-legal-advice note. */
export function FeesGuideBody() {
  const plain = useContext(GuideLook) === "plain";
  return (
    <>
      <div>
        <div
          className={
            plain
              ? "border-l-[3px] border-[#0F172A] pl-6 py-1"
              : "rounded-3xl border border-[#BFDBFE] bg-[#F5F8FF] p-6 md:p-8"
          }
        >
          <p className={`text-[16px] font-semibold ${plain ? "text-[#0F172A]" : "text-[#2563EB]"}`}>
            The short answer
          </p>
          <p className="mt-3 text-[18px] text-[#0F172A] leading-[1.65]">
            Yes. A private dental practice can charge for a missed appointment or late cancellation,
            as long as the fee is fair and patients agreed to your policy before they booked. NHS
            patients in England can't be charged for missed NHS appointments. Most practices ask for
            24 to 48 hours' notice and waive the fee when there's a genuine reason.
          </p>
        </div>
      </div>

      <H2 id="when-can-a-private-practice-charge">When can a private practice charge?</H2>
      <P>
        A missed-appointment fee is part of the agreement between your practice and a private
        patient. For it to stand up, the patient needs to know about it before they book: what
        counts as late, what you charge, and how they can cancel in time.
      </P>
      <P>
        Consumer law also expects the terms you set with patients to be fair and clearly explained.
        The{" "}
        <A href="https://www.legislation.gov.uk/ukpga/2015/15/part/2">Consumer Rights Act 2015</A>{" "}
        covers unfair terms in contracts with consumers, so keep your fee proportionate to the
        appointment it covers, and don't hide it in small print.
      </P>

      <H2 id="what-about-nhs-patients">What about NHS patients?</H2>
      <P>
        In England, the NHS contract doesn't allow practices to charge NHS patients for missed NHS
        appointments. The{" "}
        <A href="https://www.bda.org/advice/nhs-contracts-and-tendering/nhs-dentistry-in-england/managing-non-attendance-in-dental-practices-providing-nhs-care-in-england/">
          BDA's guidance on managing non-attendance
        </A>{" "}
        explains what NHS practices can do instead. If you see both NHS and private patients, make
        it clear that your fee policy applies to private appointments only. Rules elsewhere in the
        UK can differ, so check the contract you work under.
      </P>

      <H2 id="how-much-notice-should-you-ask-for">How much notice should you ask for?</H2>
      <P>
        Many private practices ask for 24 or 48 hours. The point of the notice period is to give you
        a realistic chance to offer the slot to someone else, so pick a period that matches how
        quickly you can fill a gap, and apply it the same way for everyone.
      </P>

      <H2 id="how-much-should-the-fee-be">How much should the fee be?</H2>
      <P>There's no fixed amount. Practices tend to choose one of these approaches:</P>
      <List
        items={[
          "A set fee for a late cancellation, and a higher one for not turning up at all.",
          "A fee that rises with the length of the appointment, so a long treatment slot costs more to miss than a check-up.",
          "A deposit for longer or higher-value treatments, which counts towards the fee if the patient cancels late.",
        ]}
      />
      <P>Whichever you choose, keep it proportionate and easy to explain at the front desk.</P>

      <H2 id="how-to-tell-patients-about-your-policy">How to tell patients about your policy</H2>
      <P>
        Patients should know your policy before they commit to an appointment. The{" "}
        <A href="https://www.theddu.com/guidance-and-advice/guides/avoiding-confusion-over-dental-charges-and-exemptions">
          DDU
        </A>{" "}
        advises explaining your fees and fee policy at the earliest opportunity, and the{" "}
        <A href="https://www.gdc-uk.org/standards-guidance/information-for-patients-public/dental-costs">
          GDC
        </A>{" "}
        expects patients to get clear information about costs.
      </P>
      <List
        items={[
          "Show the policy when patients book, online and on the phone.",
          "Put it on your website and in your practice information.",
          "Repeat it in booking confirmations and reminders, with an easy way to cancel in time.",
        ]}
      />

      <H2 id="when-to-waive-a-fee">When to waive a fee</H2>
      <P>
        Use judgement.{" "}
        <A href="https://www.dentalprotection.org/uk/articles/missed-appointments-and-how-to-minimise-no-shows">
          Dental Protection
        </A>{" "}
        says it's unwise to bill a patient who missed an appointment for a genuine reason, such as a
        bereavement or a medical emergency. Many practices also waive the first missed appointment
        and apply the fee to repeat cases. Decide case by case, and keep a note of why.
      </P>

      <H2 id="template">A policy template you can adapt</H2>
      <P>
        Copy this, change the parts in brackets, and check it with your indemnity provider before
        you use it.
      </P>
      <div>
        <div
          className={`mt-6 p-6 md:p-8 text-[16px] text-[#0F172A] leading-[1.75] space-y-4 ${plain ? "rounded-lg border border-[#E2E8F0] bg-white" : "rounded-3xl border border-[#E5EDFB] bg-[#F8FAFC]"}`}
        >
          <p className="font-semibold">Cancellation and missed appointment policy</p>
          <p>
            We keep appointment time aside especially for you. If you need to cancel or change your
            appointment, please let us know at least [48 hours] before, so we can offer the time to
            another patient.
          </p>
          <p>
            If you cancel with less than [48 hours'] notice, we may charge a late-cancellation fee
            of [£X]. If you don't attend your appointment without letting us know, we may charge a
            missed-appointment fee of [£Y].
          </p>
          <p>
            Some treatments need a deposit of [£Z] when you book. Your deposit counts towards your
            treatment, or towards any late-cancellation or missed-appointment fee.
          </p>
          <p>
            We understand that emergencies happen. If you miss an appointment for a genuine reason,
            please contact us and we'll take this into account.
          </p>
          <p>This policy applies to private appointments only.</p>
        </div>
      </div>

      <H2 id="how-dentdock-helps">How DentDock helps</H2>
      <P>
        DentDock is practice software for UK private practices. For cancellations and fees it lets
        you:
      </P>
      <List
        items={[
          "Choose your free-cancellation window: up to the appointment, or 2, 12, 24, 48 or 72 hours.",
          "Show your late-cancellation and missed-appointment fees above the booking button, before patients book.",
          "Ask for a deposit on the treatments you choose, paid by card when patients book online.",
          "Decide each case yourself: send a fee link, refund anything paid above the fee, or waive it. Patients marked as NHS are never charged.",
        ]}
      />
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/solutions/deposits-and-late-cancellations"
          className={
            plain
              ? "inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
              : primaryButton
          }
        >
          See deposits and late cancellations <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <H2 id="sources">Sources</H2>
      <ul className="mt-4 space-y-2">
        {feesSources.map((s) => (
          <li key={s.url} className="text-[15px] leading-[1.6]">
            <A href={s.url}>{s.label}</A>
          </li>
        ))}
      </ul>
      <p
        className={
          plain
            ? "mt-10 border-t border-[#E2E8F0] pt-5 text-[14px] text-[#64748B] leading-[1.6]"
            : "mt-8 rounded-2xl bg-[#F8FAFC] border border-[#E5EDFB] px-5 py-4 text-[14px] text-[#64748B] leading-[1.6]"
        }
      >
        This guide is general information, not legal advice. Check your policy with your indemnity
        provider or a solicitor before you rely on it.
      </p>
    </>
  );
}
