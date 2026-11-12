import { createFileRoute } from "@tanstack/react-router";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { BookingPriceCard } from "@/components/site/cards";
import { AppWindow } from "@/components/site/screens";
import { Badge, Btn, Panel, RowList, Table, Tabs, Zoom } from "@/components/site/screenKit";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Online booking and patient portal. Claims checked against the app on 12 Nov 2026:
 * booking page per practice, treatments with duration/price/Free and deposit label, clinician or
 * "Any practitioner", slots respect hours/leave/blocks, health form + signature inside the booking
 * (answers to the record), Add to calendar (Google, Apple), existing patients sign in with an emailed
 * link, Turnstile on every public booking, booking sources (UTM, ad click type, referrer) sorted into
 * channels, GA4/Google Ads/Meta tags only after cookie consent, portal tabs (appointments cancel /
 * rearrange, forms, payment history + receipts, details, consent; data/deletion are requests),
 * waitlist join online. Not claimed: paying from the portal, long minimum notice, 1-2 week booking
 * windows, online deposits as live, self-service export/deletion.
 * Photo (Unsplash, free licence): R6dSBkz32B8.
 */

const PATH = "/features/online-booking";

function BookingScreen() {
  return (
    <AppWindow
      title="Smile Dental · Book online"
      zoom={
        <Zoom title="Thu 14 Nov" width="w-[200px]">
          <div className="grid grid-cols-3 gap-1.5">
            {["9:00", "9:30", "10:15", "11:00", "14:30", "15:45"].map((t) => (
              <span
                key={t}
                className={`rounded-md border px-1 py-1.5 text-center text-[11px] font-medium ${
                  t === "9:30"
                    ? "border-[#2563EB] bg-[#2563EB] text-white"
                    : "border-[#E2E8F0] text-[#334155]"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </Zoom>
      }
    >
      <p className="text-[11px] font-medium text-[#64748B] mb-2">Choose a treatment</p>
      <RowList
        rows={[
          {
            title: "Check-up",
            sub: "30 mins",
            right: <span className="text-[12px] font-semibold text-[#0F172A]">£55</span>,
          },
          {
            title: "Hygiene",
            sub: "45 mins",
            right: <span className="text-[12px] font-semibold text-[#0F172A]">£75</span>,
          },
          {
            title: (
              <>
                Whitening consultation <Badge tone="blue">Deposit</Badge>
              </>
            ),
            sub: "30 mins",
            right: <span className="text-[12px] font-semibold text-[#0F172A]">£40</span>,
          },
          {
            title: "Emergency appointment",
            sub: "20 mins",
            right: <span className="text-[12px] font-semibold text-[#0F172A]">£65</span>,
          },
        ]}
      />
      <p className="text-[11px] font-medium text-[#64748B] mt-3 mb-2">Choose a clinician</p>
      <div className="flex flex-wrap gap-1.5">
        <Badge tone="blue">Any practitioner</Badge> <Badge tone="grey">Dr Patel</Badge>{" "}
        <Badge tone="grey">Dr Hughes</Badge>
      </div>
      <div className="h-10" />
    </AppWindow>
  );
}

function FormStepScreen() {
  return (
    <AppWindow
      title="Health form"
      zoomSide="left"
      zoom={
        <Zoom title="You're booked in" width="w-[200px]">
          <p className="text-[11px] text-[#64748B]">Hygiene · Thu 14 Nov, 9:30</p>
          <div className="mt-2 flex gap-1.5">
            <Btn ghost>Google Calendar</Btn>
            <Btn ghost>Apple</Btn>
          </div>
        </Zoom>
      }
    >
      <Panel className="p-4 space-y-3">
        <div>
          <p className="text-[12px] font-medium text-[#0F172A]">
            Are you allergic to any medicines?
          </p>
          <div className="mt-1.5 flex gap-1.5">
            <Badge tone="blue">Yes</Badge> <Badge tone="grey">No</Badge>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-medium text-[#0F172A]">Please tell us which</p>
          <div className="mt-1.5 rounded-lg border border-[#E2E8F0] px-3 py-2 text-[12px] text-[#334155]">
            Penicillin
          </div>
        </div>
        <div>
          <p className="text-[12px] font-medium text-[#0F172A]">Signature</p>
          <div className="mt-1.5 h-12 rounded-lg border border-dashed border-[#CBD5E1] flex items-center px-3 text-[18px] italic text-[#334155]">
            S. Mitchell
          </div>
        </div>
        <div className="flex justify-end">
          <Btn>Continue</Btn>
        </div>
      </Panel>
      <div className="h-12" />
    </AppWindow>
  );
}

function PortalScreen() {
  return (
    <AppWindow
      title="Your appointments"
      zoom={
        <Zoom title="Sign-in link sent" width="w-[200px]">
          <p className="text-[11px] text-[#64748B]">
            Check your email for a link. No password needed.
          </p>
        </Zoom>
      }
    >
      <Tabs items={["Appointments", "Forms", "Payments", "Details", "Consent"]} />
      <RowList
        rows={[
          {
            title: "Hygiene · Thu 14 Nov, 9:30",
            sub: "Dr Hughes",
            right: (
              <div className="flex gap-1.5">
                <Btn ghost>Rearrange</Btn>
                <Btn ghost>Cancel</Btn>
              </div>
            ),
          },
          {
            title: "New patient health form",
            sub: "Please complete before your visit",
            right: <Btn>Fill in</Btn>,
          },
          { title: "Receipt R-00042", sub: "Check-up · £55.00", right: <Btn ghost>Download</Btn> },
        ]}
      />
      <div className="h-12" />
    </AppWindow>
  );
}

function SourcesScreen() {
  return (
    <AppWindow
      title="Where bookings come from"
      zoomSide="left"
      zoom={
        <Zoom title="Cookie consent first" width="w-[200px]">
          <p className="text-[11px] text-[#64748B]">
            Your Google Analytics, Google Ads and Meta tags load only after the patient accepts.
          </p>
        </Zoom>
      }
    >
      <Table
        grid="grid-cols-[1.6fr_1fr_1fr]"
        cols={["Source", "Bookings", "New patients"]}
        rows={[
          ["Google Business Profile", "18", "9"],
          ["Your website", "14", "5"],
          ["Instagram", "7", "6"],
          ["Google Ads", "5", "4"],
        ]}
      />
      <div className="h-16" />
    </AppWindow>
  );
}

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Online booking and portal", to: PATH },
    ],
    title: "Online booking and a",
    highlight: "patient portal",
    intro:
      "Patients book the right treatment at a time that's really free, then manage their appointments without calling you.",
    visual: (
      <PhotoPanel
        src="/images/pages/hero-booking.webp"
        alt="Man looking at his phone"
        height={933}
        position="object-[55%_35%]"
      >
        <BookingPriceCard className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10" />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Your own booking page",
      body: "One link for your website, Google profile and social pages, showing only times that are really free.",
      points: [
        "Treatments with prices and durations",
        "Choose a clinician, or any available",
        "Protected from spam bookings",
      ],
      visual: <BookingScreen />,
    },
    {
      title: "Health forms inside the booking",
      body: "If a treatment needs a health form, patients fill it in and sign before they finish booking.",
      points: [
        "Answers go straight to the patient record",
        "Signature on screen",
        "Add to Google or Apple calendar",
      ],
      visual: <FormStepScreen />,
    },
    {
      title: "A portal with no password",
      body: "Patients sign in with a link sent to their email and look after their own appointments.",
      points: [
        "Cancel or rearrange appointments",
        "Fill in outstanding forms",
        "Download receipts and update details",
      ],
      visual: <PortalScreen />,
    },
    {
      title: "Know where bookings come from",
      body: "Every online booking records where the patient came from, so you can see what's working.",
      points: [
        "Google, social, ads and your website",
        "Your analytics tags, after cookie consent",
        "Bookings by source in your reports",
      ],
      visual: <SourcesScreen />,
    },
  ],
  others: othersFor(["calendar", "forms", "reminders"]),
  faq: [
    {
      question: "Do existing patients need an account?",
      answer:
        "No password. Existing patients sign in with a link sent to their email, then book or manage their appointments.",
    },
    {
      question: "Can patients cancel or rearrange online?",
      answer:
        "Yes, from the portal. Inside your late-cancellation window they can still cancel, but rearranging asks them to call you.",
    },
    {
      question: "Do patients see our prices?",
      answer:
        "Yes. Each treatment shows its price, or Free, and how long it takes. Treatments that need a deposit are labelled.",
    },
    {
      question: "Can patients join a waitlist online?",
      answer:
        "Yes, if you switch it on. They choose a clinician or any, the days and times that suit them, and how long they can wait.",
    },
    {
      question: "Does it work with Google Analytics and ad tracking?",
      answer:
        "Yes. Add your Google Analytics, Google Ads or Meta Pixel IDs and they load only after the patient accepts cookies. Every booking also records its source for your reports.",
    },
  ],
};

export const Route = createFileRoute("/features/online-booking")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Online booking and patient portal for dental practices | DentDock",
      description:
        "Your own dental booking page with prices, clinicians and only free times, health forms inside the booking, and a patient portal with no password. £49 a month.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Online booking and portal", path: PATH },
      ],
      faq: content.faq,
    }),
});
