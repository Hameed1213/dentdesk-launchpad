import { createFileRoute, Link } from "@tanstack/react-router";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, Reveal } from "@/components/site/ui";
import { FaqSection, templateHead, type Faq } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";

/*
 * All FAQs in one place, grouped. Answers match the pages they come from (checked against the app,
 * 12 Nov 2026).
 */

const PATH = "/faq";

const groups: { id: string; title: string; items: Faq[] }[] = [
  {
    id: "pricing",
    title: "Pricing",
    items: [
      {
        question: "How much does DentDock cost?",
        answer:
          "£49 a month per practice, with unlimited dentists and staff. 200 texts a month are included, then 8p a text. There are no setup fees and no contract.",
      },
      {
        question: "Is VAT added?",
        answer:
          "No VAT is added at the moment, because DentDock isn't VAT-registered yet. If that changes, we'll tell you before it affects your bill.",
      },
      {
        question: "Who pays the card fees when patients pay online?",
        answer:
          "Patient payments go into your practice's own Stripe account. Stripe charges its standard fee for each payment, and DentDock takes nothing.",
      },
      {
        question: "Is there a contract or minimum term?",
        answer: "No. You pay month by month and can cancel at any time.",
      },
      {
        question: "Is there a free trial?",
        answer: "Yes. Each practice gets a 30-day free trial when it signs up.",
      },
    ],
  },
  {
    id: "switching",
    title: "Switching and setup",
    items: [
      {
        question: "Can we bring our patients from our current system?",
        answer:
          "Yes. Export your patient list as a CSV and upload it. DentDock matches the columns for you and brings across check-up and hygiene recall dates. Appointment history, payments and charts aren't imported.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most practices are set up within the day. Every step can be skipped and finished later, and everything can be changed afterwards.",
      },
      {
        question: "Does it work for mixed NHS and private practices?",
        answer:
          "DentDock doesn't do NHS claims, UDAs or banding, so a mixed practice would still need its NHS system for claims. You can mark NHS patients, and they're never charged cancellation fees.",
      },
      {
        question: "Does DentDock do charting or imaging?",
        answer:
          "No. DentDock doesn't include tooth charting, treatment plans or X-ray integration.",
      },
    ],
  },
  {
    id: "patients",
    title: "Patients and messages",
    items: [
      {
        question: "When do appointment reminders go out?",
        answer:
          "72 hours, 24 hours and 2 hours before every confirmed appointment, by text or email, whichever the patient prefers. Texts are only sent between 8am and 8pm.",
      },
      {
        question: "Can patients book and cancel online?",
        answer:
          "Yes. Patients book from your booking page and manage their appointments in the portal, signing in with a link sent to their email, with no password.",
      },
      {
        question: "Can patients reply to texts?",
        answer:
          "Not yet. Texts are one-way, and each reminder includes a link to view or change the appointment.",
      },
    ],
  },
  {
    id: "data",
    title: "Data and security",
    items: [
      {
        question: "Where is our patients' data stored?",
        answer:
          "In London, UK. It's encrypted in transit and at rest, and our Data Processing Agreement sets out how we handle data for your practice.",
      },
      {
        question: "Can we take our data with us if we leave?",
        answer:
          "Yes. Owners and managers can download everything in one go at any time: spreadsheets of your records plus every file and photo.",
      },
      {
        question: "Is DentDock registered with the ICO?",
        answer:
          "Yes. Paradigm Network Limited, which trades as DentDock, is registered with the ICO under ZC132966.",
      },
    ],
  },
];

const allFaq = groups.flatMap((g) => g.items);

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Frequently asked questions | DentDock",
      description:
        "Answers about DentDock's pricing, switching, patient reminders, online booking, data storage and security, for UK private dental practices.",
      crumbs: [{ name: "FAQs", path: PATH }],
      faq: allFaq,
    }),
});

function FaqPage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Frequently"
        highlight="asked questions"
        intro="Everything practices ask us before they join. Can't find your answer? Get in touch."
      />
      <Reveal className="px-6">
        <nav
          aria-label="FAQ topics"
          className="mx-auto max-w-3xl flex flex-wrap justify-center gap-2 pt-2"
        >
          {groups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="rounded-xl border border-[#DBEAFE] bg-white px-4 py-2 text-[14px] font-medium text-[#2563EB] hover:border-[#2563EB]"
            >
              {g.title}
            </a>
          ))}
        </nav>
      </Reveal>
      {groups.map((g) => (
        <div key={g.id} id={g.id} className="scroll-mt-24">
          <FaqSection title={g.title} items={g.items} />
        </div>
      ))}
      <Reveal className="px-6 pb-4 text-center">
        <p className="text-[16px] text-[#475569]">
          Still have a question?{" "}
          <Link to="/contact" className="font-semibold text-[#2563EB] hover:underline">
            Contact us
          </Link>
        </p>
      </Reveal>
      <ClosingBand />
    </PageShell>
  );
}
