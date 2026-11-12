/* The list of published guides, used by the /guides hub and the Resources menu. */
export type GuideMeta = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  minutes: number;
  updated: string;
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
  },
];
