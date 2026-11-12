import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { ProblemPage, templateHead, type ProblemContent } from "@/components/site/templates";
import {
  FeeDecisionCard,
  FillSlotCard,
  PillCard,
  ReminderTimelineCard,
  TextMessageCard,
} from "@/components/site/cards";

/*
 * Solutions page (problem): Reduce no-shows.
 * Facts are linked to their sources. Product claims checked against the app on 12 Nov 2026:
 * fees are decided by staff per visit (payment link or waive), deposits count towards the fee,
 * NHS-marked patients are never charged a fee, the fee line shows above the booking button,
 * free-cancellation window options (up to the appointment, 2, 12, 24, 48, 72 hours),
 * staff-sent waitlist offers, no-show and cancellation rates in Reports.
 * Photos (Unsplash, free licence): e7MJLM5VGjY, eL4xIEuHzzk, iNiGA6063y8, h8uuH7h17Ds.
 */

const PATH = "/solutions/reduce-no-shows";

const content: ProblemContent = {
  hero: {
    title: "Fewer empty chairs from",
    highlight: "patients who don't turn up",
    intro:
      "Reminders before every appointment, an easy way for patients to cancel in time, and a waitlist to refill the gap. Plus a clear fee policy, shown to patients before they book.",
    secondary: { label: "See reminders and recalls", to: "/features/reminders-and-recalls" },
    visual: (
      <PhotoPanel
        src="/images/pages/empty-surgery.webp"
        alt="An empty, modern dental surgery"
        height={936}
        position="object-[50%_50%]"
      >
        <PillCard
          className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10"
          icon="refresh"
          text="Cancelled 3 days ahead · slot offered"
        />
        <PillCard
          className="absolute right-2 sm:right-3 lg:-right-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="Rebooked from the waitlist"
        />
      </PhotoPanel>
    ),
  },
  challenge: {
    title: "Every missed appointment is",
    highlight: "time you can't sell again",
    paragraphs: [
      "When a patient doesn't turn up, the chair, the clinician and the nurse are all paid for and nothing comes back. In a private practice that's lost fee income, and by the time you notice, it's usually too late to fill the gap by phone.",
      "A worked example: the CMA found a routine private check-up cost £55 on average in 2024. One missed check-up a day, four days a week, over 50 working weeks is £11,000 a year, before you count longer treatment appointments. (The days and weeks are our assumptions; use your own.)",
      "Most missed appointments aren't deliberate. Patients forget, or mean to cancel and never get round to phoning. That's why reminders and an easy way to cancel do most of the work, and a fair fee policy handles the rest.",
    ],
    facts: [
      {
        figure: "78.6% vs 67.8%",
        text: "Attendance with text reminders against no reminder, across 8 trials and 6,615 people. Texts worked as well as phone calls and cost less per attended appointment.",
        source: {
          label: "Cochrane review CD007458 (2013)",
          url: "https://www.cochrane.org/evidence/CD007458_mobile-phone-messaging-reminders-attendance-healthcare-appointments",
        },
      },
      {
        figure: "23.9% to 10.4%",
        text: "Failed-to-attend rate at a UK dental children's clinic after it started sending a text reminder 24 hours before, compared with the year before.",
        source: {
          label: "Foley & O'Neill, Eur Arch Paediatr Dent (2009)",
          url: "https://read.qxmd.com/read/19254521/",
        },
      },
      {
        figure: "£55",
        text: "Average price of a routine private check-up in 2024, and £80 for a new-patient consultation.",
        source: {
          label: "Competition and Markets Authority (March 2026)",
          url: "https://www.gov.uk/government/news/cma-launches-review-of-private-dentistry",
        },
      },
    ],
  },
  rows: [
    {
      title: "Remind patients before every appointment",
      lead: "Most missed appointments are forgotten ones. DentDock sends, on its own:",
      points: [
        "A reminder 72 hours, 24 hours and 2 hours before each confirmed appointment",
        "By text or email, whichever the patient prefers",
        "A link to cancel or rearrange, so patients don't have to phone",
        "Your own wording, kept to a service message with no promotions",
      ],
      link: { label: "See reminders and recalls", to: "/features/reminders-and-recalls" },
      visual: (
        <PhotoPanel
          src="/images/home/patient-booking.webp"
          alt="Woman smiling while looking at her phone"
          height={933}
          position="object-[50%_40%]"
        >
          <TextMessageCard
            className="absolute right-2 sm:right-3 lg:-right-6 bottom-4 sm:bottom-6 lg:bottom-10"
            when="Sent 72 hours before"
          />
          <ReminderTimelineCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10" />
        </PhotoPanel>
      ),
    },
    {
      title: "Refill the slot when someone cancels",
      lead: "A cancellation with notice is a slot you can still fill:",
      points: [
        "Patients cancel online in seconds, any time of day, so you hear sooner",
        "Fill this slot suggests up to 10 matching patients from your waitlist, plus patients due a recall",
        "Offer the slot by text or email in a couple of clicks",
        "The first patient to tap the link books it, even at short notice",
      ],
      visual: (
        <PhotoPanel
          src="/images/home/practice-laptop.webp"
          alt="Practice manager working on a laptop at her desk"
          height={933}
          position="object-[70%_40%]"
        >
          <FillSlotCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10" />
        </PhotoPanel>
      ),
    },
    {
      title: "A fair fee policy, applied case by case",
      lead: "For the patients who still miss appointments:",
      points: [
        "Choose how much notice you need: up to the appointment, or 2, 12, 24, 48 or 72 hours",
        "Set a late-cancellation fee and a missed-appointment fee, shown to patients before they book",
        "Decide for each missed visit: send a payment link or waive the fee",
        "A deposit already paid counts towards the fee, and patients marked as NHS are never charged",
      ],
      link: { label: "See pricing", to: "/pricing" },
      visual: (
        <PhotoPanel
          src="/images/pages/reception-payment.webp"
          alt="Receptionist at a front desk while a patient pays by card"
          height={933}
          position="object-[15%_40%]"
        >
          <FeeDecisionCard className="absolute right-2 sm:right-3 lg:-right-6 top-4 sm:top-6 lg:top-10" />
        </PhotoPanel>
      ),
    },
  ],
  checklist: {
    title: "A no-show checklist for",
    highlight: "private practices",
    intro: "What works, roughly in the order we'd do it.",
    items: [
      {
        title: "Remind patients at 72 hours, 24 hours and 2 hours",
        body: "Three reminders catch the patients who forget, and the 72-hour one leaves you time to refill the slot if they cancel.",
      },
      {
        title: "Make cancelling easy",
        body: "A link in the reminder beats asking patients to phone during opening hours. A cancellation two days out is a slot you can still sell.",
      },
      {
        title: "Write a clear failure-to-attend policy",
        body: "Say how much notice you need, what you charge and when you'll waive it, and tell patients when they book. The DDU advises explaining your fees and fee policy at the earliest opportunity.",
      },
      {
        title: "Use judgement on fees",
        body: "Dental Protection warns against billing a patient who missed for a genuine reason, such as a bereavement. Decide each case on its merits.",
      },
      {
        title: "Keep a waitlist",
        body: "Patients who want an earlier appointment are the quickest way to refill a gap. Let them join online.",
      },
      {
        title: "Know your NHS rules",
        body: "If you also see NHS patients in England, the NHS contract doesn't allow you to charge them for missed appointments. Mark them as NHS in DentDock and they're never charged a fee.",
      },
      {
        title: "Check your numbers every month",
        body: "DentDock's reports show your no-show and cancellation rates, so you can see whether the changes are working.",
      },
    ],
  },
  related: {
    title: "Keep",
    highlight: "the diary full",
    items: [
      {
        title: "Reminders and recalls",
        body: "Reminder times, recall follow-ups and the waitlist in detail.",
        to: "/features/reminders-and-recalls",
      },
      {
        title: "Private practices",
        body: "Online booking with your prices, deposits, payments and reports.",
        to: "/solutions/private-practices",
      },
      {
        title: "Pricing",
        body: "£49 a month per practice, with 200 texts a month included.",
        to: "/pricing",
      },
    ],
  },
  faq: [
    {
      question: "Can a private dental practice charge for a missed appointment?",
      answer:
        "Yes, as long as your fee policy is clear and patients know about it before they book. There's no fixed legal amount, but the fee should be reasonable. DentDock shows your late-cancellation and missed-appointment fees on the booking page, above the booking button.",
    },
    {
      question: "Can we charge NHS patients for missed appointments?",
      answer:
        "Not in England: the NHS contract doesn't allow charging NHS patients for missed appointments. Mark NHS patients in DentDock and they're never charged a fee.",
    },
    {
      question: "How much notice should we ask for?",
      answer:
        "Many practices ask for 24 or 48 hours, which leaves time to offer the slot to someone else. In DentDock you choose the free-cancellation window: up to the appointment, or 2, 12, 24, 48 or 72 hours.",
    },
    {
      question: "Should we take a deposit?",
      answer:
        "Deposits help most for longer or higher-value appointments. In DentDock you can ask for a deposit on chosen treatments when patients book online, paid by card, and any deposit already paid counts towards a late-cancellation or missed-appointment fee.",
    },
    {
      question: "Do text reminders actually reduce no-shows?",
      answer:
        "The evidence says yes. A Cochrane review of 8 trials found attendance of 78.6% with text reminders against 67.8% with none, and texts worked as well as phone calls for less cost.",
    },
    {
      question: "What should a failure-to-attend policy include?",
      answer:
        "How much notice you need to cancel or rearrange, what you charge for late cancellations and missed appointments, when you'll waive a fee, how patients can cancel, and what happens if someone misses appointments repeatedly. Share it at booking and on your website.",
    },
    {
      question: "Can we stop booking patients who keep missing appointments?",
      answer:
        "Many private practices say in their policy that repeated missed appointments may mean they can't offer further bookings. Apply it fairly and consistently, and check with your indemnity provider before you rely on it.",
    },
  ],
};

export const Route = createFileRoute("/solutions/reduce-no-shows")({
  component: () => <ProblemPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "How to reduce dental no-shows and FTAs | DentDock",
      description:
        "Missed appointments cost private practices real money. See the evidence on reminders, set a fair cancellation policy, and refill gaps from a waitlist with DentDock. £49 a month.",
      crumbs: [{ name: "Reduce no-shows", path: PATH }],
      faq: content.faq,
    }),
});
