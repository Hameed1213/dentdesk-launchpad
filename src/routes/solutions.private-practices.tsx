import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import {
  On,
  SolutionStoryPage,
  SpendCalculator,
  type SolutionStoryContent,
} from "@/components/site/solutionTemplates";
import { MedicalHistoryCard, PillCard, ReminderTimelineCard } from "@/components/site/cards";
import { BookingPhone } from "@/components/site/phoneScreens";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (practice type): Private practices, "your first day" layout.
 * Product claims checked against the app on 12 Nov 2026: guided setup (practice, opening hours,
 * services from templates with prices, team, CSV import with matched columns, booking page, payments
 * can be skipped, reminders with ready wording); prices always shown on online booking; health form
 * and signature inside the booking, answers to the record; deposits per treatment; free-cancellation
 * window and fees as settings. Not built: NHS claims, charting, imaging, multi-site, membership plans.
 */

const PATH = "/solutions/private-practices";

const content: SolutionStoryContent = {
  path: PATH,
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Private practices", to: PATH },
    ],
    title: "Practice software for",
    highlight: "UK private dental practices",
    intro:
      "Diary, online booking with your prices, reminders, recalls, forms and payments in one place. Set it up yourself in a day.",
    visual: <BookingPhone />,
  },
  sounds: {
    title: "Does this sound like your practice?",
    lines: [
      "Patients ring to ask what a check-up costs.",
      "New patients fill in forms on a clipboard in the waiting room.",
      "We pay for separate tools that don't talk to each other.",
    ],
  },
  story: {
    title: "Your first day",
    highlight: "with DentDock",
    intro:
      "No kick-off calls and no site visits. Here's how a practice goes from sign-up to its first online booking.",
    stops: [
      {
        time: "09:00",
        title: "Tell us about your practice",
        body: "Your name, address and contact details. Every step can be skipped and finished later.",
        visual: <PillCard className="relative" icon="dot" text="Smile Dental · details saved" />,
      },
      {
        time: "09:20",
        title: "Opening hours and treatments",
        body: "Set your hours, then add treatments from ready-made templates, each with its own price and length.",
        visual: (
          <PillCard className="relative" icon="dot" text="Check-up £55 · Hygiene £75 added" />
        ),
      },
      {
        time: "10:00",
        title: "Add your team",
        body: "Add each clinician with their working hours, so online booking only offers times they're really free.",
        visual: <PillCard className="relative" icon="dot" text="Dr Patel and Dr Hughes added" />,
      },
      {
        time: "10:30",
        title: "Bring your patients",
        body: "Upload your patient list as a CSV from your current system. DentDock matches the columns and brings recall dates across.",
        visual: (
          <PillCard className="relative" icon="refresh" text="patients.csv · columns matched" />
        ),
      },
      {
        time: "11:15",
        title: "Your booking page goes live",
        body: "Share the link on your website and Google profile. Reminders are switched on with sensible wording.",
        visual: <ReminderTimelineCard className="relative" />,
      },
      {
        time: "14:05",
        title: "Your first online booking",
        body: "A new patient picks hygiene at £75, fills in their health form and signs it, all before they arrive.",
        visual: <MedicalHistoryCard className="relative" />,
      },
    ],
  },
  controls: {
    title: "Run it your way",
    intro:
      "These are real DentDock settings for a private practice. Change any of them whenever you like.",
    items: [
      { label: "Online booking", value: <On /> },
      { label: "Prices shown on your booking page", value: "Every treatment" },
      { label: "Health form inside online booking", value: <On /> },
      { label: "Deposit on whitening", value: "£50" },
      { label: "Free cancellation up to", value: "48 hours before" },
      { label: "Patients can join the waitlist online", value: <On /> },
    ],
  },
  calculator: <SpendCalculator />,
  features: {
    title: "The features",
    highlight: "private practices use most",
    items: [featurePages.booking, featurePages.forms, featurePages.payments],
  },
  faq: [
    {
      question: "How much does DentDock cost?",
      answer:
        "£49 a month per practice, with unlimited dentists and staff. 200 texts a month are included, then 8p a text. There are no setup fees and no contract.",
    },
    {
      question: "Can we bring our patients from our current system?",
      answer:
        "Yes. Export your patient list as a CSV and upload it. DentDock matches the columns for you and brings across recall dates too.",
    },
    {
      question: "Does it work for mixed NHS and private practices?",
      answer:
        "DentDock doesn't do NHS claims, UDAs or banding, so a mixed practice would still need its NHS system for claims. You can mark NHS patients, and they're never charged cancellation fees.",
    },
    {
      question: "Does DentDock do charting or imaging?",
      answer: "No. DentDock doesn't include tooth charting, treatment plans or X-ray integration.",
    },
    {
      question: "Does DentDock do membership plans?",
      answer:
        "Not yet. Membership plans are planned and listed as coming soon on our pricing page.",
    },
  ],
};

export const Route = createFileRoute("/solutions/private-practices")({
  component: () => <SolutionStoryPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental software for UK private practices | DentDock",
      description:
        "Practice software for UK private dental practices: online booking with your prices, reminders, recalls, forms and payments. Set up in a day. £49 a month, no contract.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Private practices", path: PATH },
      ],
      faq: content.faq,
    }),
});
