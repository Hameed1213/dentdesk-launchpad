import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { TextMessageCard } from "@/components/site/cards";
import {
  FillSlotScreen,
  MessageEditorScreen,
  RecallsScreen,
  RemindersScreen,
} from "@/components/site/screens";

/*
 * Platform page: Reminders and recalls (short, Dentally-style layout).
 * Every claim checked against the app on 12 Nov 2026 (hub main 8039f30):
 * reminders 72h/24h/2h fixed, one message per reminder by the patient's channel with email back-up,
 * texts only 8am to 8pm, portal link in the 72h/24h messages, 5-step recalls (3 on by default),
 * recalls skip patients with a booking, bulk send, staff-sent waitlist offers that don't hold the slot,
 * one-way texts, no reply-to-confirm. Texts are not yet live in production (launch wording kept by Hariss).
 * Photos (Unsplash, free licence): NtFfR3xULbQ, eL4xIEuHzzk, h8uuH7h17Ds, iNiGA6063y8.
 */

const PATH = "/features/reminders-and-recalls";

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Reminders and recalls", to: PATH },
    ],
    title: "Reminders and recalls that",
    highlight: "send themselves",
    intro:
      "Fewer forgotten appointments and fewer patients overdue, without your team picking up the phone.",
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
  features: [
    {
      title: "Reminders before every appointment",
      body: "Patients are reminded three times before each confirmed appointment, without anyone at the practice sending a thing.",
      points: [
        "72 hours, 24 hours and 2 hours before",
        "A link to cancel or rearrange, no password",
        "Booking confirmations sent straight away",
      ],
      visual: <RemindersScreen />,
    },
    {
      title: "Recalls that follow up for you",
      body: "The next recall is set when a check-up or hygiene visit is completed, and DentDock chases it until the patient books.",
      points: [
        "Up to five follow-ups, three on to start with",
        "A booking link in every recall",
        "Send to everyone due in one go",
      ],
      visual: <RecallsScreen />,
    },
    {
      title: "Fill cancelled slots",
      body: "When a slot opens up, DentDock lines up the patients most likely to want it.",
      points: [
        "Waitlist patients, longest waiting first",
        "Patients due a recall included",
        "Offer by text or email in a couple of clicks",
      ],
      visual: <FillSlotScreen />,
    },
    {
      title: "Your words, their preferred channel",
      body: "Every message is yours to edit, and goes the way each patient prefers.",
      points: [
        "Text or email, with email as the back-up",
        "Texts only between 8am and 8pm",
        "Service messages only, never promotions",
      ],
      visual: <MessageEditorScreen />,
    },
  ],
  others: {
    title: "How DentDock supports",
    highlight: "the rest of your practice",
    items: [
      {
        title: "Online booking and forms",
        body: "Patients book online, see your prices and fill in their medical history before they arrive.",
        to: "/features",
        image: "/images/home/patient-booking.webp",
        alt: "Woman smiling while booking on her phone",
      },
      {
        title: "Payments and deposits",
        body: "Deposits, payment links and fair cancellation fees, decided by you case by case.",
        to: "/solutions/reduce-no-shows",
        image: "/images/pages/reception-payment.webp",
        alt: "Receptionist at a front desk while a patient pays by card",
      },
      {
        title: "Reports",
        body: "Money taken by clinician, where your bookings come from, and your no-show rate.",
        to: "/features",
        image: "/images/home/practice-laptop.webp",
        alt: "Practice manager working on a laptop at her desk",
      },
    ],
  },
  faq: [
    {
      question: "When do appointment reminders go out?",
      answer:
        "72 hours, 24 hours and 2 hours before every confirmed appointment. Each one can be switched off. The times are fixed, and texts are only sent between 8am and 8pm.",
    },
    {
      question: "Do patients get a text or an email?",
      answer:
        "One message per reminder, by the patient's preferred channel. If a text can't be sent, an email goes instead.",
    },
    {
      question: "Can patients reply to confirm?",
      answer:
        "Not yet. Texts are one-way. Patients can cancel or rearrange from the link in the 72-hour and 24-hour reminders, with no password.",
    },
    {
      question: "How often should patients be recalled?",
      answer:
        "NICE guidance (CG19) sets check-up intervals by risk: 3 to 24 months for adults and no more than 12 months for under-18s. In DentDock you set a practice default, an interval per treatment and one per patient if needed.",
    },
    {
      question: "Do we need consent to send appointment reminders?",
      answer:
        "The ICO treats appointment reminders as service messages, not direct marketing, as long as they don't include promotions. DentDock's reminders are service messages only. This is general information, not legal advice.",
    },
    {
      question: "How much do reminder texts cost?",
      answer: "200 texts a month are included in £49 a month, then 8p a text. Emails are included.",
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
        "Automatic text and email reminders 72 hours, 24 hours and 2 hours before every appointment, recalls that follow up, and a waitlist to fill cancelled slots. Included in £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Reminders and recalls", path: PATH },
      ],
      faq: content.faq,
    }),
});
