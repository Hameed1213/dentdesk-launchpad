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

const FormVisual = () => (
  <div className="w-[210px] rounded-[26px] bg-foreground/90 p-1.5 shadow-xl">
    <div className="rounded-[18px] bg-white overflow-hidden">
      {/* Status bar */}
      <div className="h-4 bg-[#2563EB]/5 flex items-center justify-between px-3">
        <span className="text-[7px] font-semibold text-foreground">9:41</span>
        <div className="flex items-center gap-0.5">
          <div className="w-1 h-1 rounded-full bg-foreground/60" />
          <div className="w-1 h-1 rounded-full bg-foreground/60" />
          <div className="w-1 h-1 rounded-full bg-foreground/60" />
        </div>
      </div>
      {/* Progress */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between text-[7px] mb-1">
          <span className="text-muted-foreground">Step 2 of 4</span>
          <span className="font-semibold text-[#2563EB]">50%</span>
        </div>
        <div className="h-1 rounded-full bg-[#2563EB]/10 overflow-hidden">
          <div className="h-full w-1/2 bg-[#2563EB] rounded-full" />
        </div>
      </div>
      {/* Title */}
      <div className="px-3 pt-3 pb-2">
        <div className="text-[10px] font-bold text-foreground">
          Medical history
        </div>
      </div>
      {/* Fields */}
      <div className="px-3 space-y-2 pb-3">
        <div>
          <div className="text-[7px] text-muted-foreground mb-0.5">
            Allergies
          </div>
          <div className="h-5 rounded-md border border-[#2563EB]/30 bg-[#2563EB]/5 flex items-center px-1.5">
            <span className="text-[8px] text-foreground">Penicillin</span>
          </div>
        </div>
        <div>
          <div className="text-[7px] text-muted-foreground mb-0.5">
            Medications
          </div>
          <div className="h-5 rounded-md border border-neutral-200 bg-white flex items-center px-1.5">
            <span className="text-[8px] text-muted-foreground">None</span>
          </div>
        </div>
        <div>
          <div className="text-[7px] text-muted-foreground mb-0.5">
            Pregnant?
          </div>
          <div className="flex gap-1">
            <div className="flex-1 h-5 rounded-md border border-neutral-200 bg-white flex items-center justify-center text-[8px] text-muted-foreground">
              Yes
            </div>
            <div className="flex-1 h-5 rounded-md border border-[#2563EB] bg-[#2563EB]/10 flex items-center justify-center text-[8px] font-semibold text-[#2563EB]">
              No
            </div>
          </div>
        </div>
        {/* Submit */}
        <button className="w-full h-6 rounded-md bg-[#2563EB] text-white text-[8px] font-semibold mt-1">
          Continue
        </button>
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
    <div className="rounded-xl bg-white/80 backdrop-blur-md border border-white shadow-sm p-4 overflow-hidden">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg bg-[#2563EB]/5 px-2.5 py-2">
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
        <div className="rounded-lg bg-[#2563EB]/5 px-2.5 py-2">
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
      <div className="rounded-lg bg-[#2563EB]/5 p-2">
        <svg
          viewBox="0 0 240 80"
          className="w-full h-[60px]"
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
            strokeWidth="2"
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
        "drop-shadow(0 20px 40px rgba(0,0,0,0.15)) drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
    }}
  >
    {/* Screen bezel */}
    <div
      className="w-full overflow-hidden"
      style={{
        background: "#1a1a1a",
        padding: "8px 8px 0 8px",
        borderRadius: "12px 12px 0 0",
      }}
    >
      {/* Browser window */}
      <div className="bg-[#f8fafc] rounded-t-lg overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f1f5f9] border-b border-[#e2e8f0]">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-neutral-400 font-mono text-center truncate">
            book.dentdock.co.uk/portal
          </div>
        </div>

        {/* Portal content */}
        <div className="p-3 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[9px] text-neutral-400 font-medium">
                Hello,
              </div>
              <div className="text-[13px] font-bold text-[#0f172a]">Sarah</div>
            </div>
            <div className="text-[9px] font-semibold text-[#2563EB] bg-[#eff6ff] px-2 py-1 rounded-lg">
              + Book appointment
            </div>
          </div>

          {/* Upcoming card */}
          <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-xl p-3 mb-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8px] font-semibold text-blue-100 uppercase tracking-wide">
                Upcoming
              </span>
              <span className="text-[8px] font-semibold bg-emerald-400 text-emerald-950 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <Check size={7} strokeWidth={3} /> Confirmed
              </span>
            </div>
            <div className="text-[12px] font-bold text-white mb-1">
              Hygiene check
            </div>
            <div className="text-[9px] text-blue-100 flex items-center gap-1">
              <Calendar size={8} />
              <span>Thu 18 Apr · 10:30</span>
            </div>
            <div className="text-[9px] text-blue-100/90 mt-0.5">
              Dr. James Webb
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button className="flex-1 text-[9px] font-semibold text-[#475569] bg-[#f8fafc] border border-[#e2e8f0] rounded-lg py-1.5 flex items-center justify-center gap-1">
              <Calendar size={9} /> Reschedule
            </button>
            <button className="flex-1 text-[9px] font-semibold text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg py-1.5 flex items-center justify-center gap-1">
              <X size={9} /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Laptop hinge */}
    <div
      style={{
        height: "10px",
        background: "linear-gradient(to bottom, #2a2a2a, #1a1a1a)",
        borderRadius: "0 0 4px 4px",
        width: "100%",
      }}
    />
    {/* Laptop bottom (slightly wider) */}
    <div
      style={{
        height: "6px",
        background: "#222",
        borderRadius: "0 0 8px 8px",
        width: "108%",
        marginLeft: "-4%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    />
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
    title: "Every patient. Every detail.",
    visual: <PatientRecordVisual />,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    Icon: Monitor,
    title: "Patients manage themselves.",
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
    Icon: TrendingUp,
    title: "Know your numbers.",
    visual: <AnalyticsVisual />,
    span: "md:col-span-2 md:row-span-1",
  },
  {
    Icon: MessageSquare,
    title: "Patients never miss an appointment.",
    visual: <SmsVisual />,
    span: "md:col-span-3 md:row-span-1",
  },
  {
    Icon: FileCheck,
    title: "Paperless from day one.",
    visual: <FormVisual />,
    span: "md:col-span-3 md:row-span-1",
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
                className={`group relative ${cell.popOut ? "overflow-visible" : "overflow-hidden"} border border-neutral-100 bg-white/30 backdrop-blur-xl backdrop-saturate-150 p-8 flex flex-col rounded-2xl shadow-none transition-all duration-300 hover:bg-white/40 hover:-translate-y-1 hover:border-neutral-200 ${cell.span}`}
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
                      <h3 className="text-[19px] font-semibold text-foreground tracking-tight leading-snug max-w-[220px]">
                        {cell.title}
                      </h3>
                    </div>
                    {cell.popOut ? (
                      <div
                        className="absolute right-[-24px] top-[-40px] w-[58%] pointer-events-none"
                        style={{ zIndex: 20 }}
                      >
                        {cell.visual}
                      </div>
                    ) : (
                      <div
                        className="absolute right-6 top-4 flex items-start pointer-events-none"
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
