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

/* DentDock vs iSmile. Text kept from the original page; layout from the shared compare template. */

const PATH = "/compare/ismile-dental-software";

const categories: CompareCategory[] = [
  {
    title: "Patient booking",
    rows: [
      { feature: "Online booking page", dentDock: yes(), them: yes("Via Patient App") },
      {
        feature: "Patient self-reschedule via link",
        dentDock: yes(),
        them: yes("Via Patient App"),
      },
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
      { feature: "Automated SMS + email reminders", dentDock: yes(), them: yes() },
      {
        feature: "Pre-built automation flows",
        dentDock: yes("Ready-made on signup"),
        them: no("Manual configuration"),
      },
      { feature: "SMS sender shows practice name", dentDock: yes(), them: yes() },
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
      { feature: "Digital forms", dentDock: yes(), them: yes("Via Patient App") },
      { feature: "Pre-built dental templates", dentDock: yes(), them: no("Build your own") },
      { feature: "Digital signature capture", dentDock: yes(), them: yes("Via Patient App") },
      { feature: "Conditional logic", dentDock: yes(), them: no("Not specified") },
      {
        feature: "Auto-sync answers to patient record",
        dentDock: yes(),
        them: yes("Via Patient App"),
      },
    ],
  },
  {
    title: "Recalls",
    rows: [
      { feature: "Recall list view", dentDock: yes(), them: yes() },
      { feature: "5-step automated cascade", dentDock: yes(), them: yes("7-step recall manager") },
      { feature: "Per-service recall intervals", dentDock: yes(), them: yes() },
      { feature: "Quiet hours for sends", dentDock: yes(), them: no("Not specified") },
      { feature: "Recall effectiveness analytics", dentDock: yes(), them: yes() },
    ],
  },
  {
    title: "Payments",
    rows: [
      { feature: "Send payment links", dentDock: yes(), them: yes("Via Patient App") },
      { feature: "Late-cancellation fees", dentDock: yes(), them: no("Not specified") },
      { feature: "Patient receipts", dentDock: yes(), them: yes() },
      { feature: "Deposit collection at booking", dentDock: yes(), them: no("Not specified") },
    ],
  },
  {
    title: "Clinical",
    rows: [
      { feature: "Tooth / perio chart", dentDock: no(), them: yes() },
      { feature: "Treatment plan builder", dentDock: no(), them: yes() },
      { feature: "AI clinical note transcription", dentDock: no(), them: no("Not specified") },
      { feature: "Imaging integration", dentDock: no(), them: yes("Free with X-ray kit") },
    ],
  },
  {
    title: "NHS and multi-site",
    rows: [
      { feature: "NHS UDA / FP17 management", dentDock: no(), them: yes() },
      { feature: "NHS number capture", dentDock: yes("Field only"), them: yes() },
      {
        feature: "Multi-site practice management",
        dentDock: no("On the roadmap"),
        them: yes("Used by corporate groups"),
      },
    ],
  },
  {
    title: "Support",
    rows: [
      { feature: "WhatsApp support line", dentDock: yes(), them: no() },
      { feature: "Email support", dentDock: yes(), them: yes() },
      { feature: "Phone support", dentDock: no("On the roadmap"), them: yes() },
      { feature: "Chat support", dentDock: yes("By WhatsApp"), them: no("Not specified") },
      { feature: "Dedicated consultant", dentDock: no(), them: yes("One assigned per practice") },
      { feature: "Customer success manager", dentDock: no(), them: yes() },
    ],
  },
];

const content: CompareContent = {
  path: PATH,
  name: "iSmile",
  intro:
    "DentDock is dental practice software for single-site UK private practices. iSmile is UK-built dental practice software used by individual practices and corporate groups. Compare features, fit and approach.",
  photo: {
    src: "/images/home/dentist-patient.webp",
    alt: "Dentist talking with a smiling patient in a modern surgery",
    height: 1050,
    position: "object-[45%_50%]",
  },
  price: { main: "Pricing not listed", sub: "demo and quote required" },
  pills: ["Published price vs sales call", "WhatsApp support vs phone consultant"],
  fitThem: [
    "Individual practices and corporate groups of every size",
    "Full clinical charting and treatment planning",
    "Cosmetic charting (Botox, dermal filler, PRP)",
    "Imaging integration and waiting room screens",
    "Practices that want a dedicated phone consultant",
  ],
  fitThemNote: "Pricing not publicly listed.",
  verified: "Verified against ismiledental.co.uk on 17 May 2026.",
  categories,
  disclaimer:
    "Last verified 17 May 2026. iSmile feature information is taken from ismiledental.co.uk and correct to the best of our knowledge. iSmile pricing is not publicly listed. iSmile Dental Software is a trade name of its respective owner. DentDock is not affiliated with or endorsed by iSmile Dental Software. Spotted an inaccuracy? Email hello@dentdock.co.uk. DentDock is a trading name of Paradigm Network Ltd, registered in England & Wales.",
};

export const Route = createFileRoute("/compare/ismile-dental-software")({
  component: () => <ComparePage c={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "DentDock vs iSmile Dental Software (2026)",
      description:
        "DentDock vs iSmile Dental Software for UK private practices: published £49/mo pricing, online booking, reminders, recalls and forms, set up without a demo.",
      crumbs: [
        { name: "Compare", path: "/compare" },
        { name: "DentDock vs iSmile", path: PATH },
      ],
      faq: compareFaq,
    }),
});
