import type { ReactNode } from "react";
import { Check, MessageCircle, X } from "lucide-react";
import PageShell from "@/components/site/PageShell";
import { ClosingBand, FloatCard, PhotoPanel, Reveal, TrustStrip } from "@/components/site/ui";
import {
  FaqSection,
  FeatureCards,
  PageHeroSplit,
  SectionTitle,
  type Faq,
} from "@/components/site/templates";
import { at } from "@/components/site/solutionTemplates";
import { AppWindow, Toggle } from "@/components/site/screens";
import { Panel, Zoom } from "@/components/site/screenKit";

/*
 * Compare pages (DentDock vs a named system). The text on these pages is Hariss's and is kept as
 * written, apart from the switching lines (12 Nov 2026): no "live in a day", and appointment history
 * is not imported. Layout follows the rest of the site.
 */

export type Cell = { included: boolean; caveat?: string };
export const yes = (caveat?: string): Cell => ({ included: true, caveat });
export const no = (caveat?: string): Cell => ({ included: false, caveat });
export type CompareRow = { feature: string; dentDock: Cell; them: Cell };
export type CompareCategory = { title: string; rows: CompareRow[] };

export type CompareContent = {
  path: string;
  /** Short name used in headings and the table, e.g. "Dentally". */
  name: string;
  intro: string;
  photo: { src: string; alt: string; height: number; position: string };
  /** Their price as shown in the hero card and table header. */
  price: { main: string; sub: string };
  pills: string[];
  fitThem: string[];
  fitThemNote: string;
  verified: string;
  categories: CompareCategory[];
  disclaimer: string;
};

/* ------------------------------------------------------------------ */
/* Shared text (the same on every compare page)                        */
/* ------------------------------------------------------------------ */

const dentDockFit = [
  "Single-site UK private practices",
  "24/7 patient booking, without the phone calls",
  "Replacing manual reminders, recalls and forms",
  "Taking deposits and reducing no-shows",
  "Putting private treatment and patient experience first",
];

export const compareFaq: Faq[] = [
  {
    question: "What happens after I sign up?",
    answer:
      "You go through the 8-step setup: practice details, opening hours, treatments, team, patient import, a preview of your booking page, payments and text messages. Setting up can be done in a day. Moving from another system takes a little longer, because booked appointments and history aren't imported, and we'll help you plan it. If you get stuck, message us on WhatsApp and we'll help in real time.",
  },
  {
    question: "Do you help me move from my current system?",
    answer:
      "Yes. Export your patient list from your existing software as CSV, upload it, and we'll check the column matches with you. Patients and their recall dates come across. Appointment history, payments and charts stay in your old system, so keep access to it for past records.",
  },
  {
    question: "What if something breaks?",
    answer:
      "Message us on WhatsApp. Real human, same-day reply, no ticket queue. We handle the fix directly. As we grow we'll add more channels, but the direct-line philosophy stays.",
  },
  {
    question: "Do I have to commit to a contract?",
    answer: "No. Month-to-month, cancel any time from your settings.",
  },
  {
    question: "Who actually replies to support messages?",
    answer:
      "Always real humans, always within the same day. We don't use chatbots or AI for support, and we don't outsource. The person who built the product is the person fixing your issue.",
  },
  {
    question: "Can I export my data if I leave?",
    answer:
      "Yes. Patient lists, appointment history, forms, recall data and payments are all exportable as CSV from your settings. Your data is yours, no lock-in, no friction. If you leave, you take everything with you.",
  },
  {
    question: "What if I need a feature you don't have?",
    answer:
      "Tell us. We're a small team building close to our practices, which means we ship features fast when something matters to real customers. We can't promise every request, but we promise to listen and tell you honestly whether it's on the roadmap. Some of our best features came from a practice owner asking for them.",
  },
];

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

function PriceCard({ name, price }: { name: string; price: CompareContent["price"] }) {
  return (
    <FloatCard className={`${at.topLeft} w-[210px] p-4`}>
      <p className="text-[12px] font-semibold text-[#0F172A]">Monthly price</p>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span className="text-[12px] font-semibold text-[#2563EB]">DentDock</span>
        <span className="text-[15px] font-semibold text-[#0F172A]">£49</span>
      </div>
      <div className="mt-2 border-t border-[#EEF2FB] pt-2">
        <p className="text-[12px] text-[#64748B]">{name}</p>
        <p className="mt-0.5 text-[13px] font-semibold text-[#334155]">{price.main}</p>
      </div>
    </FloatCard>
  );
}

function SetupVisual() {
  const steps = [
    "Tell us about your practice",
    "When are you open?",
    "What services do you offer?",
    "Who's on your team?",
    "Moving from another system?",
    "Here's your booking page",
    "Accept payments",
    "Set up appointment reminders",
  ];
  return (
    <AppWindow
      title="Set up your practice"
      zoom={
        <Zoom title="Switching guides" width="w-[180px]">
          <p className="text-[11px] text-[#64748B]">
            For switching systems, and for starting fresh.
          </p>
        </Zoom>
      }
    >
      <Panel className="p-4">
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2.5 text-[12px]">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                  i < 4
                    ? "bg-[#2563EB] text-white"
                    : i === 4
                      ? "border-2 border-[#2563EB] text-[#2563EB]"
                      : "border border-[#CBD5E1] text-[#94A3B8]"
                }`}
              >
                {i < 4 ? "✓" : i + 1}
              </span>
              <span
                className={
                  i === 4
                    ? "font-semibold text-[#0F172A]"
                    : i < 4
                      ? "text-[#64748B]"
                      : "text-[#334155]"
                }
              >
                {s}
              </span>
            </li>
          ))}
        </ol>
      </Panel>
      <div className="h-10" />
    </AppWindow>
  );
}

function AutomationsVisual() {
  const rows = [
    { t: "Booking confirmations", s: "Sent the moment a slot is booked" },
    { t: "Appointment reminders", s: "72 h, 24 h and 2 h before" },
    { t: "Recall sequences", s: "When check-ups and hygiene are due" },
  ];
  return (
    <AppWindow
      title="Automations"
      zoomSide="left"
      zoom={
        <Zoom title="All active" width="w-[170px]">
          <p className="text-[11px] text-[#64748B]">Running on your account by default.</p>
        </Zoom>
      }
    >
      <Panel className="divide-y divide-[#EEF2FB]">
        {rows.map((r) => (
          <div key={r.t} className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-[12px] font-semibold text-[#0F172A]">{r.t}</p>
              <p className="text-[11px] text-[#64748B]">{r.s}</p>
            </div>
            <Toggle />
          </div>
        ))}
      </Panel>
      <div className="h-10" />
    </AppWindow>
  );
}

function SupportVisual() {
  return (
    <AppWindow
      title="Support"
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
          Hi, a patient says the booking page won't show Saturday. Can you take a look?
        </p>
        <p className="mt-2 ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#DCFCE7] px-3 py-2 text-[12px] text-[#14532D]">
          On it. Saturday is set as closed in your opening hours. Want me to walk you through
          changing it?
        </p>
      </Panel>
      <div className="h-14" />
    </AppWindow>
  );
}

const why = [
  {
    title: "Set up in a day",
    body: "Set up your practice in 8 steps yourself. No sales call, no implementation consultant. Then plan the move from your old system with us on WhatsApp.",
    points: ["Guides for switching systems, and for starting fresh"],
    visual: <SetupVisual />,
  },
  {
    title: "Ready on day one",
    body: "The work's already done. Automations, forms, recall sequences, booking confirmations are all running before you log in. Sign up, look around, take your first booking.",
    visual: <AutomationsVisual />,
  },
  {
    title: "Talk to a real human",
    body: "Need help or something not working? Message us on WhatsApp. No ticket queue, no chatbot, no escalation form. Real human, same-day reply.",
    visual: <SupportVisual />,
  },
];

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function BuiltFor({ c }: { c: CompareContent }) {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          title="What each one"
          highlight="is built for"
          intro="Different software, built for different practices."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border border-[#BFDBFE] bg-gradient-to-b from-[#EFF6FF] to-white p-7 md:p-8 flex flex-col">
              <p className="text-[19px] font-semibold text-[#2563EB]">DentDock is for</p>
              <ul className="mt-6 space-y-4 flex-1">
                {dentDockFit.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[16px] text-[#0F172A] leading-[1.5]"
                  >
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[14px] text-[#64748B]">DentDock is a flat £49 a month.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-3xl border border-[#E5EDFB] bg-[#F8FAFC] p-7 md:p-8 flex flex-col">
              <p className="text-[19px] font-semibold text-[#334155]">{c.name} is for</p>
              <ul className="mt-6 space-y-4 flex-1">
                {c.fitThem.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[16px] text-[#475569] leading-[1.5]"
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-[#94A3B8] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[14px] text-[#64748B]">{c.fitThemNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Mark({ cell }: { cell: Cell }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          cell.included ? "bg-[#2563EB]" : "bg-[#E2E8F0]"
        }`}
      >
        {cell.included ? (
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        ) : (
          <X className="w-3.5 h-3.5 text-[#64748B]" strokeWidth={3} />
        )}
      </span>
      <span className="sr-only">{cell.included ? "Included" : "Not included"}</span>
      {cell.caveat && (
        <span className="mt-1.5 text-[11px] md:text-[12px] leading-snug text-[#64748B]">
          {cell.caveat}
        </span>
      )}
    </div>
  );
}

const cols =
  "grid grid-cols-[1fr_84px_84px] sm:grid-cols-[1fr_140px_140px] md:grid-cols-[1fr_190px_190px]";

function ComparisonTable({ c }: { c: CompareContent }) {
  return (
    <section
      id="comparison-table"
      className="scroll-mt-24 bg-gradient-to-b from-[#F7F9FF] to-[#F1F5FE] border-y border-[#EEF2FB] py-16 md:py-24 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        <SectionTitle title="Feature" highlight="comparison" intro={c.verified} />
        <Reveal>
          <div className="rounded-3xl bg-white ring-1 ring-[#DBEAFE]">
            <div
              className={`${cols} items-end gap-2 rounded-t-3xl border-b border-[#E5EDFB] bg-white px-4 md:px-7 py-4`}
            >
              <p className="text-[13px] font-semibold text-[#64748B]">Features</p>
              <div className="text-center">
                <p className="text-[12px] md:text-[13px] font-semibold text-[#2563EB]">DentDock</p>
                <p className="text-[15px] md:text-[18px] font-semibold text-[#0F172A]">£49</p>
                <p className="text-[10px] md:text-[12px] text-[#64748B]">per month</p>
              </div>
              <div className="text-center">
                <p className="text-[12px] md:text-[13px] font-semibold text-[#334155] leading-tight">
                  {c.name}
                </p>
                <p className="text-[13px] md:text-[18px] font-semibold text-[#0F172A] leading-tight">
                  {c.price.main}
                </p>
                <p className="text-[10px] md:text-[12px] text-[#64748B]">{c.price.sub}</p>
              </div>
            </div>
            {c.categories.map((cat) => (
              <div key={cat.title}>
                <p className="bg-[#F7F9FF] border-b border-[#EEF2FB] px-4 md:px-7 py-3 text-[15px] md:text-[16px] font-semibold text-[#0F172A]">
                  {cat.title}
                </p>
                {cat.rows.map((r) => (
                  <div
                    key={r.feature}
                    className={`${cols} items-center gap-2 border-b border-[#F1F5F9] px-4 md:px-7 py-4`}
                  >
                    <p className="text-[14px] md:text-[16px] text-[#0F172A] leading-[1.4]">
                      {r.feature}
                    </p>
                    <Mark cell={r.dentDock} />
                    <Mark cell={r.them} />
                  </div>
                ))}
              </div>
            ))}
            <p className="px-4 md:px-7 py-5 text-center text-[14px] text-[#64748B]">
              Spotted something inaccurate? Email{" "}
              <a
                href="mailto:hello@dentdock.co.uk"
                className="font-semibold text-[#2563EB] hover:underline"
              >
                hello@dentdock.co.uk
              </a>{" "}
              and we'll fix it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ComparePage({ c }: { c: CompareContent }) {
  const visual: ReactNode = (
    <PhotoPanel
      src={c.photo.src}
      alt={c.photo.alt}
      height={c.photo.height}
      position={c.photo.position}
    >
      <PriceCard name={c.name} price={c.price} />
      <div className={`${at.bottomRight} z-10 flex flex-col items-end gap-2`}>
        {c.pills.map((p) => (
          <FloatCard key={p} className="px-4 py-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            <span className="text-[12px] font-medium text-[#0F172A]">{p}</span>
          </FloatCard>
        ))}
      </div>
    </PhotoPanel>
  );
  return (
    <PageShell>
      <PageHeroSplit
        hero={{
          crumbs: [
            { label: "Compare", to: "/compare" },
            { label: `DentDock vs ${c.name}`, to: c.path },
          ],
          title: "DentDock vs",
          highlight: c.name,
          intro: c.intro,
          visual,
        }}
      />
      <TrustStrip />
      <BuiltFor c={c} />
      <ComparisonTable c={c} />
      <FeatureCards items={why} />
      <FaqSection items={compareFaq} />
      <section className="bg-white px-6 pt-10 pb-14">
        <p className="mx-auto max-w-3xl text-center text-[12px] italic leading-[1.6] text-[#64748B]">
          {c.disclaimer}
        </p>
      </section>
      <ClosingBand />
    </PageShell>
  );
}
