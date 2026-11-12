import { ArrowRight, Bell, Check, FileText, MessageSquare, RefreshCw } from "lucide-react";
import { FloatCard } from "@/components/site/ui";

/*
 * Small DentDock-style cards that sit on top of page photos (see docs/STYLE-GUIDE.md).
 * Wording follows the real product. Names and times are examples.
 * Position classes come from the caller so each photo can keep the cards off faces.
 */

/** A reminder text as the patient sees it (default wording, with the link to view or change). */
export function TextMessageCard({ className, when }: { className: string; when: string }) {
  return (
    <FloatCard className={`${className} w-[240px] p-4`}>
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-[#2563EB]" />
        <p className="text-[12px] font-semibold text-[#0F172A]">Text from your practice</p>
      </div>
      <p className="mt-3 rounded-xl rounded-tl-sm bg-neutral-100 px-3 py-2 text-[12px] leading-[1.45] text-[#334155]">
        Hi Sarah, a reminder of your check-up on Thu 14 Nov at 10:30. Need to change it? View your
        appointment
      </p>
      <p className="mt-2 text-[11px] text-[#64748B]">{when}</p>
    </FloatCard>
  );
}

/** The three reminder times for one appointment. */
export function ReminderTimelineCard({ className }: { className: string }) {
  const rows = [
    { t: "72 hours before", done: true },
    { t: "24 hours before", done: true },
    { t: "2 hours before", done: false },
  ];
  return (
    <FloatCard className={`${className} w-[210px] p-4`}>
      <p className="text-[13px] font-semibold text-[#0F172A]">Check-up · Thu 10:30</p>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.t} className="flex items-center gap-2 text-[12px] text-[#334155]">
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center ${r.done ? "bg-[#2563EB]" : "border-2 border-[#BFDBFE]"}`}
            >
              {r.done && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </span>
            {r.t}
          </li>
        ))}
      </ul>
    </FloatCard>
  );
}

/** Recall list with the bulk send button. */
export function RecallListCard({ className }: { className: string }) {
  const rows = [
    { n: "Amelia R.", s: "Due this month" },
    { n: "David K.", s: "1 week overdue" },
    { n: "Hannah P.", s: "Due this month" },
  ];
  return (
    <FloatCard className={`${className} w-[240px] p-4`}>
      <p className="text-[13px] font-semibold text-[#0F172A]">Recalls</p>
      <ul className="mt-2.5 space-y-1.5">
        {rows.map((r) => (
          <li
            key={r.n}
            className="flex items-center justify-between rounded-lg border border-neutral-100 px-2.5 py-1.5 text-[11px] text-[#334155]"
          >
            <span>{r.n}</span>
            <span className="text-[10px] text-[#64748B]">{r.s}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-md bg-[#2563EB] py-1.5 text-center text-[11px] font-semibold text-white">
        Send reminders to 3 patients
      </div>
    </FloatCard>
  );
}

/** "Fill this slot": waitlist suggestions with an Offer slot button. */
export function FillSlotCard({ className }: { className: string }) {
  return (
    <FloatCard className={`${className} w-[240px] p-4`}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-[#0F172A]">Fill this slot</p>
        <span className="text-[10px] text-[#64748B]">Thu · 10:30</span>
      </div>
      <div className="mt-2.5 space-y-1.5">
        {[
          { n: "James T.", w: "Waiting 3 weeks", offer: true },
          { n: "Priya K.", w: "Recall due", offer: false },
        ].map((r) => (
          <div
            key={r.n}
            className="flex items-center justify-between rounded-lg border border-neutral-100 px-2.5 py-1.5 text-[11px] text-[#334155]"
          >
            <span>
              {r.n} <span className="text-[10px] text-[#94A3B8]">· {r.w}</span>
            </span>
            {r.offer && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2 py-0.5 text-[10px] font-semibold text-white">
                Offer <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>
        ))}
      </div>
    </FloatCard>
  );
}

/** A single-line status pill. */
export function PillCard({
  className,
  text,
  icon = "bell",
}: {
  className: string;
  text: string;
  icon?: "bell" | "refresh" | "dot";
}) {
  return (
    <FloatCard className={`${className} px-4 py-2.5 flex items-center gap-2`}>
      {icon === "bell" && <Bell className="w-4 h-4 text-[#2563EB]" />}
      {icon === "refresh" && <RefreshCw className="w-4 h-4 text-[#2563EB]" />}
      {icon === "dot" && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
      <span className="text-[12px] font-medium text-[#0F172A]">{text}</span>
    </FloatCard>
  );
}

/** Missed-appointment fee decision: payment link or waive. */
export function FeeDecisionCard({ className }: { className: string }) {
  return (
    <FloatCard className={`${className} w-[220px] p-4`}>
      <p className="text-[13px] font-semibold text-[#0F172A]">Missed appointment</p>
      <p className="mt-0.5 text-[11px] text-[#64748B]">Fee £40 · Deposit £20 paid</p>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <span className="rounded-md bg-[#2563EB] py-1.5 text-center text-[11px] font-semibold text-white">
          Send link
        </span>
        <span className="rounded-md border border-neutral-200 py-1.5 text-center text-[11px] font-medium text-[#334155]">
          Waive
        </span>
      </div>
    </FloatCard>
  );
}

/** Booking page with a treatment price and a deposit badge. */
export function BookingPriceCard({ className }: { className: string }) {
  return (
    <FloatCard className={`${className} w-[220px] p-4`}>
      <p className="text-[13px] font-semibold text-[#0F172A]">Choose a treatment</p>
      <ul className="mt-2.5 space-y-1.5">
        {[
          { t: "Check-up", p: "£55", d: false },
          { t: "Hygiene", p: "£75", d: true },
        ].map((r) => (
          <li
            key={r.t}
            className="flex items-center justify-between rounded-lg border border-neutral-100 px-2.5 py-1.5 text-[11px] text-[#334155]"
          >
            <span>
              {r.t}
              {r.d && (
                <span className="ml-1.5 rounded bg-[#EFF6FF] px-1 py-0.5 text-[9px] font-semibold text-[#2563EB]">
                  Deposit
                </span>
              )}
            </span>
            <span className="font-semibold text-[#0F172A]">{r.p}</span>
          </li>
        ))}
      </ul>
    </FloatCard>
  );
}

/** Medical history completed before the visit. */
export function MedicalHistoryCard({ className }: { className: string }) {
  return (
    <FloatCard className={`${className} w-[180px] p-4`}>
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-md bg-[#EFF6FF] flex items-center justify-center">
          <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
        </span>
        <p className="text-[12px] font-semibold text-[#0F172A]">Medical history</p>
      </div>
      <p className="mt-2.5 text-[11px] font-semibold text-emerald-600">
        Completed before the visit
      </p>
    </FloatCard>
  );
}

/** Money taken this month with a small bar chart. */
export function TakingsCard({ className }: { className: string }) {
  const bars = [38, 52, 46, 64, 58, 72, 80];
  return (
    <FloatCard className={`${className} w-[210px] p-4`}>
      <p className="text-[13px] font-semibold text-[#0F172A]">Money taken</p>
      <p className="mt-0.5 text-[11px] text-[#64748B]">This month, by clinician</p>
      <div className="mt-3 flex items-end gap-1.5 h-[56px]">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t ${i === bars.length - 1 ? "bg-[#2563EB]" : "bg-[#BFDBFE]"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </FloatCard>
  );
}

/** How a message is sent: the patient's channel, with email as the back-up. */
export function ChannelCard({ className }: { className: string }) {
  return (
    <FloatCard className={`${className} w-[230px] p-4`}>
      <p className="text-[13px] font-semibold text-[#0F172A]">Send by</p>
      <ul className="mt-2.5 space-y-1.5">
        {[
          { t: "Text", d: "Patient's choice", on: true },
          { t: "Email", d: "Back-up if a text can't go", on: false },
        ].map((r) => (
          <li
            key={r.t}
            className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[12px] ${
              r.on
                ? "bg-[#EFF6FF] text-[#1D4ED8] font-semibold"
                : "border border-neutral-100 text-[#334155]"
            }`}
          >
            <span>{r.t}</span>
            <span className="text-[10px] font-normal text-[#64748B]">{r.d}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-[#64748B]">Texts go between 8am and 8pm</p>
    </FloatCard>
  );
}
