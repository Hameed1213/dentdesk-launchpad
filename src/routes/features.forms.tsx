import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { MedicalHistoryCard } from "@/components/site/cards";
import { AppWindow } from "@/components/site/screens";
import { Badge, Btn, Panel, RowList, Ticks, Zoom } from "@/components/site/screenKit";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Forms and medical history. Claims checked against the app on 12 Nov 2026:
 * builder question types (short answer, paragraph, yes/no, choose one/any, rating, date, I agree,
 * signature, section heading) with conditional questions; ready-made templates (count not stated);
 * send with a booking, from Forms or the patient's profile by text or email; reminder the day before
 * and chases 3 days apart; completed health forms add allergies/conditions/medications, never remove,
 * conflicts become a staff note; "Fill in at the practice": staff type, patient signs, Save and lock,
 * records who; completion email + bell; form funnel in Reports.
 * Not claimed: kiosk/patient-held tablet mode, file uploads, bulk sending, exact template count.
 * Photo (Unsplash, free licence): d64g9yzK0BE.
 */

const PATH = "/features/forms";

function BuilderScreen() {
  return (
    <AppWindow
      title="New patient health history"
      zoom={
        <Zoom title="Add a question" width="w-[190px]">
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#334155]">
            {[
              "Short answer",
              "Yes / No",
              "Choose one",
              "Choose any",
              "Date",
              "Rating",
              "I agree",
              "Signature",
            ].map((t) => (
              <span key={t} className="rounded-md border border-[#E2E8F0] px-2 py-1">
                {t}
              </span>
            ))}
          </div>
        </Zoom>
      }
    >
      <RowList
        rows={[
          {
            title: "Are you taking any medicines?",
            sub: "Yes / No",
            right: <Badge tone="grey">Required</Badge>,
          },
          {
            title: "Which medicines?",
            sub: "Shown only if Yes",
            right: <Badge tone="blue">Conditional</Badge>,
          },
          {
            title: "Do you have any allergies?",
            sub: "Choose any",
            right: <Badge tone="grey">Required</Badge>,
          },
          {
            title: "Emergency contact",
            sub: "Short answer",
            right: <Badge tone="grey">Optional</Badge>,
          },
          {
            title: "Signature",
            sub: "Signed on screen",
            right: <Badge tone="grey">Required</Badge>,
          },
        ]}
      />
      <div className="h-12" />
    </AppWindow>
  );
}

function SentScreen() {
  return (
    <AppWindow
      title="Forms"
      zoomSide="left"
      zoom={
        <Zoom title="Reminder sent" width="w-[190px]">
          <p className="text-[11px] text-[#64748B]">
            The day before the appointment, by the patient's preferred channel.
          </p>
        </Zoom>
      }
    >
      <RowList
        rows={[
          {
            title: "Sarah Mitchell",
            sub: "Health history · sent with booking",
            right: <Badge tone="green">Completed</Badge>,
          },
          {
            title: "James Turner",
            sub: "Implant consent · sent by email",
            right: <Badge tone="blue">Opened</Badge>,
          },
          {
            title: "Maria Lombardi",
            sub: "Health history · sent by text",
            right: <Badge tone="amber">Not started</Badge>,
          },
          {
            title: "Tom Reid",
            sub: "Dental anxiety · sent by email",
            right: <Badge tone="green">Completed</Badge>,
          },
        ]}
      />
      <div className="mt-3 flex justify-end">
        <Btn>Send a form</Btn>
      </div>
      <div className="h-10" />
    </AppWindow>
  );
}

function MedicalScreen() {
  return (
    <AppWindow
      title="Sarah Mitchell · Medical"
      zoom={
        <Zoom title="Note for your team" width="w-[210px]">
          <p className="text-[11px] text-[#64748B]">
            The form says something different from the record. Please check with the patient.
          </p>
        </Zoom>
      }
    >
      <Panel className="p-4 space-y-3">
        <div>
          <p className="text-[11px] font-medium text-[#64748B]">Allergies</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Badge tone="red">Penicillin</Badge> <Badge tone="red">Latex</Badge>{" "}
            <Badge tone="green">Added from form</Badge>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-medium text-[#64748B]">Conditions</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Badge tone="amber">Asthma</Badge>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-medium text-[#64748B]">Medications</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Badge tone="grey">Salbutamol inhaler</Badge>
          </div>
        </div>
      </Panel>
      <div className="h-12" />
    </AppWindow>
  );
}

function InPracticeScreen() {
  return (
    <AppWindow
      title="Fill in at the practice"
      zoomSide="left"
      zoom={
        <Zoom title="Saved and locked" width="w-[190px]">
          <Ticks
            items={["Signed by the patient", "Completed in the practice", "By Emma, reception"]}
          />
        </Zoom>
      }
    >
      <Panel className="p-4">
        <p className="text-[12px] font-medium text-[#0F172A]">Patient signature</p>
        <div className="mt-2 h-24 rounded-lg border border-dashed border-[#CBD5E1] bg-[#F8FAFF] flex items-center justify-center text-[26px] italic text-[#334155]">
          M. Lombardi
        </div>
        <div className="mt-3 flex justify-between">
          <Btn ghost>Clear</Btn>
          <Btn>Save and lock</Btn>
        </div>
      </Panel>
      <div className="h-16" />
    </AppWindow>
  );
}

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Forms and medical history", to: PATH },
    ],
    title: "Forms filled in",
    highlight: "before patients arrive",
    intro:
      "Medical histories, consent forms and questionnaires completed online, signed, and saved to the patient's record.",
    visual: (
      <PhotoPanel
        src="/images/pages/hero-forms.webp"
        alt="Person filling in a form on their phone"
        height={933}
        position="object-[50%_45%]"
      >
        <MedicalHistoryCard className="absolute left-2 sm:left-3 lg:-left-6 top-4 sm:top-6 lg:top-10" />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Start from a template, or build your own",
      body: "Ready-made forms for health history, consent and more, or build exactly what your practice needs.",
      points: [
        "Templates for health history and consent",
        "Yes/no, choices, dates and ratings",
        "Questions that only show when they apply",
      ],
      visual: <BuilderScreen />,
    },
    {
      title: "Sent at the right time",
      body: "Forms go out with the booking or on their own, and DentDock chases the ones that aren't done.",
      points: [
        "Attach a form when you book",
        "A reminder the day before",
        "By text or email, the patient's choice",
      ],
      visual: <SentScreen />,
    },
    {
      title: "Medical history that updates the record",
      body: "Completed health forms add allergies, conditions and medications to the patient's record.",
      points: [
        "Nothing is removed without a person checking",
        "Differences flagged as a note for your team",
        "Medical alerts show on the diary",
      ],
      visual: <MedicalScreen />,
    },
    {
      title: "Fill in at the practice",
      body: "If a patient hasn't done their form, your team can complete it with them and the patient signs on screen.",
      points: ["Patient signs on screen", "Saved and locked", "Records who completed it"],
      visual: <InPracticeScreen />,
    },
  ],
  others: othersFor(["booking", "calendar", "security"]),
  faq: [
    {
      question: "Can patients fill in forms on their phone?",
      answer:
        "Yes. Forms open from a link by text or email, or inside online booking, and work on any phone, tablet or computer.",
    },
    {
      question: "Do completed forms update the patient's record?",
      answer:
        "Yes. Allergies, conditions and medications from a health form are added to the record. Nothing is removed automatically: if the form disagrees with the record, your team gets a note to check.",
    },
    {
      question: "Can patients sign forms?",
      answer:
        "Yes. Forms can include a signature that the patient draws on screen, online or at the practice.",
    },
    {
      question: "Do we get told when a form is completed?",
      answer:
        "Yes. The practice gets an email and a notification in DentDock when a new patient's form is completed.",
    },
    {
      question: "Can patients upload files in a form?",
      answer:
        "Not yet. Forms cover written answers, choices, dates, ratings, agreements and signatures.",
    },
  ],
};

export const Route = createFileRoute("/features/forms")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Digital dental forms and medical history | DentDock",
      description:
        "Online medical history and consent forms for dental practices: templates, signatures, reminders, and answers saved to the patient's record. £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Forms and medical history", path: PATH },
      ],
      faq: content.faq,
    }),
});
