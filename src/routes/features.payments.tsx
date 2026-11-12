import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { PillCard } from "@/components/site/cards";
import { AppWindow } from "@/components/site/screens";
import { Badge, Btn, Field, Panel, RowList, Table, Tabs, Zoom } from "@/components/site/screenKit";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Payments and deposits. Claims checked against the app on 12 Nov 2026:
 * practice's own Stripe account (DentDock takes no cut; Stripe fees apply), single-use payment links
 * sent by text or email and marked paid automatically, record card machine / cash / bank transfer,
 * partial refunds, receipts numbered R-00001 with no gaps (print or email), late-cancellation and
 * no-show fees set in Settings and decided by staff (fee link, refund the extra, waive), NHS patients
 * never charged a fee, Payments page (Transactions, To collect, Refunds), Payments permission enforced.
 * Deposits per treatment: built; online deposit at booking is switched off until launch (Hariss keeps
 * deposit claims, 16 Oct). Not claimed: card on file, automatic charging, Apple/Google Pay, card
 * terminal integration, live payments today.
 * Photo (Unsplash, free licence): ddA5Xh7yWrQ.
 */

const PATH = "/features/payments";

function LinkScreen() {
  return (
    <AppWindow
      title="Send a payment link"
      zoom={
        <Zoom title="Paid" width="w-[190px]">
          <p className="text-[18px] font-semibold text-[#0F172A]">£75.00</p>
          <p className="mt-0.5 text-[11px] text-[#64748B]">Receipt R-00042 · visit marked paid</p>
        </Zoom>
      }
    >
      <Panel className="p-4 space-y-3">
        <Field label="Patient" value="Sarah Mitchell" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Amount" value="£75.00" />
          <Field label="For" value="Hygiene, 14 Nov" />
        </div>
        <Field label="Send by" value="Text (patient's choice)" />
        <div className="flex justify-end">
          <Btn>Send link</Btn>
        </div>
      </Panel>
      <div className="h-10" />
    </AppWindow>
  );
}

function DepositScreen() {
  return (
    <AppWindow
      title="Treatments"
      zoomSide="left"
      zoom={
        <Zoom title="Deposit paid" width="w-[180px]">
          <p className="text-[18px] font-semibold text-[#0F172A]">£20.00</p>
          <p className="mt-0.5 text-[11px] text-[#64748B]">Counts towards any fee</p>
        </Zoom>
      }
    >
      <Table
        grid="grid-cols-[1.6fr_0.8fr_0.8fr_1fr]"
        cols={["Treatment", "Length", "Price", "Deposit"]}
        rows={[
          ["Check-up", "30 min", "£55", <Badge tone="grey">None</Badge>],
          ["Hygiene", "45 min", "£75", <Badge tone="grey">None</Badge>],
          ["Whitening", "60 min", "£350", <Badge tone="blue">£50</Badge>],
          ["Composite bonding", "90 min", "£280", <Badge tone="blue">£60</Badge>],
        ]}
      />
      <div className="h-14" />
    </AppWindow>
  );
}

function FeesScreen() {
  return (
    <AppWindow
      title="Payments"
      zoom={
        <Zoom title="Missed appointment" width="w-[200px]">
          <p className="text-[11px] text-[#64748B]">Fee £40 · deposit £20 already paid</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <Btn>Send fee link</Btn>
            <Btn ghost>Waive</Btn>
          </div>
        </Zoom>
      }
    >
      <Tabs items={["Transactions", "To collect", "Refunds"]} active={1} />
      <RowList
        rows={[
          {
            title: "Tom Reid",
            sub: "Missed appointment · 12 Nov",
            right: <Badge tone="amber">Decide</Badge>,
          },
          {
            title: "Ella Morgan",
            sub: "Late cancellation · 11 Nov",
            right: <Badge tone="amber">Decide</Badge>,
          },
          {
            title: "David Khan",
            sub: "Payment link sent · £120",
            right: <Badge tone="blue">Unpaid</Badge>,
          },
        ]}
      />
      <div className="h-16" />
    </AppWindow>
  );
}

function LedgerScreen() {
  return (
    <AppWindow
      title="Transactions"
      zoomSide="left"
      zoom={
        <Zoom title="Refund" width="w-[180px]">
          <p className="text-[18px] font-semibold text-[#0F172A]">£20.00</p>
          <p className="mt-0.5 text-[11px] text-[#64748B]">Part refund · R-00045</p>
        </Zoom>
      }
    >
      <Table
        grid="grid-cols-[0.9fr_1.3fr_1fr_0.8fr]"
        cols={["Receipt", "Patient", "Method", "Amount"]}
        rows={[
          ["R-00042", "Sarah Mitchell", "Payment link", "£75.00"],
          ["R-00043", "James Turner", "Card machine", "£120.00"],
          ["R-00044", "Maria Lombardi", "Cash", "£55.00"],
          ["R-00045", "Ella Morgan", "Refund", "-£20.00"],
        ]}
      />
      <div className="h-14" />
    </AppWindow>
  );
}

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Payments and deposits", to: PATH },
    ],
    title: "Get paid",
    highlight: "without chasing",
    intro:
      "Payment links, deposits and fair cancellation fees through your own Stripe account, with every payment and receipt in one place.",
    visual: (
      <PhotoPanel
        src="/images/pages/counter-tablet.webp"
        alt="Woman at a front counter with a payment tablet"
        height={934}
        position="object-[65%_40%]"
      >
        <PillCard
          className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="Payment link paid · £75.00"
        />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Payment links by text or email",
      body: "Send a secure link for any amount. When the patient pays, the visit is marked paid.",
      points: [
        "Your own Stripe account, no cut for DentDock",
        "Sent the way the patient prefers",
        "Marked paid automatically",
      ],
      visual: <LinkScreen />,
    },
    {
      title: "Deposits on the treatments you choose",
      body: "Set a deposit on any treatment. Patients see it before they book.",
      points: ["Shown on your booking page", "Paid by card", "Counts towards any fee"],
      visual: <DepositScreen />,
    },
    {
      title: "Fair fees, decided by your team",
      body: "Set your notice period and fees. DentDock lists each late cancellation and missed visit for your team to decide.",
      points: [
        "Shown to patients before they book",
        "Send a fee link, or waive it",
        "NHS patients are never charged",
      ],
      visual: <FeesScreen />,
    },
    {
      title: "Every payment, refund and receipt",
      body: "Record card, cash or bank transfer at the desk, refund in part or in full, and print or email receipts.",
      points: [
        "Receipts numbered in order, no gaps",
        "Part or full refunds",
        "Money only seen by staff who need it",
      ],
      visual: <LedgerScreen />,
    },
  ],
  others: othersFor(["reports", "booking", "calendar"]),
  faq: [
    {
      question: "Do we need our own Stripe account?",
      answer:
        "Yes. You connect your practice's own Stripe account, so payments go straight to you. Stripe's own fees apply, and DentDock takes no cut.",
    },
    {
      question: "Are late-cancellation and missed-appointment fees charged automatically?",
      answer:
        "No. DentDock lists each case and your team decides: send a fee link, refund anything paid above the fee, or waive it. Patients marked as NHS are never charged a fee.",
    },
    {
      question: "Can we record payments taken at the desk?",
      answer:
        "Yes. Record payments taken on your own card machine, in cash or by bank transfer against the visit. DentDock doesn't connect to card machines.",
    },
    {
      question: "Can we refund a patient?",
      answer:
        "Yes, in part or in full, up to what hasn't already been refunded. Each refund gets its own receipt number.",
    },
    {
      question: "Who can see payments?",
      answer:
        "Only staff with the Payments permission. Without it, payment screens and amounts are hidden.",
    },
  ],
};

export const Route = createFileRoute("/features/payments")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental payments, deposits and cancellation fees | DentDock",
      description:
        "Payment links, deposits on chosen treatments and fair cancellation fees through your own Stripe account, with numbered receipts and refunds. £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Payments and deposits", path: PATH },
      ],
      faq: content.faq,
    }),
});
