"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  CreditCard,
  RefreshCw,
  Zap,
  ClipboardList,
  BarChart2,
  Settings,
  Sparkles,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  UserPlus,
  Plus,
  X,
  XCircle,
  CalendarClock,
  Edit,
  User,
  Phone,
  ArrowRight,
  Smartphone,
  Send,
} from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

type PageKey = "dashboard" | "calendar" | "inbox";
type Toast = { id: number; message: string };
type CursorPos = { x: number; y: number };

// ---------- SIDEBAR ----------
function SidebarIconBtn({
  Icon,
  active,
  badge,
  pulseDot,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  active?: boolean;
  badge?: string;
  pulseDot?: boolean;
}) {
  return (
    <div
      className={`relative w-10 h-10 mx-auto rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
        active ? "bg-[#1E293B] text-white" : "text-[#64748b] hover:text-[#94a3b8]"
      }`}
    >
      <Icon size={18} />
      {badge && (
        <span className="w-4 h-4 bg-[#2563EB] text-white text-[9px] rounded-full absolute -top-1 -right-1 flex items-center justify-center">
          {badge}
        </span>
      )}
      {pulseDot && (
        <span className="w-2 h-2 bg-green-500 rounded-full absolute -top-1 -right-1 animate-pulse" />
      )}
    </div>
  );
}

function SidebarIconOnly({ activePage }: { activePage: PageKey }) {
  return (
    <div className="bg-[#0F172A] w-14 flex-shrink-0 flex flex-col h-full border-r border-[#1E293B]">
      <div className="h-[60px] flex items-center justify-center border-b border-[#1E293B]">
        <ToothIcon size={20} color="#60a5fa" />
      </div>
      <div className="flex flex-col gap-1 mt-3">
        <SidebarIconBtn Icon={LayoutDashboard} active={activePage === "dashboard"} />
        <SidebarIconBtn Icon={Calendar} active={activePage === "calendar"} />
        <SidebarIconBtn Icon={Users} />
        <SidebarIconBtn Icon={MessageSquare} active={activePage === "inbox"} badge="3" />
        <div className="border-t border-[#1E293B] mx-3 my-1" />
        <SidebarIconBtn Icon={CreditCard} />
        <SidebarIconBtn Icon={RefreshCw} />
        <SidebarIconBtn Icon={Zap} />
        <SidebarIconBtn Icon={ClipboardList} />
        <SidebarIconBtn Icon={BarChart2} />
        <div className="border-t border-[#1E293B] mx-3 my-1" />
        <SidebarIconBtn Icon={Settings} />
        <SidebarIconBtn Icon={Sparkles} pulseDot />
      </div>
      <div className="mt-auto pb-4 flex justify-center">
        <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-xs font-bold">
          JW
        </div>
      </div>
    </div>
  );
}

// ---------- TOP BAR ----------
function TopBar({ activePage }: { activePage: PageKey }) {
  const title =
    activePage === "dashboard" ? "Dashboard" : activePage === "calendar" ? "Calendar" : "Inbox";
  return (
    <div className="h-[60px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 flex-shrink-0">
      <div className="text-[18px] font-semibold text-[#0F172A]">{title}</div>
      <div className="h-9 w-[220px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 flex items-center gap-2 text-[13px] text-[#94a3b8]">
        <Search size={14} />
        <span className="flex-1">Search patients...</span>
        <span className="text-[10px] bg-[#E2E8F0] text-[#64748b] rounded px-1.5 py-0.5 ml-auto">
          ⌘K
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell size={20} className="text-[#64748b]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#DC2626] rounded-full text-white text-[9px] flex items-center justify-center">
            2
          </span>
        </div>
        <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-xs font-bold">
          JW
        </div>
      </div>
    </div>
  );
}

// ---------- DASHBOARD PAGE ----------
function StatCard({
  label,
  Icon,
  value,
  valueColor = "#0F172A",
  sub,
  subColor = "#64748b",
  showProgress,
  progressPct,
  trendIcon,
}: {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  valueColor?: string;
  sub: string;
  subColor?: string;
  showProgress?: boolean;
  progressPct?: number;
  trendIcon?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      <div className="flex items-center">
        <span className="text-[12px] font-medium text-[#64748b] uppercase tracking-wide">
          {label}
        </span>
        <Icon size={14} className="text-[#94a3b8] ml-auto" />
      </div>
      <div
        className="text-[40px] font-extrabold leading-none mt-2"
        style={{ color: valueColor }}
      >
        {value}
      </div>
      <div
        className="text-[13px] mt-1 flex items-center gap-1"
        style={{ color: subColor }}
      >
        {trendIcon && <TrendingUp size={12} />}
        {sub}
      </div>
      {showProgress && (
        <div className="w-full h-[2px] bg-[#E2E8F0] rounded-full mt-2">
          <div
            className="h-full bg-[#2563EB] rounded-full"
            style={{ width: `${progressPct ?? 0}%` }}
          />
        </div>
      )}
    </div>
  );
}

function ScheduleRow({
  time,
  ampm,
  dotColor,
  name,
  treatment,
  badgeText,
  badgeBg,
  badgeColor,
  pulseColor,
}: {
  time: string;
  ampm: string;
  dotColor: string;
  name: string;
  treatment: string;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  pulseColor?: string;
}) {
  return (
    <div className="flex items-center px-5 py-3 border-b border-[#E2E8F0]/60 last:border-0">
      <div className="w-12 shrink-0">
        <div className="text-[13px] font-semibold text-[#0F172A] leading-tight">{time}</div>
        <div className="text-[11px] text-[#94a3b8] leading-tight">{ampm}</div>
      </div>
      <span
        className="w-2 h-2 rounded-full mx-3 shrink-0"
        style={{ backgroundColor: dotColor }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-semibold text-[#0F172A]">{name}</div>
        <div className="text-[12px] text-[#64748b]">{treatment}</div>
      </div>
      <span
        className="text-[12px] font-medium rounded-full px-2.5 py-0.5 flex items-center gap-1.5"
        style={{ backgroundColor: badgeBg, color: badgeColor }}
      >
        {pulseColor && (
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: pulseColor }}
          />
        )}
        {badgeText}
      </span>
    </div>
  );
}

function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute inset-0 bg-[#F8FAFC] p-6 overflow-auto"
    >
      <div className="mb-6">
        <div className="text-[22px] font-bold text-[#0F172A]">
          Good morning, Dr. James Webb
        </div>
        <div className="text-[13px] text-[#64748b] mt-1">
          Monday, 15 April 2026 · Smile Dental · 12 appointments today
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          label="TODAY"
          Icon={Calendar}
          value="12"
          sub="Next: 9:30am — Sarah Mitchell"
        />
        <StatCard
          label="CAPACITY"
          Icon={BarChart2}
          value="78%"
          valueColor="#2563EB"
          sub="5h 30m booked · 7h available"
          showProgress
          progressPct={78}
        />
        <StatCard
          label="REVENUE TODAY"
          Icon={TrendingUp}
          value="£840"
          sub="↑ 12% vs yesterday"
          subColor="#16a34a"
          trendIcon
        />
        <StatCard
          label="NEW PATIENTS"
          Icon={UserPlus}
          value="2"
          sub="first appointment today"
        />
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex justify-between items-center">
          <div className="text-[15px] font-semibold text-[#0F172A]">Today's Schedule</div>
          <button className="bg-[#2563EB] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Plus size={14} /> New appointment
          </button>
        </div>
        <ScheduleRow
          time="9:00"
          ampm="am"
          dotColor="#2563EB"
          name="Sarah Mitchell"
          treatment="Whitening · 60 min"
          badgeText="Confirmed"
          badgeBg="rgba(37,99,235,0.1)"
          badgeColor="#2563EB"
        />
        <ScheduleRow
          time="9:45"
          ampm="am"
          dotColor="#16a34a"
          name="James Thompson"
          treatment="Checkup · 30 min"
          badgeText="Arrived"
          badgeBg="#f0fdf4"
          badgeColor="#16a34a"
          pulseColor="#16a34a"
        />
        <ScheduleRow
          time="10:30"
          ampm="am"
          dotColor="#7c3aed"
          name="Maria Lombardi"
          treatment="Hygiene · 45 min"
          badgeText="In Chair"
          badgeBg="#faf5ff"
          badgeColor="#7c3aed"
          pulseColor="#7c3aed"
        />
        <ScheduleRow
          time="11:15"
          ampm="am"
          dotColor="#2563EB"
          name="Robert Keane"
          treatment="Consultation · 30 min"
          badgeText="Confirmed"
          badgeBg="rgba(37,99,235,0.1)"
          badgeColor="#2563EB"
        />
        <ScheduleRow
          time="12:00"
          ampm="pm"
          dotColor="#d97706"
          name="Emma Wilson"
          treatment="Implant Review · 60 min"
          badgeText="Confirmed"
          badgeBg="rgba(37,99,235,0.1)"
          badgeColor="#2563EB"
        />
        <ScheduleRow
          time="2:00"
          ampm="pm"
          dotColor="#0891B2"
          name="John Barrett"
          treatment="Scale & Polish · 45 min"
          badgeText="Confirmed"
          badgeBg="rgba(37,99,235,0.1)"
          badgeColor="#2563EB"
        />
      </div>
    </motion.div>
  );
}

// ---------- CALENDAR PAGE ----------
type CalAppt = {
  topMin: number; // minutes from 09:00
  durMin: number;
  color: string;
  name: string;
  treatment: string;
  highlight?: boolean;
};

const HOUR_PX = 80;
const minToPx = (m: number) => (m / 60) * HOUR_PX;

function CalendarBlock({
  appt,
  ringActive,
}: {
  appt: CalAppt;
  ringActive?: boolean;
}) {
  return (
    <div
      className={`absolute left-1 right-1 rounded-[6px] px-2 py-1.5 cursor-pointer overflow-hidden ${
        ringActive ? "ring-2 ring-[#2563EB] ring-offset-1" : ""
      }`}
      style={{
        top: `${minToPx(appt.topMin)}px`,
        height: `${minToPx(appt.durMin)}px`,
        backgroundColor: `${appt.color}1e`,
        borderLeft: `3px solid ${appt.color}`,
      }}
    >
      <div className="text-[11px] font-semibold text-[#0F172A] truncate">{appt.name}</div>
      <div className="text-[10px] text-[#64748b] truncate">{appt.treatment}</div>
    </div>
  );
}

function CalendarPage({ drawerOpen }: { drawerOpen: boolean }) {
  const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  const days: {
    key: string;
    label: string;
    date: string;
    highlight?: boolean;
    appts: CalAppt[];
  }[] = [
    {
      key: "mon",
      label: "MON",
      date: "13",
      appts: [
        { topMin: 0, durMin: 60, color: "#2563EB", name: "Sarah M.", treatment: "Whitening" },
        { topMin: 120, durMin: 45, color: "#0891B2", name: "John B.", treatment: "Consultation" },
        { topMin: 240, durMin: 60, color: "#d97706", name: "Emma W.", treatment: "Implant" },
      ],
    },
    {
      key: "tue",
      label: "TUE",
      date: "14",
      appts: [
        { topMin: 30, durMin: 45, color: "#7c3aed", name: "Maria L.", treatment: "Hygiene" },
        { topMin: 120, durMin: 60, color: "#16a34a", name: "James T.", treatment: "Checkup" },
        { topMin: 300, durMin: 45, color: "#2563EB", name: "Robert K.", treatment: "Scale" },
      ],
    },
    {
      key: "wed",
      label: "WED",
      date: "15",
      highlight: true,
      appts: [
        {
          topMin: 0,
          durMin: 60,
          color: "#2563EB",
          name: "Sarah M.",
          treatment: "Whitening",
          highlight: true,
        },
        { topMin: 90, durMin: 45, color: "#16a34a", name: "Emma W.", treatment: "Hygiene" },
        { topMin: 180, durMin: 60, color: "#7c3aed", name: "Maria L.", treatment: "Implant" },
        { topMin: 300, durMin: 45, color: "#d97706", name: "John B.", treatment: "Checkup" },
      ],
    },
    {
      key: "thu",
      label: "THU",
      date: "16",
      appts: [
        { topMin: 0, durMin: 45, color: "#0891B2", name: "Robert K.", treatment: "Whitening" },
        { topMin: 150, durMin: 60, color: "#2563EB", name: "Sarah M.", treatment: "Consultation" },
        { topMin: 330, durMin: 45, color: "#16a34a", name: "James T.", treatment: "Scale" },
      ],
    },
    {
      key: "fri",
      label: "FRI",
      date: "17",
      appts: [
        { topMin: 60, durMin: 60, color: "#d97706", name: "Emma W.", treatment: "Hygiene" },
        { topMin: 240, durMin: 45, color: "#7c3aed", name: "Maria L.", treatment: "Checkup" },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute inset-0 bg-[#F8FAFC] flex flex-col"
    >
      {/* Toolbar */}
      <div className="px-5 py-3 bg-white border-b border-[#E2E8F0] flex items-center gap-3 flex-shrink-0">
        {["Day", "Week", "Month", "Year"].map((v) => {
          const active = v === "Week";
          return (
            <button
              key={v}
              className={`text-[12px] font-medium px-3 py-1.5 rounded-lg border ${
                active
                  ? "bg-[#2563EB] text-white border-[#2563EB]"
                  : "border-[#E2E8F0] text-[#64748b]"
              }`}
            >
              {v}
            </button>
          );
        })}
        <div className="text-[13px] font-semibold text-[#0F172A] ml-2">
          13 Apr – 17 Apr 2026
        </div>
        <button className="w-7 h-7 rounded-md border border-[#E2E8F0] flex items-center justify-center text-[#64748b]">
          <ChevronLeft size={16} />
        </button>
        <button className="w-7 h-7 rounded-md border border-[#E2E8F0] flex items-center justify-center text-[#64748b]">
          <ChevronRight size={16} />
        </button>
        <button className="text-[12px] font-medium px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#64748b]">
          Today
        </button>
        <button className="ml-auto bg-[#2563EB] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Plus size={14} /> New appointment
        </button>
      </div>

      {/* Grid */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-14 shrink-0 border-r border-[#E2E8F0] pt-10 bg-white">
          {HOURS.map((h) => (
            <div
              key={h}
              className="h-20 flex items-start justify-end pr-2 pt-1 text-[11px] text-[#94a3b8]"
            >
              {h}
            </div>
          ))}
        </div>

        {days.map((day, di) => (
          <div
            key={day.key}
            className={`flex-1 border-r border-[#E2E8F0] relative flex flex-col bg-white ${
              di === days.length - 1 ? "last:border-0" : ""
            }`}
          >
            <div className="h-10 flex flex-col items-center justify-center border-b border-[#E2E8F0] shrink-0">
              <div className="text-[10px] text-[#94a3b8] font-medium uppercase">{day.label}</div>
              <div
                className={`text-[14px] font-semibold ${
                  day.highlight ? "text-[#2563EB]" : "text-[#0F172A]"
                }`}
              >
                {day.date}
              </div>
            </div>
            <div className="relative flex-1">
              {HOURS.map((h) => (
                <div key={h} className="h-20 border-b border-[#E2E8F0]/60" />
              ))}
              {day.appts.map((a, i) => (
                <CalendarBlock
                  key={i}
                  appt={a}
                  ringActive={!!a.highlight && drawerOpen}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ---------- APPOINTMENT DRAWER ----------
function DrawerActionRow({
  Icon,
  label,
  iconColor,
  hoverClass,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  iconColor: string;
  hoverClass: string;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium border-b border-[#E2E8F0] last:border-0 cursor-pointer transition-colors ${hoverClass}`}
    >
      <Icon size={15} className={iconColor} />
      <span className="text-[#0F172A]">{label}</span>
    </button>
  );
}

function AppointmentDrawer() {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute right-0 top-0 bottom-0 w-[400px] bg-white shadow-xl z-[101] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
        <span className="bg-primary/10 text-[#2563EB] text-[12px] font-medium rounded-full px-2.5 py-0.5">
          Confirmed
        </span>
        <button className="w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center">
          <X size={18} className="text-[#64748b]" />
        </button>
      </div>

      {/* Patient */}
      <div className="px-6 py-5 border-b border-[#E2E8F0]/50">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#dbeafe] text-[#2563EB] text-[16px] font-bold flex items-center justify-center">
            SM
          </div>
          <div>
            <div className="text-[18px] font-bold text-[#0F172A]">Sarah Mitchell</div>
            <div className="flex items-center gap-1.5 text-[14px] text-[#64748b] mt-0.5">
              <Phone size={13} />
              07700 900123
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-3 text-[13px] font-medium text-[#2563EB]">
          <ArrowRight size={14} />
          View full profile
        </div>
      </div>

      {/* Details */}
      <div className="px-6 py-4 border-b border-[#E2E8F0]/50 space-y-2.5">
        {[
          { label: "Service", value: "Whitening" },
          {
            label: "Dentist",
            value: (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#dbeafe] text-[#2563EB] text-[9px] font-bold flex items-center justify-center">
                  JW
                </span>
                Dr. James Webb
              </span>
            ),
          },
          { label: "Date", value: "Wednesday, 15 April 2026" },
          { label: "Time", value: "9:00am – 10:00am" },
          { label: "Duration", value: "60 mins" },
          { label: "Booked via", value: "Online" },
          {
            label: "Deposit",
            value: <span className="text-[#16a34a]">£80 paid ✓</span>,
          },
        ].map((row, i) => (
          <div key={i} className="flex items-start">
            <div className="w-20 shrink-0 text-[12px] font-medium text-[#64748b] pt-0.5">
              {row.label}
            </div>
            <div className="text-[14px] text-[#0F172A]">{row.value}</div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="border-b border-[#E2E8F0]">
        <DrawerActionRow
          Icon={CheckCircle}
          label="Mark as arrived"
          iconColor="text-[#2563EB]"
          hoverClass="hover:bg-primary/5"
        />
        <DrawerActionRow
          Icon={XCircle}
          label="Mark as no-show"
          iconColor="text-[#DC2626]"
          hoverClass="hover:bg-destructive/5"
        />
        <DrawerActionRow
          Icon={CalendarClock}
          label="Reschedule"
          iconColor="text-[#0F172A]"
          hoverClass="hover:bg-[#F8FAFC]"
        />
        <DrawerActionRow
          Icon={MessageSquare}
          label="Send SMS"
          iconColor="text-[#0F172A]"
          hoverClass="hover:bg-[#F8FAFC]"
        />
        <DrawerActionRow
          Icon={Edit}
          label="Edit appointment"
          iconColor="text-[#0F172A]"
          hoverClass="hover:bg-[#F8FAFC]"
        />
      </div>

      {/* Notes */}
      <div className="px-6 py-5 border-b border-[#E2E8F0]/50">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-semibold text-[#0F172A]">Internal notes</div>
          <div className="text-[11px] text-[#64748b]">Visible to staff only</div>
        </div>
        <textarea
          readOnly
          placeholder="Add a note..."
          className="w-full min-h-[60px] border border-[#E2E8F0] rounded-lg p-3 text-[14px] bg-[#F8FAFC] text-[#94a3b8] resize-none mt-2"
        />
        <div className="flex justify-end mt-2">
          <button className="bg-[#2563EB] text-white text-[12px] font-semibold h-8 px-3.5 rounded-md">
            Save note
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[#E2E8F0] mt-auto">
        <button className="w-full h-10 rounded-lg flex items-center justify-center gap-2 text-[13px] font-semibold text-[#0F172A] hover:bg-[#F8FAFC]">
          <User size={16} />
          View full patient profile →
        </button>
      </div>
    </motion.div>
  );
}

// ---------- INBOX PAGE ----------
type ConvRow = {
  initials: string;
  avatarColor: string;
  name: string;
  channelIcon: "sms" | "wa";
  preview: string;
  time: string;
  badge?: string;
  active?: boolean;
  unread?: boolean;
};

function ConversationRow({ row }: { row: ConvRow }) {
  const ChannelIcon = row.channelIcon === "sms" ? Smartphone : MessageSquare;
  const channelColor = row.channelIcon === "sms" ? "text-[#16a34a]" : "text-[#2563EB]";
  return (
    <div
      className={`px-4 py-3 border-b border-[#E2E8F0] cursor-pointer flex items-center gap-3 ${
        row.active
          ? "bg-[#eff6ff] border-l-[3px] border-l-[#2563EB]"
          : "hover:bg-[#F8FAFC]"
      }`}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
        style={{ backgroundColor: row.avatarColor }}
      >
        {row.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-[14px] text-[#0F172A] ${row.unread ? "font-bold" : "font-semibold"}`}
        >
          {row.name}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <ChannelIcon size={12} className={channelColor} />
          <div className="text-[13px] text-[#64748b] truncate">{row.preview}</div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="text-[11px] text-[#94a3b8]">{row.time}</div>
        {row.badge && (
          <span className="bg-[#2563EB] text-white text-[10px] font-bold rounded-full px-1.5 min-w-4 h-4 flex items-center justify-center">
            {row.badge}
          </span>
        )}
      </div>
    </div>
  );
}

function InboxPage({
  typedMessage,
  showOutbound,
}: {
  typedMessage: string;
  showOutbound: boolean;
}) {
  const rows: ConvRow[] = [
    {
      initials: "SM",
      avatarColor: "#2563EB",
      name: "Sarah Mitchell",
      channelIcon: "sms",
      preview: "Hi Sarah, just a rem...",
      time: "2 min",
      badge: "1",
      active: true,
    },
    {
      initials: "JT",
      avatarColor: "#16a34a",
      name: "James Thompson",
      channelIcon: "wa",
      preview: "Appointment confirmed...",
      time: "15 min",
    },
    {
      initials: "ML",
      avatarColor: "#7c3aed",
      name: "Maria Lombardi",
      channelIcon: "wa",
      preview: "Your form has been...",
      time: "1 hr",
      badge: "2",
      unread: true,
    },
    {
      initials: "EW",
      avatarColor: "#d97706",
      name: "Emma Wilson",
      channelIcon: "sms",
      preview: "See you tomorrow at...",
      time: "3 hr",
    },
    {
      initials: "RK",
      avatarColor: "#0891B2",
      name: "Robert Keane",
      channelIcon: "wa",
      preview: "Recall reminder sent...",
      time: "1 day",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute inset-0 bg-[#F8FAFC] flex h-full overflow-hidden"
    >
      {/* Left rail */}
      <div className="w-[300px] bg-white border-r border-[#E2E8F0] flex flex-col shrink-0">
        <div className="px-4 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-[16px] font-bold text-[#0F172A]">Inbox</div>
            <span className="bg-[#2563EB] text-white text-[11px] font-bold rounded-full px-2 py-0.5 ml-2">
              3
            </span>
          </div>
          <button className="bg-[#2563EB] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg">
            + New
          </button>
        </div>
        <div className="flex gap-2 px-4 py-3 border-b border-[#E2E8F0]">
          {[
            { label: "All", active: true },
            { label: "Unread" },
            { label: "SMS" },
            { label: "WhatsApp" },
          ].map((t) => (
            <button
              key={t.label}
              className={`text-[12px] font-medium px-3 py-1 rounded-full border ${
                t.active
                  ? "bg-[#eff6ff] text-[#2563EB] border-[#bfdbfe]"
                  : "border-[#E2E8F0] text-[#64748b]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          {rows.map((r, i) => (
            <ConversationRow key={i} row={r} />
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#2563EB] font-bold flex items-center justify-center">
            SM
          </div>
          <div>
            <div className="text-[15px] font-semibold text-[#0F172A]">Sarah Mitchell</div>
            <div className="text-[12px] text-[#64748b]">Last active 2 min ago</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-[#E2E8F0]" />
            <div className="text-[11px] text-[#94a3b8] shrink-0">Today</div>
            <div className="flex-1 border-t border-[#E2E8F0]" />
          </div>

          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-full bg-[#dbeafe] text-[#2563EB] text-[10px] font-bold flex items-center justify-center shrink-0">
              SM
            </div>
            <div className="max-w-[70%]">
              <div className="bg-white border border-[#E2E8F0] rounded-xl rounded-bl-sm px-4 py-2.5 shadow-sm text-[14px] text-[#0F172A]">
                Hi, can I confirm my appointment for tomorrow?
              </div>
              <div className="text-[11px] text-[#94a3b8] mt-1 flex items-center gap-1">
                <MessageSquare size={10} /> Today 9:41am
              </div>
            </div>
          </div>

          {showOutbound && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-end"
            >
              <div className="max-w-[70%] bg-[#2563EB] rounded-xl rounded-br-sm px-4 py-2.5 text-[14px] text-white">
                Hi Sarah, just a reminder about your whitening appointment tomorrow at 10am. See
                you then!
              </div>
              <div className="text-[11px] text-[#94a3b8] mt-1 text-right">
                Today 9:42am · ✓✓
              </div>
            </motion.div>
          )}

          <div className="flex justify-end">
            <div className="max-w-[70%] bg-[#F1F5F9] border border-dashed border-[#E2E8F0] rounded-xl px-4 py-2.5 text-[13px] text-[#64748b] italic flex items-center gap-2">
              Appointment reminder sent automatically
              <span className="text-[10px] text-[#94a3b8] bg-white border border-[#E2E8F0] rounded px-1.5 py-0.5 not-italic">
                Auto reminder
              </span>
            </div>
          </div>
        </div>

        {/* Reply */}
        <div className="px-4 py-3 border-t border-[#E2E8F0] bg-white">
          <div className="text-[12px] font-medium text-[#64748b] mb-2 flex items-center gap-1.5">
            <ClipboardList size={12} />
            Send form
          </div>
          <textarea
            readOnly
            value={typedMessage}
            placeholder="Type a message..."
            className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] px-4 py-3 text-[14px] text-[#0F172A] resize-none h-[72px]"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="text-[11px] text-[#94a3b8]">⌘↵ to send</div>
            <button className="bg-[#2563EB] text-white text-[13px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
              <Send size={14} /> Send
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------- CURSOR ----------
function AnimatedCursor({
  position,
  clicking,
}: {
  position: CursorPos;
  clicking: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-[200] top-0 left-0"
      animate={{ x: position.x, y: position.y }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M4 2L16 10L10 11L8 18L4 2Z"
          fill={clicking ? "#2563EB" : "white"}
          stroke="#0F172A"
          strokeWidth="1.5"
        />
      </svg>
    </motion.div>
  );
}

// ---------- TOAST STACK ----------
function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[150] flex flex-col-reverse gap-2 items-center">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 bg-[#2563EB] text-white rounded-xl px-[18px] py-3.5 text-[14px] font-medium shadow-[0_4px_20px_rgba(0,0,0,0.15)] whitespace-nowrap"
          >
            <CheckCircle size={18} className="text-white shrink-0" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ---------- MAIN MOCKUP + SEQUENCER ----------
const TYPED_FULL =
  "Hi Sarah, just a reminder about your whitening appointment tomorrow at 10am. See you then!";

function DashboardMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState<PageKey>("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState<CursorPos>({ x: 400, y: 300 });
  const [clicking, setClicking] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [typedMessage, setTypedMessage] = useState("");
  const [showOutbound, setShowOutbound] = useState(false);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    let toastId = 1;

    const getSize = () => {
      const r = containerRef.current?.getBoundingClientRect();
      return { w: r?.width ?? 1000, h: r?.height ?? 600 };
    };

    // Waypoints expressed as percentages of container
    const moveTo = (xPct: number, yPct: number) => {
      const { w, h } = getSize();
      setCursorPos({ x: (xPct / 100) * w, y: (yPct / 100) * h });
    };

    const click = () => {
      setClicking(true);
      timeouts.push(setTimeout(() => setClicking(false), 150));
    };

    const pushToast = (message: string, ttl = 1800) => {
      const id = toastId++;
      setToasts((t) => [...t, { id, message }]);
      timeouts.push(
        setTimeout(() => {
          setToasts((t) => t.filter((x) => x.id !== id));
        }, ttl),
      );
    };

    const runSequence = () => {
      // Reset
      setActivePage("dashboard");
      setDrawerOpen(false);
      setTypedMessage("");
      setShowOutbound(false);
      setToasts([]);
      moveTo(60, 50);

      // 800: cursor → Calendar icon (sidebar ~ x:2.8% (28/1000), y depends on container)
      timeouts.push(setTimeout(() => moveTo(2.8, 30), 800));
      // 1400: click → calendar
      timeouts.push(
        setTimeout(() => {
          click();
          setActivePage("calendar");
        }, 1400),
      );
      // 1800: hover Wed Sarah block
      timeouts.push(setTimeout(() => moveTo(45, 35), 1800));
      // 3000: open drawer
      timeouts.push(
        setTimeout(() => {
          click();
          setDrawerOpen(true);
        }, 3000),
      );
      // 3400: cursor → Send SMS in drawer (drawer is right 400px)
      timeouts.push(setTimeout(() => moveTo(75, 60), 3400));
      // 4400: click send sms
      timeouts.push(setTimeout(() => click(), 4400));
      // 4600: toast
      timeouts.push(
        setTimeout(() => pushToast("✓ SMS sent — See you tomorrow, Sarah!", 1400), 4600),
      );
      // 6000: cursor → Inbox icon
      timeouts.push(setTimeout(() => moveTo(2.8, 42), 6000));
      // 6800: open inbox
      timeouts.push(
        setTimeout(() => {
          click();
          setDrawerOpen(false);
          setActivePage("inbox");
        }, 6800),
      );
      // 7400: cursor to reply textarea
      timeouts.push(setTimeout(() => moveTo(60, 88), 7400));
      // 8000: click textarea
      timeouts.push(setTimeout(() => click(), 8000));
      // 8200: typing animation
      timeouts.push(
        setTimeout(() => {
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTypedMessage(TYPED_FULL.slice(0, i));
            if (i >= TYPED_FULL.length) {
              clearInterval(interval);
            }
          }, 28);
          intervals.push(interval);
        }, 8200),
      );
      // 11000: cursor → Send button
      timeouts.push(setTimeout(() => moveTo(85, 92), 11000));
      // 11600: click send
      timeouts.push(
        setTimeout(() => {
          click();
          setShowOutbound(true);
          setTypedMessage("");
          pushToast("✓ SMS sent to Sarah Mitchell", 1400);
        }, 11600),
      );
      // 13000: cursor back to dashboard icon
      timeouts.push(setTimeout(() => moveTo(2.8, 18), 13000));
      // 13800: click dashboard
      timeouts.push(
        setTimeout(() => {
          click();
          setActivePage("dashboard");
        }, 13800),
      );
      // 14200: reset position
      timeouts.push(setTimeout(() => moveTo(60, 50), 14200));
    };

    runSequence();
    const loop = setInterval(runSequence, 18000);

    return () => {
      clearInterval(loop);
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#F8FAFC] flex overflow-hidden rounded-[8px] relative select-none"
    >
      <SidebarIconOnly activePage={activePage} />
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
        <TopBar activePage={activePage} />
        <div className="flex-1 min-h-0 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {activePage === "dashboard" && <DashboardPage key="dashboard" />}
            {activePage === "calendar" && (
              <CalendarPage key="calendar" drawerOpen={drawerOpen} />
            )}
            {activePage === "inbox" && (
              <InboxPage
                key="inbox"
                typedMessage={typedMessage}
                showOutbound={showOutbound}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>{drawerOpen && <AppointmentDrawer key="drawer" />}</AnimatePresence>
        </div>
        <ToastStack toasts={toasts} />
      </div>
      <AnimatedCursor position={cursorPos} clicking={clicking} />
    </div>
  );
}

export default function DashboardAnimation() {
  return (
    <section className="bg-white pt-0 pb-24 overflow-hidden hidden md:block">
      <div className="w-full max-w-[1500px] mx-auto px-0">
        <ContainerScroll titleComponent={<></>}>
          <DashboardMockup />
        </ContainerScroll>
      </div>
    </section>
  );
}
