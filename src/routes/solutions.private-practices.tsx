import { createFileRoute } from "@tanstack/react-router";
import { templateHead } from "@/components/site/templates";
import {
  AudienceSolutionPage,
  type AudienceSolutionContent,
} from "@/components/site/solutionTemplates";
import {
  BookingPriceCard,
  MedicalHistoryCard,
  PillCard,
  TakingsCard,
} from "@/components/site/cards";
import { featurePages } from "@/components/site/featurePages";

/*
 * Solutions page (practice type): Private practices.
 * Product claims checked against the app on 12 Nov 2026: prices always shown on online booking,
 * forms and medical history during booking, portal (cancel, rearrange, forms, receipts; email link
 * sign-in), deposits per treatment via the practice's own Stripe, payment links, fee policy shown
 * before booking and decided by staff, reports (money taken by clinician, booking sources, no-show
 * and cancellation rates), accountant export. Not built: NHS claims, charting, imaging, multi-site,
 * membership plans.
 * Photo: Freepik (Magnific) free licence, credited in the footer.
 */

const PATH = "/solutions/private-practices";

const content: AudienceSolutionContent = {
  hero: {
    crumbs: [
      { label: "Solutions", to: "/solutions" },
      { label: "Private practices", to: PATH },
    ],
    title: "Practice software for",
    highlight: "UK private dental practices",
    intro:
      "Diary, online booking, reminders, recalls, forms and payments in one place. £49 a month per practice, no contract, and you can set it up yourself in a day.",
    photo: {
      src: "/images/pages/hero-calendar.webp",
      alt: "Dentist matching a shade guide for a smiling patient",
      height: 934,
      position: "object-[45%_35%]",
    },
    cards: (
      <>
        <BookingPriceCard className="absolute left-2 sm:left-6 lg:-left-6 top-6 sm:top-10" />
        <PillCard
          className="absolute right-2 sm:right-6 lg:-right-6 bottom-6 sm:bottom-10"
          icon="dot"
          text="Deposit paid online · £20"
        />
      </>
    ),
  },
  fit: {
    title: "Is DentDock right",
    highlight: "for your practice?",
    yesTitle: "A good fit if you",
    yes: [
      "Run a private practice, or you're moving that way",
      "Want patients to book online and see your prices",
      "Want reminders, recalls and forms to run without chasing",
      "Take deposits or charge for late cancellations",
      "Want one clear monthly price and no contract",
    ],
    noTitle: "Not the right fit yet if you need",
    no: [
      "NHS claims (FP17s), UDAs or banding",
      "Tooth charting or treatment plans",
      "X-ray and imaging integration",
      "One system across several sites (coming soon)",
      "Membership plans (coming soon)",
    ],
  },
  cost: {
    title: "Private dentistry is now",
    highlight: "most of the market",
    intro:
      "Practices that live on private fees need patients to book, turn up and pay, without the team spending the day on the phone. And with prices under review, being upfront matters more than ever.",
    facts: [
      {
        figure: "69%",
        text: "Private share of the UK high-street dentistry market by value in 2023/24, worth £12.16bn in total.",
        source: {
          label: "LaingBuisson (2025)",
          url: "https://www.laingbuisson.com/press-releases/the-uk-high-street-dentistry-market-value-rises-to-12-16-billion-as-continued-challenges-accessing-nhs-dentists-push-people-towards-private-dentistry-according-to-a-new-report-by-la/",
        },
      },
      {
        figure: "1 in 5",
        text: "People in Great Britain who used private dental care in 2024.",
        source: {
          label: "Competition and Markets Authority (2026)",
          url: "https://www.gov.uk/government/news/cma-launches-review-of-private-dentistry",
        },
      },
      {
        figure: "March 2026",
        text: "The CMA began reviewing private dentistry, including how clearly prices are shown to patients.",
        source: {
          label: "Competition and Markets Authority (2026)",
          url: "https://www.gov.uk/government/news/cma-launches-review-of-private-dentistry",
        },
      },
    ],
  },
  beforeAfter: {
    title: "What changes",
    highlight: "with DentDock",
    without: [
      "Prices only given over the phone",
      "Medical history on a clipboard in the waiting room",
      "Deposits and balances chased by phone",
      "Contracts, setup fees and a price you have to ask for",
    ],
    withDentDock: [
      "Prices shown on your online booking page",
      "Forms and medical history done before patients arrive",
      "Deposits and payment links through your own Stripe",
      "£49 a month per practice, no contract",
    ],
  },
  fixes: {
    title: "Built around",
    highlight: "how private practices work",
    items: [
      {
        title: "Online booking with your prices",
        body: "Patients pick a treatment, see the price and book a time that's really free, then manage it themselves.",
        visual: <BookingPriceCard className="relative" />,
        link: { label: "Online booking and portal", to: "/features/online-booking" },
      },
      {
        title: "Ready before they arrive",
        body: "Health forms are filled in and signed while patients book, and saved straight to their record.",
        visual: <MedicalHistoryCard className="relative" />,
        link: { label: "Forms and medical history", to: "/features/forms" },
      },
      {
        title: "Know your numbers",
        body: "Money taken by clinician, where your bookings come from, and an export for your accountant.",
        visual: <TakingsCard className="relative" />,
        link: { label: "Reports", to: "/features/reports" },
      },
    ],
  },
  steps: {
    title: "Switch in",
    highlight: "a single day",
    intro:
      "No kick-off calls and no site visits. Set it up yourself, with us on WhatsApp if you want a hand.",
    items: [
      {
        title: "Set up your practice",
        body: "Add your opening hours, treatments, prices and team. Reminders and recalls come ready with sensible wording.",
      },
      {
        title: "Bring your patients",
        body: "Export your patient list as a CSV from your current system and upload it. DentDock matches the columns for you.",
      },
      {
        title: "Go live",
        body: "Share your booking link on your website and Google profile, and let reminders and recalls start running.",
      },
    ],
  },
  features: {
    title: "Features private practices",
    highlight: "use most",
    items: [featurePages.booking, featurePages.payments, featurePages.reminders],
  },
  faq: [
    {
      question: "How much does DentDock cost?",
      answer:
        "£49 a month per practice, with unlimited dentists and staff. 200 texts a month are included, then 8p a text. There are no setup fees and no contract.",
    },
    {
      question: "Can we bring our patients from our current system?",
      answer:
        "Yes. Export your patient list as a CSV and upload it. DentDock matches the columns for you and brings across recall dates too.",
    },
    {
      question: "Does it work for mixed NHS and private practices?",
      answer:
        "DentDock doesn't do NHS claims, UDAs or banding, so a mixed practice would still need its NHS system for claims. You can mark NHS patients, and they're never charged cancellation fees.",
    },
    {
      question: "Can patients see our prices when they book online?",
      answer:
        "Yes. Your booking page shows each treatment with its price, or Free, and treatments that need a deposit are labelled.",
    },
    {
      question: "Does DentDock do membership plans?",
      answer:
        "Not yet. Membership plans are planned and listed as coming soon on our pricing page.",
    },
  ],
};

export const Route = createFileRoute("/solutions/private-practices")({
  component: () => <AudienceSolutionPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental software for UK private practices | DentDock",
      description:
        "Practice software for UK private dental practices: diary, online booking with your prices, reminders, recalls, forms, deposits and payments. £49 a month, no contract, live in a day.",
      crumbs: [
        { name: "Solutions", path: "/solutions" },
        { name: "Private practices", path: PATH },
      ],
      faq: content.faq,
    }),
});
