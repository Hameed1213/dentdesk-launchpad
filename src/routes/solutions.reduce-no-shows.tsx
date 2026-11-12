import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import {
  NoShowCalculator,
  On,
  SolutionStoryPage,
  type SolutionStoryContent,
} from "@/components/site/solutionTemplates";
import { FillSlotCard, PillCard, TextMessageCard } from "@/components/site/cards";
import { PhotoPanel } from "@/components/site/ui";
import { CalendarX, Clock, PhoneCall } from "lucide-react";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (problem): Reduce no-shows, "follow one appointment" layout.
 * Product claims checked against the app on 12 Nov 2026: booking confirmation with a link;
 * reminders 72h/24h/2h (a late booking only gets the reminders still to come); patients cancel from
 * the link with no password; the team is notified of online cancellations; Fill this slot suggests
 * waitlist and recall patients and staff send the offer; first to book gets the slot; free-cancellation
 * window and fees are practice settings, shown before booking; fees decided by staff; NHS-marked
 * patients never charged; online waitlist sign-up is a setting.
 */

const PATH = "/solutions/reduce-no-shows";

const content: SolutionStoryContent = {
  path: PATH,
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Reduce no-shows", to: PATH },
    ],
    title: "A cancelled appointment",
    highlight: "shouldn't mean an empty chair",
    intro:
      "DentDock reminds every patient, makes it easy to cancel in time, and helps you hand the slot to someone who wants it.",
    visual: (
      <PhotoPanel
        src="/images/pages/empty-surgery.webp"
        alt="An empty dental chair in a modern surgery"
        height={936}
        position="object-[50%_55%]"
      >
        <TextMessageCard
          className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10"
          when="Sent 72 hours before"
        />
        <PillCard
          className="absolute right-2 sm:right-3 lg:-right-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="Slot refilled from the waitlist"
        />
      </PhotoPanel>
    ),
  },
  sounds: {
    title: "Does this sound like your practice?",
    lines: [
      {
        Icon: CalendarX,
        text: "Your system sends reminders, but patients still forget, and there's no easy way for them to cancel.",
      },
      {
        Icon: Clock,
        text: "When someone cancels, the slot sits empty because there's no quick way to find someone to fill it.",
      },
      {
        Icon: PhoneCall,
        text: "Reception still spends hours on the phone confirming, rebooking and chasing.",
      },
    ],
  },
  story: {
    title: "Follow one appointment",
    highlight: "from booking to chair",
    intro: "Here's what happens when Sarah books a check-up for Thursday, then can't make it.",
    stops: [
      {
        time: "Mon 09:14",
        title: "Sarah books online",
        body: "She picks a check-up for Thursday at 10:30. A confirmation goes straight away, with a link to view or change it.",
        visual: <PillCard className="relative" icon="dot" text="Booking confirmed · Thu 10:30" />,
      },
      {
        time: "Mon 10:30",
        title: "The first reminder goes",
        body: "72 hours before, Sarah gets a reminder by her preferred channel. Nobody at the practice sends a thing.",
        visual: <TextMessageCard className="relative" when="Sent 72 hours before" />,
      },
      {
        time: "Mon 12:40",
        title: "Sarah cancels from the link",
        body: "No phone call and no password. It's more than 48 hours before, so there's no fee, and your team is told straight away.",
        visual: (
          <PillCard
            className="relative"
            icon="refresh"
            text="Sarah M. cancelled online · Thu 10:30"
          />
        ),
      },
      {
        time: "Mon 12:45",
        title: "DentDock suggests who could take it",
        body: "Fill this slot lists patients on your waitlist, longest waiting first, plus patients due a recall. Your team offers it in a couple of clicks.",
        visual: <FillSlotCard className="relative" />,
      },
      {
        time: "Mon 13:20",
        title: "James books the slot",
        body: "He taps the offer link and books Thursday at 10:30. The first patient to book gets the slot.",
        visual: <PillCard className="relative" icon="dot" text="Booked by James T. · Thu 10:30" />,
      },
      {
        time: "Thu 10:27",
        title: "James is in the chair",
        body: "He got his 24-hour and 2-hour reminders too. The slot that would have sat empty is filled.",
        visual: <PillCard className="relative" icon="dot" text="James T. has arrived · 10:27" />,
      },
    ],
  },
  controls: {
    title: "You set the rules",
    intro:
      "These are real DentDock settings. Change any of them whenever you like, and patients see your policy before they book.",
    groups: [
      {
        group: "Reminders",
        items: [
          { label: "72 hours before", value: <On /> },
          { label: "24 hours before", value: <On /> },
          { label: "2 hours before", value: <On /> },
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
        group: "Waitlist",
        items: [{ label: "Patients can join online", value: <On /> }],
      },
    ],
  },
  calculator: <NoShowCalculator />,
  features: {
    title: "The features",
    highlight: "behind it",
    items: [featurePages.reminders, featurePages.payments, featurePages.reports],
  },
  faq: [
    {
      question: "Can a private dental practice charge for a missed appointment?",
      answer:
        "Yes, as long as your fee policy is clear and patients know about it before they book. There's no fixed legal amount, but the fee should be reasonable. DentDock shows your fees above the booking button, and your team decides each case: send a fee link or waive it.",
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
      question: "Is the cancelled slot offered automatically?",
      answer:
        "Not on its own. DentDock suggests the best patients for the slot and your team sends the offer in a couple of clicks. The first patient to book from the link gets it.",
    },
  ],
};

export const Route = createFileRoute("/solutions/reduce-no-shows")({
  component: () => <SolutionStoryPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "How to reduce dental no-shows and FTAs | DentDock",
      description:
        "Reminders before every appointment, an easy way for patients to cancel, and a waitlist to refill the gap. Work out what no-shows cost your practice. £49 a month.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Reduce no-shows", path: PATH },
      ],
      faq: content.faq,
    }),
});
