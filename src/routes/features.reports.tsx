import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { TakingsCard } from "@/components/site/cards";
import { AppWindow } from "@/components/site/screens";
import {
  Badge,
  Bars,
  Btn,
  Field,
  Panel,
  Stat,
  Table,
  Tabs,
  Zoom,
} from "@/components/site/screenKit";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Reports. Claims checked against the app on 12 Nov 2026:
 * tabs Money, Appointments, Patients, Recalls & forms, Marketing; ranges This week / This month /
 * Last 3 months / This year / Custom, compared with the previous period; money taken (payments less
 * refunds) by treatment and clinician, still owed; cancellation and no-show rates, busiest times,
 * by clinician; new vs returning and where new patients came from; online bookings by source;
 * CSV export (money left out without the Payments permission); accountant CSV (this month, last month,
 * this tax year, last tax year, custom) with receipt numbers and a summary; takings-by-clinician CSV.
 * Not claimed: Xero/QuickBooks/Sage, lab fees, proven Google Ads conversion import.
 * Photo (Unsplash, free licence): wS73LE0GnKs.
 */

const PATH = "/features/reports";

function MoneyScreen() {
  return (
    <AppWindow
      title="Reports"
      zoom={
        <Zoom title="By clinician" width="w-[190px]">
          <div className="space-y-1.5 text-[11px] text-[#334155]">
            <div className="flex justify-between">
              <span>Dr Patel</span>
              <span className="font-semibold">£8,420</span>
            </div>
            <div className="flex justify-between">
              <span>Dr Hughes</span>
              <span className="font-semibold">£6,180</span>
            </div>
            <div className="flex justify-between">
              <span>Hygienist</span>
              <span className="font-semibold">£3,950</span>
            </div>
          </div>
        </Zoom>
      }
    >
      <Tabs items={["Money", "Appointments", "Patients", "Recalls & forms", "Marketing"]} />
      <div className="grid grid-cols-3 gap-2 mb-3">
        <Stat label="Money taken" value="£18,550" sub="This month" />
        <Stat label="Still owed" value="£640" />
        <Stat label="Average visit" value="£96" />
      </div>
      <Panel className="p-4">
        <Bars
          values={[42, 55, 48, 63, 58, 70, 78]}
          labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]}
        />
      </Panel>
      <div className="h-10" />
    </AppWindow>
  );
}

function AppointmentsScreen() {
  const hours = ["9", "11", "13", "15", "17"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const shade = [
    [3, 4, 2, 4, 3],
    [4, 4, 3, 4, 4],
    [2, 3, 1, 2, 3],
    [3, 4, 3, 4, 2],
    [4, 3, 2, 3, 1],
  ];
  const tones = ["bg-[#F1F5F9]", "bg-[#DBEAFE]", "bg-[#BFDBFE]", "bg-[#93C5FD]", "bg-[#2563EB]"];
  return (
    <AppWindow
      title="Reports"
      zoomSide="left"
      zoom={
        <Zoom title="No-show rate" width="w-[180px]">
          <p className="text-[18px] font-semibold text-[#0F172A]">4.2%</p>
          <p className="mt-0.5 text-[11px] text-[#64748B]">This month, against 4.6% last month</p>
        </Zoom>
      }
    >
      <Tabs
        items={["Money", "Appointments", "Patients", "Recalls & forms", "Marketing"]}
        active={1}
      />
      <div className="grid grid-cols-2 gap-2 mb-3">
        <Stat label="No-show rate" value="4.2%" sub="Last period 4.6%" />
        <Stat label="Cancellation rate" value="6.0%" sub="Last period 6.3%" />
      </div>
      <Panel className="p-4">
        <p className="text-[11px] font-medium text-[#64748B] mb-2">Busiest times</p>
        <div className="grid grid-cols-[28px_repeat(5,1fr)] gap-1">
          <span />
          {hours.map((h) => (
            <span key={h} className="text-center text-[9px] text-[#94A3B8]">
              {h}:00
            </span>
          ))}
          {days.map((d, i) => (
            <Fragment key={d}>
              <span className="text-[9px] text-[#94A3B8] leading-5">{d}</span>
              {shade[i].map((v, j) => (
                <span key={d + j} className={`h-5 rounded ${tones[v]}`} />
              ))}
            </Fragment>
          ))}
        </div>
      </Panel>
      <div className="h-10" />
    </AppWindow>
  );
}

function SourcesScreen() {
  return (
    <AppWindow
      title="Reports"
      zoom={
        <Zoom title="Instagram" width="w-[180px]">
          <p className="text-[11px] text-[#64748B]">
            7 bookings · 6 new patients · £1,140 paid by new patients
          </p>
        </Zoom>
      }
    >
      <Tabs
        items={["Money", "Appointments", "Patients", "Recalls & forms", "Marketing"]}
        active={4}
      />
      <Table
        grid="grid-cols-[1.5fr_0.8fr_0.9fr_0.9fr]"
        cols={["Source", "Bookings", "New", "Attended"]}
        rows={[
          ["Google Business Profile", "18", "9", "16"],
          ["Your website", "14", "5", "13"],
          ["Instagram", "7", "6", "7"],
          ["Google Ads", "5", "4", "5"],
        ]}
      />
      <div className="h-14" />
    </AppWindow>
  );
}

function ExportScreen() {
  return (
    <AppWindow
      title="Export for your accountant"
      zoomSide="left"
      zoom={
        <Zoom title="payments-2025-26.csv" width="w-[200px]">
          <p className="text-[11px] text-[#64748B]">
            Date, amount, method, treatment, clinician, receipt number and more, with a summary.
          </p>
        </Zoom>
      }
    >
      <Panel className="p-4 space-y-3">
        <Field label="Period" value="This tax year" />
        <div className="flex flex-wrap gap-1.5">
          <Badge tone="grey">This month</Badge> <Badge tone="grey">Last month</Badge>{" "}
          <Badge tone="blue">This tax year</Badge> <Badge tone="grey">Last tax year</Badge>
        </div>
        <Field label="Include patient names" value="No" />
        <div className="flex justify-end">
          <Btn>Download CSV</Btn>
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
      { label: "Reports", to: PATH },
    ],
    title: "Know how the practice",
    highlight: "is really doing",
    intro:
      "Money taken, appointments, new patients and where your bookings come from, in plain numbers.",
    visual: (
      <PhotoPanel
        src="/images/pages/hero-reports.webp"
        alt="Dentist showing a patient a scan on screen"
        height={1751}
        position="object-[50%_35%]"
      >
        <TakingsCard className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10" />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Money taken, by clinician and treatment",
      body: "See what came in, what's still owed and how it compares with the last period.",
      points: ["Payments less refunds", "By clinician and by treatment", "What's still owed"],
      visual: <MoneyScreen />,
    },
    {
      title: "No-shows, cancellations and busy times",
      body: "Spot the patterns behind empty chairs and plan the diary around your busiest hours.",
      points: [
        "No-show and cancellation rates",
        "Busiest days and times",
        "Compared with the last period",
      ],
      visual: <AppointmentsScreen />,
    },
    {
      title: "Where new patients come from",
      body: "Every online booking is tagged with its source, so you can see which marketing brings patients in.",
      points: [
        "Google, social, ads and your website",
        "New patients by source",
        "What new patients have paid",
      ],
      visual: <SourcesScreen />,
    },
    {
      title: "An export your accountant will like",
      body: "Every payment and refund in one CSV, for the month or the tax year, with a summary at the end.",
      points: [
        "Receipt numbers and payment methods",
        "This month, last month or tax year",
        "Opens straight in Excel",
      ],
      visual: <ExportScreen />,
    },
  ],
  others: othersFor(["payments", "booking", "security"]),
  faq: [
    {
      question: "What date ranges can we report on?",
      answer:
        "This week, this month, the last 3 months, this year, or any dates you choose. Figures are compared with the previous period.",
    },
    {
      question: "Can we export the numbers?",
      answer:
        "Yes. Each report exports to CSV, and there's a separate export for your accountant with every payment and refund, plus a takings-by-clinician export.",
    },
    {
      question: "Does it connect to Xero or QuickBooks?",
      answer:
        "Not directly. The accountant export is a CSV that opens in Excel and can be imported into most accounting software.",
    },
    {
      question: "Who can see the money figures?",
      answer:
        "Only staff with the Payments permission. For everyone else, money is left out of reports and exports.",
    },
    {
      question: "How does DentDock know where bookings come from?",
      answer:
        "Each online booking records the link the patient came from, such as your Google profile, a social post, an ad or your website, and reports group bookings by source.",
    },
  ],
};

export const Route = createFileRoute("/features/reports")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental practice reports and analytics | DentDock",
      description:
        "Money taken by clinician and treatment, no-show and cancellation rates, booking sources and a CSV export for your accountant. £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Reports", path: PATH },
      ],
      faq: content.faq,
    }),
});
