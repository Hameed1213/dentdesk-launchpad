import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { PillCard } from "@/components/site/cards";
import {
  AcceptOnlinePhone,
  BookFromPlanScreen,
  IssueScreen,
  PlanBuilderScreen,
  TreatmentPlansScreen,
} from "@/components/site/clinicalScreens";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Treatment plans. HOLD: publish only on charting launch day (STATUS-2026-11-20-part2
 * §13.1 item 9). The "Accepted online" row needs production texts on and the solicitor's answers
 * (Q1, Q2, Q6, optional lines, the cancellation block P5-6) before it can go live.
 * Claims checked against hub main e1ed624 and booking main ae3a345 (20 Nov 2026):
 * plans built from the practice's price list (price editable, "up to" prices), options with one
 * marked recommended by the dentist, "No treatment" option, visits with gaps in weeks, NHS or
 * private on each line with separate totals, optional lines; Issue as Estimate or Fixed quote with
 * Valid until (90 days by default), frozen versions, Reopen to change, older versions "Replaced";
 * print (HTML print, not PDF) with patient-rights wording and a signature block; desk decision
 * (Sign on screen or on paper; who is signing; decline reasons); online: link by email, date of birth
 * + 6-digit texted code, choose an option, leave out optional lines, type full name, "Accept and
 * agree to pay £X", decline with a reason, "please call me" with a time; confirmation email; bell to
 * the team; private plans only, 16 and over, no sedation/GA lines online. Booking from a plan fills
 * price, length, clinician; one visit at a time; Mark done; status Draft -> Awaiting decision ->
 * Accepted / Declined -> In progress -> Completed. Treatment plans page: To act on (call backs, code
 * texts not delivered, expiring, accepted to book), month summary (money with Payments permission).
 * NOT claimed: payment links or finance for plans, PDF files, booking a whole plan online, drawn
 * signatures online, NHS forms (FP17DC), plan templates, "When suits you" (in progress).
 * Wording: the dentist recommends, never the software; accepting is not consent to treatment.
 * Photo (Unsplash, free licence): Bg81yWKZlMg.
 */

const PATH = "/features/treatment-plans";

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Treatment plans", to: PATH },
    ],
    title: "Treatment plans patients",
    highlight: "can say yes to",
    intro:
      "Build plans and estimates from your own price list, give patients clear options, and see every plan waiting for a decision.",
    visual: (
      <PhotoPanel
        src="/images/pages/plan-consult.webp"
        alt="Dentist talking a smiling patient through her treatment in the dental chair"
        height={1050}
        position="object-[45%_40%]"
      >
        <PillCard
          className="absolute right-2 sm:right-3 lg:-right-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="Estimate accepted · Option A"
        />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Plans built from your price list",
      body: "Add lines from your own price list, set the visits, and give patients options with the one you recommend marked.",
      points: [
        "Options, including no treatment",
        "NHS or private on each line, with separate totals",
        'Optional extras and "up to" prices',
      ],
      visual: <PlanBuilderScreen />,
    },
    {
      title: "Estimates and quotes that stay put",
      body: "Issue an estimate or a fixed quote with a valid until date. Every issued version is kept, so you can always see what the patient was given.",
      points: [
        "Estimate or fixed quote",
        "A new version for every change",
        "Printed with clear wording and a signature",
      ],
      visual: <IssueScreen />,
    },
    {
      title: "Patients can decide online",
      body: "Send private plans to the patient by email. They check their date of birth, enter a code sent by text, choose an option and accept or decline.",
      points: [
        "Optional extras they can leave out",
        "A copy of what they accepted by email",
        "Or they ask you to call them back",
      ],
      visual: <AcceptOnlinePhone />,
    },
    {
      title: "Book and finish from the plan",
      body: "Book each visit straight from the plan, with the price, length and clinician filled in, and tick off the work as it's done.",
      points: [
        "The appointment shows which plan and visit it is",
        "Mark lines done as you go",
        "The plan moves to completed on its own",
      ],
      visual: <BookFromPlanScreen />,
    },
    {
      title: "Every plan in one list",
      body: "The Treatment plans page shows every plan you've issued and what needs doing about it, so no accepted plan waits to be booked.",
      points: [
        "Call backs, expiring estimates and plans to book",
        "Waiting, accepted and declined",
        "How many were accepted this month",
      ],
      visual: <TreatmentPlansScreen />,
    },
  ],
  others: othersFor(["chart", "payments", "calendar"]),
  faq: [
    {
      question: "Can we include NHS and private treatment in one plan?",
      answer:
        "Yes. Each line is marked NHS or private, and the plan shows the NHS and private totals separately. Plans with NHS treatment are decided at the practice, not online.",
    },
    {
      question: "How do patients accept a plan online?",
      answer:
        "You send the plan from the patient's record. They get an email with a link, enter their date of birth and a 6-digit code sent to their mobile, choose an option and accept by typing their name, or decline. They get a copy by email and your team is notified.",
    },
    {
      question: "Who can accept online?",
      answer:
        "Patients aged 16 and over, for private plans. Plans for younger patients, plans with NHS treatment and any line that needs written consent, such as sedation, are signed for at the practice.",
    },
    {
      question: "Is accepting a plan the same as consent?",
      answer:
        "No. The estimate tells patients that accepting it isn't consent to treatment, and that their dentist will go through the treatment with them and ask for consent before it starts.",
    },
    {
      question: "Can I print an estimate?",
      answer:
        "Yes. Print any issued version as an estimate or fixed quote, with a space for the patient to sign. Patients can also sign on screen at the desk.",
    },
    {
      question: "Can patients pay for a plan in instalments?",
      answer:
        "Not yet. You can take a deposit on the first visit and send payment links for any amount.",
    },
  ],
};

export const Route = createFileRoute("/features/treatment-plans")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental treatment plan and estimate software | DentDock",
      description:
        "Build treatment plans and estimates from your price list, with options, versions and printed estimates. Patients can accept private plans online. £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Treatment plans", path: PATH },
      ],
      faq: content.faq,
    }),
});
