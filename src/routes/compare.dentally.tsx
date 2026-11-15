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

/* DentDock vs Dentally. Text kept from the original page; layout from the shared compare template. */

const PATH = "/compare/dentally";

const categories: CompareCategory[] = [
  {
    title: "Patient booking",
    rows: [
      { feature: "Online booking page", dentDock: yes(), them: yes("Essentials+ only") },
      { feature: "Patient self-reschedule via link", dentDock: yes(), them: yes() },
      { feature: "Patient self-cancel via link", dentDock: yes(), them: yes() },
      { feature: "Patient portal", dentDock: yes(), them: yes("Dentally Portal") },
      {
        feature: "Booking source tracked automatically",
        dentDock: yes(),
        them: no("Not specified"),
      },
      {
        feature: "Custom booking domain",
        dentDock: no("On the roadmap"),
        them: yes("Pro tier only"),
      },
    ],
  },
  {
    title: "Patient communications",
    rows: [
      { feature: "Automated SMS + email reminders", dentDock: yes(), them: yes() },
      { feature: "Pre-built automation flows", dentDock: yes("Ready-made on signup"), them: no() },
      { feature: "SMS sender shows practice name", dentDock: yes(), them: yes() },
      { feature: "Two-way SMS inbox", dentDock: no(), them: yes() },
      { feature: "Internal team chat", dentDock: no("On the roadmap"), them: yes() },
      { feature: "Marketing vs transactional consent classifier", dentDock: yes(), them: yes() },
    ],
  },
  {
    title: "Forms",
    rows: [
      { feature: "Digital forms", dentDock: yes(), them: yes("Essentials+ only") },
      { feature: "Pre-built dental templates", dentDock: yes(), them: yes() },
      { feature: "Digital signature capture", dentDock: yes(), them: yes("Essentials+ only") },
      { feature: "Conditional logic", dentDock: yes(), them: yes("Essentials+ only") },
      { feature: "Auto-sync answers to patient record", dentDock: yes(), them: yes() },
    ],
  },
  {
    title: "Recalls",
    rows: [
      { feature: "Recall list view", dentDock: yes(), them: yes() },
      { feature: "5-step automated cascade", dentDock: yes(), them: no() },
      { feature: "Per-service recall intervals", dentDock: yes(), them: yes() },
      { feature: "Quiet hours for sends", dentDock: yes(), them: yes() },
      { feature: "Recall effectiveness analytics", dentDock: yes(), them: yes() },
    ],
  },
  {
    title: "Payments",
    rows: [
      { feature: "Send payment links", dentDock: yes(), them: yes() },
      { feature: "Late-cancellation fees", dentDock: yes(), them: yes() },
      { feature: "Patient receipts", dentDock: yes(), them: yes() },
      { feature: "Deposit collection at booking", dentDock: yes(), them: yes("Essentials+ only") },
    ],
  },
  {
    title: "Clinical",
    rows: [
      { feature: "Tooth / perio chart", dentDock: no(), them: yes() },
      { feature: "Treatment plan builder", dentDock: no(), them: yes() },
      { feature: "AI clinical note transcription", dentDock: no(), them: yes("Essentials+ only") },
      { feature: "Imaging integration", dentDock: no(), them: yes("Pro tier only") },
    ],
  },
  {
    title: "NHS and multi-site",
    rows: [
      { feature: "NHS UDA / FP17 management", dentDock: no(), them: yes() },
      { feature: "NHS number capture", dentDock: yes("Field only"), them: yes() },
      { feature: "Multi-site practice management", dentDock: no("On the roadmap"), them: yes() },
    ],
  },
  {
    title: "Support",
    rows: [
      { feature: "WhatsApp support line", dentDock: yes(), them: no() },
      { feature: "Email support", dentDock: yes(), them: yes() },
      { feature: "Phone support", dentDock: no("On the roadmap"), them: yes("Essentials+ only") },
      { feature: "Chat support", dentDock: yes("By WhatsApp"), them: yes() },
      { feature: "Customer success manager", dentDock: no(), them: yes("Essentials+ only") },
    ],
  },
];

const content: CompareContent = {
  path: PATH,
  name: "Dentally",
  intro:
    "DentDock is dental practice software for single-site UK private practices. Dentally is the UK market leader in cloud dental practice software. Compare price, features, and fit",
  photo: {
    src: "/images/pages/empty-surgery.webp",
    alt: "Bright, modern dental surgery",
    height: 936,
    position: "object-[50%_50%]",
  },
  price: { main: "£125–£220+", sub: "per month, ex VAT" },
  pills: ["WhatsApp support vs ticket queue", "Booking included vs not"],
  fitThem: [
    "NHS, mixed and private practices of every size",
    "Full clinical charting and treatment plans",
    "NHS UDA contracts and FP17 claims",
    "Multi-site practices and dental groups",
    "Imaging integration and AI clinical notes",
  ],
  fitThemNote: "£125 to start, £220 for online booking.",
  verified: "Verified against dentally.com on 15 May 2026.",
  categories,
  disclaimer:
    "Last verified 15 May 2026. Dentally pricing and feature information is taken from dentally.com and correct to the best of our knowledge. Dentally and Dentally Vision are trade marks of Henry Schein One UK Ltd. DentDock is not affiliated with or endorsed by Dentally or Henry Schein One. Spotted an inaccuracy? Email hello@dentdock.co.uk. DentDock is a trading name of Paradigm Network Ltd, registered in England & Wales.",
};

export const Route = createFileRoute("/compare/dentally")({
  component: () => <ComparePage c={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "DentDock vs Dentally: pricing and features (2026)",
      description:
        "An honest comparison of DentDock and Dentally for UK private dental practices. Pricing from £49 vs £125+, features, support and when each is the right fit.",
      crumbs: [
        { name: "Compare", path: "/compare" },
        { name: "DentDock vs Dentally", path: PATH },
      ],
      faq: compareFaq,
    }),
});
