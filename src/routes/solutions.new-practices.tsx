import { createFileRoute } from "@tanstack/react-router";
import { FileSignature, Rocket, Wallet } from "lucide-react";
import { PhotoPanel } from "@/components/site/ui";
import { solutionPhotos } from "@/components/site/solutionPages";
import { templateHead } from "@/components/site/templates";
import {
  SolutionStoryPage,
  at,
  On,
  type SolutionStoryContent,
} from "@/components/site/solutionTemplates";
import { BookingPriceCard, PillCard } from "@/components/site/cards";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (practice type): New practices.
 * Checked against the app on 12 Nov 2026: 8-step setup, any step skippable; treatments from templates
 * with prices; clinician hours; booking page link to share; payments (Stripe) can be connected later;
 * practice can add Google Analytics, Google Ads and Meta Pixel IDs, loaded only after patient cookie
 * consent; every online booking records its source, grouped by channel (e.g. Google Business Profile)
 * in the Marketing report; unlimited dentists and staff; no contract or setup fee.
 * Photo: Freepik (Magnific) free licence, credited in the footer.
 */

const PATH = "/solutions/new-practices";

const content: SolutionStoryContent = {
  path: PATH,
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "New practices", to: PATH },
    ],
    title: "Opening a new practice?",
    highlight: "Be ready for your first patient",
    intro:
      "Set up your diary, online booking, forms and reminders in a day, for £49 a month with no contract and no setup fees.",
    visual: (
      <PhotoPanel {...solutionPhotos.newPractices}>
        <PillCard className={at.topLeft} icon="dot" text="Booking page is live" />
        <PillCard className={at.bottomLeft} icon="dot" text="First booking · from Google" />
      </PhotoPanel>
    ),
  },
  sounds: {
    title: "Does this sound like your practice?",
    lines: [
      {
        Icon: Rocket,
        text: "You're juggling the fit-out, hiring and compliance, and software is one more big decision.",
      },
      {
        Icon: FileSignature,
        text: "Most practice systems want a long contract, a setup fee and weeks of onboarding calls.",
      },
      {
        Icon: Wallet,
        text: "Every pound counts before the diary fills up, so you can't afford to pay for software you don't use.",
      },
    ],
  },
  story: {
    title: "Your first day",
    highlight: "with DentDock",
    intro:
      "No kick-off calls and no site visits. Here's how a new practice goes from sign-up to its first online booking.",
    stops: [
      {
        time: "09:00",
        title: "Set up your practice",
        body: "Add your details and opening hours. Every step can be skipped and finished later.",
        visual: <PillCard className="relative" icon="dot" text="Smile Dental · details saved" />,
      },
      {
        time: "09:20",
        title: "Add treatments and prices",
        body: "Start from ready-made treatments, then set your own prices and appointment lengths.",
        visual: (
          <PillCard className="relative" icon="dot" text="Check-up £55 · Hygiene £75 added" />
        ),
      },
      {
        time: "10:00",
        title: "Add your team",
        body: "Add each clinician with their working hours. There's no charge per dentist or per user.",
        visual: <PillCard className="relative" icon="dot" text="Dr Patel and Dr Hughes added" />,
      },
      {
        time: "10:30",
        title: "Share your booking page",
        body: "Put the link on your website, Google Business Profile and social pages. Connect Stripe now or later.",
        visual: <BookingPriceCard className="relative" />,
      },
      {
        time: "11:00",
        title: "See where bookings come from",
        body: "Add your Google Analytics, Google Ads or Meta IDs if you use them. They only load once a patient accepts cookies.",
        visual: <PillCard className="relative" icon="bell" text="Booking sources recorded" />,
      },
      {
        time: "15:10",
        title: "Your first online booking",
        body: "A new patient finds you on Google and books a check-up. The Marketing report shows where they came from.",
        visual: (
          <PillCard className="relative" icon="dot" text="New booking · Google Business Profile" />
        ),
      },
    ],
  },
  controls: {
    title: "Ready from day one",
    intro: "These are real DentDock settings. Change them as the practice grows.",
    link: { label: "See switching and setup", to: "/features/switching" },
    groups: [
      {
        group: "Booking",
        items: [
          { label: "Patients can book online", value: <On /> },
          { label: "Prices on your booking page", value: "Every treatment" },
        ],
      },
      {
        group: "Marketing",
        items: [
          { label: "Booking sources", value: "Recorded" },
          { label: "Analytics and ad tags", value: "After consent" },
        ],
      },
      {
        group: "Payments",
        items: [{ label: "Stripe", value: "Connect now or later" }],
      },
    ],
  },
  calculator: null,
  features: {
    title: "The features",
    highlight: "new practices use most",
    items: [featurePages.booking, featurePages.reports, featurePages.calendar],
  },
  faq: [
    {
      question: "Is there a setup fee or contract?",
      answer:
        "No. £49 a month per practice, with unlimited dentists and staff, no setup fee and no contract.",
    },
    {
      question: "How quickly can we go live?",
      answer:
        "Most practices are set up within the day. Every step can be skipped and finished later, and everything can be changed afterwards.",
    },
    {
      question: "Do we need Stripe on day one?",
      answer:
        "No. You can skip payments during setup and connect your own Stripe account whenever you're ready.",
    },
    {
      question: "Can we see which marketing brings patients in?",
      answer:
        "Yes. Every online booking records where the patient came from, such as your Google profile, an ad or social post, and the Marketing report groups bookings by source.",
    },
    {
      question: "Does DentDock do NHS claims?",
      answer:
        "No. DentDock is built for private practices and doesn't include NHS claims, UDAs, charting or imaging.",
    },
  ],
};

export const Route = createFileRoute("/solutions/new-practices")({
  component: () => <SolutionStoryPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental software for new practices | DentDock",
      description:
        "Opening a new dental practice? Set up your diary, online booking, forms and reminders in a day. £49 a month, unlimited staff, no contract, no setup fee.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "New practices", path: PATH },
      ],
      faq: content.faq,
    }),
});
