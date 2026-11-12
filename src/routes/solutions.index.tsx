import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/components/site/PageShell";
import { ClosingBand } from "@/components/site/ui";
import { FaqSection, OtherAreas, templateHead, type Faq } from "@/components/site/templates";
import { SolutionsHubHero } from "@/components/site/solutionTemplates";

/* Solutions hub: links to each Solutions page, grouped by problem and by type of practice. */

const PATH = "/solutions";

const faq: Faq[] = [
  {
    question: "What's the difference between Features and Solutions?",
    answer:
      "Features explain what each part of DentDock does. Solutions start from a problem your practice has, such as no-shows, and show how DentDock helps fix it.",
  },
  {
    question: "Is DentDock right for a mixed NHS and private practice?",
    answer:
      "DentDock doesn't do NHS claims, UDAs or banding, so a mixed practice would still need its NHS system for claims. It's built for private practices and practices moving that way.",
  },
  {
    question: "How much does it cost?",
    answer: "£49 a month per practice, with no setup fees and no contract.",
  },
];

export const Route = createFileRoute("/solutions/")({
  component: SolutionsPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Solutions for UK private dental practices | DentDock",
      description:
        "How DentDock helps UK private dental practices reduce no-shows, fill the diary and run smoothly, with online booking, reminders, recalls and payments. £49 a month.",
      crumbs: [{ name: "Solutions", path: PATH }],
      faq,
    }),
});

function SolutionsPage() {
  return (
    <PageShell>
      <SolutionsHubHero
        title="Fixes for the problems"
        highlight="your practice faces"
        intro="Start from what's getting in the way, and see how DentDock helps."
      />
      <OtherAreas
        title="By"
        highlight="problem"
        items={[
          {
            title: "Reduce no-shows",
            body: "Reminders, an easy way to cancel and a fair fee policy.",
            to: "/solutions/reduce-no-shows",
            image: "/images/pages/empty-surgery.webp",
            alt: "An empty dental chair in a modern surgery",
            position: "object-[50%_55%]",
          },
          {
            title: "Fill cancelled appointments",
            body: "Offer gaps to patients on your waitlist in a couple of clicks.",
            to: "/solutions/fill-cancelled-appointments",
            image: "/images/pages/hero-booking.webp",
            alt: "Woman smiling as she uses her phone at home",
            position: "object-[55%_35%]",
          },
          {
            title: "Cut admin and phone time",
            body: "Booking, forms, reminders and recalls that run themselves.",
            to: "/solutions/cut-admin",
            image: "/images/home/practice-laptop.webp",
            alt: "Practice manager working on a laptop at her desk",
            position: "object-[70%_40%]",
          },
          {
            title: "Deposits and late cancellations",
            body: "Deposits on the treatments you choose, and fees decided case by case.",
            to: "/solutions/deposits-and-late-cancellations",
            image: "/images/pages/contactless-payment.webp",
            alt: "Phone held over a card reader to pay",
            position: "object-center",
          },
          {
            title: "Bring patients back",
            body: "Recalls that follow up until patients book, and Google review links.",
            to: "/solutions/bring-patients-back",
            image: "/images/pages/hero-reports.webp",
            alt: "Dentist showing a patient a scan on screen",
            position: "object-[50%_35%]",
          },
        ]}
      />
      <OtherAreas
        title="By type of"
        highlight="practice"
        items={[
          {
            title: "Private practices",
            body: "Everything a UK private practice runs on, for £49 a month.",
            to: "/solutions/private-practices",
            image: "/images/home/dentist-patient.webp",
            alt: "Dentist talking with a smiling patient",
            position: "object-[45%_50%]",
          },
          {
            title: "Going private",
            body: "Show your prices, take deposits and let patients book online.",
            to: "/solutions/going-private",
            image: "/images/pages/hero-security.webp",
            alt: "Smiling dentist in his surgery",
            position: "object-[50%_28%]",
          },
          {
            title: "New practices",
            body: "Ready for your first patient in a day, with no contract.",
            to: "/solutions/new-practices",
            image: "/images/pages/hero-switching.webp",
            alt: "Smiling dentist sitting by the dental chair",
            position: "object-[45%_25%]",
          },
          {
            title: "Multi-site groups",
            body: "Coming soon: one login and an overview of every site.",
            to: "/solutions/multi-site-groups",
            image: "/images/pages/hero-features.webp",
            alt: "Dentist treating a patient in a bright surgery",
            position: "object-[60%_40%]",
          },
        ]}
      />
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
