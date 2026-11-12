import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal, primaryButton } from "@/components/site/ui";
import { FaqSection, templateHead, type Faq } from "@/components/site/templates";

/*
 * Guide: missed-appointment and late-cancellation fees in UK private dentistry.
 * Sources are linked inline and listed at the end. General information, not legal advice.
 * DentDock facts checked against the app on 12 Nov 2026: free-cancellation window (up to the
 * appointment, 2, 12, 24, 48 or 72 hours), fees shown above the booking button, fees decided by
 * staff per visit (fee link, refund the extra, or waive), deposits count towards fees, NHS-marked
 * patients never charged, deposits on chosen treatments.
 */

const PATH = "/guides/missed-appointment-fees";
const TITLE = "Can a private dentist charge for a missed appointment?";

const faq: Faq[] = [
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

const sources = [
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

export const Route = createFileRoute("/guides/missed-appointment-fees")({
  component: GuidePage,
  head: () => {
    const head = templateHead({
      path: PATH,
      title: `${TITLE} | DentDock`,
      description:
        "Missed-appointment and late-cancellation fees in UK private dentistry: what's allowed, NHS rules, how much notice to ask for, when to waive a fee, and a policy template.",
      crumbs: [
        { name: "Guides", path: "/guides" },
        { name: "Missed appointment fees", path: PATH },
      ],
      faq,
    });
    return {
      ...head,
      scripts: [
        ...head.scripts,
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            dateModified: "2026-11-12",
            datePublished: "2026-11-12",
            author: { "@type": "Organization", name: "DentDock", url: "https://dentdock.co.uk" },
            publisher: { "@type": "Organization", name: "DentDock", url: "https://dentdock.co.uk" },
            mainEntityOfPage: `https://dentdock.co.uk${PATH}`,
          }),
        },
      ],
    };
  },
});

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
            className="mt-[12px] h-1.5 w-1.5 rounded-full bg-[#2563EB] flex-shrink-0"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function GuidePage() {
  return (
    <PageShell>
      <article>
        <header className="bg-gradient-to-b from-[#EAF1FF] via-[#F3F7FF] to-white pt-28 lg:pt-36 pb-10 px-6">
          <Reveal className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748B]">
              <Link to="/" className="hover:text-[#2563EB]">
                Home
              </Link>
              {" / "}
              <Link to="/guides" className="hover:text-[#2563EB]">
                Guides
              </Link>
            </nav>
            <h1
              className="mt-6 font-semibold text-[#0F172A] text-[36px] leading-[1.15] md:text-[50px]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {TITLE}
            </h1>
            <p className="mt-5 text-[14px] text-[#64748B]">
              By the DentDock team · Updated 12 November 2026 · 7 min read
            </p>
          </Reveal>
        </header>

        <div className="bg-white px-6 pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-3xl border border-[#BFDBFE] bg-[#F5F8FF] p-6 md:p-8">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
                  The short answer
                </p>
                <p className="mt-3 text-[18px] text-[#0F172A] leading-[1.65]">
                  Yes. A private dental practice can charge for a missed appointment or late
                  cancellation, as long as the fee is fair and patients agreed to your policy before
                  they booked. NHS patients in England can't be charged for missed NHS appointments.
                  Most practices ask for 24 to 48 hours' notice and waive the fee when there's a
                  genuine reason.
                </p>
              </div>
            </Reveal>

            <H2>When can a private practice charge?</H2>
            <P>
              A missed-appointment fee is part of the agreement between your practice and a private
              patient. For it to stand up, the patient needs to know about it before they book: what
              counts as late, what you charge, and how they can cancel in time.
            </P>
            <P>
              Consumer law also expects the terms you set with patients to be fair and clearly
              explained. The{" "}
              <A href="https://www.legislation.gov.uk/ukpga/2015/15/part/2">
                Consumer Rights Act 2015
              </A>{" "}
              covers unfair terms in contracts with consumers, so keep your fee proportionate to the
              appointment it covers, and don't hide it in small print.
            </P>

            <H2>What about NHS patients?</H2>
            <P>
              In England, the NHS contract doesn't allow practices to charge NHS patients for missed
              NHS appointments. The{" "}
              <A href="https://www.bda.org/advice/nhs-contracts-and-tendering/nhs-dentistry-in-england/managing-non-attendance-in-dental-practices-providing-nhs-care-in-england/">
                BDA's guidance on managing non-attendance
              </A>{" "}
              explains what NHS practices can do instead. If you see both NHS and private patients,
              make it clear that your fee policy applies to private appointments only. Rules
              elsewhere in the UK can differ, so check the contract you work under.
            </P>

            <H2>How much notice should you ask for?</H2>
            <P>
              Many private practices ask for 24 or 48 hours. The point of the notice period is to
              give you a realistic chance to offer the slot to someone else, so pick a period that
              matches how quickly you can fill a gap, and apply it the same way for everyone.
            </P>

            <H2>How much should the fee be?</H2>
            <P>There's no fixed amount. Practices tend to choose one of these approaches:</P>
            <List
              items={[
                "A set fee for a late cancellation, and a higher one for not turning up at all.",
                "A fee that rises with the length of the appointment, so a long treatment slot costs more to miss than a check-up.",
                "A deposit for longer or higher-value treatments, which counts towards the fee if the patient cancels late.",
              ]}
            />
            <P>
              Whichever you choose, keep it proportionate and easy to explain at the front desk.
            </P>

            <H2>How to tell patients about your policy</H2>
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

            <H2>When to waive a fee</H2>
            <P>
              Use judgement.{" "}
              <A href="https://www.dentalprotection.org/uk/articles/missed-appointments-and-how-to-minimise-no-shows">
                Dental Protection
              </A>{" "}
              says it's unwise to bill a patient who missed an appointment for a genuine reason,
              such as a bereavement or a medical emergency. Many practices also waive the first
              missed appointment and apply the fee to repeat cases. Decide case by case, and keep a
              note of why.
            </P>

            <H2 id="template">A policy template you can adapt</H2>
            <P>
              Copy this, change the parts in brackets, and check it with your indemnity provider
              before you use it.
            </P>
            <Reveal>
              <div className="mt-6 rounded-3xl border border-[#E5EDFB] bg-[#F8FAFC] p-6 md:p-8 text-[16px] text-[#0F172A] leading-[1.75] space-y-4">
                <p className="font-semibold">Cancellation and missed appointment policy</p>
                <p>
                  We keep appointment time aside especially for you. If you need to cancel or change
                  your appointment, please let us know at least [48 hours] before, so we can offer
                  the time to another patient.
                </p>
                <p>
                  If you cancel with less than [48 hours'] notice, we may charge a late-cancellation
                  fee of [£X]. If you don't attend your appointment without letting us know, we may
                  charge a missed-appointment fee of [£Y].
                </p>
                <p>
                  Some treatments need a deposit of [£Z] when you book. Your deposit counts towards
                  your treatment, or towards any late-cancellation or missed-appointment fee.
                </p>
                <p>
                  We understand that emergencies happen. If you miss an appointment for a genuine
                  reason, please contact us and we'll take this into account.
                </p>
                <p>This policy applies to private appointments only.</p>
              </div>
            </Reveal>

            <H2>How DentDock helps</H2>
            <P>
              DentDock is practice software for UK private practices. For cancellations and fees it
              lets you:
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
              <Link to="/solutions/deposits-and-late-cancellations" className={primaryButton}>
                See deposits and late cancellations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <H2>Sources</H2>
            <ul className="mt-4 space-y-2">
              {sources.map((s) => (
                <li key={s.url} className="text-[15px] leading-[1.6]">
                  <A href={s.url}>{s.label}</A>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl bg-[#F8FAFC] border border-[#E5EDFB] px-5 py-4 text-[14px] text-[#64748B] leading-[1.6]">
              This guide is general information, not legal advice. Check your policy with your
              indemnity provider or a solicitor before you rely on it.
            </p>
          </div>
        </div>
      </article>
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
