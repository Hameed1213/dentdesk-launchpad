import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import {
  FillSlotCard,
  PillCard,
  RecallListCard,
  ReminderTimelineCard,
  TextMessageCard,
} from "@/components/site/cards";

/*
 * Platform page: Reminders and recalls.
 * Every claim checked against the app on 12 Nov 2026 (hub main 8039f30):
 * reminders 72h/24h/2h fixed, one message per reminder by the patient's channel with email back-up,
 * texts only 8am to 8pm, portal link in the 72h/24h messages, 5-step recalls (3 on by default),
 * recalls skip patients with a booking and Sundays/bank holidays, bulk send, staff-sent waitlist offers
 * that don't hold the slot. Texts are not yet live in production (launch wording kept by Hariss).
 * Photos (Unsplash, free licence): NtFfR3xULbQ, Bg81yWKZlMg, iNiGA6063y8, HBMPQZZondc.
 */

const PATH = "/features/reminders-and-recalls";

const content: PlatformContent = {
  hero: {
    title: "Reminders and recalls that",
    highlight: "send themselves",
    intro:
      "Every confirmed appointment gets reminders 72 hours, 24 hours and 2 hours before, by text or email. Recalls go out when patients are due and follow up if they don't book. All included in £49 a month.",
    secondary: { label: "See pricing", to: "/pricing" },
    visual: (
      <PhotoPanel
        src="/images/pages/phone-reminder.webp"
        alt="Woman smiling as she reads a message on her phone"
        height={788}
        position="object-[35%_40%]"
      >
        <TextMessageCard
          className="absolute right-2 sm:right-3 lg:-right-6 bottom-4 sm:bottom-6 lg:bottom-10"
          when="Sent 24 hours before"
        />
      </PhotoPanel>
    ),
  },
  rows: [
    {
      title: "Reminders before every appointment",
      lead: "Patients get three reminders before each confirmed appointment, with nobody at the practice lifting a finger:",
      points: [
        "72 hours, 24 hours and 2 hours before the appointment",
        "By text or email, whichever the patient prefers, with email as the back-up if a text can't go",
        "A link to view, cancel or rearrange, with no password or app",
        "Your own wording for every message, and texts only between 8am and 8pm",
      ],
      visual: (
        <PhotoPanel
          src="/images/home/dentist-patient.webp"
          alt="Dentist talking with a smiling patient in a modern surgery"
          height={1050}
          position="object-[45%_50%]"
        >
          <ReminderTimelineCard className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10" />
        </PhotoPanel>
      ),
    },
    {
      title: "Recalls that follow up for you",
      lead: "When a check-up or hygiene visit is completed, the next recall date is set for you:",
      points: [
        "The interval comes from the patient, the treatment or your practice default",
        "Up to five reminders, from four weeks before the due date to four weeks after (three are on to start with)",
        "Every recall links straight to online booking, and nobody is chased if they already have an appointment",
        "Send to everyone due or overdue in one go from the Recalls page",
      ],
      visual: (
        <PhotoPanel
          src="/images/home/practice-laptop.webp"
          alt="Practice manager working on a laptop at her desk"
          height={933}
          position="object-[70%_40%]"
        >
          <RecallListCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10" />
        </PhotoPanel>
      ),
    },
    {
      title: "A waitlist to fill cancelled slots",
      lead: "When a slot opens up, find a patient who wants it:",
      points: [
        "Patients can join your waitlist online, or your team adds them",
        "Fill this slot suggests up to 10 matching patients, longest waiting first, plus patients due a recall",
        "Offer the slot by text or email in a couple of clicks",
        "The first patient to tap the link books it, even at short notice",
      ],
      visual: (
        <PhotoPanel
          src="/images/home/switching-laptop.webp"
          alt="Woman smiling while working on a laptop"
          height={933}
          position="object-[70%_40%]"
        >
          <FillSlotCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10" />
          <PillCard
            className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10"
            icon="dot"
            text="Booked by James T."
          />
        </PhotoPanel>
      ),
    },
  ],
  steps: {
    title: "Set it up once,",
    highlight: "then it runs",
    intro: "Most practices are live within the day. Nothing here needs a call with us.",
    items: [
      {
        title: "Switch on the messages you want",
        body: "Reminders, recalls and confirmations come with ready-made wording. Turn each one on or off and edit the words to sound like your practice.",
      },
      {
        title: "Set your recall intervals",
        body: "Choose a practice default and an interval for each treatment. Patients who need a different interval can have their own.",
      },
      {
        title: "Let it run",
        body: "DentDock checks every hour and sends what's due. Every message sent appears in Messages, so your team can see what each patient was told.",
      },
    ],
  },
  limits: {
    title: "What's included,",
    highlight: "and what isn't yet",
    yesTitle: "Included in £49 a month",
    yes: [
      "Reminders 72 hours, 24 hours and 2 hours before every confirmed appointment",
      "Booking, rearranging and cancellation confirmations",
      "Recall reminders with up to five follow-ups",
      "A waitlist with online sign-up",
      "200 texts a month, then 8p a text",
      "Texts held to 8am to 8pm",
    ],
    noTitle: "Not yet",
    no: [
      "Patients can't reply to texts: texts are one-way",
      "No reply-to-confirm attendance",
      "Reminder times are fixed at 72, 24 and 2 hours",
      "Waitlist offers aren't held for one patient: the first to book gets the slot",
    ],
  },
  related: {
    title: "Where reminders",
    highlight: "make the biggest difference",
    items: [
      {
        title: "Reduce no-shows",
        body: "The evidence on reminders, a fair cancellation policy and how to refill a gap.",
        to: "/solutions/reduce-no-shows",
      },
      {
        title: "Private practices",
        body: "Everything a UK private practice runs on, in one place, for £49 a month.",
        to: "/solutions/private-practices",
      },
      {
        title: "All features",
        body: "Calendar, online booking, forms, payments and reports.",
        to: "/features",
      },
    ],
  },
  faq: [
    {
      question: "When do appointment reminders go out?",
      answer:
        "72 hours, 24 hours and 2 hours before every confirmed appointment. Each is switched on by default, and you can turn any of them off. Texts are only sent between 8am and 8pm: a 72-hour or 24-hour text that would fall outside those hours is moved inside them, and a 2-hour text outside them isn't sent.",
    },
    {
      question: "Do patients get a text or an email?",
      answer:
        "One message per reminder, by the patient's preferred channel: a text if they have a mobile number and allow texts, otherwise an email. If a text can't be sent, the email goes instead.",
    },
    {
      question: "Do we need patient consent to send appointment reminders?",
      answer:
        "The ICO treats appointment reminders and confirmations as service messages rather than direct marketing. If a reminder includes promotional content, such as an offer, the ICO says it counts as direct marketing. DentDock's reminders are service messages only. This is general information, not legal advice.",
    },
    {
      question: "How often should patients be recalled?",
      answer:
        "NICE guidance (CG19) says the interval between check-ups should be set by risk: between 3 and 24 months for adults and no more than 12 months for under-18s. In DentDock you set a practice default, an interval per treatment, and a different interval for any patient who needs one.",
    },
    {
      question: "What happens if a patient ignores the first recall?",
      answer:
        "DentDock follows up. There are up to five recall reminders, from four weeks before the due date to four weeks after. Three are on to start with: four weeks before, one week before and one week overdue. Recalls stop as soon as the patient books, skip Sundays and bank holidays, and go within your sending hours.",
    },
    {
      question: "How much do reminder texts cost?",
      answer:
        "200 texts a month are included in £49 a month, then 8p a text. A long message can count as more than one text. Emails are included in your plan.",
    },
    {
      question: "Can patients cancel or rearrange from a reminder?",
      answer:
        "Yes. The 72-hour and 24-hour reminders include a link to the patient's appointments. They sign in with a link sent to their email, with no password, and can cancel or rearrange. Inside your late-cancellation window they can still cancel, but rearranging asks them to call you.",
    },
  ],
};

export const Route = createFileRoute("/features/reminders-and-recalls")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental appointment reminders and recall software | DentDock",
      description:
        "Automatic text and email reminders 72 hours, 24 hours and 2 hours before every appointment, recall reminders with follow-ups, and a waitlist to fill cancelled slots. Included in £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Reminders and recalls", path: PATH },
      ],
      faq: content.faq,
    }),
});
