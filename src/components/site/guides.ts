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
  /** Photo on the /guides card: its own photo in public/images/guides (with -640/-960 copies),
   *  not one used elsewhere on the site. */
  image: string;
  imageAlt: string;
};

export const guides: GuideMeta[] = [
  {
    slug: "switching-dental-software",
    title: "How to switch dental practice software: a UK checklist",
    summary:
      "A fair checklist for changing dental practice software in the UK: when it's worth it, what to ask any supplier, getting your data out, a migration timeline and old records.",
    topic: "Switching software",
    minutes: 10,
    updated: "27 November 2026",
    topics: ["Switching software", "Data and records"],
    lead: "A fair checklist for changing dental practice software in the UK: when it's worth it, what to ask any supplier, getting your data out, a migration timeline and old records.",
    handles: "switching and your data",
    // Unsplash zy_4YdLFYBY (free licence, Vitaly Gariev (@silverkblack)), picked 25 Nov 2026 for Hariss to confirm.
    image: "/images/guides/switching-dental-software.webp",
    imageAlt: "Man reading through paperwork at his desk beside a laptop",
    product: [
      {
        kind: "Feature",
        title: "Switching to DentDock",
        body: "Plan the move, bring your patients across with a CSV and go live when you're ready.",
        to: "/features/switching",
        image: "/images/pages/hero-switching.webp",
        alt: "Smiling dentist sitting by the dental chair",
      },
      {
        kind: "Feature",
        title: "Security and data",
        body: "Database and files in London, two-step login, per-screen access and a full export any time.",
        to: "/features/security",
        image: "/images/pages/hero-security.webp",
        alt: "Smiling dentist in his surgery",
      },
      {
        kind: "Feature",
        title: "Online booking and portal",
        body: "Patients book online, see your prices and manage their own appointments.",
        to: "/features/online-booking",
        image: "/images/pages/hero-booking.webp",
        alt: "Woman smiling as she uses her phone at home",
      },
    ],
  },
  {
    slug: "reminder-texts-pecr",
    title: "Can a dental practice text patients without consent?",
    summary:
      "Reminders, recalls and marketing texts under PECR and UK GDPR: what a UK dental practice can send without asking first, what needs consent, and how to keep it simple.",
    topic: "Texts and consent",
    minutes: 8,
    updated: "21 November 2026",
    topics: ["Texts and consent", "Reminders and recalls"],
    lead: "Reminders, recalls and marketing texts under PECR and UK GDPR: what a UK dental practice can send without asking first, what needs consent, and how to keep it simple.",
    handles: "reminders and recalls",
    // Unsplash rsbgKRJF8jk (free licence), picked 21 Nov 2026 for Hariss to confirm.
    image: "/images/guides/reminder-texts-pecr.webp",
    imageAlt: "Woman smiling as she reads a text on her phone at home",
    product: [
      {
        kind: "Feature",
        title: "Reminders and recalls",
        body: "Reminders before every appointment and recall follow-ups, from your practice's name.",
        to: "/features/reminders-and-recalls",
        image: "/images/pages/phone-reminder.webp",
        alt: "Woman smiling as she reads a message on her phone",
      },
      {
        kind: "Solution",
        title: "Reduce no-shows",
        body: "Reminders before every appointment, an easy way to cancel, and a waitlist to refill the gap.",
        to: "/solutions/reduce-no-shows",
        image: "/images/solutions/no-shows.webp",
        alt: "An empty dental chair in a clean, modern surgery",
      },
      {
        kind: "Solution",
        title: "Bring patients back",
        body: "Recalls that follow up, so patients due a check-up don't drift away.",
        to: "/solutions/bring-patients-back",
        image: "/images/solutions/bring-back.webp",
        alt: "Smiling young patient back in the dental chair",
      },
    ],
  },
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
    // Unsplash J_4x_oxWzo0 (free licence), chosen by Hariss on 20 Nov 2026.
    image: "/images/guides/missed-appointment-fees.webp",
    imageAlt: "Three empty armchairs in a waiting room",
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
