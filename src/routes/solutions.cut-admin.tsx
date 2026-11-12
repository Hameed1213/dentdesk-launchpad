import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, PhoneCall, Wallet } from "lucide-react";
import { PhotoPanel } from "@/components/site/ui";
import { templateHead } from "@/components/site/templates";
import {
  Calculator,
  SolutionStoryPage,
  at,
  money,
  On,
  type SolutionStoryContent,
} from "@/components/site/solutionTemplates";
import { MedicalHistoryCard, PillCard } from "@/components/site/cards";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (problem): Cut admin and phone time.
 * Checked against the app on 12 Nov 2026: online booking with prices and a health form inside the
 * booking; one confirmation with any forms; recalls go out within the practice's sending hours (default
 * 10:00 to 19:00) with a booking link; patients rearrange from the portal (outside the late window);
 * payment links marked paid automatically; form reminder the day before, and chases 3 days apart for
 * forms sent on their own. Texts are one-way (no shared inbox for replies).
 * Photo (Unsplash, free licence): iNiGA6063y8.
 */

const PATH = "/solutions/cut-admin";

const content: SolutionStoryContent = {
  path: PATH,
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Cut admin and phone time", to: PATH },
    ],
    title: "Less time on the phone,",
    highlight: "more time for patients",
    intro:
      "Online booking, forms before the visit, reminders, recalls and payment links that run themselves, so your team isn't stuck chasing.",
    visual: (
      <PhotoPanel
        src="/images/home/practice-laptop.webp"
        alt="Practice manager working on a laptop at her desk"
        height={933}
        position="object-[70%_40%]"
      >
        <PillCard className={at.topLeft} icon="dot" text="Booked online · no call needed" />
        <PillCard className={at.bottomLeft} icon="bell" text="Recalls sent for you" />
      </PhotoPanel>
    ),
  },
  sounds: {
    title: "Does this sound like your practice?",
    lines: [
      {
        Icon: PhoneCall,
        text: "The phone rings all morning with bookings, changes and questions, and the queue never ends.",
      },
      {
        Icon: ClipboardList,
        text: "Forms, reminders and recalls are still sent by hand, one patient at a time, when someone has a minute.",
      },
      {
        Icon: Wallet,
        text: "Someone spends hours every week chasing payments, forms and patients who haven't replied.",
      },
    ],
  },
  story: {
    title: "A morning",
    highlight: "that runs itself",
    intro: "Here's what DentDock handles before your team has even put the kettle on.",
    stops: [
      {
        time: "07:45",
        title: "A new patient books before you open",
        body: "She picks hygiene at £75 on your booking page, then fills in and signs her health form as part of the booking.",
        visual: <MedicalHistoryCard className="relative" />,
      },
      {
        time: "07:46",
        title: "One confirmation, forms included",
        body: "She gets one message with her appointment details and a link to view or change it. No follow-up call needed.",
        visual: <PillCard className="relative" icon="dot" text="Booking confirmed · forms done" />,
      },
      {
        time: "10:00",
        title: "Recalls go out on their own",
        body: "Patients who are due get a recall with a link to book. Anyone who has already booked isn't chased.",
        visual: <PillCard className="relative" icon="bell" text="Recall reminders sent" />,
      },
      {
        time: "10:15",
        title: "A patient rearranges online",
        body: "He moves his appointment from the portal, with no password and no phone call.",
        visual: (
          <PillCard className="relative" icon="refresh" text="Rearranged online · Fri 11:30" />
        ),
      },
      {
        time: "11:40",
        title: "A payment comes in",
        body: "A patient pays the link your team sent yesterday. The visit is marked paid and the receipt is numbered for you.",
        visual: <PillCard className="relative" icon="dot" text="Payment link paid · £120" />,
      },
      {
        time: "12:00",
        title: "Forms chase themselves",
        body: "Anyone who hasn't filled in their form gets a reminder the day before their appointment.",
        visual: <PillCard className="relative" icon="bell" text="Form reminder sent" />,
      },
    ],
  },
  controls: {
    title: "Set it once, then it runs",
    intro:
      "These are real DentDock settings. Switch on what suits your practice and change them whenever you like.",
    link: { label: "See online booking", to: "/features/online-booking" },
    groups: [
      {
        group: "Booking",
        items: [
          { label: "Patients can book online", value: <On /> },
          { label: "Health form inside the booking", value: <On /> },
        ],
      },
      {
        group: "Messages",
        items: [
          { label: "Appointment reminders", value: <On /> },
          { label: "Recall follow-ups", value: "Up to 5" },
          { label: "Form reminders", value: <On /> },
        ],
      },
    ],
  },
  calculator: (
    <Calculator
      title="How much time goes on the phone?"
      intro="Count the calls your team handles each week for bookings, changes, reminders and chasing. Everything here is your own figure."
      sliders={[
        { key: "calls", label: "Calls a week", min: 0, max: 300, step: 5, start: 80 },
        { key: "mins", label: "Minutes per call", min: 1, max: 15, start: 4 },
        {
          key: "rate",
          label: "Hourly cost of your team",
          min: 10,
          max: 30,
          start: 13,
          money: true,
        },
      ]}
      results={(v) => {
        const hours = (v.calls * v.mins * 52) / 12 / 60;
        return [
          { label: "Time on the phone", value: `${Math.round(hours)} hours` },
          { label: "Cost of that time", value: money(hours * v.rate), accent: true },
          { label: "DentDock costs", value: "£49" },
        ];
      }}
      note="Not every call can be replaced. Patients still ring for advice and emergencies."
    />
  ),
  features: {
    title: "The features",
    highlight: "behind it",
    items: [featurePages.booking, featurePages.forms, featurePages.payments],
  },
  faq: [
    {
      question: "Can patients book without phoning?",
      answer:
        "Yes. Your booking page shows your treatments, prices and the times that are really free, at any time of day.",
    },
    {
      question: "Can patients change their own appointments?",
      answer:
        "Yes, from the portal, with a link sent to their email and no password. Inside your late-cancellation window they can still cancel, but rearranging asks them to call you.",
    },
    {
      question: "Do forms chase themselves?",
      answer:
        "Yes. A form sent with a booking gets a reminder the day before the appointment, and a form sent on its own gets two reminders, three days apart.",
    },
    {
      question: "Do recalls send themselves?",
      answer:
        "Yes. Recalls go out within your sending hours with a booking link, follow up if the patient doesn't book, and stop as soon as they do.",
    },
    {
      question: "Can patients reply to texts?",
      answer:
        "Not yet. Texts are one-way, and each one includes a link to view or change the appointment.",
    },
  ],
};

export const Route = createFileRoute("/solutions/cut-admin")({
  component: () => <SolutionStoryPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Cut dental reception admin and phone time | DentDock",
      description:
        "Online booking, forms before the visit, automatic reminders and recalls, and payment links, so your practice team spends less time on the phone. £49 a month.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Cut admin and phone time", path: PATH },
      ],
      faq: content.faq,
    }),
});
