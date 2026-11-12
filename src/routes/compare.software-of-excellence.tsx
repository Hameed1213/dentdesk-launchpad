import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import {
  ComparePage,
  compareFaq,
  no,
  yes,
  type CompareCategory,
  type CompareContent,
} from "@/components/site/compareTemplate";

/* DentDock vs Software of Excellence. Text kept from the original page; layout from the shared compare template. */

const PATH = "/compare/software-of-excellence";

const categories: CompareCategory[] = [
  {
    title: "Patient booking",
    rows: [
      { feature: "Online booking page", dentDock: yes(), them: yes("Online Booking module") },
      { feature: "Patient self-reschedule via link", dentDock: yes(), them: no("Not specified") },
      { feature: "Patient self-cancel via link", dentDock: yes(), them: no("Not specified") },
      { feature: "Patient portal", dentDock: yes(), them: yes("Patient Portal") },
      {
        feature: "Booking source tracked automatically",
        dentDock: yes(),
        them: no("Not specified"),
      },
      {
        feature: "Custom booking domain",
        dentDock: no("On the roadmap"),
        them: no("Not specified"),
      },
    ],
  },
  {
    title: "Patient communications",
    rows: [
      {
        feature: "Automated SMS + email reminders",
        dentDock: yes(),
        them: yes("Automated Reminders"),
      },
      {
        feature: "Pre-built automation flows",
        dentDock: yes("Ready-made on signup"),
        them: no("Customer Success Consultant configures"),
      },
      { feature: "SMS sender shows practice name", dentDock: yes(), them: no("Not specified") },
      { feature: "Two-way SMS inbox", dentDock: no(), them: no("Not specified") },
      { feature: "Internal team chat", dentDock: no("On the roadmap"), them: no("Not specified") },
      {
        feature: "Marketing vs transactional consent classifier",
        dentDock: yes(),
        them: no("Not specified"),
      },
    ],
  },
  {
    title: "Forms",
    rows: [
      { feature: "Digital forms", dentDock: yes(), them: yes("Via Clinipad") },
      { feature: "Pre-built dental templates", dentDock: yes(), them: no("Build your own") },
      { feature: "Digital signature capture", dentDock: yes(), them: yes("Via Clinipad") },
      { feature: "Conditional logic", dentDock: yes(), them: no("Not specified") },
      {
        feature: "Auto-sync answers to patient record",
        dentDock: yes(),
        them: yes("Via Clinipad"),
      },
    ],
  },
  {
    title: "Recalls",
    rows: [
      { feature: "Recall list view", dentDock: yes(), them: yes() },
      {
        feature: "5-step automated cascade",
        dentDock: yes(),
        them: yes("Automated Recall Manager"),
      },
      { feature: "Per-service recall intervals", dentDock: yes(), them: yes("Customisable") },
      { feature: "Quiet hours for sends", dentDock: yes(), them: no("Not specified") },
      { feature: "Recall effectiveness analytics", dentDock: yes(), them: yes("MyPractice Cloud") },
    ],
  },
  {
    title: "Payments",
    rows: [
      { feature: "Send payment links", dentDock: yes(), them: no("Not specified") },
      { feature: "Late-cancellation fees", dentDock: yes(), them: no("Not specified") },
      { feature: "Patient receipts", dentDock: yes(), them: no("Not specified") },
      { feature: "Deposit collection at booking", dentDock: yes(), them: no("Not specified") },
    ],
  },
  {
    title: "Clinical",
    rows: [
      { feature: "Tooth / perio chart", dentDock: no(), them: yes() },
      { feature: "Treatment plan builder", dentDock: no(), them: yes("Care Manager") },
      {
        feature: "AI clinical note transcription",
        dentDock: no(),
        them: yes("Pearl Second Opinion AI"),
      },
      { feature: "Imaging integration", dentDock: no(), them: yes("Examine Pro") },
    ],
  },
  {
    title: "NHS and multi-site",
    rows: [
      { feature: "NHS UDA / FP17 management", dentDock: no(), them: yes("Predictive UDA Manager") },
      { feature: "NHS number capture", dentDock: yes("Field only"), them: yes() },
      {
        feature: "Multi-site practice management",
        dentDock: no("On the roadmap"),
        them: yes("Dedicated multi-site solution"),
      },
    ],
  },
  {
    title: "Support",
    rows: [
      { feature: "WhatsApp support line", dentDock: yes(), them: no() },
      { feature: "Email support", dentDock: yes(), them: yes() },
      { feature: "Phone support", dentDock: no("On the roadmap"), them: yes() },
      { feature: "Chat support", dentDock: yes("By WhatsApp"), them: yes("Live chat") },
      { feature: "Dedicated consultant", dentDock: no(), them: yes("Customer Success Consultant") },
      {
        feature: "Customer success manager",
        dentDock: no(),
        them: yes("Customer Success Programme"),
      },
    ],
  },
];

const content: CompareContent = {
  path: PATH,
  name: "Software of Excellence",
  intro:
    "DentDock is dental practice software for single-site UK private practices. Software of Excellence is the UK's longest-established dental practice management system. Compare features, fit and approach.",
  photo: {
    src: "/images/home/practice-laptop.webp",
    alt: "Practice manager working on a laptop at her desk",
    height: 933,
    position: "object-[70%_40%]",
  },
  price: { main: "Pricing not listed", sub: "sales quote required" },
  pills: ["Published price vs sales call", "Sign up online vs demo first"],
  fitThem: [
    "NHS, mixed and private practices of every size",
    "Full clinical charting, treatment plans and imaging",
    "NHS UDA contracts and FP17 claims",
    "Multi-site practices and dental groups",
    "Dedicated Customer Success Consultant per practice",
  ],
  fitThemNote: "Pricing not publicly listed.",
  verified: "Verified against softwareofexcellence.com on 17 May 2026.",
  categories,
  disclaimer:
    "Last verified 17 May 2026. Software of Excellence feature information is taken from softwareofexcellence.com and correct to the best of our knowledge. Software of Excellence pricing is not publicly listed. EXACT and Software of Excellence are trade marks of Henry Schein One UK Ltd. DentDock is not affiliated with or endorsed by Software of Excellence or Henry Schein One. Spotted an inaccuracy? Email hello@dentdock.co.uk. DentDock is a trading name of Paradigm Network Ltd, registered in England & Wales.",
};

export const Route = createFileRoute("/compare/software-of-excellence")({
  component: () => <ComparePage c={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "DentDock vs Software of Excellence (2026)",
      description:
        "An honest comparison of DentDock and Software of Excellence (EXACT) for UK private practices. Compare features, support, transparency and approach.",
      crumbs: [
        { name: "Compare", path: "/compare" },
        { name: "DentDock vs Software of Excellence", path: PATH },
      ],
      faq: compareFaq,
    }),
});
