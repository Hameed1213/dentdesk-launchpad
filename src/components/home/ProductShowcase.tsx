"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Globe,
  CreditCard,
  RefreshCw,
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Bell,
  Shield,
  Zap,
  Plus,
  Paperclip,
  Send,
} from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";

/* =========================================================
   TAB METADATA
========================================================= */
const tabs = [
  "Calendar",
  "Online Booking",
  "Payments",
  "Recalls & Automations",
  "Inbox",
];

const tabIcons = [CalendarDays, Globe, CreditCard, RefreshCw, MessageSquare];

const tabDescriptions = [
  "Day, week and month views with drag and drop",
  "Branded booking page your patients actually want to use",
  "Stripe deposits, payment links and card on arrival",
  "Automated sequences that run without you",
  "All patient messages in one place",
];

const tabUrls = [
  "app.dentdock.co.uk/calendar",
  "book.dentdock.co.uk/smile-dental",
  "app.dentdock.co.uk/payments",
  "app.dentdock.co.uk/recalls",
  "app.dentdock.co.uk/inbox",
];

/* =========================================================
   SHARED MOCKUP TOPBAR (for app screens)
========================================================= */
function MockTopBar({ title }: { title: string }) {
  return (
    <div className="h-[52px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-5 flex-shrink-0">
      <div className="text-[16px] font-semibold text-[#0F172A]">{title}</div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-[180px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 flex items-center gap-2 text-[12px] text-[#94a3b8]">
          <Search size={12} />
          <span className="flex-1 truncate">Search…</span>
        </div>
        <div className="relative">
          <Bell size={16} className="text-[#64748b]" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#DC2626] rounded-full text-white text-[8px] flex items-center justify-center">
            2
          </span>
        </div>
        <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
          JW
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TAB 1 — CALENDAR
========================================================= */
function CalendarMockup() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const dates = [13, 14, 15, 16, 17];
  const hours = ["9", "10", "11", "12", "1", "2"];

  // Appointment blocks: { col, top, height, label, sub, color, bg, border }
  const appts = [
    {
      col: 0,
      top: 8,
      h: 38,
      label: "S. Mitchell",
      sub: "Whitening",
      color: "#2563EB",
      bg: "#eff6ff",
      border: "#2563EB",
    },
    {
      col: 0,
      top: 96,
      h: 26,
      label: "R. Keane",
      sub: "Checkup",
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#16a34a",
    },
    {
      col: 1,
      top: 22,
      h: 32,
      label: "M. Lombardi",
      sub: "Hygiene",
      color: "#9333ea",
      bg: "#faf5ff",
      border: "#9333ea",
    },
    {
      col: 1,
      top: 132,
      h: 38,
      label: "E. Wilson",
      sub: "Implant",
      color: "#2563EB",
      bg: "#eff6ff",
      border: "#2563EB",
    },
    {
      col: 2,
      top: 8,
      h: 22,
      label: "J. Thompson",
      sub: "Checkup",
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#16a34a",
    },
    {
      col: 2,
      top: 60,
      h: 38,
      label: "L. Patel",
      sub: "Whitening",
      color: "#2563EB",
      bg: "#eff6ff",
      border: "#2563EB",
    },
    {
      col: 2,
      top: 150,
      h: 28,
      label: "T. Hayes",
      sub: "Hygiene",
      color: "#d97706",
      bg: "#fef3c7",
      border: "#d97706",
    },
    {
      col: 3,
      top: 22,
      h: 50,
      label: "A. Brown",
      sub: "Crown fit",
      color: "#9333ea",
      bg: "#faf5ff",
      border: "#9333ea",
    },
    {
      col: 3,
      top: 110,
      h: 24,
      label: "K. Singh",
      sub: "Consult",
      color: "#16a34a",
      bg: "#f0fdf4",
      border: "#16a34a",
    },
    {
      col: 4,
      top: 8,
      h: 32,
      label: "P. Adams",
      sub: "Hygiene",
      color: "#2563EB",
      bg: "#eff6ff",
      border: "#2563EB",
    },
    {
      col: 4,
      top: 80,
      h: 44,
      label: "N. Carter",
      sub: "Implant rev.",
      color: "#9333ea",
      bg: "#faf5ff",
      border: "#9333ea",
    },
    {
      col: 4,
      top: 160,
      h: 22,
      label: "G. Hall",
      sub: "Checkup",
      color: "#d97706",
      bg: "#fef3c7",
      border: "#d97706",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] h-full flex flex-col">
      <MockTopBar title="Calendar" />
      <div className="p-4 flex-1 overflow-hidden flex flex-col gap-3">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-[15px] font-semibold text-[#0F172A]">
              April 2026
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button className="w-6 h-6 rounded-md border border-[#E2E8F0] bg-white text-[#64748b] text-[11px] flex items-center justify-center">
                ‹
              </button>
              <button className="w-6 h-6 rounded-md border border-[#E2E8F0] bg-white text-[#64748b] text-[11px] flex items-center justify-center">
                ›
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-[#E2E8F0] rounded-lg p-0.5 text-[11px]">
              <span className="px-2 py-0.5 text-[#64748b]">Day</span>
              <span className="px-2 py-0.5 rounded-md bg-[#eff6ff] text-[#2563EB] font-semibold">
                Week
              </span>
              <span className="px-2 py-0.5 text-[#64748b]">Month</span>
            </div>
            <button className="bg-[#2563EB] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
              <Plus size={11} /> New
            </button>
          </div>
        </div>

        {/* Week grid */}
        <div className="flex-1 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden flex flex-col">
          {/* Day headers */}
          <div className="grid grid-cols-[36px_repeat(5,1fr)] border-b border-[#E2E8F0]">
            <div />
            {days.map((d, i) => {
              const isPast = i < 2;
              const isToday = i === 2;
              return (
                <div
                  key={d}
                  className={`px-2 py-2 text-center border-l border-[#E2E8F0] ${
                    isToday ? "bg-[#eff6ff]" : ""
                  }`}
                >
                  <div
                    className={`text-[10px] font-medium uppercase tracking-wide ${
                      isPast
                        ? "text-[#cbd5e1]"
                        : isToday
                          ? "text-[#2563EB] font-semibold"
                          : "text-[#64748b] font-semibold"
                    }`}
                  >
                    {d}
                  </div>
                  <div
                    className={`text-[14px] mt-0.5 ${
                      isPast
                        ? "text-[#cbd5e1] font-semibold"
                        : isToday
                          ? "text-[#2563EB] font-bold"
                          : "text-[#0F172A] font-bold"
                    }`}
                  >
                    {dates[i]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time grid */}
          <div className="grid grid-cols-[36px_repeat(5,1fr)] flex-1 relative overflow-hidden">
            {/* Hour labels */}
            <div className="flex flex-col">
              {hours.map((h) => (
                <div
                  key={h}
                  className="h-[34px] border-b border-[#E2E8F0]/60 text-[9px] text-[#94a3b8] pr-1 text-right pt-0.5"
                >
                  {h}
                </div>
              ))}
            </div>
            {/* Day columns */}
            {days.map((_, colIdx) => {
              const isPast = colIdx < 2;
              return (
                <div
                  key={colIdx}
                  className="border-l border-[#E2E8F0] relative"
                >
                  {hours.map((h) => (
                    <div
                      key={h}
                      className="h-[34px] border-b border-[#E2E8F0]/60"
                    />
                  ))}
                  {/* Appointments in this column */}
                  {appts
                    .filter((a) => a.col === colIdx)
                    .map((a, i) => (
                      <div
                        key={i}
                        className="absolute left-1 right-1 rounded-[6px] px-2 py-1 overflow-hidden"
                        style={{
                          top: a.top,
                          height: a.h,
                          minHeight: "36px",
                          backgroundColor: isPast ? "#f1f5f9" : `${a.color}1e`,
                          borderLeft: `3px solid ${isPast ? "#cbd5e1" : a.color}`,
                        }}
                      >
                        <div
                          className="text-[10px] font-semibold truncate leading-tight"
                          style={{ color: isPast ? "#94a3b8" : "#0F172A" }}
                        >
                          {a.label}
                        </div>
                        <div
                          className="text-[9px] truncate leading-tight"
                          style={{ color: isPast ? "#94a3b8" : "#64748b" }}
                        >
                          {a.sub}
                        </div>
                      </div>
                    ))}
                  {/* Past day overlay */}
                  {isPast && (
                    <div className="absolute inset-0 bg-[#f8fafc]/60 pointer-events-none z-10" />
                  )}
                </div>
              );
            })}
            {/* Now line on Wed (col 2) */}
            <div
              className="absolute left-[36px] right-0 h-px bg-[#f97316] z-10"
              style={{ top: 78 }}
            >
              <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-[#f97316]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TAB 2 — ONLINE BOOKING
========================================================= */
function BookingMockup() {
  return (
    <div className="bg-white h-full overflow-auto relative">
      {/* Decorative wave SVGs */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        style={{ height: 70, opacity: 0.08 }}
      >
        <path
          d="M0,40 Q100,10 200,40 T400,40"
          stroke="#2563EB"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-2 left-0 right-0 w-full pointer-events-none"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        style={{ height: 60, opacity: 0.05 }}
      >
        <path
          d="M0,40 Q100,70 200,40 T400,40"
          stroke="#2563EB"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="max-w-[420px] mx-auto px-4 py-8 flex flex-col items-center relative z-10">
        {/* Logo circle */}
        <div className="w-20 h-20 rounded-full bg-[#2563eb26] flex items-center justify-center mx-auto mb-4 ring-4 ring-[#2563eb1a]">
          <span className="text-[#2563EB] font-extrabold text-2xl">SD</span>
        </div>

        {/* Practice name */}
        <h1 className="font-extrabold text-[32px] text-[#0A0F1E] tracking-[-0.02em] text-center leading-tight">
          Smile Dental
        </h1>

        {/* Tagline */}
        <p className="text-[17px] text-[#5A6478] text-center mt-1">
          Book your appointment online
        </p>

        {/* Divider */}
        <div className="w-[60px] h-px bg-[#E8EBF5] mx-auto my-5" />

        {/* Info rows */}
        <div className="flex items-center justify-center gap-2 text-[15px] text-[#0A0F1E] mb-3">
          <Phone size={16} className="text-[#2563EB]" />
          <span>020 7946 0958</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[15px] text-[#0A0F1E] mb-3">
          <MapPin size={16} className="text-[#2563EB]" />
          <span>14 Harley Street, London</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[15px] text-[#0A0F1E] mb-3">
          <Clock size={16} className="text-[#2563EB]" />
          <span>Mon–Fri 9am–6pm</span>
        </div>

        {/* Open pill */}
        <div className="inline-flex items-center gap-2 bg-[#DCFCE7] text-[#166534] text-[13px] font-medium px-4 py-1.5 rounded-full mx-auto mt-1 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span>Open today · Closes 6pm</span>
        </div>

        {/* Reviews row */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-5 h-5 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-[11px] font-bold text-blue-500">
            G
          </div>
          <span className="text-[#FBBF24] text-sm">★★★★★</span>
          <span className="text-[#2563EB] text-[13px] font-medium">
            See reviews →
          </span>
        </div>

        {/* Trust pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
          <div className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium text-[#0A0F1E] bg-[#2563eb26] border border-[#2563eb42]">
            <Shield size={12} className="text-[#2563EB]" />
            <span>Secure booking</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium text-[#0A0F1E] bg-[#2563eb26] border border-[#2563eb42]">
            <Zap size={12} className="text-[#2563EB]" />
            <span>Instant confirmation</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-medium text-[#0A0F1E] bg-[#2563eb26] border border-[#2563eb42]">
            <Bell size={12} className="text-[#2563EB]" />
            <span>Free reminders</span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full h-[54px] bg-[#2563EB] text-white font-bold text-[17px] rounded-full flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.3)]">
          <span>Book an Appointment</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   TAB 3 — PAYMENTS
========================================================= */
function PaymentsMockup() {
  const transactions = [
    {
      initials: "SM",
      avatarBg: "#dbeafe",
      avatarColor: "#2563EB",
      name: "Sarah Mitchell",
      service: "Whitening",
      amount: "£80",
      method: "Visa ···· 4242",
      status: "Paid",
      statusBg: "#dcfce7",
      statusColor: "#16a34a",
    },
    {
      initials: "JT",
      avatarBg: "#dcfce7",
      avatarColor: "#16a34a",
      name: "James Thompson",
      service: "Hygiene",
      amount: "£90",
      method: "Online",
      status: "Paid",
      statusBg: "#dcfce7",
      statusColor: "#16a34a",
    },
    {
      initials: "ML",
      avatarBg: "#f3e8ff",
      avatarColor: "#9333ea",
      name: "Maria Lombardi",
      service: "Implant",
      amount: "£150",
      method: "Visa ···· 1234",
      status: "Paid",
      statusBg: "#dcfce7",
      statusColor: "#16a34a",
    },
    {
      initials: "RK",
      avatarBg: "#fef3c7",
      avatarColor: "#d97706",
      name: "Robert Keane",
      service: "Checkup",
      amount: "£50",
      method: "Cash",
      status: "Pending",
      statusBg: "#fef3c7",
      statusColor: "#d97706",
    },
    {
      initials: "EW",
      avatarBg: "#cffafe",
      avatarColor: "#0891b2",
      name: "Emma Wilson",
      service: "Whitening",
      amount: "£350",
      method: "Online",
      status: "Paid",
      statusBg: "#dcfce7",
      statusColor: "#16a34a",
    },
  ];

  const stats = [
    {
      label: "TOTAL REVENUE",
      value: "£12,840",
      color: "text-[#0F172A]",
    },
    {
      label: "THIS MONTH",
      value: "£3,240",
      color: "text-[#2563EB]",
    },
    {
      label: "VS LAST MONTH",
      value: "↑ 18%",
      color: "text-[#16a34a]",
    },
    {
      label: "TRANSACTIONS",
      value: "47",
      color: "text-[#0F172A]",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] h-full flex flex-col">
      <MockTopBar title="Payments" />
      <div className="p-5 flex-1 overflow-hidden flex flex-col gap-4">
        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-4 border border-[#E2E8F0]"
            >
              <div className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide truncate">
                {s.label}
              </div>
              <div
                className={`text-[22px] font-extrabold mt-1 ${s.color}`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="text-[14px] font-semibold text-[#0F172A]">
              Transactions
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-[#eff6ff] text-[#2563EB] text-[12px] font-medium px-3 py-1 rounded-full">
                All
              </span>
              <span className="text-[#64748b] text-[12px] font-medium px-3 py-1 rounded-full">
                Outstanding
              </span>
              <span className="text-[#64748b] text-[12px] font-medium px-3 py-1 rounded-full">
                Refunds
              </span>
            </div>
          </div>
          <div className="grid grid-cols-5 px-4 py-2 border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748b] uppercase tracking-wide">
            <div>Patient</div>
            <div>Service</div>
            <div>Amount</div>
            <div>Method</div>
            <div>Status</div>
          </div>
          {transactions.map((t, i) => (
            <div
              key={i}
              className="grid grid-cols-5 px-4 py-3 border-b border-[#E2E8F0]/60 last:border-0 items-center text-[13px]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    backgroundColor: t.avatarBg,
                    color: t.avatarColor,
                  }}
                >
                  {t.initials}
                </div>
                <span className="text-[#0F172A] truncate">{t.name}</span>
              </div>
              <div className="text-[#0F172A]">{t.service}</div>
              <div className="font-bold text-[#0F172A]">{t.amount}</div>
              <div className="text-[#64748b] truncate">{t.method}</div>
              <div>
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: t.statusBg,
                    color: t.statusColor,
                  }}
                >
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TAB 4 — RECALLS & AUTOMATIONS
========================================================= */
function RecallsMockup() {
  const queue = [
    {
      initials: "SM",
      bg: "#dbeafe",
      color: "#2563EB",
      name: "Sarah Mitchell",
      due: "6-month checkup — 3 weeks overdue",
    },
    {
      initials: "JT",
      bg: "#dcfce7",
      color: "#16a34a",
      name: "James Thompson",
      due: "Annual hygiene — 1 week overdue",
    },
    {
      initials: "ML",
      bg: "#f3e8ff",
      color: "#9333ea",
      name: "Maria Lombardi",
      due: "Whitening follow-up — due today",
    },
    {
      initials: "RK",
      bg: "#fef3c7",
      color: "#d97706",
      name: "Robert Keane",
      due: "New patient recall — due today",
    },
  ];

  const automations = [
    {
      Icon: Bell,
      name: "24h appointment reminder",
      trigger: "Fires 24h before appointment",
    },
    {
      Icon: RefreshCw,
      name: "6-month recall sequence",
      trigger: "Fires 6 months after last visit",
    },
    {
      Icon: MessageSquare,
      name: "No-show follow-up",
      trigger: "Fires 30 mins after missed appt",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] h-full flex flex-col">
      <MockTopBar title="Recalls" />
      <div className="p-5 flex-1 overflow-hidden flex flex-col gap-4">
        {/* Recall stat */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
          <div className="text-[28px] font-extrabold text-[#2563EB] leading-none">
            34
          </div>
          <div className="text-[13px] text-[#64748b] mt-1">
            patients overdue for a recall
          </div>
          <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full mt-3 overflow-hidden">
            <div className="w-[60%] h-full bg-[#2563EB] rounded-full" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[12px] text-[#64748b]">
              Last sent: 2 days ago
            </span>
            <span className="text-[12px] font-semibold text-[#2563EB]">
              Send all →
            </span>
          </div>
        </div>

        {/* Recall queue */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E2E8F0] flex justify-between items-center">
            <div className="text-[14px] font-semibold text-[#0F172A]">
              Recall queue
            </div>
            <button className="bg-[#2563EB] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg">
              Send all
            </button>
          </div>
          {queue.map((p, i) => (
            <div
              key={i}
              className="flex items-center px-4 py-3 border-b border-[#E2E8F0] last:border-0 gap-3"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                style={{ backgroundColor: p.bg, color: p.color }}
              >
                {p.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-[#0F172A] truncate">
                  {p.name}
                </div>
                <div className="text-[11px] text-[#64748b] truncate">
                  {p.due}
                </div>
              </div>
              <div className="ml-auto text-[12px] font-semibold text-[#2563EB] shrink-0">
                Send →
              </div>
            </div>
          ))}
        </div>

        {/* Automations */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
          <div className="text-[13px] font-semibold text-[#0F172A] mb-3">
            Active automations
          </div>
          {automations.map((a, i) => {
            const Icon = a.Icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 py-2 border-b border-[#E2E8F0]/60 last:border-0"
              >
                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-[#2563EB]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-[#0F172A] truncate">
                    {a.name}
                  </div>
                  <div className="text-[11px] text-[#64748b] truncate">
                    {a.trigger}
                  </div>
                </div>
                <div className="ml-auto w-8 h-4 rounded-full bg-[#2563EB] relative flex-shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TAB 5 — INBOX
========================================================= */
function InboxMockup() {
  const conversations = [
    {
      initials: "SM",
      bg: "#dbeafe",
      color: "#2563EB",
      name: "Sarah Mitchell",
      preview: "Yes, 3pm Friday works for me — thank you!",
      time: "2m",
      active: true,
      unread: false,
    },
    {
      initials: "JT",
      bg: "#dcfce7",
      color: "#16a34a",
      name: "James Thompson",
      preview: "Hi, can I move my appointment to next week?",
      time: "14m",
      unread: true,
    },
    {
      initials: "ML",
      bg: "#f3e8ff",
      color: "#9333ea",
      name: "Maria Lombardi",
      preview: "Got the reminder, see you tomorrow.",
      time: "1h",
    },
    {
      initials: "RK",
      bg: "#fef3c7",
      color: "#d97706",
      name: "Robert Keane",
      preview: "Do you offer Invisalign consultations?",
      time: "3h",
      unread: true,
    },
    {
      initials: "EW",
      bg: "#cffafe",
      color: "#0891b2",
      name: "Emma Wilson",
      preview: "Perfect, payment sent.",
      time: "Yest",
    },
  ];

  const messages = [
    {
      from: "them",
      text: "Hi! I need to reschedule my whitening appointment.",
      time: "10:14am",
    },
    {
      from: "me",
      text: "No problem Sarah — what day works for you?",
      time: "10:18am",
    },
    {
      from: "them",
      text: "Friday afternoon if possible?",
      time: "10:22am",
    },
    {
      from: "me",
      text: "Friday at 3pm is open — shall I book you in?",
      time: "10:24am",
    },
    {
      from: "them",
      text: "Yes, 3pm Friday works for me — thank you!",
      time: "10:26am",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] h-full flex flex-col">
      <MockTopBar title="Inbox" />
      <div className="flex-1 overflow-hidden flex">
        {/* Conversation list */}
        <div className="w-[200px] border-r border-[#E2E8F0] bg-white flex flex-col">
          <div className="px-3 py-2.5 border-b border-[#E2E8F0]">
            <div className="h-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md px-2 flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
              <Search size={11} />
              <span>Search messages…</span>
            </div>
          </div>
          {conversations.map((c, i) => (
            <div
              key={i}
              className={`px-3 py-2.5 border-b border-[#E2E8F0]/60 flex items-start gap-2 ${
                c.active ? "bg-[#eff6ff]" : ""
              }`}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ backgroundColor: c.bg, color: c.color }}
              >
                {c.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[12px] truncate ${
                      c.unread || c.active
                        ? "font-bold text-[#0F172A]"
                        : "font-semibold text-[#0F172A]"
                    }`}
                  >
                    {c.name}
                  </span>
                  <span className="text-[9px] text-[#94a3b8] shrink-0 ml-1">
                    {c.time}
                  </span>
                </div>
                <div
                  className={`text-[10.5px] truncate mt-0.5 ${
                    c.unread ? "text-[#0F172A] font-medium" : "text-[#64748b]"
                  }`}
                >
                  {c.preview}
                </div>
              </div>
              {c.unread && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Conversation thread */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC] min-w-0">
          {/* Thread header */}
          <div className="h-[52px] bg-white border-b border-[#E2E8F0] flex items-center px-4 gap-2.5 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{ backgroundColor: "#dbeafe", color: "#2563EB" }}
            >
              SM
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-[#0F172A]">
                Sarah Mitchell
              </div>
              <div className="text-[10px] text-[#16a34a] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                Active now
              </div>
            </div>
            <div className="text-[11px] text-[#2563EB] font-semibold">
              View profile
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden p-4 flex flex-col gap-2.5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[75%]">
                  <div
                    className={`px-3 py-2 rounded-2xl text-[12px] leading-snug ${
                      m.from === "me"
                        ? "bg-[#2563EB] text-white rounded-br-sm"
                        : "bg-white border border-[#E2E8F0] text-[#0F172A] rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  <div
                    className={`text-[9px] text-[#94a3b8] mt-0.5 ${
                      m.from === "me" ? "text-right" : "text-left"
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="border-t border-[#E2E8F0] bg-white p-3 flex items-center gap-2 flex-shrink-0">
            <Paperclip size={14} className="text-[#64748b]" />
            <div className="flex-1 h-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full px-3 flex items-center text-[11px] text-[#94a3b8]">
              Type a message…
            </div>
            <button className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white">
              <Send size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   TAB CONTENT METADATA (Feature108 style)
========================================================= */
const tabContent = [
  {
    badge: "Smart Scheduling",
    title: "A calendar that runs your day for you.",
    description:
      "Drag and drop appointments, see your whole team at a glance, and let Dent Dock handle reminders, deposits and confirmations automatically.",
    buttonText: "See the calendar",
  },
  {
    badge: "Patient-Facing",
    title: "A booking page patients actually want to use.",
    description:
      "Branded to your practice, mobile-first, and live 24/7. Patients book in seconds — no phone calls, no double-bookings, no friction.",
    buttonText: "See booking pages",
  },
  {
    badge: "Get Paid Faster",
    title: "Stripe payments, deposits and links built in.",
    description:
      "Take deposits at the time of booking, send payment links from the inbox, and reconcile everything in one place. No add-ons.",
    buttonText: "See payments",
  },
  {
    badge: "Set And Forget",
    title: "Recalls and automations that run themselves.",
    description:
      "Six-month recalls, no-show follow-ups, post-treatment check-ins — all sent automatically from sequences you build once.",
    buttonText: "See automations",
  },
  {
    badge: "One Conversation",
    title: "Every patient message in one inbox.",
    description:
      "SMS, email and booking enquiries land in a single shared inbox. Reply from anywhere, with full patient history one tap away.",
    buttonText: "See the inbox",
  },
];

const mockups = [
  CalendarMockup,
  BookingMockup,
  PaymentsMockup,
  RecallsMockup,
  InboxMockup,
];

/* =========================================================
   MAIN COMPONENT — Feature108 style
========================================================= */
export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance every 4s
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), 8000);
  };

  const ActiveMockup = mockups[activeTab];
  const content = tabContent[activeTab];

  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <motion.div
        className="container max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1] max-w-2xl">
            Everything in <span className="text-[#2563EB]">one place</span>
          </h2>
          <p className="text-lg text-neutral-500 max-w-xl leading-relaxed mt-4">
            One platform for every part of your practice, from first booking to last recall.
          </p>
        </div>

        {/* Tab segmented control — all in one container */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-sm">
            {tabs.map((tab, i) => {
              const Icon = tabIcons[i];
              const active = activeTab === i;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(i)}
                  className={`relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 overflow-hidden ${
                    active
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <Icon size={15} className="shrink-0" />
                  <span>{tab}</span>
                  {active && !paused && (
                    <motion.span
                      key={`progress-${activeTab}-${paused}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-white/80 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4, ease: "linear" }}
                      style={{ width: "100%" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content — 2 column */}
        <div className="mt-10 lg:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Left — copy */}
              <div className="flex flex-col items-start">
                <h3
                  className="text-3xl md:text-4xl text-neutral-900 tracking-[-0.02em] leading-[1.15]"
                  style={{ fontWeight: 500 }}
                >
                  {content.title}
                </h3>
                <p className="mt-4 text-base md:text-lg text-neutral-500 leading-relaxed">
                  {content.description}
                </p>
                <button className="mt-6 inline-flex items-center gap-2 bg-[#2563EB] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-[#1d4fd8] transition-colors shadow-sm shadow-[#2563EB]/20">
                  <span>{content.buttonText}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Right — mockup */}
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl shadow-neutral-200/60">
                {/* Browser chrome */}
                <div className="h-9 bg-neutral-100 border-b border-neutral-200 flex items-center px-4 gap-2 flex-shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 bg-white rounded-md mx-4 px-3 py-1 text-[11px] text-neutral-400 text-center font-mono truncate">
                    {tabUrls[activeTab]}
                  </div>
                </div>
                {/* Mockup */}
                <div className="h-[460px] overflow-hidden relative bg-[#F8FAFC] pointer-events-none">
                  <ActiveMockup />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

