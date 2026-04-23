import { Card } from "@/components/ui/card";
import {
  User,
  FileCheck,
  TrendingUp,
  Users,
  Monitor,
  Calendar,
  Check,
  X,
  MessageSquare,
} from "lucide-react";

const BLUE = "37,99,235"; // primary blue rgb triplet

/* ---------- Cell visuals ---------- */


const PatientRecordVisual = () => (
  <div className="rounded-xl bg-white/80 backdrop-blur-md border border-white shadow-sm p-5 overflow-hidden mx-auto w-full max-w-[300px]">
    {/* Header */}
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-[14px] font-bold shrink-0">
        SM
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-semibold text-foreground truncate">
          Sarah Mitchell
        </div>
        <div className="text-[10px] text-muted-foreground">
          DOB · 14 Mar 1989
        </div>
      </div>
      <span className="text-[9px] font-semibold text-[#2563EB] bg-[#2563EB]/10 rounded-full px-2 py-0.5">
        Active
      </span>
    </div>

    {/* Meta rows */}
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className="rounded-md bg-[#2563EB]/5 px-2.5 py-2">
        <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
          Last visit
        </div>
        <div className="text-[11px] font-semibold text-foreground mt-0.5">
          02 Apr 2026
        </div>
      </div>
      <div className="rounded-md bg-[#2563EB]/5 px-2.5 py-2">
        <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
          Next appt
        </div>
        <div className="text-[11px] font-semibold text-foreground mt-0.5">
          18 Apr · 10:30
        </div>
      </div>
    </div>

    {/* History */}
    <div className="mt-4">
      <div className="text-[9px] text-muted-foreground uppercase tracking-wide mb-1.5">
        Appointment history
      </div>
      <div className="space-y-0.5">
        {[
          { date: "02 Apr", svc: "Hygiene", price: "£90" },
          { date: "11 Jan", svc: "Whitening", price: "£280" },
          { date: "04 Oct", svc: "Checkup", price: "£60" },
          { date: "21 Jul", svc: "Filling", price: "£140" },
          { date: "08 Apr", svc: "Hygiene", price: "£90" },
        ].map((row) => (
          <div
            key={row.date}
            className="flex items-center justify-between text-[10px] py-1.5 border-b border-neutral-100 last:border-0"
          >
            <span className="text-muted-foreground tabular-nums w-12">
              {row.date}
            </span>
            <span className="text-foreground font-medium flex-1 truncate">
              {row.svc}
            </span>
            <span className="text-foreground font-semibold tabular-nums">
              {row.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FormsVisual = () => (
  <div
    className="w-full h-full relative"
    style={{
      filter:
        "drop-shadow(0 8px 16px rgba(0,0,0,0.06)) drop-shadow(0 2px 4px rgba(0,0,0,0.04))",
    }}
  >
    <div className="bg-white rounded-lg overflow-hidden border border-neutral-200 p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <div className="text-[12px] font-bold text-[#0f172a]">
            Medical history form
          </div>
          <div className="text-[9px] text-[#64748b] mt-0.5">Sarah Mitchell</div>
        </div>
        <span className="text-[8px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
          <Check className="w-2 h-2" strokeWidth={3} /> Signed
        </span>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[8px] mb-1">
          <span className="text-[#64748b]">Completed</span>
          <span className="font-semibold text-[#2563EB]">100%</span>
        </div>
        <div className="h-1 rounded-full bg-[#F3F6FD] overflow-hidden">
          <div className="h-full w-full bg-[#2563EB] rounded-full" />
        </div>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {[
          { label: "Allergies", value: "Penicillin" },
          { label: "Medications", value: "None" },
          { label: "Conditions", value: "None" },
          { label: "Pregnant?", value: "No" },
        ].map((f) => (
          <div
            key={f.label}
            className="bg-[#F3F6FD] border border-[#e2e8f0] rounded-lg p-1.5"
          >
            <div className="text-[7px] text-[#64748b] uppercase tracking-wide">
              {f.label}
            </div>
            <div className="text-[9px] font-semibold text-[#0f172a] mt-0.5">
              {f.value}
            </div>
          </div>
        ))}
      </div>

      {/* Signature block */}
      <div className="bg-[#F3F6FD] border border-[#e2e8f0] rounded-lg p-2 flex items-end justify-between">
        <div className="min-w-0">
          <div className="text-[7px] text-[#64748b] uppercase tracking-wide mb-0.5">
            Signature
          </div>
          <div
            className="text-[14px] text-[#0f172a] leading-none"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Sarah Mitchell
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[7px] text-[#64748b] uppercase tracking-wide mb-0.5">
            Date
          </div>
          <div className="text-[9px] font-semibold text-[#0f172a]">
            14 Apr 2026
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-[7px] text-[#94a3b8] mt-2">
        Submitted 14 Apr 2026 · 09:42
      </div>
    </div>
  </div>
);

const AnalyticsVisual = () => {
  const points = [
    { x: 0, y: 60 },
    { x: 30, y: 52 },
    { x: 60, y: 56 },
    { x: 90, y: 44 },
    { x: 120, y: 38 },
    { x: 150, y: 30 },
    { x: 180, y: 22 },
    { x: 210, y: 14 },
    { x: 240, y: 8 },
  ];
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const area = `${path} L240,80 L0,80 Z`;

  return (
    <div
      className="w-full h-full relative"
      style={{
        filter:
          "drop-shadow(0 8px 16px rgba(0,0,0,0.06)) drop-shadow(0 2px 4px rgba(0,0,0,0.04))",
      }}
    >
      <div className="rounded-xl bg-white border border-neutral-200 p-4 overflow-hidden min-h-[280px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-0.5">
              Analytics
            </div>
            <div className="text-[13px] font-semibold text-[#0f172a]">
              April 2026
            </div>
          </div>
          <div className="flex items-center gap-1">
            {["7d", "30d", "90d"].map((period) => (
              <button
                key={period}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                  period === "30d"
                    ? "bg-[#2563EB] text-white"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg bg-[#F3F6FD] px-2.5 py-2">
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
              Revenue
            </div>
            <div className="text-[15px] font-bold text-foreground tabular-nums">
              £12,840
            </div>
            <div className="text-[9px] font-semibold text-emerald-600 mt-0.5">
              ↑ 18% vs last month
            </div>
          </div>
          <div className="rounded-lg bg-[#F3F6FD] px-2.5 py-2">
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
              Bookings
            </div>
            <div className="text-[15px] font-bold text-foreground tabular-nums">
              148
            </div>
            <div className="text-[9px] font-semibold text-emerald-600 mt-0.5">
              ↑ 12% vs last month
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-3 mt-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-[2px] bg-[#2563EB] rounded-full" />
            <span className="text-[11px] font-medium text-neutral-400">
              Revenue
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-[2px] bg-[#93c5fd] rounded-full" />
            <span className="text-[11px] font-medium text-neutral-400">
              Bookings
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-lg bg-[#F3F6FD] p-2">
          <svg
            viewBox="0 0 240 80"
            className="w-full h-[120px]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="bentoFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#bentoFill)" />
            <path
              d={path}
              stroke="#2563EB"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="2" fill="#2563EB" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

const StaffVisual = () => {
  const team = [
    {
      initials: "JW",
      name: "Dr. James Webb",
      role: "Admin",
      badge: "bg-[#2563EB] text-white",
    },
    {
      initials: "SM",
      name: "Sarah M.",
      role: "Receptionist",
      badge: "bg-[#2563EB]/10 text-[#2563EB]",
    },
    {
      initials: "LP",
      name: "Lisa P.",
      role: "Hygienist",
      badge: "bg-[#2563EB]/10 text-[#2563EB]",
    },
    {
      initials: "AK",
      name: "Aaron K.",
      role: "Associate",
      badge: "bg-[#2563EB]/10 text-[#2563EB]",
    },
  ];
  return (
    <div className="rounded-xl bg-white/80 backdrop-blur-md border border-white shadow-sm p-4 overflow-hidden space-y-1.5">
      {team.map((m) => (
        <div
          key={m.initials}
          className="flex items-center gap-2.5 rounded-md px-1.5 py-1"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {m.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-foreground truncate">
              {m.name}
            </div>
          </div>
          <span
            className={`text-[9px] font-semibold rounded-full px-2 py-0.5 ${m.badge}`}
          >
            {m.role}
          </span>
        </div>
      ))}
    </div>
  );
};

const PortalVisual = () => (
  <div
    className="w-full h-full relative"
    style={{
      filter:
        "drop-shadow(0 8px 16px rgba(0,0,0,0.06)) drop-shadow(0 2px 4px rgba(0,0,0,0.04))",
    }}
  >
    {/* Browser window */}
    <div className="bg-white rounded-lg overflow-hidden border border-neutral-200 p-5">
        {/* Portal content */}
        <div className="bg-white">
          {/* Greeting */}
          <div className="text-[12px] font-bold text-[#0f172a] mb-2.5">
            Hi Sarah
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mb-2.5">
            <div className="text-[8px] font-semibold text-white bg-[#2563EB] px-2 py-1 rounded-md flex items-center gap-1">
              <Calendar size={8} /> Appointments
            </div>
            <div className="text-[8px] font-semibold text-[#475569] bg-[#F3F6FD] border border-[#e2e8f0] px-2 py-1 rounded-md">
              Forms
            </div>
            <div className="text-[8px] font-semibold text-[#475569] bg-[#F3F6FD] border border-[#e2e8f0] px-2 py-1 rounded-md">
              Payments
            </div>
            <div className="text-[8px] font-semibold text-[#475569] bg-[#F3F6FD] border border-[#e2e8f0] px-2 py-1 rounded-md">
              Details
            </div>
          </div>

          {/* Upcoming label */}
          <div className="text-[9px] font-bold text-[#0f172a] mb-1">
            Upcoming
          </div>
          {/* Upcoming appointment card */}
          <div className="bg-[#F3F6FD] border border-[#e2e8f0] rounded-lg p-2 mb-2.5 flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-[9px] font-bold text-[#0f172a] truncate">
                Hygiene check
              </div>
              <div className="text-[8px] text-[#64748b]">with Dr. J. Webb</div>
              <div className="text-[8px] text-[#64748b]">
                Thu 18 Apr · 10:30am
              </div>
            </div>
            <span className="text-[7px] font-semibold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full shrink-0">
              Confirmed
            </span>
          </div>

          {/* Past label */}
          <div className="text-[9px] font-bold text-[#0f172a] mb-1">Past</div>
          {/* Past grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { svc: "New Patient Checkup", when: "Thu 16 Apr · 3:30pm" },
              { svc: "Hygiene Appointment", when: "Thu 16 Apr · 2:30pm" },
              { svc: "Routine Checkup", when: "Wed 15 Apr · 1:45pm" },
              { svc: "Whitening", when: "Wed 15 Apr · 12:00pm" },
            ].map((p) => (
              <div
                key={p.svc + p.when}
                className="bg-[#F3F6FD] border border-[#e2e8f0] rounded-lg p-1.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="text-[8px] font-bold text-[#0f172a] truncate">
                    {p.svc}
                  </div>
                  <span className="text-[6px] font-semibold bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded-full shrink-0">
                    Confirmed
                  </span>
                </div>
                <div className="text-[7px] text-[#64748b] mt-0.5">
                  with Dr. Webb
                </div>
                <div className="text-[7px] text-[#64748b]">{p.when}</div>
                <div className="text-[7px] font-semibold text-[#2563EB] mt-0.5">
                  Book again →
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

/* ---------- SMS reminder visual ---------- */

const SmsVisual = () => (
  <div className="rounded-xl bg-white/80 backdrop-blur-md border border-white shadow-sm p-4 overflow-hidden">
    {/* Contact header */}
    <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
      <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
        SD
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-semibold text-foreground truncate">
          Smile Dental
        </div>
        <div className="text-[9px] text-muted-foreground">SMS · Today 09:00</div>
      </div>
      <MessageSquare className="w-3.5 h-3.5 text-[#2563EB]" />
    </div>

    {/* Message bubble */}
    <div className="mt-3 flex">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#2563EB]/10 border border-[#2563EB]/15 px-3 py-2">
        <p className="text-[11px] leading-snug text-foreground">
          Hi Sarah, reminder: your appointment is tomorrow at{" "}
          <span className="font-semibold">10:00am</span> — Smile Dental
        </p>
      </div>
    </div>
    <div className="mt-1.5 ml-1 flex items-center gap-1">
      <Check className="w-2.5 h-2.5 text-[#2563EB]" strokeWidth={3} />
      <span className="text-[9px] text-muted-foreground">Sent automatically</span>
    </div>
  </div>
);

/* ---------- Cell config ---------- */

const cells = [
  {
    Icon: User,
    title: "Complete patient history",
    description: "Records, history and appointments, all in one profile.",
    visual: <PatientRecordVisual />,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    Icon: Monitor,
    title: "Patients manage themselves.",
    description: "Book, reschedule, view history and fill forms, all without calling the practice.",
    visual: <PortalVisual />,
    span: "md:col-span-4 md:row-span-1",
    layout: "side" as const,
    popOut: true,
  },
  {
    Icon: Users,
    title: "Your whole team. One platform.",
    visual: <StaffVisual />,
    span: "md:col-span-2 md:row-span-1",
  },
  {
    Icon: MessageSquare,
    title: "Patients never miss an appointment.",
    visual: <SmsVisual />,
    span: "md:col-span-2 md:row-span-1",
  },
  {
    Icon: TrendingUp,
    title: "Know your numbers.",
    visual: <AnalyticsVisual />,
    span: "md:col-span-3 md:row-span-1",
    layout: "side" as const,
    popOut: true,
    titleClass: "max-w-[110px]",
    popOutClass: "absolute -right-2 left-[30%] top-[5%] pointer-events-none",
  },
  {
    Icon: FileCheck,
    title: "Paperless from day one.",
    visual: <FormsVisual />,
    span: "md:col-span-3 md:row-span-1",
    layout: "side" as const,
    popOut: true,
    titleClass: "max-w-[140px]",
    popOutClass: "absolute -right-2 left-[30%] top-[5%] pointer-events-none",
  },
];

/* ---------- Section ---------- */

export default function BentoGrid() {
  return (
    <section className="relative bg-background py-20 md:py-32 px-6 md:px-8 overflow-hidden">
      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Everything your practice needs,
            <br />
            <span className="text-[#2563EB]">in one platform</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            From patient records to analytics — built to run your whole practice.
          </p>
        </div>

        {/* Bento grid: matches reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[260px] gap-5 lg:gap-6">
          {cells.map((cell, i) => {
            const Icon = cell.Icon;
            return (
              <Card
                key={i}
                className={`group relative overflow-hidden border border-neutral-100 bg-white/30 backdrop-blur-xl backdrop-saturate-150 p-8 flex flex-col rounded-2xl shadow-none transition-all duration-300 hover:bg-white/40 hover:-translate-y-1 hover:border-neutral-200 ${cell.span}`}
              >
                {/* Inner clip wrapper for background decorations only */}
                <div aria-hidden className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {/* Subtle grid background */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-6 rounded-xl opacity-[0.45]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(0,0,0,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.07) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                  }}
                />
                {/* Soft blue orb behind visual */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 bottom-[12%] -translate-x-1/2 w-[85%] h-[40%] rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle, rgba(${BLUE},0.22) 0%, rgba(${BLUE},0.10) 45%, transparent 75%)`,
                  }}
                />
                {/* Glossy top highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
                />
                </div>

                {cell.layout === "side" ? (
                  <div className="relative flex h-full">
                    {/* Left: icon + title */}
                    <div className="flex-1 flex flex-col">
                      <div className="w-11 h-11 rounded-xl bg-white border border-neutral-100 flex items-center justify-center mb-6 shadow-sm">
                        <Icon
                          className="w-5 h-5 text-[#2563EB]"
                          strokeWidth={1.75}
                        />
                      </div>
                      <h3 className={`text-[19px] font-semibold text-foreground tracking-tight leading-snug ${("titleClass" in cell && cell.titleClass) ? cell.titleClass : "max-w-[220px]"}`}>
                        {cell.title}
                      </h3>
                      {"description" in cell && cell.description && (
                        <p className="mt-2 text-sm text-muted-foreground leading-snug max-w-[260px]">
                          {cell.description}
                        </p>
                      )}
                    </div>
                    {cell.popOut ? (
                      <div
                        className={("popOutClass" in cell && cell.popOutClass) ? cell.popOutClass : "absolute right-0 left-[32%] -top-[4%] pointer-events-none"}
                      >
                        {cell.visual}
                      </div>
                    ) : (
                      <div
                        className="absolute right-10 top-8 left-[36%] flex items-start pointer-events-none"
                        style={{ bottom: "-50%" }}
                      >
                        {cell.visual}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative flex flex-col h-full">
                    <div className="w-11 h-11 rounded-xl bg-white border border-neutral-100 flex items-center justify-center mb-6 shadow-sm">
                      <Icon
                        className="w-5 h-5 text-[#2563EB]"
                        strokeWidth={1.75}
                      />
                    </div>
                    <h3 className="text-[19px] font-semibold text-foreground tracking-tight leading-snug">
                      {cell.title}
                    </h3>
                    {"description" in cell && cell.description && (
                      <p className="mt-2 text-sm text-muted-foreground leading-snug max-w-[260px]">
                        {cell.description}
                      </p>
                    )}
                    <div className="mt-6 flex-1 flex items-end">
                      <div className="w-full">{cell.visual}</div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
