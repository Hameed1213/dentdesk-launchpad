import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { AudiencePage, templateHead, type AudienceContent } from "@/components/site/templates";
import {
  BookingPriceCard,
  FeeDecisionCard,
  MedicalHistoryCard,
  PillCard,
  TakingsCard,
} from "@/components/site/cards";

/*
 * Solutions page (practice type): Private practices.
 * Product claims checked against the app on 12 Nov 2026: prices always shown on online booking,
 * forms and medical history during booking, portal (cancel, rearrange, pay, receipts; magic-link sign-in),
 * deposits per treatment via Stripe, payment links, fee policy shown before booking, staff decide fees,
 * reports (money taken by clinician, value of completed visits by clinician, booking sources,
 * no-show and cancellation rates), accountant export. Not built: NHS claims, charting, imaging,
 * multi-site, membership plans.
 * Photos (Unsplash, free licence): Bg81yWKZlMg, eL4xIEuHzzk, h8uuH7h17Ds, iNiGA6063y8.
 */

const PATH = "/solutions/private-practices";

const content: AudienceContent = {
  hero: {
    title: "Practice software for",
    highlight: "UK private dental practices",
    intro:
      "Diary, online booking, reminders, recalls, forms and payments in one place. £49 a month per practice, no contract, and you can set it up yourself in a day.",
    secondary: { label: "See pricing", to: "/pricing" },
    visual: (
      <PhotoPanel
        src="/images/home/dentist-patient.webp"
        alt="Dentist talking with a smiling patient in a modern surgery"
        height={1050}
        position="object-[45%_50%]"
      >
        <BookingPriceCard className="absolute right-2 sm:right-3 lg:-right-6 top-4 sm:top-6 lg:top-10" />
        <PillCard
          className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="Deposit paid online · £20"
        />
      </PhotoPanel>
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
      "Would rather set up yourself in a day than wait weeks",
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
  context: {
    title: "Private dentistry is now",
    highlight: "most of the market",
    paragraphs: [
      "Private work made up 69% of UK high-street dentistry by value in 2023/24, the highest share LaingBuisson has recorded since 2007. Practices that live on private fees need patients to book, turn up and pay, without the team spending the day on the phone.",
      "Prices are under the spotlight too. In March 2026 the CMA started a review of private dentistry that includes how clearly prices are shown. Showing your prices when patients book online is a simple way to be upfront, and DentDock does it on every booking page.",
    ],
    facts: [
      {
        figure: "69%",
        text: "Private share of the UK high-street dentistry market by value in 2023/24, worth £12.16bn in total.",
        source: {
          label: "LaingBuisson (September 2025)",
          url: "https://www.laingbuisson.com/press-releases/the-uk-high-street-dentistry-market-value-rises-to-12-16-billion-as-continued-challenges-accessing-nhs-dentists-push-people-towards-private-dentistry-according-to-a-new-report-by-la/",
        },
      },
      {
        figure: "1 in 5",
        text: "People in Great Britain who used private dental care in 2024.",
        source: {
          label: "Competition and Markets Authority (March 2026)",
          url: "https://www.gov.uk/government/news/cma-launches-review-of-private-dentistry",
        },
      },
    ],
  },
  rows: [
    {
      title: "Patients book online and see your prices",
      lead: "Give patients a simple, upfront way to book with:",
      points: [
        "Your own booking page with your treatments and prices",
        "Forms and medical history filled in while they book",
        "One confirmation, with any forms included",
        "A patient portal to cancel, rearrange, pay and download receipts, with no password or app",
      ],
      link: { label: "See all features", to: "/features" },
      visual: (
        <PhotoPanel
          src="/images/home/patient-booking.webp"
          alt="Woman smiling while booking on her phone"
          height={933}
          position="object-[50%_40%]"
        >
          <BookingPriceCard className="absolute right-2 sm:right-3 lg:-right-6 bottom-4 sm:bottom-6 lg:bottom-10" />
          <MedicalHistoryCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10" />
        </PhotoPanel>
      ),
    },
    {
      title: "Deposits, payment links and fair fees",
      lead: "Get paid without chasing, with:",
      points: [
        "Deposits on chosen treatments when patients book online, paid by card through Stripe",
        "Payment links sent by text or email",
        "Late-cancellation and missed-appointment fees shown before patients book, decided by you case by case",
        "Payments and refunds recorded against the patient",
      ],
      link: { label: "How to reduce no-shows", to: "/solutions/reduce-no-shows" },
      visual: (
        <PhotoPanel
          src="/images/pages/reception-payment.webp"
          alt="Receptionist at a front desk while a patient pays by card"
          height={933}
          position="object-[15%_40%]"
        >
          <FeeDecisionCard className="absolute right-2 sm:right-3 lg:-right-6 top-4 sm:top-6 lg:top-10" />
        </PhotoPanel>
      ),
    },
    {
      title: "Know how the practice is doing",
      lead: "See the numbers that matter to a private practice:",
      points: [
        "Money taken, filtered by clinician",
        "The value of completed visits for each clinician",
        "Where your online bookings come from, including Google and Instagram",
        "Your no-show and cancellation rates, plus an export for your accountant",
      ],
      visual: (
        <PhotoPanel
          src="/images/home/practice-laptop.webp"
          alt="Practice manager working on a laptop at her desk"
          height={933}
          position="object-[70%_40%]"
        >
          <TakingsCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10" />
        </PhotoPanel>
      ),
    },
  ],
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
  related: {
    title: "Explore",
    highlight: "what you get",
    items: [
      {
        title: "Reminders and recalls",
        body: "Reminders 72, 24 and 2 hours before, recall follow-ups and a waitlist.",
        to: "/features/reminders-and-recalls",
      },
      {
        title: "Reduce no-shows",
        body: "The evidence, a fair fee policy and how to refill a gap.",
        to: "/solutions/reduce-no-shows",
      },
      {
        title: "DentDock vs Dentally",
        body: "An honest side-by-side on price, features and setup.",
        to: "/compare/dentally",
      },
      {
        title: "Pricing",
        body: "One plan at £49 a month per practice. No contract.",
        to: "/pricing",
      },
    ],
  },
  faq: [
    {
      question: "How much does DentDock cost?",
      answer:
        "£49 a month per practice, with unlimited dentists and staff. 200 texts a month are included, then 8p a text. There are no setup fees and no contract.",
    },
    {
      question: "Is there a contract?",
      answer: "No. You pay monthly and can cancel any time.",
    },
    {
      question: "Can we bring our patients from our current system?",
      answer:
        "Yes. Export your patient list as a CSV from your current system and upload it. DentDock matches the columns for you, and we're on WhatsApp if you'd like a hand.",
    },
    {
      question: "Where is our patients' data stored?",
      answer:
        "In London, UK. It's encrypted in transit and at rest, DentDock is registered with the ICO (ZC132966), and our Data Processing Agreement sets out how we handle data for your practice.",
    },
    {
      question: "Does it work for mixed NHS and private practices?",
      answer:
        "DentDock doesn't do NHS claims, UDAs or banding, so a mixed practice would still need its NHS system for claims. You can mark NHS patients, and they're never charged late-cancellation or missed-appointment fees.",
    },
    {
      question: "Can patients see our prices when they book online?",
      answer:
        "Yes. Your booking page shows each treatment with its price, and shows Free where there's no charge. Treatments that need a deposit are labelled.",
    },
    {
      question: "Does DentDock do membership plans?",
      answer:
        "Not yet. Membership plans are planned and are listed as coming soon on our pricing page.",
    },
    {
      question: "Can we take our data with us if we leave?",
      answer:
        "Yes. You can export your practice's data from your settings at any time. Your data is yours.",
    },
  ],
};

export const Route = createFileRoute("/solutions/private-practices")({
  component: () => <AudiencePage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental software for UK private practices | DentDock",
      description:
        "Practice software for UK private dental practices: diary, online booking with your prices, reminders, recalls, forms, deposits and payments. £49 a month, no contract, live in a day.",
      crumbs: [{ name: "Private practices", path: PATH }],
      faq: content.faq,
    }),
});
