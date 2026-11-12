import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { PhotoPanel } from "@/components/site/ui";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, TrustStrip } from "@/components/site/ui";
import {
  FaqSection,
  FeatureCards,
  Fit,
  OtherAreas,
  PageHeroSplit,
  Steps,
  templateHead,
  type PlatformContent,
  type Step,
} from "@/components/site/templates";
import { PillCard } from "@/components/site/cards";
import { AppWindow } from "@/components/site/screens";
import { Badge, Btn, Panel, RowList, Table, Ticks, Zoom } from "@/components/site/screenKit";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Switching to DentDock. Claims checked against the app on 12 Nov 2026:
 * 8-step setup (practice, opening hours, services from templates, team, import, booking page,
 * payments, reminders), any step can be skipped and done later; CSV export guides and templates for
 * Dentally, Software of Excellence (EXACT), Curve Dental, Carestream R4 and Practiceworks; columns
 * matched automatically and changeable; imports patients (name, contact, DOB, address, NHS number,
 * allergies, conditions, notes) and check-up/hygiene recall dates; WhatsApp support (site claim).
 * Not claimed: importing appointments, history, payments, charts or forms; direct links to other
 * systems; consent handling on import (open bug); medications shown on the profile; a fixed setup time.
 * Reworked 12 Nov 2026 (Hariss): switching is a planned move, not upload and go. The page now says
 * what stays in the old system, that booked appointments must be added by hand, and to allow weeks.
 * Photo: Magnific (Freepik) free licence, credited in the page footer.
 */

const PATH = "/features/switching";

function SetupScreen() {
  const steps = [
    { t: "Tell us about your practice", done: true },
    { t: "When are you open?", done: true },
    { t: "What services do you offer?", done: true },
    { t: "Who's on your team?", done: true },
    { t: "Moving from another system?", done: false, now: true },
    { t: "Here's your booking page", done: false },
    { t: "Accept payments", done: false },
    { t: "Set up appointment reminders", done: false },
  ];
  return (
    <AppWindow
      title="Set up your practice"
      zoom={
        <Zoom title="Skip for now" width="w-[180px]">
          <p className="text-[11px] text-[#64748B]">
            Every step can be done later, and everything can be changed.
          </p>
        </Zoom>
      }
    >
      <Panel className="p-4">
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={s.t} className="flex items-center gap-2.5 text-[12px]">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                  s.done
                    ? "bg-[#2563EB] text-white"
                    : s.now
                      ? "border-2 border-[#2563EB] text-[#2563EB]"
                      : "border border-[#CBD5E1] text-[#94A3B8]"
                }`}
              >
                {s.done ? "✓" : i + 1}
              </span>
              <span
                className={
                  s.now
                    ? "font-semibold text-[#0F172A]"
                    : s.done
                      ? "text-[#64748B]"
                      : "text-[#334155]"
                }
              >
                {s.t}
              </span>
            </li>
          ))}
        </ol>
      </Panel>
      <div className="h-10" />
    </AppWindow>
  );
}

function ImportScreen() {
  return (
    <AppWindow
      title="Import patients"
      zoomSide="left"
      zoom={
        <Zoom title="Export guides for" width="w-[200px]">
          <Ticks
            items={[
              "Dentally",
              "Software of Excellence",
              "Carestream R4",
              "Curve Dental",
              "Practiceworks",
            ]}
          />
        </Zoom>
      }
    >
      <Table
        grid="grid-cols-[1.2fr_0.3fr_1.2fr]"
        cols={["Column in your file", "", "DentDock field"]}
        rows={[
          ["Forename", "→", <Badge tone="blue">First name</Badge>],
          ["Surname", "→", <Badge tone="blue">Last name</Badge>],
          ["DOB", "→", <Badge tone="blue">Date of birth</Badge>],
          ["Mobile", "→", <Badge tone="blue">Phone</Badge>],
          ["Next recall", "→", <Badge tone="blue">Check-up recall</Badge>],
        ]}
      />
      <div className="mt-3 flex justify-end">
        <Btn>Import patients</Btn>
      </div>
      <div className="h-10" />
    </AppWindow>
  );
}

function LiveScreen() {
  return (
    <AppWindow
      title="Here's your booking page"
      zoom={
        <Zoom title="Reminders" width="w-[180px]">
          <p className="text-[11px] text-[#64748B]">
            Ready to go with sensible wording. Edit them any time.
          </p>
        </Zoom>
      }
    >
      <Panel className="p-4">
        <p className="text-[12px] text-[#334155]">
          Share this link on your website, Google profile and social pages.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-[#BFDBFE] bg-[#F8FAFF] px-3 py-2 text-[12px] font-medium text-[#1D4ED8] truncate">
            Your booking page link
          </div>
          <Btn>Copy</Btn>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge tone="green">Opening hours set</Badge> <Badge tone="green">Treatments added</Badge>{" "}
          <Badge tone="green">Team added</Badge>
        </div>
      </Panel>
      <div className="h-14" />
    </AppWindow>
  );
}

function HelpScreen() {
  return (
    <AppWindow
      title="Support"
      zoomSide="left"
      zoom={
        <Zoom title="Same-day replies" width="w-[180px]">
          <p className="text-[11px] text-[#64748B]">From the people who built DentDock.</p>
        </Zoom>
      }
    >
      <Panel className="p-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <p className="text-[12px] font-semibold text-[#0F172A]">WhatsApp</p>
        </div>
        <p className="mt-3 max-w-[85%] rounded-xl rounded-tl-sm bg-neutral-100 px-3 py-2 text-[12px] text-[#334155]">
          Our old system exported a file with different column names. Will it still work?
        </p>
        <p className="mt-2 ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#DCFCE7] px-3 py-2 text-[12px] text-[#14532D]">
          Yes. DentDock matches what it can and you can change any match. Send it over and I'll
          check it with you.
        </p>
      </Panel>
      <div className="h-14" />
    </AppWindow>
  );
}

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Switching to DentDock", to: PATH },
    ],
    title: "Switch to DentDock",
    highlight: "with a plan",
    intro:
      "Setting up DentDock is quick. Moving a whole practice takes a little planning, so here's what comes across, what stays behind, and how we help.",
    visual: (
      <PhotoPanel
        src="/images/pages/hero-switching.webp"
        alt="Smiling dentist sitting by the dental chair"
        height={934}
        position="object-[45%_25%]"
      >
        <PillCard
          className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="Go-live date agreed"
        />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Guided setup, step by step",
      body: "Eight short steps take you from a blank account to a practice ready for patients.",
      points: [
        "Opening hours, treatments and team",
        "Ready-made treatments to start from",
        "Skip any step and come back later",
      ],
      visual: <SetupScreen />,
    },
    {
      title: "Bring your patients with a CSV",
      body: "Export your patient list from your current system and upload it. DentDock matches the columns, and we'll check the file with you first.",
      points: [
        "Guides for Dentally, SoE, R4 and more",
        "Change any column match",
        "Recall dates come across too",
      ],
      visual: <ImportScreen />,
    },
    {
      title: "Go live when you're ready",
      body: "Share your booking link and switch on reminders, then connect Stripe now or later.",
      points: [
        "Your booking link to share",
        "Reminders ready with sensible wording",
        "Connect payments whenever suits you",
      ],
      visual: <LiveScreen />,
    },
    {
      title: "Help planning the move",
      body: "Message us on WhatsApp and talk to the people who built DentDock, from choosing a go-live date to your first week.",
      points: [
        "Same-day replies",
        "Help checking your patient file",
        "No contract, cancel any time",
      ],
      visual: <HelpScreen />,
    },
  ],
  others: othersFor(["security", "booking", "reminders"]),
  faq: [
    {
      question: "How long does switching take?",
      answer:
        "Setting up DentDock can be done in a day. Allow a few weeks for the whole move: giving notice to your current supplier, getting your patient export, checking the import and adding upcoming appointments. We'll help you choose a go-live date that suits your practice.",
    },
    {
      question: "What can we bring across from our current system?",
      answer:
        "Your patients, including names, contact details, date of birth, address, NHS number, allergies, conditions and notes, plus their check-up and hygiene recall dates. Appointment history, payments and charts aren't imported.",
    },
    {
      question: "What happens to appointments that are already booked?",
      answer:
        "They aren't imported. Add upcoming appointments to the DentDock calendar before you go live, or let them finish in your old diary while new bookings go into DentDock.",
    },
    {
      question: "Do we need to keep our old system?",
      answer:
        "Keep access to it for past treatment notes, charts, X-rays and payments, because DentDock doesn't import them and you still need to keep patient records. Ask your current supplier what access they offer after you leave.",
    },
    {
      question: "Which systems can we switch from?",
      answer:
        "Any system that can export your patient list as a CSV file. DentDock has step-by-step export guides for Dentally, Software of Excellence (EXACT), Carestream R4, Curve Dental and Practiceworks.",
    },
    {
      question: "Is there a contract or setup fee?",
      answer: "No. £49 a month per practice, no setup fees, and you can cancel any time.",
    },
  ],
};

const plan: Step[] = [
  {
    title: "Plan the move",
    body: "Check your notice period with your current supplier, agree with us what comes across, and pick a quiet day to go live.",
  },
  {
    title: "Set up and check",
    body: "Add your hours, treatments and team, then export your patient list and check the import with us before go-live.",
  },
  {
    title: "Move your diary",
    body: "Booked appointments aren't imported. Add upcoming ones to DentDock, or let them finish in your old diary.",
  },
  {
    title: "Go live",
    body: "Share your booking link and switch on reminders. Keep access to your old system for past records.",
  },
];

function SwitchingPage() {
  const c = content;
  return (
    <PageShell>
      <PageHeroSplit hero={c.hero} />
      <TrustStrip />
      <Steps
        title="How a switch"
        highlight="works"
        intro="Most of the work is planning and checking, not uploading. We'll help at every step."
        steps={plan}
      />
      <Fit
        title="What comes"
        highlight="across"
        yesTitle="Comes across to DentDock"
        yes={[
          "Patient names, contact details and addresses",
          "Dates of birth and NHS numbers",
          "Allergies, conditions and notes",
          "Check-up and hygiene recall dates",
        ]}
        noTitle="Stays in your old system"
        no={[
          "Booked and past appointments",
          "Treatment history and charts",
          "Payments and balances",
          "X-rays, photos and documents",
        ]}
      />
      <FeatureCards items={c.features} />
      <OtherAreas {...c.others} />
      <FaqSection items={c.faq} />
      <ClosingBand />
    </PageShell>
  );
}

export const Route = createFileRoute("/features/switching")({
  component: SwitchingPage,
  head: () =>
    templateHead({
      path: PATH,
      title: "Switching dental software to DentDock | DentDock",
      description:
        "Switching dental software? See what comes across to DentDock, what stays in your old system, and how to plan the move from Dentally, SoE, R4 and more.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Switching to DentDock", path: PATH },
      ],
      faq: content.faq,
    }),
});
