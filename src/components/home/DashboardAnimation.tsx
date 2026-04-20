"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  TrendingUp,
  UserPlus,
  Plus,
  Menu,
} from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// ---------- SHARED COUNTER HOOK ----------
function useDashboardCounters() {
  const [started, setStarted] = useState(false);
  const [countToday, setCountToday] = useState(0);
  const [countRevenue, setCountRevenue] = useState(0);
  const [countCapacity, setCountCapacity] = useState(0);
  const [capacityBarWidth, setCapacityBarWidth] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const rafs: number[] = [];

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateCount = (
      from: number,
      to: number,
      durationMs: number,
      onUpdate: (value: number) => void,
    ) => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = easeOut(progress);
        onUpdate(from + (to - from) * eased);
        if (progress < 1) {
          const id = requestAnimationFrame(tick);
          rafs.push(id);
        } else {
          onUpdate(to);
        }
      };
      const id = requestAnimationFrame(tick);
      rafs.push(id);
    };

    const runSequence = () => {
      setStarted(false);
      setCountToday(0);
      setCountRevenue(0);
      setCountCapacity(0);
      setCapacityBarWidth(0);
      setVisibleRows(0);

      timeouts.push(setTimeout(() => setStarted(true), 300));
      timeouts.push(
        setTimeout(() => {
          animateCount(0, 12, 1000, (v) => setCountToday(Math.round(v)));
        }, 400),
      );
      timeouts.push(
        setTimeout(() => {
          animateCount(0, 840, 1200, (v) => setCountRevenue(Math.round(v)));
        }, 500),
      );
      timeouts.push(
        setTimeout(() => {
          animateCount(0, 78, 1100, (v) => {
            setCountCapacity(Math.round(v));
            setCapacityBarWidth(v);
          });
        }, 600),
      );
      [1100, 1400, 1700, 2000, 2300, 2600].forEach((t, i) => {
        timeouts.push(setTimeout(() => setVisibleRows(i + 1), t));
      });
    };

    runSequence();
    const loop = setInterval(runSequence, 8000);

    return () => {
      clearInterval(loop);
      timeouts.forEach(clearTimeout);
      rafs.forEach(cancelAnimationFrame);
    };
  }, []);

  return {
    started,
    countToday,
    countRevenue,
    countCapacity,
    capacityBarWidth,
    visibleRows,
  };
}

// ---------- SHARED ROW DATA ----------
type Row = {
  time: string;
  period: string;
  color: string;
  name: string;
  treatment: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  pulse?: boolean;
  completed?: boolean;
};

const rows: Row[] = [
  {
    time: "9:00",
    period: "am",
    color: "#94a3b8",
    name: "Sarah Mitchell",
    treatment: "Whitening · 60 min",
    badge: "Completed",
    badgeBg: "#F1F5F9",
    badgeColor: "#64748b",
    completed: true,
  },
  {
    time: "9:45",
    period: "am",
    color: "#16a34a",
    name: "James Thompson",
    treatment: "Checkup · 30 min",
    badge: "Arrived",
    badgeBg: "#f0fdf4",
    badgeColor: "#16a34a",
    pulse: true,
  },
  {
    time: "10:30",
    period: "am",
    color: "#2563EB",
    name: "Maria Lombardi",
    treatment: "Hygiene · 45 min",
    badge: "Confirmed",
    badgeBg: "rgba(37,99,235,0.1)",
    badgeColor: "#2563EB",
  },
];

// ---------- DESKTOP SIDEBAR ----------
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

function SidebarIconOnly() {
  return (
    <div className="bg-[#0F172A] w-14 flex-shrink-0 flex flex-col h-full border-r border-[#1E293B]">
      <div className="h-[60px] flex items-center justify-center border-b border-[#1E293B]">
        <ToothIcon size={20} color="#60a5fa" />
      </div>
      <div className="flex flex-col gap-1 mt-3">
        <SidebarIconBtn Icon={LayoutDashboard} active />
        <SidebarIconBtn Icon={Calendar} />
        <SidebarIconBtn Icon={Users} />
        <SidebarIconBtn Icon={MessageSquare} badge="3" />
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

// ---------- DESKTOP TOP BAR ----------
function TopBar() {
  return (
    <div className="h-[60px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 flex-shrink-0">
      <div className="text-[18px] font-semibold text-[#0F172A]">Dashboard</div>
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

// ---------- STAT CARD (DESKTOP) ----------
function StatCard({
  label,
  Icon,
  children,
  sub,
  subColor = "#64748b",
  trendIcon,
  showProgress,
  progressPct,
}: {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  sub: string;
  subColor?: string;
  trendIcon?: boolean;
  showProgress?: boolean;
  progressPct?: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-[0_1px_4px_rgba(0,0,0,0.06)] h-[140px] overflow-hidden flex flex-col">
      <div className="flex items-center">
        <span className="text-[12px] font-medium text-[#64748b] uppercase tracking-wide">
          {label}
        </span>
        <Icon size={14} className="text-[#94a3b8] ml-auto" />
      </div>
      {children}
      <div
        className="text-[13px] mt-1 flex items-center gap-1 truncate whitespace-nowrap"
        style={{ color: subColor }}
      >
        {trendIcon && <TrendingUp size={12} className="shrink-0" />}
        <span className="truncate">{sub}</span>
      </div>
      {showProgress && (
        <div className="w-full h-[2px] bg-[#E2E8F0] rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-[#2563EB] rounded-full"
            style={{
              width: `${progressPct ?? 0}%`,
              transform: "translateZ(0)",
              willChange: "width",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ---------- COMPACT STAT CARD (TABLET / MOBILE) ----------
function CompactStatCard({
  label,
  Icon,
  value,
  sub,
  subColor = "#64748b",
  trendIcon,
  showProgress,
  progressPct,
  numberSize = 28,
}: {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  value: React.ReactNode;
  sub: string;
  subColor?: string;
  trendIcon?: boolean;
  showProgress?: boolean;
  progressPct?: number;
  numberSize?: number;
}) {
  return (
    <div className="bg-white rounded-xl p-3 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden">
      <div className="flex items-center">
        <span className="text-[9px] font-medium text-[#64748b] uppercase tracking-wide truncate">
          {label}
        </span>
        <Icon size={11} className="text-[#94a3b8] ml-auto shrink-0" />
      </div>
      <span
        className="font-extrabold text-[#0F172A] leading-none mt-1.5 block tabular-nums"
        style={{ fontSize: numberSize }}
      >
        {value}
      </span>
      <div
        className="text-[10px] mt-1 flex items-center gap-1 truncate whitespace-nowrap"
        style={{ color: subColor }}
      >
        {trendIcon && <TrendingUp size={10} className="shrink-0" />}
        <span className="truncate">{sub}</span>
      </div>
      {showProgress && (
        <div className="w-full h-[2px] bg-[#E2E8F0] rounded-full mt-1.5 overflow-hidden">
          <div
            className="h-full bg-[#2563EB] rounded-full"
            style={{ width: `${progressPct ?? 0}%` }}
          />
        </div>
      )}
    </div>
  );
}

// ---------- SCHEDULE ROWS (shared rendering) ----------
function ScheduleRows({
  visibleRows,
  compact = false,
}: {
  visibleRows: number;
  compact?: boolean;
}) {
  return (
    <div className="divide-y divide-[#E2E8F0]/60 relative">
      {rows.map((row, index) => (
        <div key={row.name}>
          {index === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visibleRows >= 2 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={`relative flex items-center h-4 ${compact ? "px-3" : "px-5"}`}
            >
              <span
                className="text-[10px] font-semibold text-[#f97316]"
                style={{ minWidth: compact ? "40px" : "48px" }}
              >
                9:30
              </span>
              <div className="w-2 h-2 rounded-full bg-[#f97316] shrink-0 z-10" />
              <div
                className="flex-1 h-[1.5px] ml-1"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #f97316 0px, #f97316 6px, transparent 6px, transparent 12px)",
                }}
              />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{
              opacity: index < visibleRows ? 1 : 0,
              x: index < visibleRows ? 0 : -16,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex items-center ${compact ? "px-3 py-2.5" : "px-5 py-3"}`}
          >
            <div className={compact ? "w-10 shrink-0" : "w-12 shrink-0"}>
              <div
                className={`${compact ? "text-[12px]" : "text-[13px]"} font-semibold leading-tight ${
                  row.completed ? "text-[#94a3b8]" : "text-[#0F172A]"
                }`}
              >
                {row.time}
              </div>
              <div className="text-[10px] text-[#94a3b8] leading-tight">
                {row.period}
              </div>
            </div>
            <span
              className="w-2 h-2 rounded-full mx-2.5 shrink-0"
              style={{ backgroundColor: row.color }}
            />
            <div className="flex-1 min-w-0">
              <div
                className={`${compact ? "text-[12.5px]" : "text-[14px]"} font-semibold truncate ${
                  row.completed ? "text-[#94a3b8]" : "text-[#0F172A]"
                }`}
              >
                {row.name}
              </div>
              <div
                className={`${compact ? "text-[11px]" : "text-[12px]"} truncate ${
                  row.completed ? "text-[#94a3b8]" : "text-[#64748b]"
                }`}
              >
                {row.treatment}
              </div>
            </div>
            <span
              className={`${compact ? "text-[10px] px-2 py-0.5" : "text-[12px] px-2.5 py-0.5"} font-medium rounded-full flex items-center gap-1.5 shrink-0`}
              style={{ backgroundColor: row.badgeBg, color: row.badgeColor }}
            >
              {row.pulse && (
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: row.badgeColor }}
                />
              )}
              {row.badge}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ---------- DESKTOP MOCKUP ----------
function DesktopDashboardMockup() {
  const {
    started,
    countToday,
    countRevenue,
    countCapacity,
    capacityBarWidth,
    visibleRows,
  } = useDashboardCounters();

  const statCards = [
    {
      label: "TODAY",
      Icon: Calendar,
      value: (
        <span className="text-[40px] font-extrabold text-[#0F172A] leading-none mt-2 block tabular-nums">
          {countToday}
        </span>
      ),
      sub: "Next: 9:30am · Sarah Mitchell",
    },
    {
      label: "CAPACITY",
      Icon: BarChart2,
      value: (
        <span className="text-[40px] font-extrabold text-[#2563EB] leading-none mt-2 block tabular-nums">
          {countCapacity}%
        </span>
      ),
      sub: "5h 30m booked · 7h avail.",
      showProgress: true,
      progressPct: capacityBarWidth,
    },
    {
      label: "REVENUE TODAY",
      Icon: TrendingUp,
      value: (
        <span className="text-[40px] font-extrabold text-[#0F172A] leading-none mt-2 block tabular-nums">
          £{countRevenue.toLocaleString()}
        </span>
      ),
      sub: "↑ 12% vs yesterday",
      subColor: "#16a34a",
      trendIcon: true,
    },
    {
      label: "NEW PATIENTS",
      Icon: UserPlus,
      value: (
        <span className="text-[40px] font-extrabold text-[#0F172A] leading-none mt-2 block">
          2
        </span>
      ),
      sub: "first appointment today",
    },
  ];

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex overflow-hidden rounded-[8px] relative select-none">
      <SidebarIconOnly />
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
        <TopBar />
        <div className="flex-1 min-h-0 overflow-hidden bg-[#F8FAFC] p-6 relative">
          <div className="mb-6">
            <div className="text-[22px] font-bold text-[#0F172A]">
              Good morning, Dr. James Webb
            </div>
            <div className="text-[13px] text-[#64748b] mt-1">
              Monday, 15 April 2026 · Smile Dental · 12 appointments today
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {statCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: started ? 1 : 0,
                  y: started ? 0 : 12,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
              >
                <StatCard
                  label={card.label}
                  Icon={card.Icon}
                  sub={card.sub}
                  subColor={card.subColor}
                  trendIcon={card.trendIcon}
                  showProgress={card.showProgress}
                  progressPct={card.progressPct}
                >
                  {card.value}
                </StatCard>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-t-2xl border border-b-0 border-[#E2E8F0] shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden -mb-6">
            <div className="px-5 py-4 border-b border-[#E2E8F0] flex justify-between items-center">
              <div className="text-[15px] font-semibold text-[#0F172A]">
                Today's Schedule
              </div>
              <button className="bg-[#2563EB] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Plus size={14} /> New appointment
              </button>
            </div>
            <ScheduleRows visibleRows={visibleRows} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- TABLET MOCKUP ----------
function TabletDashboardMockup() {
  const {
    started,
    countToday,
    countRevenue,
    countCapacity,
    capacityBarWidth,
    visibleRows,
  } = useDashboardCounters();

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col overflow-hidden rounded-[20px] relative select-none">
      {/* Top bar */}
      <div className="h-[52px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <ToothIcon size={18} color="#2563EB" />
          <span className="text-[15px] font-bold text-[#0F172A]">Dent Dock</span>
        </div>
        <div className="flex items-center gap-3">
          <Search size={16} className="text-[#64748b]" />
          <div className="relative">
            <Bell size={18} className="text-[#64748b]" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#DC2626] rounded-full text-white text-[8px] flex items-center justify-center">
              2
            </span>
          </div>
          <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
            JW
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden bg-[#F8FAFC] p-4">
        <div className="mb-4">
          <div className="text-[17px] font-bold text-[#0F172A]">
            Good morning, Dr. James Webb
          </div>
          <div className="text-[11px] text-[#64748b] mt-0.5">
            Monday, 15 April · 12 appointments today
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {[
            {
              label: "TODAY",
              Icon: Calendar,
              value: countToday,
              sub: "Next: 9:30am · Sarah",
            },
            {
              label: "CAPACITY",
              Icon: BarChart2,
              value: <span className="text-[#2563EB]">{countCapacity}%</span>,
              sub: "5h 30m booked",
              showProgress: true,
              progressPct: capacityBarWidth,
            },
            {
              label: "REVENUE",
              Icon: TrendingUp,
              value: `£${countRevenue.toLocaleString()}`,
              sub: "↑ 12% vs yesterday",
              subColor: "#16a34a",
              trendIcon: true,
            },
            {
              label: "NEW PATIENTS",
              Icon: UserPlus,
              value: 2,
              sub: "first appt today",
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: started ? 1 : 0, y: started ? 0 : 8 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
            >
              <CompactStatCard
                label={card.label}
                Icon={card.Icon}
                value={card.value}
                sub={card.sub}
                subColor={card.subColor}
                trendIcon={card.trendIcon}
                showProgress={card.showProgress}
                progressPct={card.progressPct}
                numberSize={26}
              />
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-t-2xl border border-b-0 border-[#E2E8F0] shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden -mb-4">
          <div className="px-3 py-2.5 border-b border-[#E2E8F0] flex justify-between items-center">
            <div className="text-[13px] font-semibold text-[#0F172A]">
              Today's Schedule
            </div>
            <button className="bg-[#2563EB] text-white text-[10px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
              <Plus size={11} /> New
            </button>
          </div>
          <ScheduleRows visibleRows={visibleRows} compact />
        </div>
      </div>
    </div>
  );
}

// ---------- MOBILE MOCKUP ----------
function MobileDashboardMockup() {
  const {
    started,
    countToday,
    countRevenue,
    countCapacity,
    capacityBarWidth,
    visibleRows,
  } = useDashboardCounters();

  const tabs = [
    { Icon: LayoutDashboard, label: "Dashboard", active: true },
    { Icon: Calendar, label: "Calendar" },
    { Icon: Users, label: "Patients" },
    { Icon: MessageSquare, label: "Inbox" },
    { Icon: Menu, label: "More" },
  ];

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex flex-col overflow-hidden rounded-[28px] relative select-none">
      {/* Top bar */}
      <div className="h-[48px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-3.5 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <ToothIcon size={16} color="#2563EB" />
          <span className="text-[13px] font-bold text-[#0F172A]">Dent Dock</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Bell size={16} className="text-[#64748b]" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#DC2626] rounded-full text-white text-[8px] flex items-center justify-center">
              11
            </span>
          </div>
          <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-[9px] font-bold">
            JW
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden bg-[#F8FAFC] p-3">
        <div className="mb-3">
          <div className="text-[14px] font-bold text-[#0F172A] leading-tight">
            Good morning,
          </div>
          <div className="text-[14px] font-bold text-[#0F172A] leading-tight">
            Dr. James Webb
          </div>
          <div className="text-[10px] text-[#64748b] mt-1">
            Mon, 15 April · 12 appts today
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            {
              label: "TODAY",
              Icon: Calendar,
              value: countToday,
              sub: "Next: 9:30am",
            },
            {
              label: "CAPACITY",
              Icon: BarChart2,
              value: <span className="text-[#2563EB]">{countCapacity}%</span>,
              sub: "5h 30m booked",
              showProgress: true,
              progressPct: capacityBarWidth,
            },
            {
              label: "REVENUE",
              Icon: TrendingUp,
              value: `£${countRevenue}`,
              sub: "↑ 12% vs yest.",
              subColor: "#16a34a",
              trendIcon: true,
            },
            {
              label: "NEW",
              Icon: UserPlus,
              value: 2,
              sub: "first appt today",
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: started ? 1 : 0, y: started ? 0 : 8 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
            >
              <CompactStatCard
                label={card.label}
                Icon={card.Icon}
                value={card.value}
                sub={card.sub}
                subColor={card.subColor}
                trendIcon={card.trendIcon}
                showProgress={card.showProgress}
                progressPct={card.progressPct}
                numberSize={22}
              />
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-3 py-2 border-b border-[#E2E8F0] flex justify-between items-center">
            <div className="text-[12px] font-semibold text-[#0F172A]">
              Today's Schedule
            </div>
          </div>
          <ScheduleRows visibleRows={visibleRows} compact />
        </div>
      </div>

      {/* Floating sparkle pill */}
      <div className="absolute bottom-[68px] right-3 bg-[#2563EB] text-white rounded-full px-2.5 py-1.5 flex items-center gap-1 shadow-lg">
        <Sparkles size={12} />
        <span className="text-[10px] font-semibold">AI</span>
      </div>

      {/* Bottom tab bar */}
      <div className="h-[56px] bg-white border-t border-[#E2E8F0] flex items-center justify-around px-2 flex-shrink-0">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`flex flex-col items-center gap-0.5 ${
              tab.active ? "text-[#2563EB]" : "text-[#64748b]"
            }`}
          >
            <tab.Icon size={18} />
            <span className="text-[9px] font-medium">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- EXPORT (responsive switcher) ----------
export default function DashboardAnimation() {
  return (
    <>
      {/* Desktop — keep current ContainerScroll behaviour */}
      <section
        className="bg-white pt-0 pb-8 overflow-hidden hidden lg:block w-full pointer-events-none"
        style={{ marginTop: "-206px" }}
      >
        <ContainerScroll titleComponent={<></>}>
          <DesktopDashboardMockup />
        </ContainerScroll>
      </section>

      {/* Tablet */}
      <section className="bg-white pt-8 pb-12 hidden md:block lg:hidden w-full pointer-events-none">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-4 border-[#6C6C6C] bg-[#222222] rounded-[30px] p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]"
            style={{ height: 540 }}
          >
            <TabletDashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* MOBILE — simple clean card, fade up on scroll */}
      <motion.div
        className="block md:hidden mt-8 mx-4 pb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Browser frame */}
        <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg">
          {/* Browser chrome */}
          <div className="h-8 bg-[#F1F5F9] border-b border-[#E2E8F0] flex items-center px-3 gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-white rounded mx-2 px-2 py-0.5 text-[10px] text-[#94a3b8] text-center font-mono">
              app.dentdock.co.uk/dashboard
            </div>
          </div>

          {/* Content */}
          <div className="bg-[#F8FAFC] p-4">
            {/* Greeting */}
            <div className="mb-4">
              <div className="text-[16px] font-bold text-[#0F172A]">
                Good morning, Dr. James Webb
              </div>
              <div className="text-[12px] text-[#64748b] mt-0.5">
                Monday, 15 April · 12 appointments today
              </div>
            </div>

            {/* 2x2 stat grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-xl p-3 border border-[#E2E8F0]">
                <div className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide">
                  Today
                </div>
                <div className="text-[28px] font-extrabold text-[#0F172A] leading-none mt-1">
                  12
                </div>
                <div className="text-[11px] text-[#64748b] mt-1 leading-tight">
                  Next: 9:45am
                  <br />
                  James
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-[#E2E8F0]">
                <div className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide">
                  Revenue
                </div>
                <div className="text-[28px] font-extrabold text-[#0F172A] leading-none mt-1">
                  £840
                </div>
                <div className="text-[11px] text-[#16a34a] mt-1">
                  ↑ 12% vs yesterday
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E2E8F0] flex justify-between items-center">
                <span className="text-[13px] font-semibold text-[#0F172A]">
                  Today's Schedule
                </span>
                <span className="text-[11px] font-semibold text-white bg-[#2563EB] px-2.5 py-1 rounded-lg">
                  + New
                </span>
              </div>
              {[
                {
                  time: "9:00",
                  color: "#94a3b8",
                  name: "Sarah",
                  treatment: "Whitening",
                  badge: "Completed",
                  badgeClass: "bg-[#F1F5F9] text-[#64748b]",
                  completed: true,
                },
                {
                  time: "9:45",
                  color: "#16a34a",
                  name: "James",
                  treatment: "Checkup",
                  badge: "Arrived",
                  badgeClass: "bg-[#f0fdf4] text-[#16a34a]",
                  completed: false,
                },
                {
                  time: "10:30",
                  color: "#2563EB",
                  name: "Maria",
                  treatment: "Hygiene",
                  badge: "Confirmed",
                  badgeClass: "bg-[#eff6ff] text-[#2563EB]",
                  completed: false,
                },
              ].map((row, i) => (
                <div key={i}>
                  {i === 1 && (
                    <div className="relative flex items-center h-4 px-4">
                      <span className="text-[10px] font-semibold text-[#f97316] w-10 shrink-0">
                        9:30
                      </span>
                      <div className="w-2 h-2 rounded-full bg-[#f97316] shrink-0 z-10" />
                      <div
                        className="flex-1 h-[1.5px] ml-1"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(to right, #f97316 0px, #f97316 6px, transparent 6px, transparent 12px)",
                        }}
                      />
                    </div>
                  )}
                  <div className="flex items-center px-4 py-2.5 border-b border-[#E2E8F0] last:border-0">
                    <span
                      className={`text-[12px] font-semibold w-10 shrink-0 ${row.completed ? "text-[#cbd5e1]" : "text-[#94a3b8]"}`}
                    >
                      {row.time}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full mx-2.5 shrink-0"
                      style={{ background: row.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-[13px] font-semibold truncate ${row.completed ? "text-[#94a3b8]" : "text-[#0F172A]"}`}
                      >
                        {row.name}
                      </div>
                      <div
                        className={`text-[11px] ${row.completed ? "text-[#94a3b8]" : "text-[#64748b]"}`}
                      >
                        {row.treatment}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${row.badgeClass}`}
                    >
                      {row.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
