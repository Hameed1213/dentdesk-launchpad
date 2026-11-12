import { createFileRoute } from "@tanstack/react-router";
import { CalendarX, ClipboardList, Clock } from "lucide-react";
import { PhotoPanel } from "@/components/site/ui";
import { solutionPhotos } from "@/components/site/solutionPages";
import { templateHead } from "@/components/site/templates";
import {
  Calculator,
  SolutionStoryPage,
  at,
  money,
  On,
  type SolutionStoryContent,
} from "@/components/site/solutionTemplates";
import { FillSlotCard, PillCard } from "@/components/site/cards";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (problem): Fill cancelled appointments.
 * Checked against the app on 12 Nov 2026: patients cancel from the reminder link (no password) and the team
 * is notified; Fill this slot suggests up to 10 matching waitlist entries, longest waiting first, plus
 * patients due a recall; staff send the offer by text or email; the offer doesn't hold the slot (first to
 * book gets it); the offer link can book inside the usual minimum notice; booking closes the waitlist entry
 * and notifies staff; patients can join the waitlist online if the practice switches it on, choosing
 * clinician or any, days, mornings/afternoons/evenings and how long they can wait.
 * Photo: Freepik (Magnific) free licence, credited in the footer.
 */

const PATH = "/solutions/fill-cancelled-appointments";

const content: SolutionStoryContent = {
  path: PATH,
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Fill cancelled appointments", to: PATH },
    ],
    title: "Cancelled slots,",
    highlight: "filled again",
    intro:
      "When a patient cancels, DentDock lines up the patients who want an earlier appointment, and your team offers the slot in a couple of clicks.",
    visual: (
      <PhotoPanel {...solutionPhotos.fillCancelled}>
        <PillCard className={at.topLeft} icon="bell" text="Earlier appointment offered" />
        <PillCard className={at.bottomLeft} icon="dot" text="Booked from the waitlist" />
      </PhotoPanel>
    ),
  },
  sounds: {
    title: "Does this sound like your practice?",
    lines: [
      {
        Icon: CalendarX,
        text: "A patient cancels and the slot sits empty, because nobody has time to ring round to fill it.",
      },
      {
        Icon: ClipboardList,
        text: "Your waitlist lives on a notepad or in someone's head, so the right patient is never to hand.",
      },
      {
        Icon: Clock,
        text: "Short-notice gaps are the hardest to fill, so most of them are simply lost for good.",
      },
    ],
  },
  story: {
    title: "Follow one cancellation",
    highlight: "to a full diary",
    intro:
      "Here's what happens when Tom cancels his Tuesday hygiene appointment first thing in the morning.",
    stops: [
      {
        time: "Tue 08:05",
        title: "Tom cancels online",
        body: "He uses the link in his reminder, with no phone call and no password. Your team is told straight away.",
        visual: (
          <PillCard
            className="relative"
            icon="refresh"
            text="Tom R. cancelled online · Tue 14:00"
          />
        ),
      },
      {
        time: "Tue 08:10",
        title: "DentDock suggests who could take it",
        body: "Fill this slot lists up to 10 matching patients from your waitlist, longest waiting first, plus patients due a recall.",
        visual: <FillSlotCard className="relative" />,
      },
      {
        time: "Tue 08:12",
        title: "Your team sends the offer",
        body: "Pick who to offer it to and send it by text or email, the way each patient prefers. It takes a couple of clicks.",
        visual: <PillCard className="relative" icon="bell" text="Offer sent to 2 patients" />,
      },
      {
        time: "Tue 08:31",
        title: "Priya books it",
        body: "She taps the link and books 14:00, even though it's short notice. The first patient to book gets the slot.",
        visual: <PillCard className="relative" icon="dot" text="Booked by Priya K. · Tue 14:00" />,
      },
      {
        time: "Tue 08:31",
        title: "The waitlist tidies itself",
        body: "Priya's waitlist entry is closed and your team is told, so nobody offers her the next gap by mistake.",
        visual: <PillCard className="relative" icon="dot" text="Priya K. taken off the waitlist" />,
      },
      {
        time: "Tue 13:55",
        title: "Priya is in the chair",
        body: "She got her 2-hour reminder too. A slot that would have sat empty is filled.",
        visual: <PillCard className="relative" icon="dot" text="Priya K. has arrived · 13:55" />,
      },
    ],
  },
  controls: {
    title: "Your team stays in control",
    intro: "Offers are only sent when your team chooses. Here's how the waitlist works.",
    link: { label: "See reminders and recalls", to: "/features/reminders-and-recalls" },
    groups: [
      {
        group: "Waitlist",
        items: [
          { label: "Patients can join online", value: <On /> },
          { label: "Patients choose", value: "Days, times, clinician" },
        ],
      },
      {
        group: "When a slot opens",
        items: [
          { label: "Suggested patients", value: "Up to 10" },
          { label: "Longest waiting", value: "Shown first" },
          { label: "Patients due a recall", value: "Included" },
        ],
      },
      {
        group: "Offers",
        items: [
          { label: "Sent by", value: "Text or email" },
          { label: "The slot goes to", value: "First to book" },
        ],
      },
    ],
  },
  calculator: (
    <Calculator
      title="What do empty slots cost your practice?"
      intro="Count the cancelled appointments you don't manage to fill. We've started at £55, the average private check-up in 2024 (Competition and Markets Authority)."
      sliders={[
        { key: "gaps", label: "Unfilled cancellations a week", min: 0, max: 20, start: 3 },
        {
          key: "value",
          label: "Average appointment value",
          min: 20,
          max: 300,
          step: 5,
          start: 55,
          money: true,
        },
        { key: "weeks", label: "Weeks open a year", min: 40, max: 52, start: 48 },
      ]}
      results={(v) => [
        { label: "Lost to empty slots", value: money((v.gaps * v.value * v.weeks) / 12) },
        { label: "Filling just one a week", value: money((v.value * v.weeks) / 12), accent: true },
        { label: "DentDock costs", value: "£49" },
      ]}
    />
  ),
  features: {
    title: "The features",
    highlight: "behind it",
    items: [featurePages.reminders, featurePages.calendar, featurePages.booking],
  },
  faq: [
    {
      question: "Is the cancelled slot offered automatically?",
      answer:
        "Not on its own. DentDock suggests the best patients for the slot and your team sends the offer in a couple of clicks, so you stay in control of who's offered what.",
    },
    {
      question: "Does an offer hold the slot for one patient?",
      answer:
        "No. The offer goes to the patients you choose, and the first to book from the link gets the slot.",
    },
    {
      question: "Can patients join the waitlist themselves?",
      answer:
        "Yes, if you switch it on. They choose a clinician or any, the days and times that suit them, and how long they can wait.",
    },
    {
      question: "Can a patient book a short-notice slot from an offer?",
      answer:
        "Yes. The offer link can book that slot even if it's inside the notice you'd normally ask for online.",
    },
    {
      question: "Who does DentDock suggest for a slot?",
      answer:
        "Up to 10 matching patients from your waitlist, longest waiting first, plus patients who are due a recall.",
    },
  ],
};

export const Route = createFileRoute("/solutions/fill-cancelled-appointments")({
  component: () => <SolutionStoryPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Fill cancelled dental appointments | DentDock",
      description:
        "When a patient cancels, DentDock suggests waitlist patients and patients due a recall, and your team offers the slot in a couple of clicks. £49 a month.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Fill cancelled appointments", path: PATH },
      ],
      faq: content.faq,
    }),
});
