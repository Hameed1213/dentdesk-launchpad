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
  CheckCircle,
  TrendingUp,
  UserPlus,
  Plus,
} from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

type Toast = { id: number; message: string };

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

// ---------- TOP BAR ----------
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

// ---------- STAT CARD ----------
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
        <div className="w-full h-[2px] bg-[#E2E8F0] rounded-full mt-2">
          <motion.div
            className="h-full bg-[#2563EB] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct ?? 0}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>
      )}
    </div>
  );
}

// ---------- SCHEDULE ROW ----------
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
    color: "#7c3aed",
    name: "Maria Lombardi",
    treatment: "Hygiene · 45 min",
    badge: "In Chair",
    badgeBg: "#faf5ff",
    badgeColor: "#7c3aed",
    pulse: true,
  },
];

// ---------- TOAST STACK ----------
function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[150] flex flex-col gap-2 items-center">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 bg-[#2563EB] text-white rounded-xl px-5 py-3 text-[13px] font-medium shadow-[0_4px_20px_rgba(0,0,0,0.15)] whitespace-nowrap"
          >
            <CheckCircle size={16} className="shrink-0" />
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ---------- MAIN MOCKUP ----------
function DashboardMockup() {
  const [started, setStarted] = useState(false);
  const [countToday, setCountToday] = useState(0);
  const [countRevenue, setCountRevenue] = useState(0);
  const [countCapacity, setCountCapacity] = useState(0);
  const [capacityBarWidth, setCapacityBarWidth] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    const runSequence = () => {
      // Reset
      setStarted(false);
      setCountToday(0);
      setCountRevenue(0);
      setCountCapacity(0);
      setCapacityBarWidth(0);
      setVisibleRows(0);
      setToasts([]);

      timeouts.push(setTimeout(() => setStarted(true), 300));

      // TODAY: 0 → 12
      timeouts.push(
        setTimeout(() => {
          let count = 0;
          const interval = setInterval(() => {
            count += 1;
            setCountToday(count);
            if (count >= 12) clearInterval(interval);
          }, 67);
          intervals.push(interval);
        }, 400),
      );

      // REVENUE: 0 → 840
      timeouts.push(
        setTimeout(() => {
          let count = 0;
          const interval = setInterval(() => {
            count += 14;
            setCountRevenue(Math.min(count, 840));
            if (count >= 840) clearInterval(interval);
          }, 72);
          intervals.push(interval);
        }, 500),
      );

      // CAPACITY: 0 → 78
      timeouts.push(
        setTimeout(() => {
          let count = 0;
          const interval = setInterval(() => {
            count += 2;
            setCountCapacity(Math.min(count, 78));
            setCapacityBarWidth(Math.min(count, 78));
            if (count >= 78) clearInterval(interval);
          }, 52);
          intervals.push(interval);
        }, 600),
      );

      // Rows slide in
      [1100, 1400, 1700, 2000, 2300, 2600].forEach((t, i) => {
        timeouts.push(setTimeout(() => setVisibleRows(i + 1), t));
      });

      // Toast 1
      timeouts.push(
        setTimeout(() => {
          const id = toastIdRef.current++;
          setToasts((prev) => [...prev, { id, message: "✓ SMS reminders sent to 8 patients" }]);
          timeouts.push(
            setTimeout(
              () => setToasts((prev) => prev.filter((t) => t.id !== id)),
              3500,
            ),
          );
        }, 3200),
      );

      // Toast 2
      timeouts.push(
        setTimeout(() => {
          const id = toastIdRef.current++;
          setToasts((prev) => [
            ...prev,
            { id, message: "✓ £80 deposit received — Sarah Mitchell" },
          ]);
          timeouts.push(
            setTimeout(
              () => setToasts((prev) => prev.filter((t) => t.id !== id)),
              3500,
            ),
          );
        }, 4400),
      );
    };

    runSequence();
    const loop = setInterval(runSequence, 8000);

    return () => {
      clearInterval(loop);
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []);

  const statCards = [
    {
      label: "TODAY",
      Icon: Calendar,
      value: (
        <motion.span
          key={countToday}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="text-[40px] font-extrabold text-[#0F172A] leading-none mt-2 block"
        >
          {countToday}
        </motion.span>
      ),
      sub: "Next: 9:30am · Sarah Mitchell",
    },
    {
      label: "CAPACITY",
      Icon: BarChart2,
      value: (
        <span className="text-[40px] font-extrabold text-[#2563EB] leading-none mt-2 block">
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
        <span className="text-[40px] font-extrabold text-[#0F172A] leading-none mt-2 block">
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
        <div className="flex-1 min-h-0 overflow-auto bg-[#F8FAFC] p-6 relative">
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

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E2E8F0] flex justify-between items-center">
              <div className="text-[15px] font-semibold text-[#0F172A]">
                Today's Schedule
              </div>
              <button className="bg-[#2563EB] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Plus size={14} /> New appointment
              </button>
            </div>

            <div className="divide-y divide-[#E2E8F0]/60 relative">
              {rows.map((row, index) => (
                <div key={row.name}>
                  {index === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: visibleRows >= 2 ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative flex items-center h-4 px-5"
                    >
                      <span
                        className="text-[11px] font-semibold text-[#f97316]"
                        style={{ minWidth: "48px" }}
                      >
                        9:30
                      </span>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f97316] shrink-0 z-10" />
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
                    className="flex items-center px-5 py-3"
                  >
                    <div className="w-12 shrink-0">
                      <div
                        className={`text-[13px] font-semibold leading-tight ${
                          row.completed ? "text-[#94a3b8]" : "text-[#0F172A]"
                        }`}
                      >
                        {row.time}
                      </div>
                      <div className="text-[11px] text-[#94a3b8] leading-tight">
                        {row.period}
                      </div>
                    </div>
                    <span
                      className="w-2 h-2 rounded-full mx-3 shrink-0"
                      style={{ backgroundColor: row.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-[14px] font-semibold ${
                          row.completed ? "text-[#94a3b8]" : "text-[#0F172A]"
                        }`}
                      >
                        {row.name}
                      </div>
                      <div
                        className={`text-[12px] ${
                          row.completed ? "text-[#94a3b8]" : "text-[#64748b]"
                        }`}
                      >
                        {row.treatment}
                      </div>
                    </div>
                    <span
                      className="text-[12px] font-medium rounded-full px-2.5 py-0.5 flex items-center gap-1.5"
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
          </div>
        </div>
        <ToastStack toasts={toasts} />
      </div>
    </div>
  );
}

export default function DashboardAnimation() {
  return (
    <section className="bg-white pt-0 pb-8 overflow-hidden hidden md:block w-full">
      <ContainerScroll titleComponent={<></>}>
        <DashboardMockup />
      </ContainerScroll>
    </section>
  );
}
