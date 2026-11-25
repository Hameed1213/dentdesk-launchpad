import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/components/site/templates";

/*
 * The text of the guide "What must a dental treatment plan include? (UK rules and a template)",
 * shown in the guide layout (components/site/guideTemplate.tsx). General information, not legal
 * advice. Publish date 26 Nov 2026.
 *
 * Sources read on 25 Nov 2026 (wording checked on the live pages):
 * - GDC Standards for the Dental Team, Principle 2 (2.2.1 options incl. delaying or doing nothing;
 *   2.3.6 written plan before treatment, copy in notes, "should" ask patients to sign; 2.3.7 proposed
 *   treatment, realistic indication of cost, NHS or private and which elements if mixed; 2.3.8 keep
 *   under review, tell patients immediately and give an updated written version; 2.4.1 simple price
 *   list displayed in reception or waiting area; 2.4.2 prices in practice literature and websites;
 *   2.4.3 guarantees).
 * - GDC Principle 3 (3.1.2 signature vs discussions; 3.1.3 options, risks, benefits, what might
 *   happen if not carried out; 3.1.5 patients can refuse; 3.1.6 written consent for conscious
 *   sedation or GA; 3.3.1 consent is a process) and the Principle 3 FAQ ("Is a patient signature on
 *   a form sufficient evidence of valid consent" -> "No.").
 * - GDC Principle 1 (1.7.1 patients' interests before financial gain; 1.7.4 must not pressurise
 *   patients into private treatment available on the NHS).
 * - GDC news, 2 June 2026: consultation on replacing the Standards with a Framework for
 *   Professionalism, open until 31 August 2026. No outcome or start date found on 25 Nov 2026.
 * - NHSBSA FAQ KA-01756 (FP17DC / FP17DC(w): all patients for all Band 2 and Band 3 courses; Band 1
 *   if it includes private treatment or the patient asks). No date on the page.
 * - NHS (General Dental Services Contracts) Regulations 2005, Sch. 3 para 7 on legislation.gov.uk
 *   (plan at the initial examination on a form supplied by NHS England, with NHS charge and private
 *   alternatives; patient signs where private replaces NHS; revised plan if varied; 7(5) Band 1 and
 *   charge-exempt exception). The regs and NHSBSA differ on charge-exempt patients: the article
 *   follows NHSBSA's wording and says so.
 * - Consumer Rights Act 2015 s.50 (what a trader says or writes that the consumer relies on is a
 *   term of a services contract).
 * - CMA209 Price transparency guidance on gov.uk (first published 18 Nov 2025, updated 7 Jan 2026):
 *   only its page summary is quoted. The full PDF was not read.
 * NOT checked: Scotland, Wales and Northern Ireland NHS forms and rules (FP17DC(w) is only named),
 * PDS agreement regulations, the 2026 England care-pathway changes, indemnity body guidance.
 *
 * DentDock facts checked read-only on 25 Nov 2026 against hub 63b6b60 and booking 3c6e8d7:
 * - hub src/lib/estimateWording.ts: Estimate / Quote titles, "realistic guide to the cost", "up to"
 *   note, fixed quote note, NHS/Private column and separate totals, Benefits / Risks / What to
 *   expect / Guarantee, "No treatment" + "What happens without treatment:", changes line, signature
 *   block, "Replaced by version {n}".
 * - hub src/lib/treatmentPlans.ts: VALID_DAYS_DEFAULT = 90.
 * - hub src/lib/planOverview.ts: tabs (To act on, Waiting for a decision, ...), EXPIRING_DAYS = 7,
 *   call_back in To act on.
 * - hub supabase/migrations/20261120300000_plan_links.sql: online links private only
 *   (plan_links_private_only), 16 and over (plan_links_under_16), need email + UK mobile, demo
 *   practices only (plan_links_demo_only).
 * - booking src/lib/planLink.ts PLAN_PAGE_WORDS: date of birth, 6-digit code, "Type your full name
 *   to sign", "Accepting this estimate is not your consent to treatment...", decline reasons,
 *   "I have a question, please call me", sedation/GA "must be signed for at the practice".
 * - Website src/routes/features.treatment-plans.tsx: wording mirrored (it describes plans without
 *   "live"; the page is in the sitemap).
 * Deliberately NOT claimed: "live", practices using it, instalments / finance / payment plans
 * (not built), booking a whole plan online (not built), producing or filling the FP17DC (it
 * doesn't), drawn signatures online, PDF files, plan templates, "compliant", any results.
 */

export const PLANS_PATH = "/guides/dental-treatment-plan-rules";
export const PLANS_TITLE = "What must a dental treatment plan include? (UK rules and a template)";

const GDC_P1 = "https://standards.gdc-uk.org/pages/principle1/principle1.aspx";
const GDC_P2 = "https://standards.gdc-uk.org/pages/principle2/principle2.aspx";
const GDC_P3 = "https://standards.gdc-uk.org/pages/principle3/principle3.aspx";
const GDC_P3_FAQ = "https://standards.gdc-uk.org/pages/principle3/faq";
const GDC_FRAMEWORK =
  "https://www.gdc-uk.org/news-blogs/news/detail/2026/06/02/gdc-consults-on-replacing-the-%27silver-book%27-with-new-professionalism-framework";
const NHSBSA_FP17DC = "https://faq.nhsbsa.nhs.uk/knowledgebase/article/KA-01756/en-us";
const GDS_REGS = "https://www.legislation.gov.uk/uksi/2005/3361/schedule/3/paragraph/7";
const CRA_50 = "https://www.legislation.gov.uk/ukpga/2015/15/section/50";
const CMA_209 = "https://www.gov.uk/government/publications/price-transparency-cma209";

export const plansFaq: Faq[] = [
  {
    question: "Does a dental treatment plan have to be in writing?",
    answer:
      "Yes. GDC Standard 2.3.6 says you must give patients a written treatment plan, or plans, before their treatment starts, and keep a copy in their notes. If the plan changes, you must tell them straight away and give them an updated version in writing.",
  },
  {
    question: "Does a patient have to sign their treatment plan?",
    answer:
      "The GDC says you should ask patients to sign it. A signature isn't consent on its own: the GDC's FAQ says the discussion of options and costs is what makes consent valid. Under NHS rules in England, a patient who chooses private treatment instead of NHS treatment signs the plan.",
  },
  {
    question: "Is a dental estimate legally binding?",
    answer:
      "An estimate is a realistic guide, not a promise, but what you say or write that the patient relies on can become part of the contract under the Consumer Rights Act 2015. Say clearly whether a price can change and why, or issue a fixed quote.",
  },
  {
    question: "How long should a dental estimate be valid for?",
    answer:
      "There's no set period in the GDC Standards, so choose one that suits your practice. Put a clear valid until date on the plan, and give the patient a new written plan if the price or treatment changes after that.",
  },
  {
    question: "When do NHS patients in England get an FP17DC?",
    answer:
      "NHSBSA says an FP17DC must be issued to all patients for all Band 2 and Band 3 courses of treatment, and for a Band 1 course if it includes private treatment or the patient asks for a treatment plan.",
  },
];

export const plansSources = [
  { label: "GDC Standards for the Dental Team: Principle 1 (patients' interests)", url: GDC_P1 },
  {
    label: "GDC Standards for the Dental Team: Principle 2 (communication and costs)",
    url: GDC_P2,
  },
  { label: "GDC Standards for the Dental Team: Principle 3 (valid consent)", url: GDC_P3 },
  { label: "GDC Standards: Principle 3 frequently asked questions", url: GDC_P3_FAQ },
  {
    label:
      "GDC: GDC consults on replacing the 'silver book' with new professionalism framework (2 June 2026)",
    url: GDC_FRAMEWORK,
  },
  {
    label:
      "NHSBSA: Information on the FP17DC, FP17DC(w), FP17DCO and FP17DCO(w) treatment plan forms",
    url: NHSBSA_FP17DC,
  },
  {
    label: "The NHS (General Dental Services Contracts) Regulations 2005, Schedule 3, paragraph 7",
    url: GDS_REGS,
  },
  { label: "Consumer Rights Act 2015, section 50", url: CRA_50 },
  { label: "CMA: Price transparency (CMA209)", url: CMA_209 },
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

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#0F172A]">{children}</strong>;
}

/** A plain three-column table, shaped like the PECR guide's MessageTable. */
function Table({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: [string, string, string];
  rows: [string, string, string][];
}) {
  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-[#E2E8F0]">
      <table className="w-full min-w-[480px] text-left text-[15px] leading-[1.5]">
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

const ESTIMATE_ROWS: [string, string, string][] = [
  ["What it promises", "A realistic guide to the cost", "A set price for the treatment listed"],
  [
    "Can the price change?",
    "Yes, if what you find during treatment changes the work. Explain why and agree it first",
    "No, not for the treatment listed. New treatment needs a new plan",
  ],
  [
    "Best for",
    "Work where the extent isn't known yet, such as a root canal or a filling that may need a crown",
    "Predictable work, such as whitening, a hygiene course or a single crown",
  ],
  [
    "Wording to use",
    '"This is an estimate. The prices are a realistic guide to the cost." Use an "up to" figure where you can',
    '"This is a fixed quote. The prices will not change for the treatment listed."',
  ],
  ["Valid until", "Your choice. Give a date", "Your choice. Give a date"],
];

const FUNDING_ROWS: [string, string, string][] = [
  ["Which items", "Marked NHS on each line", "Marked private on each line"],
  ["Price shown", "The NHS charge", 'Your private fee, or an "up to" figure'],
  ["Totals", "Its own total", "Its own total, kept separate"],
  [
    "Form (England)",
    "FP17DC for Band 2 and Band 3 courses, and Band 1 if it includes private work or the patient asks",
    "Your own written plan. Private items can also go on the FP17DC as private alternatives",
  ],
  [
    "Signature",
    "Ask for one (GDC 2.3.6)",
    "Required on the NHS plan where private treatment replaces NHS treatment",
  ],
];

const TEMPLATE_SECTIONS: [string, string][] = [
  [
    "Practice and patient details",
    "Practice name, phone and email; patient name and date of birth; the clinician; the date issued; a plan or version number.",
  ],
  [
    "Why treatment is suggested",
    "A short, plain summary of what you found and what the patient told you they want.",
  ],
  [
    "The options",
    "Each option as its own block, with the one the dentist recommends marked. Include no treatment, and delaying treatment where that's reasonable.",
  ],
  [
    "For each option",
    "The treatment, tooth by tooth or visit by visit; the benefits; the risks; what to expect afterwards; any guarantee and its conditions.",
  ],
  [
    "What happens without treatment",
    "What might happen if the patient does nothing, written in plain words.",
  ],
  [
    "Costs",
    'A price for every line, marked NHS or private, with separate NHS and private totals and a grand total. Say if a line is optional or an "up to" figure.',
  ],
  ["Estimate or quote", "Say which it is, what can change the price, and a valid until date."],
  ["Visits", "Roughly how many visits and how far apart, so the patient can plan time off."],
  ["Payment", "When payment is due, for example per visit, and whether a deposit is taken."],
  [
    "Changes",
    "A line saying that if the treatment or cost needs to change, you'll explain why and give an updated plan in writing before you go ahead.",
  ],
  [
    "Consent",
    "A line saying that agreeing to the plan isn't consent to treatment, and that the dentist will discuss it and ask for consent before each part starts. Note where written consent is needed, such as sedation.",
  ],
  [
    "Questions and complaints",
    "Who to ask, how to complain, and for private treatment that the Dental Complaints Service exists.",
  ],
  [
    "Signature",
    "The option chosen, the patient's signature, name and date, and who signed if it wasn't the patient.",
  ],
];

function PlanTemplate() {
  return (
    <div className="mt-6 p-6 md:p-8 rounded-lg border border-[#E2E8F0] bg-white">
      <p className="text-[16px] font-semibold text-[#0F172A]">Treatment plan: sections</p>
      <ol className="mt-4 space-y-3">
        {TEMPLATE_SECTIONS.map(([title, body], i) => (
          <li
            key={title}
            className="flex items-start gap-3 text-[16px] text-[#334155] leading-[1.65]"
          >
            <span className="mt-[1px] w-6 flex-shrink-0 font-semibold text-[#2563EB]">
              {i + 1}.
            </span>
            <span>
              <B>{title}.</B> {body}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The guide's article text, from "The short answer" to the not-legal-advice note. */
export function PlansGuideBody() {
  return (
    <>
      <div>
        <p className="text-[16px] font-semibold text-[#0F172A]">The short answer</p>
        <p className="mt-3 text-[18px] text-[#0F172A] leading-[1.65]">
          Under the GDC Standards, every patient gets a written treatment plan before treatment
          starts. It must set out the proposed treatment, a realistic indication of the cost, and
          whether each part is NHS or private. Keep it under review, and give an updated written
          plan as soon as it changes. A signature alone isn&rsquo;t consent.
        </p>
      </div>

      <H2 id="what-the-gdc-says">What does the GDC say a treatment plan must include?</H2>
      <P>
        The rules sit in Principle 2 of the GDC&rsquo;s{" "}
        <A href={GDC_P2}>Standards for the Dental Team</A>, under communicating with patients. Three
        standards cover the plan itself:
      </P>
      <List
        items={[
          <>
            <B>2.3.6:</B> &ldquo;You must give patients a written treatment plan, or plans, before
            their treatment starts and you should retain a copy in their notes.&rdquo; It adds that
            you should also ask patients to sign it.
          </>,
          <>
            <B>2.3.7:</B> whenever you provide a plan you must include the proposed treatment, a
            realistic indication of the cost, and whether the treatment is NHS (or equivalent) or
            private. If it&rsquo;s mixed, the plan should clearly show which parts are which.
          </>,
          <>
            <B>2.3.8:</B> you should keep the plan and estimated costs under review during
            treatment, and you must tell patients immediately if the plan changes and give them an
            updated version in writing.
          </>,
        ]}
      />
      <P>
        That&rsquo;s the legal minimum for any registrant. A good plan also gives the patient what
        they need to make a real choice, which the next sections cover.
      </P>
      <P>
        One thing to watch: on 2 June 2026 the GDC <A href={GDC_FRAMEWORK}>opened a consultation</A>{" "}
        on replacing the Standards with a new &ldquo;Framework for Professionalism&rdquo;. It closed
        on 31 August 2026. When we checked on 25 November 2026 we found no published outcome or
        start date, so the current Standards are the ones to follow until the GDC says otherwise.
      </P>

      <H2 id="options-and-risks">What options should a treatment plan show?</H2>
      <P>
        The GDC expects patients to see the real choices, not just the one you prefer. Standard
        2.2.1 says that before treatment starts you must &ldquo;explain the options (including those
        of delaying treatment or doing nothing) with the risks and benefits of each&rdquo;. Standard{" "}
        <A href={GDC_P3}>3.1.3</A> lists the same ground for consent, including &ldquo;what might
        happen if the proposed treatment is not carried out&rdquo;.
      </P>
      <P>So for each option, write down:</P>
      <List
        items={[
          "What the treatment is, and roughly how many visits it takes.",
          "The benefits, in the patient's terms (keeps the tooth, looks natural, lasts longer).",
          "The risks and what can go wrong.",
          "What to expect afterwards, including how long it's likely to last.",
          "The cost.",
        ]}
      />
      <P>
        Always include no treatment as an option, with a plain sentence on what might happen. If you
        guarantee any work, Standard <A href={GDC_P2}>2.4.3</A> says you should tell patients
        whether it&rsquo;s guaranteed, under what circumstances and for how long, and when it
        isn&rsquo;t. A plan is a good place to put that in writing.
      </P>
      <P>
        Marking one option as the dentist&rsquo;s recommendation is fine, and patients usually want
        to know. Keep the reasons clinical. Standard <A href={GDC_P1}>1.7.1</A> says you must put
        patients&rsquo; interests before any financial gain.
      </P>

      <H2 id="estimate-or-quote">Estimate or fixed quote: what&rsquo;s the difference?</H2>
      <P>
        The GDC asks for &ldquo;a realistic indication of the cost&rdquo;. It doesn&rsquo;t require
        a fixed price, so most practices use estimates for some work and fixed quotes for others.
        The difference matters, because under{" "}
        <A href={CRA_50}>section 50 of the Consumer Rights Act 2015</A>, what a business says or
        writes about a service, and that the customer relies on when deciding, is treated as a term
        of the contract. For private patients, the words on your plan count.
      </P>
      <Table
        caption="Dental estimate compared with a fixed quote"
        head={["", "Estimate", "Fixed quote"]}
        rows={ESTIMATE_ROWS}
      />
      <P>
        Where the cost depends on what you find, an &ldquo;up to&rdquo; figure is clearer than a
        bare estimate: the patient knows the most they&rsquo;ll pay, and you agree anything above it
        before you do it. A valid until date stops an old price from being held against you a year
        later. The GDC doesn&rsquo;t set a period, so pick one and use it consistently.
      </P>

      <H2 id="nhs-and-private">How do you show NHS and private treatment on one plan?</H2>
      <P>
        Standard 2.3.7 says a mixed plan should clearly show which parts are NHS and which are
        private. The simplest way is to mark every line and keep separate totals. Standard{" "}
        <A href={GDC_P1}>1.7.4</A> adds that you must not pressurise patients into having private
        treatment if it&rsquo;s available to them on the NHS.
      </P>
      <Table
        caption="NHS and private treatment on the same dental treatment plan, England"
        head={["", "NHS items", "Private items"]}
        rows={FUNDING_ROWS}
      />
      <P>
        In England, NHS treatment plans go on the FP17DC, the &ldquo;personal dental treatment
        plan&rdquo; form. <A href={NHSBSA_FP17DC}>NHSBSA</A> says an FP17DC (or FP17DC(w) in Wales)
        &ldquo;must be issued to all patients for all Band 2 and Band 3 courses of treatment&rdquo;,
        and for a Band 1 course if it includes private treatment, such as a private hygienist
        appointment, or the patient asks for a plan.
      </P>
      <P>
        The rule behind it is paragraph 7 of Schedule 3 to the{" "}
        <A href={GDS_REGS}>General Dental Services Contracts Regulations 2005</A>. It says the plan
        goes on a form supplied by NHS England, shows the NHS charge and any private alternatives
        with their cost, and must be signed by the patient if they choose private services instead
        of all or part of the NHS treatment. If the treatment needs to change, the patient gets a
        revised plan. The regulations also exempt charge-exempt courses unless part is private or
        the patient asks, which reads differently from NHSBSA&rsquo;s &ldquo;all patients&rdquo;. If
        you&rsquo;re unsure, follow NHSBSA and your contract.
      </P>
      <P>
        Wales, Scotland and Northern Ireland have their own NHS arrangements. We haven&rsquo;t
        covered those here, so check with your health board or NHS body.
      </P>

      <H2 id="signatures-and-consent">Does a dental treatment plan need to be signed?</H2>
      <P>
        The GDC says you <em>should</em> ask patients to sign it (2.3.6), and the NHS rule above
        needs a signature where private replaces NHS treatment. But a signed plan isn&rsquo;t
        consent. The GDC&rsquo;s <A href={GDC_P3_FAQ}>Principle 3 FAQ</A> asks whether a signature
        on a form is enough evidence of valid consent, and answers &ldquo;No.&rdquo; Standard{" "}
        <A href={GDC_P3}>3.1.2</A> explains: a signature is important in verifying consent, but
        &ldquo;it is the discussions that take place with the patient that determine whether the
        consent is valid.&rdquo;
      </P>
      <List
        items={[
          "Record the discussion in the notes, and check the patient understood (3.1.4).",
          "Treat consent as a process, not a one-off event (3.3.1). Confirm it again before each stage.",
          "Get written consent for conscious sedation or general anaesthetic (3.1.6).",
          "Remember patients can withdraw consent or stop treatment at any time (3.1.5). Explain what that means for them and record it.",
        ]}
      />
      <P>
        It helps to say this on the plan itself, so the patient knows that agreeing to the price and
        agreeing to the treatment are two different steps.
      </P>

      <H2 id="prices-and-consumer-law">What about price lists and consumer law?</H2>
      <P>Standard 2.4 says you must give patients clear information about costs. In particular:</P>
      <List
        items={[
          <>
            <B>2.4.1:</B> a simple price list must be clearly displayed in your reception or waiting
            area, including a consultation, a single-surface filling, an extraction, radiographs and
            hygienist treatment. Items that vary can show a &ldquo;from&rdquo; and &ldquo;to&rdquo;
            range.
          </>,
          <>
            <B>2.4.2:</B> you must give clear prices in your practice literature and on your
            website, and &ldquo;patients should not have to ask for this information.&rdquo;
          </>,
        ]}
      />
      <P>
        Consumer law points the same way. The CMA&rsquo;s{" "}
        <A href={CMA_209}>price transparency guidance (CMA209)</A>, under the Digital Markets,
        Competition and Consumers Act 2024, explains how businesses must be transparent when they
        display prices, including mandatory fees and charges. It warns against &ldquo;drip
        pricing&rdquo;, when prices are added as the customer goes along. We haven&rsquo;t found CMA
        guidance written for dentistry, so treat this as the general direction: the price a patient
        sees first should be close to the price they pay.
      </P>

      <H2 id="keeping-it-up-to-date">How do you keep a treatment plan up to date?</H2>
      <P>
        Plans change. A tooth needs a crown rather than a filling, or the patient decides to leave
        out a step. Standard 2.3.8 says you must tell the patient immediately and give them an
        updated version in writing. In practice:
      </P>
      <List
        items={[
          "Issue a new version rather than editing the old one, and keep every version in the notes.",
          "Say what changed and why, in plain words.",
          "Get the patient's agreement to the new cost before you do the extra work.",
          "If an estimate has passed its valid until date, give a new one before you start.",
        ]}
      />

      <H2 id="template">A dental treatment plan template</H2>
      <P>
        Use these sections as a checklist for your own plan, whether it&rsquo;s printed, on screen
        or both. For NHS treatment in England, the FP17DC still has to be issued where it applies;
        this sits alongside it for private work and the discussion.
      </P>
      <PlanTemplate />

      <H2 id="undecided-patients">How should you follow up patients who haven&rsquo;t decided?</H2>
      <P>
        Plenty of patients leave with a plan and go quiet. Some want time, some need to talk to
        someone at home, and some can&rsquo;t afford it right now. The GDC Standards are built on
        patients making their own decisions, and 3.1.5 says they can refuse treatment. A good
        follow-up gives them what they need to decide, and then respects the answer.
      </P>
      <List
        items={[
          "Ask before they leave whether they'd like a call, and when suits them.",
          "Follow up once, a week or two later, with an offer to answer questions. Have the plan to hand.",
          "If the estimate is about to expire, tell them, and say what happens next.",
          "If cost is the issue, go back over the options and the no-treatment risks honestly. Don't discount to close.",
          "If they decline, record it and the reason they gave, and make sure they know they can come back.",
          "Note every contact on the record, so the whole practice team knows where things stand.",
        ]}
      />
      <P>
        Avoid anything that reads like a sales chase: repeated messages, false deadlines, or
        language that frightens. Mixed practices need extra care here because of 1.7.4.
      </P>

      <H2 id="how-dentdock-helps">How DentDock helps</H2>
      <P>
        DentDock is practice software for UK private practices. Its{" "}
        <Link
          to="/features/treatment-plans"
          className="text-[#2563EB] underline underline-offset-2"
        >
          treatment plans
        </Link>{" "}
        are built around the points in this guide:
      </P>
      <List
        items={[
          "Build plans from your own price list, with options including no treatment. The dentist can mark one as recommended, and add benefits, risks, what to expect and any guarantee.",
          "Each line is marked NHS or private, and the plan shows NHS and private totals separately.",
          'Issue it as an estimate or a fixed quote, with a valid until date (90 days unless you change it) and "up to" prices where needed.',
          "Every issued version is kept. A newer one marks the old one as replaced, so you can always see what the patient was given.",
          "Print it with a space for the patient to sign, or the patient signs on screen at the desk.",
          "Private plans can be sent online. The patient enters their date of birth and a 6-digit code sent by text, chooses an option and accepts by typing their name, declines, or asks you to call. Plans with NHS treatment, patients under 16 and lines that need written consent, such as sedation, are signed for at the practice.",
          'The estimate tells patients: "Accepting this estimate is not your consent to treatment." Their dentist goes through it and asks for consent before it starts.',
          "The Treatment plans page shows plans waiting for a decision, call-back requests, and estimates that expire within 7 days.",
        ]}
      />
      <P>
        DentDock doesn&rsquo;t fill in or send NHS forms such as the FP17DC. Plans sit alongside the{" "}
        <Link to="/features/dental-chart" className="text-[#2563EB] underline underline-offset-2">
          dental chart
        </Link>
        , and you book each visit from the plan with the price, length and clinician filled in.
        Payment is taken visit by visit, with{" "}
        <Link to="/features/payments" className="text-[#2563EB] underline underline-offset-2">
          deposits and payment links
        </Link>{" "}
        through your own Stripe account.
      </P>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/features/treatment-plans"
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
        >
          See treatment plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <H2 id="sources">Sources</H2>
      <ul className="mt-4 space-y-2">
        {plansSources.map((s) => (
          <li key={s.url} className="text-[15px] leading-[1.6]">
            <A href={s.url}>{s.label}</A>
          </li>
        ))}
      </ul>
      <p className="mt-10 border-t border-[#E2E8F0] pt-5 text-[14px] text-[#64748B] leading-[1.6]">
        This guide is general information, not legal advice. It reflects the GDC Standards and NHS
        England guidance as we read them on 25 November 2026. Check your approach with your
        indemnity provider or a solicitor before you rely on it.
      </p>
    </>
  );
}
