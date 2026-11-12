import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import {
  ProblemSolutionPage,
  type ProblemSolutionContent,
} from "@/components/site/solutionTemplates";
import {
  FeeDecisionCard,
  FillSlotCard,
  PillCard,
  ReminderTimelineCard,
} from "@/components/site/cards";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (problem): Reduce no-shows.
 * Facts are linked to their sources. Product claims checked against the app on 12 Nov 2026:
 * reminders 72h/24h/2h with a cancel/rearrange link in the 72h and 24h ones; staff-sent waitlist
 * offers (first to book gets the slot); free-cancellation window (up to the appointment, 2, 12, 24,
 * 48, 72 hours); fees shown above the booking button and decided by staff (fee link or waive);
 * deposits count towards a fee; NHS-marked patients are never charged; no-show and cancellation
 * rates in Reports.
 * Photo (Unsplash, free licence): e7MJLM5VGjY.
 */

const PATH = "/solutions/reduce-no-shows";

const content: ProblemSolutionContent = {
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Reduce no-shows", to: PATH },
    ],
    title: "Fewer empty chairs from",
    highlight: "patients who don't turn up",
    intro:
      "Reminders before every appointment, an easy way for patients to cancel in time, and a waitlist to refill the gap.",
    photo: {
      src: "/images/pages/empty-surgery.webp",
      alt: "An empty, modern dental surgery",
      height: 936,
      position: "object-[50%_55%]",
    },
    cards: (
      <>
        <PillCard
          className="absolute left-2 sm:left-6 lg:-left-6 top-6 sm:top-10"
          icon="refresh"
          text="Cancelled 3 days ahead · slot offered"
        />
        <PillCard
          className="absolute right-2 sm:right-6 lg:-right-6 bottom-6 sm:bottom-10"
          icon="dot"
          text="Rebooked from the waitlist"
        />
      </>
    ),
  },
  cost: {
    title: "Every missed appointment is",
    highlight: "time you can't sell again",
    intro:
      "One missed £55 check-up a day, four days a week, is about £11,000 a year (our assumptions: 4 days, 50 weeks). Most aren't deliberate: patients forget, or mean to cancel and never phone.",
    facts: [
      {
        figure: "78.6% vs 67.8%",
        text: "Attendance with text reminders against no reminder, across 8 trials and 6,615 people. Texts worked as well as phone calls.",
        source: {
          label: "Cochrane review CD007458 (2013)",
          url: "https://www.cochrane.org/evidence/CD007458_mobile-phone-messaging-reminders-attendance-healthcare-appointments",
        },
      },
      {
        figure: "23.9% to 10.4%",
        text: "Failed-to-attend rate at a UK dental clinic after it started sending a text 24 hours before, compared with the year before.",
        source: { label: "Foley & O'Neill (2009)", url: "https://read.qxmd.com/read/19254521/" },
      },
      {
        figure: "£55",
        text: "Average price of a routine private check-up in 2024, and £80 for a new-patient consultation.",
        source: {
          label: "Competition and Markets Authority (2026)",
          url: "https://www.gov.uk/government/news/cma-launches-review-of-private-dentistry",
        },
      },
    ],
  },
  beforeAfter: {
    title: "What changes",
    highlight: "with DentDock",
    without: [
      "Reminders sent by hand, when someone remembers",
      "Patients have to phone to cancel, so many don't",
      "A cancelled slot sits empty",
      "Fees applied inconsistently, or not at all",
    ],
    withDentDock: [
      "Reminders 72, 24 and 2 hours before, sent for you",
      "A link to cancel or rearrange in the reminder",
      "Waitlist patients offered the slot in a couple of clicks",
      "Fees shown before booking, decided case by case",
    ],
  },
  fixes: {
    title: "Three ways DentDock",
    highlight: "fills the diary",
    items: [
      {
        title: "Remind every patient",
        body: "Reminders go out 72 hours, 24 hours and 2 hours before each confirmed appointment, by text or email.",
        visual: <ReminderTimelineCard className="relative" />,
        link: { label: "Reminders and recalls", to: "/features/reminders-and-recalls" },
      },
      {
        title: "Refill the gap",
        body: "When someone cancels, DentDock suggests waitlist patients and patients due a recall. The first to tap the link books it.",
        visual: <FillSlotCard className="relative" />,
        link: { label: "See the waitlist", to: "/features/reminders-and-recalls" },
      },
      {
        title: "A fair fee policy",
        body: "Set your notice period and fees. For each missed visit, send a fee link or waive it. NHS patients are never charged.",
        visual: <FeeDecisionCard className="relative" />,
        link: { label: "Payments and deposits", to: "/features/payments" },
      },
    ],
  },
  checklist: {
    title: "A no-show checklist for",
    highlight: "private practices",
    intro: "What works, roughly in the order we'd do it.",
    items: [
      {
        title: "Remind patients at 72 hours, 24 hours and 2 hours",
        body: "Three reminders catch the patients who forget, and the 72-hour one leaves time to refill the slot if they cancel.",
      },
      {
        title: "Make cancelling easy",
        body: "A link in the reminder beats asking patients to phone during opening hours. A cancellation two days out is a slot you can still sell.",
      },
      {
        title: "Write a clear failure-to-attend policy",
        body: "Say how much notice you need, what you charge and when you'll waive it, and tell patients when they book. The DDU advises explaining your fees at the earliest opportunity.",
      },
      {
        title: "Use judgement on fees",
        body: "Dental Protection warns against billing a patient who missed for a genuine reason, such as a bereavement.",
      },
      {
        title: "Keep a waitlist",
        body: "Patients who want an earlier appointment are the quickest way to refill a gap. Let them join online.",
      },
      {
        title: "Check your numbers every month",
        body: "DentDock's reports show your no-show and cancellation rates, so you can see whether the changes are working.",
      },
    ],
  },
  features: {
    title: "Features that",
    highlight: "make it work",
    items: [featurePages.reminders, featurePages.payments, featurePages.reports],
  },
  faq: [
    {
      question: "Can a private dental practice charge for a missed appointment?",
      answer:
        "Yes, as long as your fee policy is clear and patients know about it before they book. There's no fixed legal amount, but the fee should be reasonable. DentDock shows your late-cancellation and missed-appointment fees above the booking button.",
    },
    {
      question: "Can we charge NHS patients for missed appointments?",
      answer:
        "Not in England: the NHS contract doesn't allow it. Mark NHS patients in DentDock and they're never charged a fee.",
    },
    {
      question: "How much notice should we ask for?",
      answer:
        "Many practices ask for 24 or 48 hours, which leaves time to offer the slot to someone else. In DentDock you choose: up to the appointment, or 2, 12, 24, 48 or 72 hours.",
    },
    {
      question: "Do text reminders actually reduce no-shows?",
      answer:
        "The evidence says yes. A Cochrane review of 8 trials found attendance of 78.6% with text reminders against 67.8% with none, and texts worked as well as phone calls for less cost.",
    },
    {
      question: "What should a failure-to-attend policy include?",
      answer:
        "How much notice you need, what you charge for late cancellations and missed appointments, when you'll waive a fee, how patients can cancel, and what happens after repeated missed appointments. Share it at booking and on your website.",
    },
  ],
};

export const Route = createFileRoute("/solutions/reduce-no-shows")({
  component: () => <ProblemSolutionPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "How to reduce dental no-shows and FTAs | DentDock",
      description:
        "Missed appointments cost private practices real money. See the evidence on reminders, set a fair cancellation policy, and refill gaps from a waitlist with DentDock. £49 a month.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Reduce no-shows", path: PATH },
      ],
      faq: content.faq,
    }),
});
