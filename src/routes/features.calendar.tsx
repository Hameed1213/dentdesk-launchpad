import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, FileText } from "lucide-react";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { PillCard } from "@/components/site/cards";
import { AppWindow } from "@/components/site/screens";
import { Badge, Btn, Field, Panel, RowList, Tabs, Zoom } from "@/components/site/screenKit";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Calendar. Claims checked against the app on 12 Nov 2026:
 * Day/Week/Month/Year views, a column per clinician in Day view, colours by clinician and status
 * (Arrived green, In Chair purple, No Show red), statuses Confirmed > Arrived > In Chair > Completed,
 * alerts and late dot on visits, Send late reminder (asks first, practice wording, patient's channel),
 * block time for one or all clinicians with repeats, per-clinician hours and leave, online booking
 * respects hours/leave/blocks, visit drawer actions. Not claimed: drag to move, colours by treatment,
 * appointment search, two-way messaging.
 * Photo: Magnific (Freepik) free licence, credited in the page footer.
 */

const PATH = "/features/calendar";

function DayScreen() {
  const cols = [
    {
      name: "Dr Patel",
      blocks: [
        {
          top: 4,
          h: 22,
          label: "09:00 Check-up",
          who: "Sarah M.",
          cls: "bg-[#DCFCE7] border-[#86EFAC]",
        },
        {
          top: 30,
          h: 30,
          label: "09:45 Filling",
          who: "James T.",
          cls: "bg-[#F3E8FF] border-[#D8B4FE]",
        },
        {
          top: 66,
          h: 22,
          label: "10:30 Check-up",
          who: "Maria L.",
          cls: "bg-[#DBEAFE] border-[#93C5FD]",
        },
      ],
    },
    {
      name: "Dr Hughes",
      blocks: [
        {
          top: 12,
          h: 30,
          label: "09:15 Hygiene",
          who: "Tom R.",
          cls: "bg-[#DBEAFE] border-[#93C5FD]",
        },
        {
          top: 48,
          h: 20,
          label: "Team training",
          who: "Blocked",
          cls: "bg-[repeating-linear-gradient(45deg,#F1F5F9,#F1F5F9_6px,#E2E8F0_6px,#E2E8F0_12px)] border-[#CBD5E1]",
        },
      ],
    },
    {
      name: "Hygienist",
      blocks: [
        {
          top: 4,
          h: 30,
          label: "09:00 Hygiene",
          who: "Priya K.",
          cls: "bg-[#E2E8F0] border-[#CBD5E1]",
        },
        {
          top: 40,
          h: 30,
          label: "09:45 Hygiene",
          who: "Ella M.",
          cls: "bg-[#DBEAFE] border-[#93C5FD]",
        },
      ],
    },
  ];
  return (
    <AppWindow
      title="Calendar"
      zoom={
        <Zoom title="At a glance" width="w-[190px]">
          <div className="space-y-1.5">
            <Badge tone="green">Arrived</Badge> <Badge tone="purple">In chair</Badge>{" "}
            <Badge tone="red">No show</Badge> <Badge tone="grey">Completed</Badge>
          </div>
        </Zoom>
      }
    >
      <Tabs items={["Day", "Week", "Month", "Year"]} />
      <Panel className="p-3">
        <div className="grid grid-cols-3 gap-2">
          {cols.map((c) => (
            <div key={c.name}>
              <p className="text-[11px] font-semibold text-[#0F172A] mb-1.5 truncate">{c.name}</p>
              <div className="relative h-[200px] rounded-lg bg-[#F8FAFC] border border-[#F1F5F9]">
                {c.blocks.map((b) => (
                  <div
                    key={b.label}
                    className={`absolute left-1 right-1 rounded-md border px-1.5 py-1 overflow-hidden ${b.cls}`}
                    style={{ top: `${b.top}%`, height: `${b.h}%` }}
                  >
                    <p className="text-[9px] font-semibold text-[#0F172A] truncate">{b.label}</p>
                    <p className="text-[9px] text-[#475569] truncate">{b.who}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </AppWindow>
  );
}

function TodayScreen() {
  return (
    <AppWindow
      title="Today"
      zoomSide="left"
      zoom={
        <Zoom title="Late reminder sent" width="w-[200px]">
          <p className="text-[11px] text-[#64748B]">
            To Maria L., by her preferred channel, using your own wording.
          </p>
        </Zoom>
      }
    >
      <RowList
        rows={[
          {
            title: "09:00 · Sarah Mitchell",
            sub: "Check-up · Dr Patel",
            right: <Badge tone="grey">Completed</Badge>,
          },
          {
            title: "09:45 · James Turner",
            sub: "Filling · Dr Patel",
            right: <Badge tone="purple">In chair</Badge>,
          },
          {
            title: "10:30 · Maria Lombardi",
            sub: "Check-up · 10 min late",
            right: <Btn>Send late reminder</Btn>,
          },
          {
            title: "11:15 · Tom Reid",
            sub: "Hygiene · Dr Hughes",
            right: <Btn ghost>Mark arrived</Btn>,
          },
        ]}
      />
      <div className="h-16" />
    </AppWindow>
  );
}

function BlockTimeScreen() {
  return (
    <AppWindow
      title="Block time"
      zoom={
        <Zoom title="Online booking" width="w-[190px]">
          <p className="text-[11px] text-[#64748B]">Won't offer this time to patients.</p>
        </Zoom>
      }
    >
      <Panel className="p-4 space-y-3">
        <Field label="Who" value="Dr Hughes" />
        <Field label="Reason" value="Team training" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="From" value="Wed 13 Nov · 13:00" />
          <Field label="Until" value="14:30" />
        </div>
        <Field label="Repeat" value="Every week" />
        <div className="flex justify-end">
          <Btn>Block time</Btn>
        </div>
      </Panel>
      <div className="h-10" />
    </AppWindow>
  );
}

function VisitScreen() {
  return (
    <AppWindow
      title="Appointment"
      zoomSide="left"
      zoom={
        <Zoom title="Medical alert" width="w-[190px]">
          <p className="text-[11px] text-[#B91C1C] font-medium">Allergy: penicillin</p>
          <p className="mt-1 text-[11px] text-[#64748B]">From the patient's health form</p>
        </Zoom>
      }
    >
      <Panel className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[14px] font-semibold text-[#0F172A]">Maria Lombardi</p>
            <p className="text-[11px] text-[#64748B]">Check-up · Thu 14 Nov, 10:30 · Dr Patel</p>
          </div>
          <Badge tone="blue">Confirmed</Badge>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge tone="red">
            <AlertTriangle className="w-3 h-3" /> Medical alert
          </Badge>
          <Badge tone="green">Deposit paid</Badge>
          <Badge tone="grey">
            <FileText className="w-3 h-3" /> Has notes
          </Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Btn>Mark as arrived</Btn>
          <Btn ghost>Take payment</Btn>
          <Btn ghost>Reschedule</Btn>
          <Btn ghost>Rebook</Btn>
        </div>
      </Panel>
      <div className="h-12" />
    </AppWindow>
  );
}

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Calendar", to: PATH },
    ],
    title: "Your whole team's day,",
    highlight: "in one diary",
    intro: "See every clinician, every appointment and who's arrived, so the day runs on time.",
    visual: (
      <PhotoPanel
        src="/images/pages/hero-calendar.webp"
        alt="Dentist matching a shade guide for a smiling patient"
        height={934}
        position="object-[45%_35%]"
      >
        <PillCard
          className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="James T. has arrived · 09:43"
        />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Every clinician, side by side",
      body: "Day, week, month and year views, with a column for each clinician in the day view.",
      points: [
        "Switch views in a click",
        "A column for each clinician",
        "Colours by clinician, with clear statuses",
      ],
      visual: <DayScreen />,
    },
    {
      title: "Know who's here and who's late",
      body: "Every visit moves from confirmed to arrived, in chair and completed, so the whole team can see where the day is.",
      points: [
        "Mark arrived, then complete the visit",
        "See who's late at a glance",
        "Send a late reminder in one click",
      ],
      visual: <TodayScreen />,
    },
    {
      title: "Hours, leave and blocked time",
      body: "Set working hours and time off for each clinician, and block time for meetings or training.",
      points: [
        "Working hours and leave per clinician",
        "Block time once, or repeat it",
        "Online booking only offers free times",
      ],
      visual: <BlockTimeScreen />,
    },
    {
      title: "Everything about the visit, one click away",
      body: "Open any appointment to see its alerts, notes and payments, and act on it straight away.",
      points: [
        "Medical and patient alerts on the diary",
        "Notes saved to the patient's record",
        "Take a payment, reschedule or rebook",
      ],
      visual: <VisitScreen />,
    },
  ],
  others: othersFor(["booking", "reminders", "payments"]),
  faq: [
    {
      question: "Which calendar views are there?",
      answer:
        "Day, week, month and year. The day view has a column for each clinician, and on a phone the week view becomes a simple list.",
    },
    {
      question: "Can each clinician have their own hours and leave?",
      answer:
        "Yes. Set working days, hours and time off for each person, and staff can manage their own in My schedule.",
    },
    {
      question: "Does online booking respect leave and blocked time?",
      answer:
        "Yes. Patients are only offered times inside your opening hours and each clinician's hours, and never during lunch, closures, leave, blocked time or other appointments.",
    },
    {
      question: "Can we see medical alerts on the diary?",
      answer:
        "Yes. Appointments show a medical alert when the patient has allergies or conditions on file, plus patient alerts, deposit status and notes.",
    },
    {
      question: "What happens when a patient is running late?",
      answer:
        "The diary shows how late they are. Your team can send a late reminder in one click, using your own wording, by the patient's preferred channel.",
    },
  ],
};

export const Route = createFileRoute("/features/calendar")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental appointment calendar and diary software | DentDock",
      description:
        "A dental diary with a column for each clinician, clear visit statuses, working hours, leave and blocked time, and medical alerts on every appointment. £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Calendar", path: PATH },
      ],
      faq: content.faq,
    }),
});
