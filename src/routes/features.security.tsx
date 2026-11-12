import { createFileRoute } from "@tanstack/react-router";
import { Lock, MapPin, ShieldCheck } from "lucide-react";
import { PhotoPanel } from "@/components/site/ui";
import { PlatformPage, templateHead, type PlatformContent } from "@/components/site/templates";
import { PillCard } from "@/components/site/cards";
import { AppWindow, Toggle } from "@/components/site/screens";
import { Badge, Btn, Panel, RowList, Table, Ticks, Zoom } from "@/components/site/screenKit";
import { othersFor } from "@/components/site/featurePages";

/*
 * Platform page: Security and data. Claims checked against the app on 12 Nov 2026:
 * stored in London, UK, encrypted in transit and at rest (DPA page); ICO ZC132966; two-step login with
 * an authenticator app and recovery codes, required for owners and practice managers, optional for
 * other staff; sessions lock after 60 minutes idle, sign out of other devices; per-screen permissions
 * with role defaults (enforced in the database for patients, payments, forms, services, automations,
 * settings); activity log, searchable, entries can't be edited or deleted; support access recorded in
 * the practice's audit log with a reason; full-data ZIP export (owners and managers, recorded);
 * Due for deletion: kept 11 years after last treatment (children until 25 if later), nothing deleted
 * automatically; private patient files with links that expire after 5 minutes.
 * Not claimed: read-only or consent-gated support access, all permissions enforced on the server,
 * DPIA / pen test / external audit-log copy, email unsubscribe links, automatic deletion.
 * Photo (Unsplash, free licence): 64YrPKiguAE.
 */

const PATH = "/features/security";

function StorageScreen() {
  return (
    <AppWindow
      title="Your data"
      zoom={
        <Zoom title="Stored in" width="w-[170px]">
          <p className="text-[16px] font-semibold text-[#0F172A]">London, UK</p>
          <p className="mt-0.5 text-[11px] text-[#64748B]">Encrypted at rest and in transit</p>
        </Zoom>
      }
    >
      <RowList
        rows={[
          {
            lead: <MapPin className="w-4 h-4 text-[#2563EB]" />,
            title: "Where it's stored",
            sub: "London, UK",
            right: <Badge tone="green">UK</Badge>,
          },
          {
            lead: <Lock className="w-4 h-4 text-[#2563EB]" />,
            title: "Encryption",
            sub: "In transit and at rest",
            right: <Badge tone="green">On</Badge>,
          },
          {
            lead: <ShieldCheck className="w-4 h-4 text-[#2563EB]" />,
            title: "ICO registration",
            sub: "ZC132966",
            right: <Badge tone="green">Registered</Badge>,
          },
          {
            lead: <ShieldCheck className="w-4 h-4 text-[#2563EB]" />,
            title: "Data Processing Agreement",
            sub: "Published on our website",
            right: <Btn ghost>View</Btn>,
          },
        ]}
      />
      <div className="h-14" />
    </AppWindow>
  );
}

function TwoStepScreen() {
  return (
    <AppWindow
      title="Two-step login"
      zoomSide="left"
      zoom={
        <Zoom title="Locked after an hour" width="w-[190px]">
          <p className="text-[11px] text-[#64748B]">
            Idle sessions lock after 60 minutes, with a warning first.
          </p>
        </Zoom>
      }
    >
      <Panel className="p-4">
        <p className="text-[12px] font-medium text-[#0F172A]">
          Enter the code from your authenticator app
        </p>
        <div className="mt-3 flex gap-2">
          {["4", "8", "1", "9", "0", "3"].map((d, i) => (
            <span
              key={i}
              className="w-9 h-11 rounded-lg border border-[#BFDBFE] bg-[#F8FAFF] flex items-center justify-center text-[18px] font-semibold text-[#0F172A]"
            >
              {d}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-[#64748B]">Lost your phone? Use a recovery code.</p>
        <div className="mt-3 flex justify-end">
          <Btn>Verify</Btn>
        </div>
      </Panel>
      <div className="h-14" />
    </AppWindow>
  );
}

function PermissionsScreen() {
  return (
    <AppWindow
      title="Team access"
      zoom={
        <Zoom title="Activity log" width="w-[210px]">
          <p className="text-[11px] text-[#334155]">Emma recorded a payment for Sarah M.</p>
          <p className="mt-1 text-[10px] text-[#94A3B8]">
            Today, 09:12 · can't be edited or deleted
          </p>
        </Zoom>
      }
    >
      <Table
        grid="grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]"
        cols={["Screen", "Owner", "Reception", "Nurse"]}
        rows={[
          ["Calendar", <Toggle />, <Toggle />, <Toggle />],
          ["Patients", <Toggle />, <Toggle />, <Toggle />],
          ["Payments", <Toggle />, <Toggle />, <Toggle on={false} />],
          ["Settings", <Toggle />, <Toggle on={false} />, <Toggle on={false} />],
        ]}
      />
      <div className="h-14" />
    </AppWindow>
  );
}

function ExportScreen() {
  return (
    <AppWindow
      title="Download your practice's data"
      zoomSide="left"
      zoom={
        <Zoom title="practice-export.zip" width="w-[200px]">
          <Ticks
            items={[
              "Patients and appointments",
              "Notes, forms and recalls",
              "Payments and messages",
              "Every file and photo",
            ]}
          />
        </Zoom>
      }
    >
      <Panel className="p-4">
        <p className="text-[12px] text-[#334155]">
          One ZIP with spreadsheets of your records and a folder of files for each patient. Only
          owners and managers can download it, and every download is recorded.
        </p>
        <div className="mt-4 flex justify-end">
          <Btn>Download everything</Btn>
        </div>
      </Panel>
      <div className="h-20" />
    </AppWindow>
  );
}

const content: PlatformContent = {
  hero: {
    crumbs: [
      { label: "Features", to: "/features" },
      { label: "Security and data", to: PATH },
    ],
    title: "Patient data,",
    highlight: "looked after properly",
    intro:
      "Stored in London, encrypted, and only seen by the people in your team who need to see it.",
    visual: (
      <PhotoPanel
        src="/images/pages/hero-security.webp"
        alt="Smiling dentist in his surgery"
        height={1778}
        position="object-[50%_28%]"
      >
        <PillCard
          className="absolute left-2 sm:left-3 lg:-left-6 bottom-4 sm:bottom-6 lg:bottom-10"
          icon="dot"
          text="Two-step login on"
        />
      </PhotoPanel>
    ),
  },
  features: [
    {
      title: "Stored in the UK, encrypted",
      body: "Your practice and patient records are stored in London and encrypted, under a published Data Processing Agreement.",
      points: [
        "Stored in London, UK",
        "Encrypted in transit and at rest",
        "ICO registered: ZC132966",
      ],
      visual: <StorageScreen />,
    },
    {
      title: "Two-step login",
      body: "A code from an authenticator app as well as a password, so a stolen password isn't enough.",
      points: [
        "Required for owners and practice managers",
        "Recovery codes if a phone is lost",
        "Sign out of every other device",
      ],
      visual: <TwoStepScreen />,
    },
    {
      title: "Each person sees only what they need",
      body: "Choose which screens each member of your team can use, and see what's been done in the activity log.",
      points: [
        "Access set screen by screen",
        "Payments hidden from staff who don't need them",
        "An activity log that can't be edited",
      ],
      visual: <PermissionsScreen />,
    },
    {
      title: "Your data stays yours",
      body: "Download everything in one go whenever you like, and decide what's deleted and when.",
      points: [
        "One ZIP of every record and file",
        "Nothing is deleted automatically",
        "Private files with links that expire",
      ],
      visual: <ExportScreen />,
    },
  ],
  others: othersFor(["switching", "forms", "reports"]),
  faq: [
    {
      question: "Where is our patients' data stored?",
      answer:
        "In London, UK. It's encrypted in transit and at rest. Some suppliers, such as payment and messaging providers, may process limited data elsewhere, as set out in our Privacy policy and DPA.",
    },
    {
      question: "Is DentDock registered with the ICO?",
      answer:
        "Yes. Paradigm Network Limited, which trades as DentDock, is registered with the ICO under ZC132966.",
    },
    {
      question: "Who has to use two-step login?",
      answer:
        "Owners and practice managers must use it. Other staff can switch it on, and we recommend they do.",
    },
    {
      question: "Can DentDock staff see our data?",
      answer:
        "Only if support needs to look into a problem. Each time, the reason is recorded in your practice's own audit log.",
    },
    {
      question: "How long are records kept?",
      answer:
        "DentDock lists records that have passed 11 years since the last treatment (or age 25 for children, if later) in Due for deletion. Nothing is deleted until an owner or manager reviews it.",
    },
    {
      question: "Can we take all our data with us?",
      answer:
        "Yes. Owners and managers can download everything as one ZIP at any time: spreadsheets of your records plus every file and photo.",
    },
  ],
};

export const Route = createFileRoute("/features/security")({
  component: () => <PlatformPage content={content} />,
  head: () =>
    templateHead({
      path: PATH,
      title: "Dental software security and data protection | DentDock",
      description:
        "Patient data stored in London and encrypted, two-step login, per-screen team access, an activity log and a full data export. ICO registered.",
      crumbs: [
        { name: "Features", path: "/features" },
        { name: "Security and data", path: PATH },
      ],
      faq: content.faq,
    }),
});
