import { createFileRoute } from "@tanstack/react-router";
import { Ban, MessageSquareWarning, PhoneOff } from "lucide-react";
import { PhotoPanel } from "@/components/site/ui";
import { solutionPhotos } from "@/components/site/solutionPages";
import { templateHead } from "@/components/site/templates";
import {
  Calculator,
  SolutionStoryPage,
  at,
  money,
  type SolutionStoryContent,
} from "@/components/site/solutionTemplates";
import { PillCard } from "@/components/site/cards";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (problem): Deposits and late cancellations.
 * Checked against the app on 12 Nov 2026: deposits per treatment, paid by card through the practice's own
 * Stripe account when patients book online, slot held for 10 minutes while they pay (built; switched on per
 * practice before launch, Hariss keeps deposit claims); a line above the booking button shows the late-
 * cancellation and missed-appointment fees; patients can cancel online at any time, a cancel inside the
 * window is marked late and the portal warns of the fee; fees are never charged automatically: staff send a
 * fee link, refund anything paid above the fee, or waive; a deposit counts towards the fee; NHS-marked
 * patients are never charged; receipts numbered in order.
 * Photo (Unsplash, free licence): XH2JFgT4Abc.
 */

const PATH = "/solutions/deposits-and-late-cancellations";

const content: SolutionStoryContent = {
  path: PATH,
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Deposits and late cancellations", to: PATH },
    ],
    title: "Deposits and fair fees,",
    highlight: "without the awkward calls",
    intro:
      "Ask for a deposit on the treatments you choose, show your cancellation policy before patients book, and decide each fee case by case.",
    visual: (
      <PhotoPanel {...solutionPhotos.deposits}>
        <PillCard className={at.topLeft} icon="dot" text="Deposit paid online · £50" />
        <PillCard
          className={at.bottomRight}
          icon="refresh"
          text="Late cancellation · fee covered"
        />
      </PhotoPanel>
    ),
  },
  sounds: {
    title: "Does this sound like your practice?",
    lines: [
      {
        Icon: Ban,
        text: "Patients book long, valuable appointments and don't turn up, with nothing paid up front.",
      },
      {
        Icon: MessageSquareWarning,
        text: "Your cancellation policy is on a sign in reception, so patients say they never saw it.",
      },
      {
        Icon: PhoneOff,
        text: "Chasing a missed-appointment fee over the phone is awkward, so in practice it rarely happens.",
      },
    ],
  },
  story: {
    title: "Follow one booking",
    highlight: "with a deposit",
    intro:
      "Here's what happens when Ella books a whitening appointment for Thursday, then cancels late.",
    stops: [
      {
        time: "Mon 19:20",
        title: "Ella books and pays a deposit",
        body: "Whitening needs a £50 deposit, shown before she books. She pays by card, and the slot is held while she pays.",
        visual: <PillCard className="relative" icon="dot" text="Deposit paid online · £50" />,
      },
      {
        time: "Mon 19:20",
        title: "Your policy is shown up front",
        body: "Above the booking button she sees your fees: a late cancellation is £20, a missed appointment £40.",
        visual: (
          <PillCard className="relative" icon="bell" text="Late cancellation £20 · missed £40" />
        ),
      },
      {
        time: "Wed 16:10",
        title: "Ella cancels late",
        body: "She cancels online 22 hours before, inside your 48-hour window. The portal warns her a fee may apply.",
        visual: (
          <PillCard className="relative" icon="refresh" text="Late cancellation · Thu 14:00" />
        ),
      },
      {
        time: "Wed 16:15",
        title: "Your team decides",
        body: "DentDock lists it for your team. The deposit already counts towards the £20 fee, so you can keep the fee and refund the rest, or waive it.",
        visual: (
          <PillCard className="relative" icon="bell" text="Fee to decide · deposit £50 paid" />
        ),
      },
      {
        time: "Wed 16:18",
        title: "The rest goes back to Ella",
        body: "Your team refunds £30 through your own Stripe account. The refund gets its own numbered receipt.",
        visual: <PillCard className="relative" icon="dot" text="Refund £30 · receipt R-00052" />,
      },
    ],
  },
  controls: {
    title: "You set the policy",
    intro:
      "Choose which treatments need a deposit and what you charge. Fees are never taken automatically.",
    link: { label: "See payments and deposits", to: "/features/payments" },
    groups: [
      {
        group: "Deposits",
        items: [
          { label: "Whitening", value: "£50" },
          { label: "Composite bonding", value: "£60" },
        ],
      },
      {
        group: "Cancellations",
        items: [
          { label: "Free cancellation up to", value: "48 hours before" },
          { label: "Late cancellation fee", value: "£20" },
          { label: "Missed appointment fee", value: "£40" },
        ],
      },
      {
        group: "Payments",
        items: [{ label: "Paid into", value: "Your own Stripe account" }],
      },
    ],
  },
  calculator: (
    <Calculator
      title="What do late cancellations cost?"
      intro="Count the late cancellations and missed appointments you don't charge for today, and the fee you'd set."
      sliders={[
        { key: "count", label: "Late or missed a week", min: 0, max: 20, start: 2 },
        { key: "fee", label: "Your fee", min: 10, max: 150, step: 5, start: 40, money: true },
        { key: "weeks", label: "Weeks open a year", min: 40, max: 52, start: 48 },
      ]}
      results={(v) => [
        { label: "Fees you don't charge", value: money((v.count * v.fee * v.weeks) / 12) },
        { label: "Charging just one a week", value: money((v.fee * v.weeks) / 12), accent: true },
        { label: "DentDock costs", value: "£49" },
      ]}
      note="Use judgement: indemnity bodies advise against charging a patient who missed for a genuine reason."
    />
  ),
  features: {
    title: "The features",
    highlight: "behind it",
    items: [featurePages.payments, featurePages.booking, featurePages.reports],
  },
  faq: [
    {
      question: "Can we take a deposit when patients book online?",
      answer:
        "Yes, on the treatments you choose. Patients pay by card through your own Stripe account, and the slot is held for them while they pay.",
    },
    {
      question: "Are fees charged automatically?",
      answer:
        "No. DentDock lists each late cancellation and missed appointment, and your team decides: send a fee link, refund anything paid above the fee, or waive it.",
    },
    {
      question: "Can we charge NHS patients a fee?",
      answer: "Not in England. Mark NHS patients in DentDock and they're never charged a fee.",
    },
    {
      question: "Do patients see our policy before they book?",
      answer:
        "Yes. A line above the booking button shows your late-cancellation and missed-appointment fees, and the portal warns patients if they cancel inside your window.",
    },
    {
      question: "Where does the money go?",
      answer:
        "Straight to your practice's own Stripe account. Stripe's fees apply, and DentDock takes no cut.",
    },
  ],
};

export const Route = createFileRoute("/solutions/deposits-and-late-cancellations")({
  component: () => <SolutionStoryPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental deposits and late cancellation fees | DentDock",
      description:
        "Take deposits on chosen treatments, show your cancellation policy before patients book, and decide each late-cancellation fee case by case. £49 a month.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Deposits and late cancellations", path: PATH },
      ],
      faq: content.faq,
    }),
});
