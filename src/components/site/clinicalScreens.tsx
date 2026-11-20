import { Bell, Check, Phone } from "lucide-react";
import { AppWindow } from "@/components/site/screens";
import { Badge, Btn, Field, Panel, RowList, Table, Tabs, Zoom } from "@/components/site/screenKit";

/*
 * Screens for the Dental chart and Treatment plans pages. Labels are the app's own
 * (checked against hub main e1ed624 and booking main ae3a345 on 20 Nov 2026):
 * Chart tab, Quick add, Adult | Mixed | Child, Show planned, To follow up, Resolved,
 * History | BPE & BEWE | Examination | X-rays | Treatment plans, Write up exam, Save to Notes,
 * Evaluation needed, Justified by, Taken by, Change / Entered in error, Add option,
 * Mark as recommended, Add "No treatment", Appt. 1, Issue, Estimate / Fixed quote, Valid until,
 * Replaced, Patient accepts, Sign on screen, Book, Mark done, "Treatment plan: … (visit 1 of 2)",
 * the Treatment plans page tabs and its "To act on" rows, and the patient page's
 * "Your treatment estimate", "Enter your code", "Recommended by your dentist",
 * "Accept and agree to pay £X".
 * Planned work draws as a dashed red outline with a "P" (ToothSvg.tsx). Material colours here are
 * illustrative. Names, teeth, dates and prices are examples.
 */

/* ------------------------------------------------------------------ */
/* Tooth chart                                                         */
/* ------------------------------------------------------------------ */

type Fill = "composite" | "amalgam" | "crown" | "caries";
export type ToothMark = {
  fill?: Partial<Record<"o" | "m" | "d" | "b" | "l", Fill>>;
  crown?: boolean;
  missing?: boolean;
  planned?: boolean;
};

const FILL: Record<Fill, string> = {
  composite: "#60A5FA",
  amalgam: "#64748B",
  crown: "#FBBF24",
  caries: "#F87171",
};

/** One tooth seen from above: four side surfaces round a centre (occlusal) square. */
export function Tooth({ mark = {}, label }: { mark?: ToothMark; label: string }) {
  const f = (s: "o" | "m" | "d" | "b" | "l") =>
    mark.crown ? FILL.crown : mark.fill?.[s] ? FILL[mark.fill[s]!] : "#FFFFFF";
  return (
    <div className="flex flex-col items-center gap-1 min-w-0">
      <span className="text-[8px] sm:text-[9px] text-[#94A3B8] leading-none">{label}</span>
      <svg viewBox="0 0 24 24" className="w-full max-w-[26px]" aria-hidden="true">
        <g stroke="#CBD5E1" strokeWidth="0.8" opacity={mark.missing ? 0.35 : 1}>
          <polygon points="2,2 22,2 16,8 8,8" fill={f("b")} />
          <polygon points="22,2 22,22 16,16 16,8" fill={f("d")} />
          <polygon points="2,22 22,22 16,16 8,16" fill={f("l")} />
          <polygon points="2,2 8,8 8,16 2,22" fill={f("m")} />
          <rect x="8" y="8" width="8" height="8" fill={f("o")} />
        </g>
        {mark.missing && (
          <g stroke="#475569" strokeWidth="1.6" strokeLinecap="round">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </g>
        )}
        {mark.planned && (
          <>
            <rect
              x="0.8"
              y="0.8"
              width="22.4"
              height="22.4"
              rx="3"
              fill="none"
              stroke="#DC2626"
              strokeWidth="1.3"
              strokeDasharray="2.5 1.8"
            />
          </>
        )}
      </svg>
      <span
        className={`text-[8px] font-bold leading-none ${mark.planned ? "text-[#DC2626]" : "text-transparent"}`}
      >
        P
      </span>
    </div>
  );
}

const UPPER = ["8", "7", "6", "5", "4", "3", "2", "1", "1", "2", "3", "4", "5", "6", "7", "8"];

const upperMarks: Record<number, ToothMark> = {
  2: { fill: { o: "composite", m: "composite", d: "composite" } }, // UR6 MOD composite
  3: { fill: { o: "amalgam", d: "amalgam" } }, // UR5 DO amalgam
  7: { crown: true }, // UR1 crown
  12: { fill: { o: "composite" }, planned: true }, // UL5 planned
  15: { missing: true }, // UL8 missing
};
const lowerMarks: Record<number, ToothMark> = {
  0: { missing: true }, // LR8
  2: { fill: { o: "amalgam" } }, // LR6
  13: { missing: true, planned: true }, // LL6 missing, implant planned
  12: { fill: { d: "caries" } }, // LL5 caries
};

export function ToothChart() {
  return (
    <Panel className="p-3 sm:p-4">
      <div
        className="grid gap-[2px] sm:gap-1"
        style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
      >
        {UPPER.map((n, i) => (
          <Tooth key={`u${i}`} label={n} mark={upperMarks[i]} />
        ))}
      </div>
      <div className="my-2 border-t border-dashed border-[#E2E8F0]" />
      <div
        className="grid gap-[2px] sm:gap-1"
        style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
      >
        {UPPER.map((n, i) => (
          <Tooth key={`l${i}`} label={n} mark={lowerMarks[i]} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-[#64748B]">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm" style={{ background: FILL.composite }} />
          Composite
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm" style={{ background: FILL.amalgam }} />
          Amalgam
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm" style={{ background: FILL.crown }} />
          Crown
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-sm" style={{ background: FILL.caries }} />
          Caries
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-[#DC2626]" />
          Planned
        </span>
      </div>
    </Panel>
  );
}

const CHART_TABS = ["History", "BPE & BEWE", "Examination", "X-rays", "Treatment plans"];

/** The Chart tab: top bar, the chart and the tabs underneath. */
export function ChartScreen() {
  return (
    <AppWindow
      title="Sarah Mitchell · Chart"
      zoom={
        <Zoom title="Quick add" width="w-[200px]">
          <div className="rounded-lg border border-[#2563EB] bg-white px-3 py-2 font-mono text-[12px] text-[#0F172A]">
            ur6 mod co
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#334155]">
            <Check className="w-3.5 h-3.5 text-emerald-600" /> UR6 MOD composite
          </p>
        </Zoom>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex gap-1">
          {["Adult", "Mixed", "Child"].map((t, i) => (
            <span
              key={t}
              className={`rounded-md px-2 py-1 text-[10px] ${i === 0 ? "bg-[#2563EB] text-white font-semibold" : "bg-white border border-[#E2E8F0] text-[#475569]"}`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#475569]">
          <span className="rounded-md border border-[#E2E8F0] bg-white px-2 py-1">
            To follow up · 2
          </span>
          <span className="rounded-md border border-[#E2E8F0] bg-white px-2 py-1">
            Show planned
          </span>
        </div>
      </div>
      <ToothChart />
      <div className="mt-3">
        <Tabs items={CHART_TABS} />
      </div>
      <div className="h-6" />
    </AppWindow>
  );
}

/** Findings to follow up, with Resolved. */
export function FollowUpScreen() {
  return (
    <AppWindow
      title="To follow up"
      zoomSide="left"
      zoom={
        <Zoom title="Resolved" width="w-[200px]">
          <Field label="What happened?" value="Filled 20 Nov, composite" />
        </Zoom>
      }
    >
      <p className="mb-2 text-[11px] text-[#64748B]">Urgent first, then the longest open</p>
      <RowList
        rows={[
          {
            title: "Caries · LL5 D",
            sub: "Found 20 Nov · Dr Patel",
            right: <Badge tone="red">Urgent</Badge>,
          },
          { title: "Watch · UR4 O", sub: "Open 8 months", right: <Btn ghost>Resolved</Btn> },
          { title: "Tooth wear · LL3", sub: "Open 5 months", right: <Btn ghost>Resolved</Btn> },
          { title: "Fracture · UL2", sub: "Open 3 weeks", right: <Btn ghost>Resolved</Btn> },
        ]}
      />
      <div className="h-12" />
    </AppWindow>
  );
}

function Sextants({ values }: { values: string[] }) {
  return (
    <div className="grid grid-cols-3 border border-[#CBD5E1] rounded-lg overflow-hidden">
      {values.map((v, i) => (
        <span
          key={i}
          className={`py-3 text-center text-[16px] font-semibold text-[#0F172A] ${i < 3 ? "border-b" : ""} ${i % 3 !== 2 ? "border-r" : ""} border-[#CBD5E1]`}
        >
          {v}
        </span>
      ))}
    </div>
  );
}

/** BPE and BEWE grids. */
export function BpeScreen() {
  return (
    <AppWindow
      title="Sarah Mitchell · Chart"
      zoom={
        <Zoom title="BPE due" width="w-[190px]">
          <p className="flex items-center gap-1.5 text-[11px] text-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#DC2626]" /> Shown on the tab when it's time
          </p>
        </Zoom>
      }
    >
      <Tabs items={["BPE & BEWE", "History", "Examination", "X-rays", "Treatment plans"]} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Panel className="p-3">
          <p className="mb-2 text-[11px] font-semibold text-[#0F172A]">BPE · 20 Nov</p>
          <Sextants values={["2", "1", "3", "2", "4*", "1"]} />
          <p className="mt-2 text-[10px] text-[#64748B]">* furcation</p>
        </Panel>
        <Panel className="p-3">
          <p className="mb-2 text-[11px] font-semibold text-[#0F172A]">BEWE · 20 Nov</p>
          <Sextants values={["1", "0", "2", "0", "1", "1"]} />
          <p className="mt-2 text-[10px] text-[#64748B]">Total 5</p>
        </Panel>
      </div>
      <div className="h-8" />
    </AppWindow>
  );
}

/** Examination with soft tissue areas, and Write up exam. */
export function ExamScreen() {
  const rows: [string, boolean][] = [
    ["Lips", false],
    ["Buccal mucosa, left", false],
    ["Tongue, sides", true],
    ["Floor of the mouth", false],
    ["Hard palate", false],
  ];
  return (
    <AppWindow
      title="Recall exam"
      zoomSide="left"
      zoom={
        <Zoom title="Write up exam" width="w-[230px]">
          <p className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 text-[11px] leading-[1.45] text-[#334155]">
            Recall exam. Soft tissue: white patch on the left side of the tongue, 4 mm, smooth.
            Monitor. BPE 2 1 3 / 2 4* 1.
          </p>
          <div className="mt-2 flex justify-end">
            <Btn>Save to Notes</Btn>
          </div>
        </Zoom>
      }
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold text-[#0F172A]">Soft tissue</p>
        <Btn ghost>No abnormality in all areas</Btn>
      </div>
      <RowList
        rows={rows.map(([area, abnormal]) => ({
          title: area,
          sub: abnormal ? "4 mm · white · smooth · Monitor" : undefined,
          right: abnormal ? (
            <Badge tone="amber">Abnormal</Badge>
          ) : (
            <Badge tone="grey">No abnormality</Badge>
          ),
        }))}
      />
      <div className="h-14" />
    </AppWindow>
  );
}

/** The X-ray log. */
export function XrayScreen() {
  return (
    <AppWindow
      title="X-rays"
      zoom={
        <Zoom title="Bitewing, right" width="w-[210px]">
          <div className="space-y-1.5 text-[11px] text-[#334155]">
            <p>
              Justified by <span className="font-medium text-[#0F172A]">Dr Patel</span>
            </p>
            <p>
              Taken by <span className="font-medium text-[#0F172A]">Amy Clarke</span>
            </p>
            <p>
              Exposure <span className="font-medium text-[#0F172A]">Practice standard</span>
            </p>
            <p>
              Image quality <span className="font-medium text-[#0F172A]">Acceptable</span>
            </p>
          </div>
        </Zoom>
      }
    >
      <Table
        grid="grid-cols-[1.2fr_0.8fr_1.4fr]"
        cols={["Type", "Teeth", "Evaluation"]}
        rows={[
          ["Bitewing, right", "UR/LR 4-7", "Caries LL5 distal"],
          ["Periapical", "UL2", "No periapical change"],
          ["Bitewing, left", "UL/LL 4-7", <Badge tone="red">Evaluation needed</Badge>],
          ["Panoramic (DPT)", "Whole mouth", "LL8 impacted"],
        ]}
      />
      <div className="h-14" />
    </AppWindow>
  );
}

/** History: nothing is deleted. */
export function HistoryScreen() {
  return (
    <AppWindow
      title="Full history for UR5"
      zoomSide="left"
      zoom={
        <Zoom title="Changed" width="w-[210px]">
          <p className="text-[11px] text-[#334155]">Reason: wrong surface</p>
          <p className="mt-1 text-[11px] text-[#64748B]">
            Responsible: Dr Patel · entered by Amy Clarke
          </p>
        </Zoom>
      }
    >
      <RowList
        rows={[
          {
            title: "UR5 DO amalgam",
            sub: "20 Nov · Dr Patel",
            right: <Badge tone="blue">Current</Badge>,
          },
          {
            title: <span className="line-through text-[#94A3B8]">UR5 MO amalgam</span>,
            sub: "Changed on 20 Nov by Amy Clarke",
            right: <Badge tone="grey">Changed</Badge>,
          },
          {
            title: "UR5 fissure sealant",
            sub: "3 Mar 2024 · Dr Shah",
            right: <Badge tone="grey">Replaced</Badge>,
          },
        ]}
      />
      <div className="h-14" />
    </AppWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Treatment plans                                                     */
/* ------------------------------------------------------------------ */

function PlanLine({
  name,
  tooth,
  tag,
  price,
  optional = false,
}: {
  name: string;
  tooth: string;
  tag: string;
  price: string;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 text-[11px] border-b last:border-b-0 border-[#F1F5F9]">
      <div className="min-w-0">
        <p className="font-medium text-[#0F172A] truncate">{name}</p>
        <p className="text-[10px] text-[#64748B]">{tooth}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {optional && <Badge tone="grey">Optional</Badge>}
        <Badge tone={tag === "NHS" ? "green" : "blue"}>{tag}</Badge>
        <span className="w-[52px] text-right font-medium text-[#0F172A]">{price}</span>
      </div>
    </div>
  );
}

/** Building a plan: options, visits and lines from the price list. */
export function PlanBuilderScreen() {
  return (
    <AppWindow
      title="Replace LL6"
      zoom={
        <Zoom title="Option A" width="w-[200px]">
          <Badge tone="blue">Recommended</Badge>
          <ul className="mt-2 space-y-1 text-[11px] text-[#334155]">
            <li>Benefits</li>
            <li>Risks</li>
            <li>Prognosis</li>
            <li>Guarantee</li>
          </ul>
        </Zoom>
      }
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="rounded-full bg-[#2563EB] px-2.5 py-1 text-[11px] font-semibold text-white">
          Option A · Implant
        </span>
        <span className="rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 text-[11px] text-[#475569]">
          Option B · Bridge
        </span>
        <span className="rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 text-[11px] text-[#475569]">
          No treatment
        </span>
      </div>
      <Panel className="mb-2">
        <p className="px-3 pt-2 text-[10px] font-semibold text-[#64748B]">Appt. 1</p>
        <PlanLine name="Implant placement" tooth="LL6" tag="Private" price="£1,950" />
        <PlanLine name="Hygiene visit" tooth="Whole mouth" tag="Private" price="£75" />
      </Panel>
      <Panel>
        <p className="px-3 pt-2 text-[10px] font-semibold text-[#64748B]">
          Appt. 2 · 12 weeks after the previous visit
        </p>
        <PlanLine name="Implant crown" tooth="LL6" tag="Private" price="£950" />
        <PlanLine name="Tooth whitening" tooth="Whole mouth" tag="Private" price="£300" optional />
      </Panel>
      <div className="mt-2 flex justify-end text-[12px] font-semibold text-[#0F172A]">
        Total £3,275
      </div>
      <div className="h-6" />
    </AppWindow>
  );
}

/** Issuing an estimate, with versions. */
export function IssueScreen() {
  return (
    <AppWindow
      title="Issue"
      zoomSide="left"
      zoom={
        <Zoom title="Versions" width="w-[200px]">
          <div className="space-y-1.5 text-[11px]">
            <p className="flex justify-between">
              <span className="text-[#0F172A] font-medium">Version 2</span>
              <Badge tone="amber">Awaiting decision</Badge>
            </p>
            <p className="flex justify-between text-[#64748B]">
              <span>Version 1</span>
              <span>Replaced 18 Nov</span>
            </p>
          </div>
        </Zoom>
      }
    >
      <Panel className="p-4 space-y-3">
        <div className="flex gap-1.5">
          <span className="rounded-md bg-[#2563EB] px-2.5 py-1 text-[11px] font-semibold text-white">
            Estimate
          </span>
          <span className="rounded-md bg-white border border-[#E2E8F0] px-2.5 py-1 text-[11px] text-[#475569]">
            Fixed quote
          </span>
        </div>
        <Field label="Valid until" value="18 Feb 2027" />
        <Field
          label="Payment terms and notes for the patient"
          value="Implant fee due at the first visit."
        />
        <div className="flex justify-end gap-2">
          <Btn ghost>Print estimate</Btn>
          <Btn>Issue version 2</Btn>
        </div>
      </Panel>
      <div className="h-12" />
    </AppWindow>
  );
}

/** The patient's plan page on a phone. */
export function AcceptOnlinePhone() {
  return (
    <div className="relative pb-4">
      <div className="rounded-[28px] bg-gradient-to-br from-[#EFF6FF] to-[#E0EAFF] ring-1 ring-[#DBEAFE] py-10 px-4">
        <div className="mx-auto w-[280px] rounded-[40px] border-[10px] border-[#0F172A] bg-white shadow-[0_30px_70px_-35px_rgba(15,23,42,0.45)] overflow-hidden">
          <div className="px-4 pt-7 pb-4">
            <p className="text-[10px] text-[#64748B]">Smile Dental</p>
            <p className="mt-0.5 text-[15px] font-semibold text-[#0F172A]">
              Your treatment estimate
            </p>
            <p className="mt-1 text-[10px] text-[#64748B]">
              Dr Patel has prepared this estimate for you on 18 Nov.
            </p>
            <div className="mt-3 rounded-xl border-2 border-[#2563EB] p-3">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#0F172A]">Option A · Implant</p>
                <Badge tone="blue">Chosen</Badge>
              </div>
              <p className="mt-1 text-[10px] text-[#2563EB]">Recommended by your dentist</p>
              <p className="mt-2 text-[10px] text-[#334155]">
                Implant placement · Hygiene visit · Implant crown
              </p>
              <p className="mt-1 text-[10px] text-[#64748B]">
                Tooth whitening · You can leave this out
              </p>
            </div>
            <div className="mt-2 rounded-xl border border-[#E2E8F0] p-3">
              <p className="text-[12px] font-medium text-[#0F172A]">Option B · Bridge</p>
            </div>
            <div className="mt-3 rounded-lg bg-[#2563EB] py-2 text-center text-[11px] font-semibold text-white">
              Accept and agree to pay £2,975
            </div>
            <div className="mt-1.5 rounded-lg border border-[#E2E8F0] py-2 text-center text-[11px] font-medium text-[#334155]">
              Decline
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 right-3 lg:-right-8 z-10 w-[220px] rounded-2xl bg-white ring-4 ring-[#DBEAFE] shadow-[0_20px_50px_-15px_rgba(37,99,235,0.45)] p-4 max-sm:scale-[0.85] origin-bottom-right">
        <p className="text-[12px] font-semibold text-[#0F172A]">Enter your code</p>
        <p className="mt-1 text-[11px] text-[#64748B]">
          We've texted a 6-digit code to 07••• •••089.
        </p>
        <div className="mt-2 flex gap-1">
          {["4", "8", "1", "", "", ""].map((d, i) => (
            <span
              key={i}
              className="w-6 h-7 rounded-md border border-[#CBD5E1] flex items-center justify-center text-[12px] font-semibold text-[#0F172A]"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Booking from a plan, and marking work done. */
export function BookFromPlanScreen() {
  return (
    <AppWindow
      title="New appointment"
      zoom={
        <Zoom title="Visit 1 of 2" width="w-[200px]">
          <div className="space-y-1.5 text-[11px] text-[#334155]">
            <p className="flex items-center justify-between">
              Implant placement <Badge tone="green">Done</Badge>
            </p>
            <p className="flex items-center justify-between">
              Hygiene visit <Btn ghost>Mark done</Btn>
            </p>
          </div>
        </Zoom>
      }
    >
      <Panel className="p-4 space-y-3">
        <p className="inline-flex rounded-md bg-[#EFF6FF] px-2 py-1 text-[11px] font-medium text-[#1D4ED8]">
          Treatment plan: Replace LL6 (visit 1 of 2)
        </p>
        <Field label="Patient" value="Sarah Mitchell" />
        <Field label="Treatment" value="Implant placement LL6 + Hygiene visit" />
        <div className="grid grid-cols-3 gap-2">
          <Field label="Length" value="90 min" />
          <Field label="Clinician" value="Dr Patel" />
          <Field label="Price" value="£2,025" />
        </div>
        <div className="flex justify-end">
          <Btn>Book</Btn>
        </div>
      </Panel>
      <div className="h-10" />
    </AppWindow>
  );
}

/** The practice-wide Treatment plans page. */
export function TreatmentPlansScreen() {
  return (
    <AppWindow
      title="Treatment plans"
      zoomSide="left"
      zoom={
        <Zoom title="Notification" width="w-[220px]">
          <p className="flex items-start gap-2 text-[11px] text-[#334155]">
            <Bell className="w-3.5 h-3.5 mt-0.5 text-[#2563EB] flex-shrink-0" />
            Ella Morgan accepted Replace LL6 online: Option A
          </p>
        </Zoom>
      }
    >
      <p className="mb-3 text-[11px] text-[#475569]">
        This month: 12 issued · 7 accepted (58%) · £8,420.00 accepted · 3 waiting
      </p>
      <Tabs items={["To act on · 3", "Waiting for a decision", "Accepted", "Declined", "All"]} />
      <RowList
        rows={[
          {
            title: "James Turner · Crown UR6",
            sub: "Call back · afternoon · asked today",
            right: (
              <Btn ghost>
                <Phone className="w-3 h-3" /> Call
              </Btn>
            ),
          },
          {
            title: "Priya Kaur · Composite bonding",
            sub: "Expires in 3 days",
            right: <Btn ghost>Open plan</Btn>,
          },
          {
            title: "Ella Morgan · Replace LL6",
            sub: "Accepted online 20 Nov · to book",
            right: <Btn>Book</Btn>,
          },
        ]}
      />
      <div className="h-12" />
    </AppWindow>
  );
}
