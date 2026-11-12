import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, MailX, Star } from "lucide-react";
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
import { PillCard } from "@/components/site/cards";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (problem): Bring patients back (recalls and reviews).
 * Checked against the app on 12 Nov 2026: recall date set when a check-up or hygiene visit is completed
 * (patient, treatment or practice interval); 5 recall steps (4 weeks before, 2 weeks before, 1 week before,
 * 1 week after, 4 weeks after), three on by default (4 weeks before, 1 week before, 1 week overdue); recalls
 * include a booking link, skip patients with an upcoming booking, skip Sundays and bank holidays; Google
 * review request is a manual tick in Finish visit, needs the practice's review link and the patient's
 * marketing consent. Dates below are real weekdays in 2026.
 * Photo (Unsplash, free licence): Bd0RmCsJOCc.
 */

const PATH = "/solutions/bring-patients-back";

const content: SolutionStoryContent = {
  path: PATH,
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Bring patients back", to: PATH },
    ],
    title: "Bring patients back",
    highlight: "when they're due",
    intro:
      "Recalls set themselves when a visit is completed and follow up until patients book. And you can send happy patients your Google review link.",
    visual: (
      <PhotoPanel {...solutionPhotos.bringBack}>
        <PillCard className={at.topRight} icon="bell" text="Recall due · reminder sent" />
        <PillCard className={at.bottomLeft} icon="dot" text="Booked from the recall link" />
      </PhotoPanel>
    ),
  },
  sounds: {
    title: "Does this sound like your practice?",
    lines: [
      {
        Icon: CalendarClock,
        text: "Patients drift past their recall date, and nobody notices until they've been gone for months.",
      },
      {
        Icon: MailX,
        text: "Recall letters and texts go out in batches, whenever someone finally has the time to send them.",
      },
      {
        Icon: Star,
        text: "Happy patients never leave a Google review, simply because nobody remembers to ask them.",
      },
    ],
  },
  story: {
    title: "Follow one patient",
    highlight: "back to the chair",
    intro: "Here's what happens after Amelia's check-up in March.",
    stops: [
      {
        time: "Sat 14 Mar",
        title: "Her check-up is completed",
        body: "When the visit is finished, her next recall is set for six months, from her own interval or your practice default.",
        visual: <PillCard className="relative" icon="dot" text="Recall set · due 14 Sep" />,
      },
      {
        time: "Sat 14 Mar",
        title: "Your team sends a review link",
        body: "She was happy with her visit, so your team ticks Review request when finishing it. It goes because she's agreed to hear from you.",
        visual: <PillCard className="relative" icon="bell" text="Google review link sent" />,
      },
      {
        time: "Mon 17 Aug",
        title: "The first recall goes",
        body: "Four weeks before she's due, Amelia gets a recall with a link to book.",
        visual: (
          <PillCard className="relative" icon="bell" text="Recall reminder · 4 weeks before" />
        ),
      },
      {
        time: "Mon 7 Sep",
        title: "A follow-up, a week before",
        body: "She hasn't booked yet, so DentDock follows up. Recalls skip Sundays and bank holidays.",
        visual: (
          <PillCard className="relative" icon="bell" text="Recall follow-up · 1 week before" />
        ),
      },
      {
        time: "Mon 7 Sep",
        title: "Amelia books online",
        body: "She taps the link and books her check-up. The follow-ups stop straight away.",
        visual: <PillCard className="relative" icon="dot" text="Booked from the recall link" />,
      },
    ],
  },
  controls: {
    title: "Recalls your way",
    intro:
      "Set your intervals and choose which follow-ups go out. These are real DentDock settings.",
    link: { label: "See reminders and recalls", to: "/features/reminders-and-recalls" },
    groups: [
      {
        group: "Intervals",
        items: [
          { label: "Practice default", value: "6 months" },
          { label: "Per treatment and per patient", value: "Your choice" },
        ],
      },
      {
        group: "Follow-ups",
        items: [
          { label: "4 weeks before", value: <On /> },
          { label: "1 week before", value: <On /> },
          { label: "1 week overdue", value: <On /> },
        ],
      },
      {
        group: "Reviews",
        items: [{ label: "Google review link", value: "Added in Settings" }],
      },
    ],
  },
  calculator: (
    <Calculator
      title="What are overdue patients worth?"
      intro="Count the patients who go past their recall date each month without booking."
      sliders={[
        { key: "overdue", label: "Overdue patients a month", min: 0, max: 100, start: 20 },
        {
          key: "value",
          label: "Value of a check-up",
          min: 20,
          max: 200,
          step: 5,
          start: 55,
          money: true,
        },
        { key: "share", label: "Share you bring back (%)", min: 5, max: 50, step: 5, start: 20 },
      ]}
      results={(v) => [
        { label: "Overdue patients are worth", value: money(v.overdue * v.value) },
        {
          label: `Bringing back ${v.share}%`,
          value: money((v.overdue * v.value * v.share) / 100),
          accent: true,
        },
        { label: "DentDock costs", value: "£49" },
      ]}
      note="Based on one check-up each. Most patients also book hygiene and treatment, which isn't counted here."
    />
  ),
  features: {
    title: "The features",
    highlight: "behind it",
    items: [featurePages.reminders, featurePages.booking, featurePages.reports],
  },
  faq: [
    {
      question: "How are recall dates set?",
      answer:
        "When a check-up or hygiene visit is completed, from the patient's own interval, the treatment's interval or your practice default. Your team can also set recalls by hand.",
    },
    {
      question: "How many follow-ups are sent?",
      answer:
        "Up to five, from four weeks before the due date to four weeks after. Three are on to start with: four weeks before, one week before and one week overdue.",
    },
    {
      question: "Do patients who've already booked still get recalls?",
      answer: "No. A recall is skipped if the patient already has an upcoming booking.",
    },
    {
      question: "Are Google review requests sent automatically?",
      answer:
        "No. Your team ticks Review request when finishing a visit. It needs your review link in Settings and the patient's agreement to hear from you.",
    },
    {
      question: "How often should patients be recalled?",
      answer:
        "NICE guidance (CG19) sets check-up intervals by risk: 3 to 24 months for adults and no more than 12 months for under-18s.",
    },
  ],
};

export const Route = createFileRoute("/solutions/bring-patients-back")({
  component: () => <SolutionStoryPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental recalls and Google reviews | DentDock",
      description:
        "Recalls that set themselves and follow up until patients book, plus Google review links. See what overdue patients are worth. £49 a month.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Bring patients back", path: PATH },
      ],
      faq: content.faq,
    }),
});
