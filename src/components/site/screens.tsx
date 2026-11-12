import type { ReactNode } from "react";
import { ArrowRight, Bell, Check, MessageSquare, RefreshCw, Search } from "lucide-react";

/*
 * Larger DentDock screen mock-ups for feature pages (Jane-style: a real-looking app window,
 * plus a magnified close-up of the key detail). Wording follows the real product (checked 12 Nov 2026);
 * names, dates and counts are examples.
 */

/** Browser-style window around an app screen. `zoom` is the magnified close-up placed over a corner. */
export function AppWindow({
  url,
  title,
  children,
  zoom,
  zoomSide = "right",
}: {
  url: string;
  title: string;
  children: ReactNode;
  zoom?: ReactNode;
  zoomSide?: "left" | "right";
}) {
  return (
    <div className="relative">
      <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)]">
        <div className="h-9 bg-[#F1F5F9] border-b border-[#E2E8F0] flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-3 bg-white rounded-md px-3 py-1 text-[11px] text-[#94A3B8] text-center font-mono truncate">
            {url}
          </div>
        </div>
        <div className="h-12 border-b border-[#E2E8F0] flex items-center justify-between px-5">
          <p className="text-[15px] font-semibold text-[#0F172A]">{title}</p>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex h-7 w-[150px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 items-center gap-2 text-[11px] text-[#94A3B8]">
              <Search size={11} /> Search…
            </div>
            <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
              SD
            </div>
          </div>
        </div>
        <div className="bg-[#F8FAFC] p-4 sm:p-5">{children}</div>
      </div>
      {zoom && (
        <div
          className={`absolute -bottom-6 ${zoomSide === "right" ? "right-3 lg:-right-8" : "left-3 lg:-left-8"} z-10 rounded-2xl bg-white ring-4 ring-[#DBEAFE] shadow-[0_20px_50px_-15px_rgba(37,99,235,0.45)] p-4 max-sm:scale-[0.85] ${
            zoomSide === "right" ? "origin-bottom-right" : "origin-bottom-left"
          }`}
        >
          {zoom}
        </div>
      )}
    </div>
  );
}

function Toggle({ on = true }: { on?: boolean }) {
  return (
    <span
      className={`relative inline-flex h-5 w-9 rounded-full ${on ? "bg-[#2563EB]" : "bg-[#CBD5E1]"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? "left-[18px]" : "left-0.5"}`}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Reminders                                                          */
/* ------------------------------------------------------------------ */

export function RemindersScreen() {
  const rows = [
    { name: "Booking confirmation", when: "As soon as it's booked", on: true },
    { name: "Appointment reminder", when: "72 hours before", on: true },
    { name: "Appointment reminder", when: "24 hours before", on: true },
    { name: "Appointment reminder", when: "2 hours before", on: true },
    { name: "Recall reminder", when: "From 4 weeks before it's due", on: true },
  ];
  return (
    <AppWindow
      url="app.dentdock.co.uk/automations"
      title="Automations"
      zoom={
        <div className="w-[230px]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#2563EB]" />
            <p className="text-[12px] font-semibold text-[#0F172A]">Text to Sarah M.</p>
          </div>
          <p className="mt-2.5 rounded-xl rounded-tl-sm bg-neutral-100 px-3 py-2 text-[12px] leading-[1.45] text-[#334155]">
            Hi Sarah, a reminder of your check-up on Thu 14 Nov at 10:30. Need to change it? View
            your appointment
          </p>
          <p className="mt-2 text-[11px] text-[#64748B]">Sent 24 hours before</p>
        </div>
      }
    >
      <div className="rounded-xl bg-white border border-[#E2E8F0] divide-y divide-[#F1F5F9]">
        {rows.map((r) => (
          <div key={r.name + r.when} className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                <Bell className="w-4 h-4 text-[#2563EB]" />
              </span>
              <div>
                <p className="text-[13px] font-medium text-[#0F172A]">{r.name}</p>
                <p className="text-[11px] text-[#64748B]">{r.when}</p>
              </div>
            </div>
            <Toggle on={r.on} />
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Recalls                                                            */
/* ------------------------------------------------------------------ */

export function RecallsScreen() {
  const rows = [
    { n: "Amelia Roberts", t: "Check-up", due: "18 Nov", s: "Due this month" },
    { n: "David Khan", t: "Hygiene", due: "4 Nov", s: "1 week overdue" },
    { n: "Hannah Price", t: "Check-up", due: "27 Nov", s: "Due this month" },
    { n: "Tom Reid", t: "Check-up", due: "29 Oct", s: "2 weeks overdue" },
  ];
  return (
    <AppWindow
      url="app.dentdock.co.uk/recalls"
      title="Recalls"
      zoomSide="left"
      zoom={
        <div className="w-[210px]">
          <p className="text-[12px] font-semibold text-[#0F172A]">Recall follow-ups</p>
          <ul className="mt-2.5 space-y-2">
            {["4 weeks before", "1 week before", "1 week overdue"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-[12px] text-[#334155]">
                <span className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[11px] text-[#64748B]">Stops as soon as they book</p>
        </div>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex gap-1.5 text-[11px]">
          <span className="rounded-full bg-[#2563EB] px-2.5 py-1 font-semibold text-white">
            Due this month
          </span>
          <span className="rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 text-[#475569]">
            Overdue
          </span>
        </div>
        <span className="rounded-lg bg-[#2563EB] px-3 py-1.5 text-[11px] font-semibold text-white">
          Send reminders to 24 patients
        </span>
      </div>
      <div className="rounded-xl bg-white border border-[#E2E8F0] overflow-hidden">
        <div className="grid grid-cols-[1.4fr_0.8fr_1.2fr] sm:grid-cols-[1.4fr_1fr_0.8fr_1.2fr] px-4 py-2 text-[11px] font-medium text-[#64748B] border-b border-[#F1F5F9]">
          <span>Patient</span>
          <span className="hidden sm:block">Recall</span>
          <span>Due</span>
          <span className="text-right">Status</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.n}
            className="grid grid-cols-[1.4fr_0.8fr_1.2fr] sm:grid-cols-[1.4fr_1fr_0.8fr_1.2fr] items-center px-4 py-2.5 text-[12px] text-[#334155] border-b last:border-b-0 border-[#F8FAFC]"
          >
            <span className="font-medium text-[#0F172A]">{r.n}</span>
            <span className="hidden sm:block">{r.t}</span>
            <span>{r.due}</span>
            <span className="text-right">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  r.s.includes("overdue")
                    ? "bg-[#FEF3C7] text-[#92400E]"
                    : "bg-[#EFF6FF] text-[#1D4ED8]"
                }`}
              >
                {r.s}
              </span>
            </span>
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Fill a cancelled slot                                              */
/* ------------------------------------------------------------------ */

export function FillSlotScreen() {
  const rows = [
    { n: "James Turner", w: "Waiting 3 weeks", offered: true },
    { n: "Priya Kaur", w: "Recall due", offered: false },
    { n: "Ella Morgan", w: "Waiting 1 week", offered: false },
  ];
  return (
    <AppWindow
      url="app.dentdock.co.uk/calendar"
      title="Fill this slot"
      zoom={
        <div className="w-[210px] flex items-start gap-2.5">
          <span className="mt-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <div>
            <p className="text-[12px] font-semibold text-[#0F172A]">Booked by James Turner</p>
            <p className="mt-0.5 text-[11px] text-[#64748B]">Booked from the offer link</p>
          </div>
        </div>
      }
    >
      <div className="rounded-xl bg-white border border-[#E2E8F0] p-4 mb-3 flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold text-[#0F172A]">Thu 14 Nov · 10:30</p>
          <p className="text-[11px] text-[#64748B]">Check-up · 30 min · Dr Patel</p>
        </div>
        <span className="rounded-full bg-[#FEE2E2] px-2.5 py-1 text-[10px] font-semibold text-[#B91C1C]">
          Cancelled
        </span>
      </div>
      <p className="text-[11px] font-medium text-[#64748B] mb-2">Suggested patients</p>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.n}
            className="rounded-xl bg-white border border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between"
          >
            <div>
              <p className="text-[12px] font-medium text-[#0F172A]">{r.n}</p>
              <p className="text-[11px] text-[#64748B]">{r.w}</p>
            </div>
            {r.offered ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[10px] font-semibold text-[#166534]">
                <Check className="w-3 h-3" strokeWidth={3} /> Offered
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2.5 py-1 text-[10px] font-semibold text-white">
                Offer slot <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>
        ))}
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Message wording                                                    */
/* ------------------------------------------------------------------ */

export function MessageEditorScreen() {
  return (
    <AppWindow
      url="app.dentdock.co.uk/automations"
      title="24-hour reminder"
      zoomSide="right"
      zoom={
        <div className="w-[200px]">
          <p className="text-[12px] font-semibold text-[#0F172A]">Sends by</p>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between rounded-lg bg-[#EFF6FF] px-2.5 py-1.5 text-[11px] font-semibold text-[#1D4ED8]">
              Text <span className="font-normal text-[#64748B]">patient's choice</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#E2E8F0] px-2.5 py-1.5 text-[11px] text-[#334155]">
              Email <span className="text-[#64748B]">back-up</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-[#64748B]">Texts only 8am to 8pm</p>
        </div>
      }
    >
      <div className="rounded-xl bg-white border border-[#E2E8F0] p-4 mb-24 sm:mb-20">
        <div className="flex gap-1.5 text-[11px] mb-3">
          <span className="rounded-full bg-[#2563EB] px-2.5 py-1 font-semibold text-white">
            Text
          </span>
          <span className="rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 text-[#475569]">
            Email
          </span>
        </div>
        <div className="rounded-lg border border-[#BFDBFE] bg-[#F8FAFF] p-3 text-[12px] leading-[1.6] text-[#334155]">
          Hi <span className="rounded bg-[#DBEAFE] px-1 text-[#1D4ED8]">first name</span>, a
          reminder of your{" "}
          <span className="rounded bg-[#DBEAFE] px-1 text-[#1D4ED8]">treatment</span> at Smile
          Dental on <span className="rounded bg-[#DBEAFE] px-1 text-[#1D4ED8]">date</span> at{" "}
          <span className="rounded bg-[#DBEAFE] px-1 text-[#1D4ED8]">time</span>. Need to change it?{" "}
          <span className="rounded bg-[#DBEAFE] px-1 text-[#1D4ED8]">link</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#64748B]">
          <span className="inline-flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Saved
          </span>
          <span className="rounded-lg bg-[#2563EB] px-3 py-1.5 font-semibold text-white">
            Save wording
          </span>
        </div>
      </div>
    </AppWindow>
  );
}
