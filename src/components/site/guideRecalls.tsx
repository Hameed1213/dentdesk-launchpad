import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/components/site/templates";

/*
 * The text of the guide "Dental recall messages: UK templates and when to send them", shown in
 * the guide layout (components/site/guideTemplate.tsx). General information, not legal or
 * clinical advice.
 *
 * Sources read on 25 Nov 2026 (wording checked on the pages themselves):
 * - NICE CG19 Recommendations 1.1.1-1.1.8 (shortest 3 months, longest 24 months for 18+, 12 months
 *   for under-18s; intervals in 3-month steps; discuss, record the interval and the patient's
 *   agreement or disagreement; review at the next oral health review) and Introduction (applies to
 *   NHS primary dental care in England and Wales; six-monthly check-ups customary since the NHS
 *   began). CG19 published 27 Oct 2004.
 * - NIHR Evidence alert, 23 Apr 2021: INTERVAL trial, 2,372 adults, four years; risk-based
 *   intervals did not adversely affect oral health; "the 30% people at low risk of oral disease
 *   could be seen once every two years without detriment to their oral health".
 * - SDCEP Oral Health Assessment and Review quick reference guide (Scotland): risk-based Focussed
 *   Oral Health Reviews; minimum 3 months (high risk), 6 months (medium risk); full assessment
 *   every 24 months for adults, 12 months for children.
 * - nhs.uk "Dental check-ups": "The time between check-ups can vary from 3 months to 2 years
 *   (or up to 1 year if you're under 18)."
 * - ICO "How do we identify direct marketing?": service messages are "for administrative or
 *   customer services purposes", e.g. "confirm or remind them about appointments"; a message with
 *   direct marketing elements "will count as direct marketing" even if that isn't its main purpose.
 * - Healthwatch England "Your right to an NHS dentist" (7 Apr 2025): "In England, you do not
 *   formally register with a dentist"; a dentist "may choose to keep you on an informal list of
 *   regular patients and invite you back for regular check-ups".
 * Not checked, so not claimed: NHS registration rules in Scotland, Wales and Northern Ireland; any
 * NHS charge amounts or exemptions; BSPD / safeguarding guidance on children not brought to
 * appointments (only "follow your safeguarding policy" is said); any recall response-rate figures
 * from studies or other practices; whether Northern Ireland follows NICE CG19.
 *
 * DentDock facts checked read-only against desk-care-hub 63b6b60 (22 Nov 2026) and
 * booking-for-patients-dentist 3c6e8d7 on 25 Nov 2026:
 * - Five recall messages, 4 wk before / 2 wk before / 1 wk before / 1 wk overdue / 4 wk overdue,
 *   three on by default, timing editable, text and email, wording editable
 *   (src/components/automations/automationsData.ts, RECALLS block).
 * - Recall set on completion from the patient's own interval, else the service's, else the
 *   practice default; separate check-up and hygiene defaults (src/lib/patientRecallInterval.ts,
 *   src/lib/serviceRecall.ts, src/components/settings/SettingsRecallsTab.tsx).
 * - Automatic recalls only between the practice's send hours, "Not on Sundays", "Not on bank
 *   holidays" (England and Wales) (SettingsRecallsTab.tsx; process-automations/index.ts).
 * - Not sent if the patient has a visit still to come, has opted out, is deceased or has left the
 *   practice; booking link in each recall (process-automations/index.ts recall loop;
 *   _shared/messageVars.ts recallVars).
 * - One channel per message; text falls back to email (process-automations/index.ts comment on
 *   sendFormReminder "as for appointment and recall reminders").
 * - Recalls page tabs Overdue, Due this month, Upcoming, Paused, Opted out, Written off; staff
 *   bulk send; staff pause; "Write off — stop reminders" offered once 28+ days overdue, logged to
 *   audit_log as recall.written_off with who did it (src/pages/Recalls.tsx).
 * - "Recall response rate" on the Recalls page; Analytics > Recalls & forms > "Recall results"
 *   (src/pages/Reports.tsx).
 * - Recall reminders labelled "Healthcare communication" on Automations (src/pages/Automations.tsx,
 *   src/utils/consentChecker.ts "clinical").
 * NOT claimed: posted or printed recall letters (not built), phone-call lists, two-way texts or
 * replies, WhatsApp, any recall or booking results, NHS claims, that texts are switched on in
 * production today (they are off; written as what DentDock does, like the other guides), the
 * "Stop texts" line, automatic write-offs (writing off is a staff action).
 */

export const RECALLS_PATH = "/guides/dental-recall-templates";
export const RECALLS_TITLE = "Dental recall messages: UK templates and when to send them";

const NICE_RECS = "https://www.nice.org.uk/guidance/cg19/chapter/Recommendations";
const NICE_INTRO = "https://www.nice.org.uk/guidance/cg19/chapter/Introduction";
const NIHR_INTERVAL =
  "https://evidence.nihr.ac.uk/alert/dental-check-ups-every-six-months-unnecessary-people-low-risk-oral-disease";
const SDCEP_OHAR = "https://www.sdcep.org.uk/media/33hb2avs/sdcep-ohar-quick-ref-guide-2pg.pdf";
const NHS_CHECKUPS = "https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-check-ups/";
const ICO_IDENTIFY =
  "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/identify-direct-marketing/";
const HEALTHWATCH =
  "https://healthwatch.co.uk/advice-and-information/2025-04-07/your-right-nhs-dentist";

export const recallsFaq: Faq[] = [
  {
    question: "How often should a dental recall be in the UK?",
    answer:
      "It depends on the patient's risk, not a fixed six months. NICE guideline CG19 says the gap between check-ups should be between 3 and 24 months for adults, and no more than 12 months for under-18s, set by the dentist after each check-up.",
  },
  {
    question: "What should a dental recall text say?",
    answer:
      "Keep it short and factual: the patient's first name, your practice name, that their check-up is due, and how to book (a link or your phone number). Leave out health details and anything promotional, such as offers or new treatments.",
  },
  {
    question: "How many recall reminders should a practice send?",
    answer:
      "There's no rule. A sensible pattern is an invitation about four weeks before the due date, a reminder close to it, and one or two follow-ups once it has passed, then stop. Choose a sequence you can explain and apply it the same way for everyone.",
  },
  {
    question: "What should we do when a patient never replies to recalls?",
    answer:
      "Stop the automatic messages after your last follow-up, make one personal attempt if there's a clinical reason to, and record what you sent, when, and that you stopped. Keep the patient's record as normal: not replying doesn't mean it can be deleted.",
  },
  {
    question: "Is an overdue recall letter marketing?",
    answer:
      "Not if it only tells the patient their check-up is due and how to book. The ICO treats messages about appointments as service messages. Adding an offer or promotion to the same letter or text turns it into marketing.",
  },
];

export const recallsSources = [
  {
    label: "NICE CG19: Dental checks, intervals between oral health reviews (Recommendations)",
    url: NICE_RECS,
  },
  { label: "NICE CG19: Introduction", url: NICE_INTRO },
  {
    label:
      "NIHR Evidence: Dental check-ups every six months are unnecessary for people at low risk of oral disease (2021)",
    url: NIHR_INTERVAL,
  },
  { label: "SDCEP: Oral Health Assessment and Review, quick reference guide", url: SDCEP_OHAR },
  { label: "NHS: Dental check-ups", url: NHS_CHECKUPS },
  { label: "ICO: How do we identify direct marketing?", url: ICO_IDENTIFY },
  { label: "Healthwatch England: Your right to an NHS dentist (2025)", url: HEALTHWATCH },
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

/** A plain two- or three-column table, same styling as the message table in guideTexts.tsx. */
function Table({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
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
          {rows.map((r) => (
            <tr key={r[0]} className="border-t border-[#E2E8F0]">
              {r.map((c, i) => (
                <td
                  key={i}
                  className={i === 0 ? "px-4 py-3 font-medium text-[#0F172A]" : "px-4 py-3"}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Copy-ready wording: a label and the text, in a bordered box like the templates in the other guides. */
function Template({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-4 p-5 md:p-6 text-[16px] text-[#0F172A] leading-[1.7] rounded-lg border border-[#E2E8F0] bg-white">
      <p className="text-[14px] font-semibold text-[#475569]">{label}</p>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
  );
}

/** The guide's article text, from "The short answer" to the not-legal-advice note. */
export function RecallsGuideBody() {
  return (
    <>
      <div>
        <p className="text-[16px] font-semibold text-[#0F172A]">The short answer</p>
        <p className="mt-3 text-[18px] text-[#0F172A] leading-[1.65]">
          Send a short, factual invitation about four weeks before a check-up is due, a reminder
          close to the date, and one or two follow-ups once it has passed, then stop and record it.
          Base each interval on risk: NICE says 3 to 24 months for adults, up to 12 for under-18s.
          Keep recalls free of offers.
        </p>
      </div>

      <H2 id="how-often">How often should patients be recalled in the UK?</H2>
      <P>
        Six-monthly check-ups were the habit for decades. NICE&rsquo;s guideline on recall
        intervals, <A href={NICE_INTRO}>CG19</A>, notes they have been customary since the NHS
        began, and replaces them with an interval set for each patient. Its{" "}
        <A href={NICE_RECS}>recommendations</A> say:
      </P>
      <Table
        caption="NICE CG19 recall intervals between oral health reviews"
        head={["Patient", "Shortest interval", "Longest interval"]}
        rows={[
          ["Adults (18 and over)", "3 months", "24 months"],
          ["Under 18s", "3 months", "12 months"],
        ]}
      />
      <List
        items={[
          "The dentist chooses the interval from an assessment of the patient's disease levels and risk, and discusses it with them.",
          "NICE suggests intervals in 3-month steps: 3, 6, 9 or 12 months for under-18s, and 3 to 24 months for adults.",
          "The dentist records the interval and whether the patient agreed with it, and reviews it at the next check-up.",
        ]}
      />
      <P>
        The evidence backs this up. The NIHR-funded INTERVAL trial followed 2,372 adults for four
        years and found that a{" "}
        <A href={NIHR_INTERVAL}>
          check-up interval based on each person&rsquo;s risk did not harm their oral health
        </A>
        . The NIHR summary adds that the 30% of people at low risk could be seen every two years
        without detriment.
      </P>
      <P>
        CG19 was written for NHS dental care in England and Wales, but it&rsquo;s a sound benchmark
        for private patients too. In Scotland, <A href={SDCEP_OHAR}>SDCEP&rsquo;s guidance</A> takes
        the same risk-based approach, with a full oral health assessment every 24 months for adults
        and 12 months for children. The <A href={NHS_CHECKUPS}>NHS website</A> tells patients the
        same thing: anywhere from 3 months to 2 years.
      </P>
      <P>
        For your recall messages, this means two things. Don&rsquo;t write &ldquo;it&rsquo;s been
        six months&rdquo;, because for many patients it won&rsquo;t have been. And let the recall
        date come from the interval the dentist set, not a practice-wide default.
      </P>

      <H2 id="recall-or-reminder">What&rsquo;s the difference between a recall and a reminder?</H2>
      <P>
        A recall invites a patient to book a visit they don&rsquo;t have yet. An appointment
        reminder is about a visit that&rsquo;s already in the diary. They need different wording: a
        recall asks the patient to do something (book), while a reminder confirms a date and time
        and makes it easy to change. Keep them as separate messages, and stop recalls as soon as the
        patient books, so nobody is told they&rsquo;re due when they&rsquo;re already booked in.
      </P>
      <P>
        Check-ups and hygiene appointments often have different intervals, so treat them as two
        recalls. A patient might see the dentist every 12 months and the hygienist every 6, and a
        message that says &ldquo;check-up&rdquo; when they&rsquo;re due a hygiene visit is
        confusing.
      </P>

      <H2 id="when-to-send">When should each recall message go?</H2>
      <P>
        There&rsquo;s no official schedule for recall reminders. Here&rsquo;s a sensible sequence.
        Adjust the timings to suit how far ahead your diary books up.
      </P>
      <Table
        caption="A recall message timeline"
        head={["Stage", "When", "Channel", "Job"]}
        rows={[
          [
            "Invitation",
            "About 4 weeks before the due date",
            "Text or email",
            "Book ahead while times are free",
          ],
          ["Reminder", "1 to 2 weeks before", "Text or email", "Nudge patients who meant to book"],
          [
            "Due now",
            "On or just after the due date",
            "Text or email",
            "Say plainly that it's due",
          ],
          ["Overdue", "About 4 weeks after", "Text, email or letter", "A clear follow-up"],
          [
            "Lapsed",
            "About 3 months after",
            "Letter or phone call",
            "A last personal attempt, then stop",
          ],
        ]}
      />
      <P>
        Before every message, check two things: has the patient already booked, and have they asked
        not to hear from you? Either one should stop the sequence.
      </P>

      <H2 id="which-channel">Should recalls go by text, email or letter?</H2>
      <P>
        Use the channel each patient prefers, and keep a second one for when the first fails. Each
        has a job:
      </P>
      <Table
        caption="Recall channels compared"
        head={["Channel", "Good for", "Watch out for"]}
        rows={[
          [
            "Text",
            "Quick to read, easy to tap a booking link",
            "Length, health details on a lock screen, out-of-date numbers",
          ],
          [
            "Email",
            "More detail, opening hours, a clear booking button",
            "Spam folders, plain subject lines matter",
          ],
          [
            "Letter",
            "Patients without a mobile or email, a final attempt",
            "Cost, time to post, no link to tap",
          ],
          [
            "Phone call",
            "A personal last attempt, patients the dentist is concerned about",
            "Staff time, so keep it for the few who need it",
          ],
        ]}
      />
      <P>
        Whatever you use, send one message per stage rather than a text and an email for the same
        reminder. Two at once can feel like nagging.
      </P>

      <H2 id="what-makes-a-good-recall">What makes a recall message work?</H2>
      <List
        items={[
          "Who it's from, straight away. In a text, your sender name can be up to 11 characters, so pick a short version of your practice name.",
          "One clear action: a booking link, your phone number, or both.",
          "The patient's first name, and the type of visit (check-up or hygiene appointment).",
          "No health details. A text can be read on a locked screen or by someone else, so leave out findings, treatments and conditions.",
          "Short texts. Aim for 160 characters or fewer, which is one text. Use straight apostrophes: some symbols and curly quotes can make a text count as more than one.",
          "Nothing that sells. No offers, discounts or new treatments (more on this below).",
        ]}
      />

      <H2 id="what-to-avoid">What should a recall never say?</H2>
      <P>Most problems with recall wording come from a handful of habits. Swap them like this:</P>
      <Table
        caption="Recall wording to avoid and what to write instead"
        head={["Avoid", "Why", "Write instead"]}
        rows={[
          [
            "It's been 6 months since your last visit",
            "Many patients have a different interval",
            "Your check-up is due in [month]",
          ],
          [
            "Your gum treatment review is due",
            "Health details in a text",
            "Your hygiene appointment is due",
          ],
          [
            "Book now and get 10% off whitening",
            "Makes the recall a marketing message",
            "Book at [link] or call [phone]",
          ],
          [
            "FINAL WARNING",
            "Reads as a threat, and patients switch off",
            "We haven't been able to arrange your check-up yet",
          ],
          [
            "You will be removed from our list",
            "May not match your NHS contract or policy",
            "Let us know if you've moved dentist",
          ],
        ]}
      />

      <H2 id="text-templates">What should a dental recall text say?</H2>
      <P>
        Copy these, change the parts in brackets, and check the length with your real practice name
        and link. Each one came in under 160 characters when we tried it with a typical name,
        practice name and booking link.
      </P>
      <H3>Private patients</H3>
      <Template label="Invitation (about 4 weeks before)">
        <p>
          Hi [first name], your check-up at [practice] is due in [month]. Book a time that suits you
          at [link] or call [phone].
        </p>
      </Template>
      <Template label="Reminder (1 to 2 weeks before)">
        <p>
          Hi [first name], your check-up at [practice] is due soon. Book at [link] or call [phone].
        </p>
      </Template>
      <Template label="Due now">
        <p>
          Hi [first name], your check-up at [practice] is due now. Book at [link] or call [phone].
        </p>
      </Template>
      <Template label="Overdue (about 4 weeks after)">
        <p>
          {
            "Hi [first name], your check-up at [practice] was due in [month]. It's not too late to book: [link] or call [phone]."
          }
        </p>
      </Template>
      <Template label="Hygiene appointment">
        <p>
          Hi [first name], your hygiene appointment at [practice] is due in [month]. Book at [link]
          or call [phone].
        </p>
      </Template>

      <H3>NHS patients</H3>
      <P>
        Only offer a booking link if NHS patients really can book NHS check-ups online with you.
        Otherwise ask them to call. Don&rsquo;t mention prices, private options or anything the NHS
        appointment won&rsquo;t include.
      </P>
      <Template label="NHS invitation">
        <p>
          Hi [first name], your NHS check-up at [practice] is due in [month]. Please call [phone] to
          book.
        </p>
      </Template>
      <Template label="NHS overdue">
        <p>
          {
            "Hi [first name], your NHS check-up at [practice] was due in [month]. Please call [phone] if you'd like to book."
          }
        </p>
      </Template>
      <P>
        For children, send recalls to the parent or guardian&rsquo;s contact details, and use the
        child&rsquo;s first name so it&rsquo;s clear who the appointment is for.
      </P>

      <H2 id="email-template">What should a recall email say?</H2>
      <P>
        An email has room for a little more: when the patient last came in, how to book, and your
        opening hours. Keep the subject line plain so it isn&rsquo;t mistaken for a newsletter.
      </P>
      <Template label="Recall email (private, invitation or due now)">
        <p className="font-semibold">Subject: Your check-up at [practice] is due</p>
        <p>Dear [first name],</p>
        <p>
          Your next check-up with [dentist name] is due in [month]. It&rsquo;s a chance for us to
          check your teeth and gums and agree with you when you next need to come in.
        </p>
        <p>
          You can book online at [link], or call us on [phone]. We&rsquo;re open [opening hours].
        </p>
        <p>
          If you&rsquo;ve moved to another dentist, just reply or call and we&rsquo;ll update your
          record.
        </p>
        <p>
          Kind regards,
          <br />
          [practice]
        </p>
      </Template>
      <P>
        For an NHS email, use &ldquo;NHS check-up&rdquo; in the subject and first line, and swap the
        booking link for your phone number unless NHS check-ups can be booked online.
      </P>

      <H2 id="letter-template">What should an overdue recall letter say?</H2>
      <P>
        Letters still matter for patients without a mobile or email address, and for a last attempt
        with someone who hasn&rsquo;t answered texts. Make it polite and factual. Avoid warnings and
        capital letters: the aim is to make booking easy, not to tell anyone off.
      </P>
      <Template label="Overdue recall letter (private)">
        <p>Dear [title and surname],</p>
        <p className="font-semibold">Your dental check-up</p>
        <p>
          Our records show your check-up at [practice] was due in [month], and we haven&rsquo;t been
          able to arrange it yet.
        </p>
        <p>
          You can book online at [link] or call us on [phone]. We&rsquo;re open [opening hours].
        </p>
        <p>
          If you&rsquo;ve moved to another dentist, or you&rsquo;d rather we didn&rsquo;t contact
          you about check-ups, please let us know and we&rsquo;ll update your record.
        </p>
        <p>
          Yours sincerely,
          <br />
          [name], on behalf of [dentist name]
          <br />
          [practice], [address]
        </p>
      </Template>
      <Template label="Overdue recall letter (NHS)">
        <p>Dear [title and surname],</p>
        <p className="font-semibold">Your NHS dental check-up</p>
        <p>
          Our records show your NHS check-up at [practice] was due in [month]. If you&rsquo;d like
          to book, please call us on [phone]. We&rsquo;re open [opening hours].
        </p>
        <p>
          If you&rsquo;ve moved to another dentist, or you&rsquo;d rather we didn&rsquo;t contact
          you about check-ups, please let us know.
        </p>
        <p>
          Yours sincerely,
          <br />
          [name], [practice], [address]
        </p>
      </Template>
      <P>
        If NHS charges apply where you are, you can add a line saying so. Don&rsquo;t quote private
        fees or private plans in an NHS recall.
      </P>

      <H2 id="lapsed-patients">What about lapsed patients?</H2>
      <P>
        A lapsed patient is one who is well past their recall date with nothing booked. One last
        message, then a pause, is kinder and more useful than a monthly stream of reminders.
      </P>
      <Template label="Lapsed patient text">
        <p>
          {
            "Hi [first name], it's been a while since your check-up at [practice]. To book, call [phone]. Moved dentist? Let us know and we'll stop reminders."
          }
        </p>
      </Template>
      <P>
        Giving patients an easy way to say they&rsquo;ve moved on keeps your recall list honest. A
        list full of people who now see another dentist makes every number on it look worse than it
        is.
      </P>
      <P>
        For NHS patients in England, be careful with wording about &ldquo;your place&rdquo; at the
        practice. Patients there{" "}
        <A href={HEALTHWATCH}>don&rsquo;t formally register with a dentist</A>, though a practice
        may keep an informal list of regular patients and invite them back. If your practice stops
        inviting NHS patients back after a long gap, say so plainly and check the wording against
        your contract. Arrangements in Scotland, Wales and Northern Ireland are different.
      </P>

      <H2 id="never-reply">When should you stop recalling a patient who never replies?</H2>
      <P>
        Pick a point and stick to it, so every patient is treated the same way. For example, stop
        after the lapsed message, around three months past the due date. Then:
      </P>
      <List
        items={[
          "Stop the automatic messages, so the patient isn't chased indefinitely.",
          "Make one personal attempt, a call or a letter, if the dentist has a clinical reason to be concerned. For a child who keeps missing check-ups, follow your practice's safeguarding policy.",
          "Record what you sent, when and how, and the date you stopped. NICE already expects the recall interval and the patient's agreement to be in the record, so this sits alongside it.",
          "Keep the patient's record. Not replying to recalls isn't a reason to delete it; your normal records retention rules still apply.",
          "If a patient asks you to stop, stop straight away and note it, whatever stage they're at.",
        ]}
      />

      <H2 id="service-message-or-marketing">Is a recall message marketing?</H2>
      <P>
        A plain recall is a service message. The <A href={ICO_IDENTIFY}>ICO</A> describes service
        messages as being for &ldquo;administrative or customer services purposes&rdquo;, such as
        messages that &ldquo;confirm or remind them about appointments&rdquo;. But it also says a
        message with direct marketing elements counts as direct marketing, even when that
        isn&rsquo;t its main purpose. So a recall that adds &ldquo;20% off whitening this
        month&rdquo; becomes a marketing message, with consent rules to match.
      </P>
      <P>
        The full rules on consent for texts are in our guide{" "}
        <Link
          to="/guides/reminder-texts-pecr"
          className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]"
        >
          Can a dental practice text patients without consent?
        </Link>{" "}
        The short version: keep recalls factual, and send any news or offers separately, only to
        patients who opted in.
      </P>

      <H2 id="measure">How do you know if your recalls are working?</H2>
      <P>Two numbers, checked once a month, tell you most of what you need:</P>
      <List
        items={[
          <>
            <strong className="font-semibold text-[#0F172A]">Recall booking rate.</strong> Of the
            patients whose recall fell due in a given month, how many have booked or been seen
            within, say, eight weeks? Compare month with month, using the same window each time.
          </>,
          <>
            <strong className="font-semibold text-[#0F172A]">Overdue list size.</strong> How many
            patients are more than three months past their due date with nothing booked? If this
            keeps growing, your sequence isn&rsquo;t reaching people, or your diary has no room for
            them.
          </>,
        ]}
      />
      <P>
        For example, if 80 patients fell due in March and 52 of them had booked or been seen by the
        end of May, your booking rate for March is 65%. The number itself matters less than the
        trend: track the same calculation every month. (These figures are an illustration, not a
        benchmark.)
      </P>
      <P>
        If the booking rate drops, look at the basics before rewriting anything: are mobile numbers
        and email addresses up to date, does the booking link open the right page, and are there
        free check-up times in the weeks patients are being asked to book?
      </P>

      <H2 id="book-before-they-leave">
        Should you book the next check-up before the patient leaves?
      </H2>
      <P>
        If your diary is open far enough ahead, offering the next check-up at the end of a visit
        means fewer patients need recalling at all. It works best for shorter intervals, where the
        date is only a few months away. For a 12 or 24-month interval, many patients won&rsquo;t
        know where they&rsquo;ll be, and a booking made that far ahead is more likely to be moved or
        missed.
      </P>
      <P>
        Either way, the recall sequence is the safety net. Patients who book before they leave
        should drop out of it automatically, and patients who said &ldquo;I&rsquo;ll book
        later&rdquo; should get the invitation as normal.
      </P>

      <H2 id="checklist">A recall checklist for your practice</H2>
      <List
        items={[
          "Recall dates come from the interval the dentist set for each patient, not a fixed six months.",
          "Separate wording for check-ups and hygiene appointments, and for NHS and private patients.",
          "Every message has your practice name, one clear action and no health details.",
          "Texts are 160 characters or fewer with your real practice name and link.",
          "No offers or promotions in any recall.",
          "Patients who have booked, opted out, moved away or died get no further recalls.",
          "A fixed point where automatic recalls stop, and a note on the record when they do.",
          "Two numbers reviewed monthly: recall booking rate and overdue list size.",
        ]}
      />

      <H2 id="how-dentdock-helps">How DentDock helps</H2>
      <P>
        DentDock is practice software for UK private practices. Its{" "}
        <Link
          to="/features/reminders-and-recalls"
          className="text-[#2563EB] underline underline-offset-2 hover:text-[#1D4ED8]"
        >
          recalls
        </Link>{" "}
        are built around the steps in this guide:
      </P>
      <List
        items={[
          "When a check-up or hygiene visit is completed, the next recall is set from the patient's own interval, the treatment's interval or your practice default, with separate defaults for check-ups and hygiene.",
          "Up to five recall messages: 4 weeks, 2 weeks and 1 week before the due date, then 1 week and 4 weeks after. Three are on to start with, and you can change the timings and the wording.",
          "Each recall goes by text or email, the way the patient prefers, with a link to book online. If a text can't go, an email goes instead.",
          "Recalls skip patients who already have an appointment booked, and never go to patients who opted out, have left the practice or have died.",
          "Automatic recalls only go between the hours you choose, and not on Sundays or England and Wales bank holidays unless you switch that off.",
          "The Recalls page shows who is overdue, due this month or upcoming. Your team can send recalls to everyone due in one go, pause a patient's reminders, or write off a recall once it's four weeks overdue. Each write-off is recorded with who did it.",
          "Your recall response rate is on the Recalls page, and Analytics shows how many patients sent a recall then booked.",
        ]}
      />
      <P>
        Recall messages are labelled as healthcare communications on the Automations page, and their
        ready-made wording has no offers in it.
      </P>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/solutions/bring-patients-back"
          className="inline-flex items-center gap-1.5 text-[16px] font-semibold text-[#2563EB] underline underline-offset-4"
        >
          See how DentDock brings patients back <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <H2 id="sources">Sources</H2>
      <ul className="mt-4 space-y-2">
        {recallsSources.map((s) => (
          <li key={s.url} className="text-[15px] leading-[1.6]">
            <A href={s.url}>{s.label}</A>
          </li>
        ))}
      </ul>
      <p className="mt-10 border-t border-[#E2E8F0] pt-5 text-[14px] text-[#64748B] leading-[1.6]">
        This guide is general information, not legal or clinical advice. Recall intervals are a
        clinical decision for the dentist. Check your messages and policy with your indemnity
        provider before you rely on them.
      </p>
    </>
  );
}
