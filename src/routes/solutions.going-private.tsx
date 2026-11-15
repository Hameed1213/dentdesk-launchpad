import { createFileRoute } from "@tanstack/react-router";
import { CalendarX, PhoneCall, Receipt } from "lucide-react";
import { PhotoPanel } from "@/components/site/ui";
import { solutionPhotos } from "@/components/site/solutionPages";
import { templateHead } from "@/components/site/templates";
import {
  SolutionStoryPage,
  SpendCalculator,
  at,
  type SolutionStoryContent,
} from "@/components/site/solutionTemplates";
import { BookingPriceCard, PillCard, ReminderTimelineCard } from "@/components/site/cards";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (practice type): Practices going private.
 * Checked against the app on 12 Nov 2026: treatments with prices (from templates), CSV patient import,
 * booking page with prices, deposits per treatment, cancellation window and fees shown before booking,
 * NHS-marked patients never charged fees, reminders and recalls with ready wording. Not built: NHS claims,
 * UDAs, banding, membership plans.
 * Photo (Unsplash, free licence): 9_1Y_IKP4tY.
 */

const PATH = "/solutions/going-private";

const content: SolutionStoryContent = {
  path: PATH,
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Going private", to: PATH },
    ],
    title: "Going private?",
    highlight: "Start with the right software",
    intro:
      "Show your prices, take deposits, and give private patients online booking and reminders, all for £49 a month with no contract.",
    visual: (
      <PhotoPanel {...solutionPhotos.goingPrivate}>
        <BookingPriceCard className={at.topLeft} />
        <PillCard className={at.bottomRight} icon="dot" text="Deposit paid online · £50" />
      </PhotoPanel>
    ),
  },
  sounds: {
    title: "Does this sound like your practice?",
    lines: [
      {
        Icon: Receipt,
        text: "Patients ask what they'll pay, and your current system was never built to show private prices.",
      },
      {
        Icon: PhoneCall,
        text: "Private patients expect to book online at any time, not phone during your opening hours.",
      },
      {
        Icon: CalendarX,
        text: "A missed appointment now costs you directly, so you need a fair policy patients actually see.",
      },
    ],
  },
  story: {
    title: "Your first week",
    highlight: "as a private practice",
    intro: "Here's how a practice moving to private care gets set up with DentDock.",
    stops: [
      {
        time: "Day 1",
        title: "Add your private prices",
        body: "Add treatments from ready-made templates, each with its own price and length, and choose which need a deposit.",
        visual: (
          <PillCard className="relative" icon="dot" text="Check-up £55 · Hygiene £75 added" />
        ),
      },
      {
        time: "Day 1",
        title: "Bring your patients across",
        body: "Upload your patient list as a CSV. DentDock matches the columns and brings recall dates with it.",
        visual: (
          <PillCard className="relative" icon="refresh" text="patients.csv · columns matched" />
        ),
      },
      {
        time: "Day 2",
        title: "Set a fair cancellation policy",
        body: "Choose how much notice you need and your fees. Patients see them before they book, and NHS patients are never charged.",
        visual: (
          <PillCard className="relative" icon="bell" text="Free cancellation up to 48 hours" />
        ),
      },
      {
        time: "Day 2",
        title: "Your booking page goes live",
        body: "Put the link on your website and Google profile. Patients see your prices and book times that are really free.",
        visual: <BookingPriceCard className="relative" />,
      },
      {
        time: "Day 3",
        title: "Reminders start running",
        body: "Every booking gets reminders 72 hours, 24 hours and 2 hours before, so fewer private appointments are missed.",
        visual: <ReminderTimelineCard className="relative" />,
      },
    ],
  },
  controls: {
    title: "Built for private fees",
    intro: "These are real DentDock settings for a practice moving to private care.",
    link: { label: "See payments and deposits", to: "/features/payments" },
    groups: [
      {
        group: "Prices",
        items: [
          { label: "Shown on your booking page", value: "Every treatment" },
          { label: "Deposit on whitening", value: "£50" },
        ],
      },
      {
        group: "Cancellations",
        items: [
          { label: "Free cancellation up to", value: "48 hours before" },
          { label: "Missed appointment fee", value: "£40" },
        ],
      },
      {
        group: "NHS patients",
        items: [{ label: "Marked as NHS", value: "Never charged fees" }],
      },
    ],
  },
  calculator: <SpendCalculator />,
  features: {
    title: "The features",
    highlight: "you'll use most",
    items: [featurePages.booking, featurePages.payments, featurePages.switching],
  },
  faq: [
    {
      question: "Can we still see some NHS patients?",
      answer:
        "Yes, but DentDock doesn't do NHS claims, UDAs or banding, so you'd keep your NHS system for claims. Mark NHS patients in DentDock and they're never charged cancellation fees.",
    },
    {
      question: "Can patients see our private prices?",
      answer:
        "Yes. Your booking page shows every treatment with its price, and treatments that need a deposit are labelled.",
    },
    {
      question: "Do you help with the move?",
      answer:
        "Yes. You upload your patient list as a CSV and DentDock matches the columns. If you'd like a hand, message us on WhatsApp.",
    },
    {
      question: "Does DentDock do membership plans?",
      answer:
        "Not yet. Membership plans are planned and listed as coming soon on our pricing page.",
    },
    {
      question: "Is there a contract?",
      answer: "No. £49 a month per practice, no setup fees, and you can cancel any time.",
    },
  ],
};

export const Route = createFileRoute("/solutions/going-private")({
  component: () => <SolutionStoryPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Software for dental practices going private | DentDock",
      description:
        "Moving your dental practice to private care? Show your prices, take deposits, set a fair cancellation policy and take online bookings. £49 a month, no contract.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Going private", path: PATH },
      ],
      faq: content.faq,
    }),
});
