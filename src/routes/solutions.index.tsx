import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import PageShell from "@/components/site/PageShell";
import { TrustBand } from "@/components/site/TrustBand";
import { ClosingBand, PhotoPanel, Reveal, TrustStrip, pillButton } from "@/components/site/ui";
import { FaqSection, PageHeroSplit, templateHead, type Faq } from "@/components/site/templates";
import { at } from "@/components/site/solutionTemplates";
import { solutionPhotos, type SolutionPhoto } from "@/components/site/solutionPages";
import {
  BookingPriceCard,
  FeeDecisionCard,
  FillSlotCard,
  PillCard,
  ReminderTimelineCard,
} from "@/components/site/cards";

/*
 * Solutions hub, laid out like the Features hub (Hariss, 12 Nov): split hero, trust strip, one large
 * panel of alternating rows grouped by problem and by type of practice, trust band, FAQ, banner.
 * Wording matches each Solutions page (checked against the app on 12 Nov 2026).
 */

const PATH = "/solutions";

type HubRow = {
  to: string;
  title: string;
  body: string;
  explore: string;
  photo: SolutionPhoto;
  card: ReactNode;
};

const problems: HubRow[] = [
  {
    to: "/solutions/reduce-no-shows",
    title: "Reduce no-shows",
    body: "Reminders 72, 24 and 2 hours before every appointment, a link to cancel in time, and a fair fee policy patients see before they book.",
    explore: "Explore reducing no-shows",
    photo: solutionPhotos.noShows,
    card: <ReminderTimelineCard className={at.bottomLeft} />,
  },
  {
    to: "/solutions/fill-cancelled-appointments",
    title: "Fill cancelled appointments",
    body: "When a patient cancels, DentDock lines up waitlist patients and patients due a recall, and your team offers the slot in a couple of clicks.",
    explore: "Explore filling cancellations",
    photo: solutionPhotos.fillCancelled,
    card: <FillSlotCard className={at.bottomRight} />,
  },
  {
    to: "/solutions/cut-admin",
    title: "Cut admin and phone time",
    body: "Online booking, forms before the visit, recalls and payment links that run themselves, so your team spends less time on the phone.",
    explore: "Explore cutting admin",
    photo: solutionPhotos.cutAdmin,
    card: <PillCard className={at.bottomLeft} icon="dot" text="Booked online · no call needed" />,
  },
  {
    to: "/solutions/deposits-and-late-cancellations",
    title: "Deposits and late cancellations",
    body: "Deposits on the treatments you choose, your policy shown before patients book, and each fee decided case by case by your team.",
    explore: "Explore deposits and fees",
    photo: solutionPhotos.deposits,
    card: <FeeDecisionCard className={at.topRight} />,
  },
  {
    to: "/solutions/bring-patients-back",
    title: "Bring patients back",
    body: "Recalls that set themselves when a visit is completed and follow up until patients book, plus Google review links for happy patients.",
    explore: "Explore bringing patients back",
    photo: solutionPhotos.bringBack,
    card: <PillCard className={at.topLeft} icon="bell" text="Recall due · reminder sent" />,
  },
];

const types: HubRow[] = [
  {
    to: "/solutions/private-practices",
    title: "Private practices",
    body: "Diary, online booking with your prices, reminders, recalls, forms and payments in one place, for £49 a month with no contract.",
    explore: "Explore for private practices",
    photo: solutionPhotos.private,
    card: <BookingPriceCard className={at.topLeft} />,
  },
  {
    to: "/solutions/going-private",
    title: "Practices going private",
    body: "Show your private prices, take deposits, set a fair cancellation policy and give patients online booking from the start.",
    explore: "Explore going private",
    photo: solutionPhotos.goingPrivate,
    card: <PillCard className={at.bottomRight} icon="dot" text="Deposit paid online · £50" />,
  },
  {
    to: "/solutions/new-practices",
    title: "New practices",
    body: "Set up your diary, booking page, forms and reminders in a day, and see where your first patients come from.",
    explore: "Explore for new practices",
    photo: solutionPhotos.newPractices,
    card: <PillCard className={at.bottomLeft} icon="dot" text="First booking · from Google" />,
  },
  {
    to: "/solutions/multi-site-groups",
    title: "Multi-site groups (coming soon)",
    body: "One login for up to five sites, an owner overview of every site and shared patient records. Register your interest.",
    explore: "Register interest",
    photo: solutionPhotos.multiSite,
    card: <PillCard className={at.topRight} icon="dot" text="Coming soon" />,
  },
];

function RowGroup({
  title,
  rows,
  startFlipped = false,
}: {
  title: string;
  rows: HubRow[];
  startFlipped?: boolean;
}) {
  return (
    <div className="space-y-16 md:space-y-24">
      <Reveal>
        <p className="text-center text-[15px] font-semibold uppercase tracking-[0.14em] text-[#2563EB]">
          {title}
        </p>
      </Reveal>
      {rows.map((r, i) => {
        const flip = (i % 2 === 1) !== startFlipped;
        return (
          <div key={r.to} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal className={flip ? "lg:order-2" : ""}>
              <PhotoPanel {...r.photo}>{r.card}</PhotoPanel>
            </Reveal>
            <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
              <h3 className="text-[28px] md:text-[34px] font-semibold tracking-tight text-[#2563EB] leading-[1.18]">
                {r.title}
              </h3>
              <p className="mt-4 text-[17px] text-[#334155] leading-[1.65]">{r.body}</p>
              <Link to={r.to as "/solutions"} className={`mt-7 ${pillButton}`}>
                {r.explore}
              </Link>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}

function HubRows() {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#2563EB] leading-[1.1]">
            Start from what's getting in the way
          </h2>
          <p className="mt-5 text-[18px] text-[#475569] leading-[1.6]">
            Pick the problem your practice wants to fix, or the kind of practice you run, and see
            how DentDock helps.
          </p>
        </Reveal>
        <div className="rounded-[40px] bg-gradient-to-br from-[#E8F0FF] via-[#F3F0FF] to-[#E6F4FF] px-6 py-12 sm:px-10 md:px-14 md:py-16 space-y-20 md:space-y-28">
          <RowGroup title="By problem" rows={problems} />
          <RowGroup title="By type of practice" rows={types} startFlipped />
        </div>
      </div>
    </section>
  );
}

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
    answer:
      "£49 a month per practice, with unlimited dentists and staff, no setup fees and no contract.",
  },
  {
    question: "Can we bring our patients from our current system?",
    answer:
      "Yes. Export your patient list as a CSV and upload it. DentDock matches the columns for you and brings across recall dates too.",
  },
];

export const Route = createFileRoute("/solutions/")({
  component: SolutionsPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Solutions for UK private dental practices | DentDock",
      description:
        "How DentDock helps UK private dental practices reduce no-shows, fill cancellations, cut admin, take deposits and bring patients back. £49 a month.",
      crumbs: [{ name: "Solutions", path: PATH }],
      faq,
    }),
});

function SolutionsPage() {
  return (
    <PageShell>
      <PageHeroSplit
        hero={{
          crumbs: [{ label: "Solutions", to: PATH }],
          title: "Fixes for the problems",
          highlight: "your practice faces",
          intro:
            "Fewer no-shows, fuller diaries and less time on the phone, built for UK private dental practices.",
          secondary: { label: "See pricing", to: "/pricing" },
          visual: (
            <PhotoPanel {...solutionPhotos.hub}>
              <PillCard className={at.topLeft} icon="dot" text="Slot refilled from the waitlist" />
              <PillCard className={at.bottomLeft} icon="bell" text="Recall due · reminder sent" />
            </PhotoPanel>
          ),
        }}
      />
      <TrustStrip />
      <HubRows />
      <TrustBand />
      <FaqSection items={faq} />
      <ClosingBand />
    </PageShell>
  );
}
