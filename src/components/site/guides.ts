/* The list of published guides, used by the /guides hub, the Resources menu and the guide layout. */

/** A DentDock page a guide is about: shown beside and below the guide instead of share buttons. */
export type GuideProductLink = {
  kind: "Solution" | "Feature";
  title: string;
  body: string;
  to: string;
  image: string;
  alt: string;
};

export type GuideMeta = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  minutes: number;
  updated: string;
  /** Topic line above the title, joined with " · ". */
  topics: string[];
  /** One-sentence intro under the title. */
  lead: string;
  /** Ends the band heading "See how DentDock handles ...". */
  handles: string;
  /** The DentDock pages this guide is about. The first two show in the sidebar; all show below. */
  product: GuideProductLink[];
};

export const guides: GuideMeta[] = [
  {
    slug: "missed-appointment-fees",
    title: "Can a private dentist charge for a missed appointment?",
    summary:
      "Deposits and late-cancellation fees in UK private dentistry: what's allowed, how to tell patients, when to waive a fee, and a policy template you can adapt.",
    topic: "Cancellations and fees",
    minutes: 7,
    updated: "12 November 2026",
    topics: ["Cancellations and fees", "Private practice"],
    lead: "Deposits and late-cancellation fees in UK private dentistry: what's allowed, how to tell patients, when to waive a fee, and a policy template you can adapt.",
    handles: "cancellations and fees",
    product: [
      {
        kind: "Solution",
        title: "Deposits and late cancellations",
        body: "Deposits on the treatments you choose, and fees your team decides case by case.",
        to: "/solutions/deposits-and-late-cancellations",
        image: "/images/solutions/deposits.webp",
        alt: "Patient paying by card on a card reader",
      },
      {
        kind: "Feature",
        title: "Payments and deposits",
        body: "Payment links, deposits and fair fees through your own Stripe account.",
        to: "/features/payments",
        image: "/images/pages/hero-payments.webp",
        alt: "Receptionist at a dental front desk while a patient pays by phone",
      },
      {
        kind: "Solution",
        title: "Reduce no-shows",
        body: "Reminders before every appointment, an easy way to cancel, and a waitlist to refill the gap.",
        to: "/solutions/reduce-no-shows",
        image: "/images/solutions/no-shows.webp",
        alt: "An empty dental chair in a clean, modern surgery",
      },
    ],
  },
];
