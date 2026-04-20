"use client";
import { useEffect, useState } from "react";
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
  LogOut,
  Building2,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

type Toast = { id: number; message: string };

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

type Appt = {
  patient: string;
  treatment: string;
  top: number;
  height: number;
  color: string;
};

const APPTS: Record<string, Appt[]> = {
  mon: [{ patient: "James T.", treatment: "Checkup", top: 32, height: 64, color: "#2563EB" }],
  tue: [{ patient: "Maria L.", treatment: "Hygiene", top: 64, height: 80, color: "#7c3aed" }],
  wed: [
    { patient: "Tester One", treatment: "Invisalign", top: 16, height: 64, color: "#16a34a" },
    { patient: "Robert K.", treatment: "Checkup", top: 200, height: 64, color: "#0891B2" },
  ],
  thu: [{ patient: "Emma W.", treatment: "Hygiene", top: 48, height: 80, color: "#d97706" }],
  fri: [{ patient: "John B.", treatment: "Consultation", top: 32, height: 64, color: "#2563EB" }],
};

function ApptBlock({ appt, animated = false }: { appt: Appt; animated?: boolean }) {
  const inner = (
    <>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "#0F172A" }}>
        {appt.patient}
      </div>
      <div style={{ fontSize: "10px", color: "#64748b" }}>{appt.treatment}</div>
    </>
  );
  const style: React.CSSProperties = {
    position: "absolute",
    top: `${appt.top}px`,
    height: `${appt.height}px`,
    left: "4px",
    right: "4px",
    backgroundColor: `${appt.color}1e`,
    borderLeft: `3px solid ${appt.color}`,
    borderRadius: "6px",
    padding: "4px 6px",
    overflow: "hidden",
  };
  if (animated) {
    return (
      <motion.div
        style={style}
        initial={{ opacity: 0, scale: 0.95, x: -8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {inner}
      </motion.div>
    );
  }
  return <div style={style}>{inner}</div>;
}

function NavItem({
  Icon,
  label,
  active,
  flash,
  badge,
  pulseDot,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active?: boolean;
  flash?: boolean;
  badge?: string;
  pulseDot?: boolean;
}) {
  const isActive = active || flash;
  return (
    <div
      className={`mx-2 px-[10px] h-10 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
        isActive ? "bg-[#1E293B] text-white" : "text-[#94a3b8]"
      }`}
    >
      <Icon size={14} className={isActive ? "text-white" : "text-[#64748b]"} />
      <span className="text-[13px] font-medium">{label}</span>
      {badge && (
        <span className="bg-[#2563EB] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center ml-auto">
          {badge}
        </span>
      )}
      {pulseDot && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto" />}
    </div>
  );
}

function DashboardMockup() {
  const [scene, setScene] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [newBookingVisible, setNewBookingVisible] = useState(false);
  const [paymentsFlash, setPaymentsFlash] = useState(false);
  const [showRevenueCard, setShowRevenueCard] = useState(false);
  const [titleIsDashboard, setTitleIsDashboard] = useState(false);

  useEffect(() => {
    let toastIdCounter = 1;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const pushToast = (message: string, ttl = 4000) => {
      const id = toastIdCounter++;
      setToasts((t) => [...t, { id, message }]);
      timeouts.push(
        setTimeout(() => {
          setToasts((t) => t.filter((x) => x.id !== id));
        }, ttl),
      );
    };

    const runSequence = () => {
      // Reset
      setScene(0);
      setToasts([]);
      setNewBookingVisible(false);
      setPaymentsFlash(false);
      setShowRevenueCard(false);
      setTitleIsDashboard(false);

      // Scene 1 (1500ms): new booking + toast
      timeouts.push(
        setTimeout(() => {
          setScene(1);
          setNewBookingVisible(true);
          pushToast("New booking — Sarah Mitchell · Whitening · Wed 14:00");
        }, 1500),
      );

      // Scene 2 (4000ms): SMS toast
      timeouts.push(
        setTimeout(() => {
          setScene(2);
          pushToast("SMS sent — Appointment confirmed, see you Wednesday!");
        }, 4000),
      );

      // Scene 3 (6500ms): form toast
      timeouts.push(
        setTimeout(() => {
          setScene(3);
          pushToast("Form sent to Sarah Mitchell via Email");
        }, 6500),
      );

      // Scene 4 (9000ms): payment toast + payments flash
      timeouts.push(
        setTimeout(() => {
          setScene(4);
          pushToast("£80 deposit received — Sarah Mitchell via Stripe");
          setPaymentsFlash(true);
          timeouts.push(setTimeout(() => setPaymentsFlash(false), 1000));
        }, 9000),
      );

      // Scene 5 (10500ms): revenue card + title swap
      timeouts.push(
        setTimeout(() => {
          setScene(5);
          setTitleIsDashboard(true);
          setShowRevenueCard(true);
          timeouts.push(setTimeout(() => setTitleIsDashboard(false), 1500));
        }, 10500),
      );

      // Scene 6 (13000ms): fade out
      timeouts.push(
        setTimeout(() => {
          setScene(6);
          setShowRevenueCard(false);
          setNewBookingVisible(false);
        }, 13000),
      );
    };

    runSequence();
    const interval = setInterval(runSequence, 14000);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  void scene;

  return (
    <div className="w-full h-full bg-[#F8FAFC] flex overflow-hidden rounded-2xl relative">
      {/* SIDEBAR */}
      <div
        className="bg-[#0F172A] w-[240px] flex-shrink-0 flex flex-col h-full"
        style={{ borderRight: "1px solid #1E293B" }}
      >
        {/* Branding row */}
        <div className="px-4 py-4 flex items-center gap-2">
          <ToothIcon size={16} color="#60a5fa" />
          <span>
            <span style={{ color: "#60a5fa" }} className="font-extrabold">
              Dent
            </span>
            <span className="text-white font-extrabold"> Dock</span>
          </span>
          <span className="bg-[#1E293B] text-[#94a3b8] text-[10px] px-2 py-0.5 rounded-full ml-1">
            Admin
          </span>
        </div>

        {/* Practice switcher */}
        <div className="mx-3 mt-3 bg-[#1E293B] rounded-lg px-3 py-2 flex items-center gap-2">
          <Building2 size={14} className="text-[#64748b]" />
          <span className="text-[13px] text-white font-medium">Smile Dental</span>
        </div>

        {/* MAIN section */}
        <div className="text-[11px] uppercase tracking-[0.08em] text-[#475569] px-4 mt-4 mb-1">
          Main
        </div>
        <NavItem Icon={LayoutDashboard} label="Dashboard" />
        <NavItem Icon={Calendar} label="Calendar" active />
        <NavItem Icon={Users} label="Patients" />
        <NavItem Icon={MessageSquare} label="Inbox" badge="3" />

        {/* TOOLS */}
        <div className="border-t border-[#1E293B] mx-3 my-2" />
        <div className="text-[11px] uppercase tracking-[0.08em] text-[#475569] px-4 mb-1">
          Tools
        </div>
        <NavItem Icon={CreditCard} label="Payments" flash={paymentsFlash} />
        <NavItem Icon={RefreshCw} label="Recalls" />
        <NavItem Icon={Zap} label="Automations" />
        <NavItem Icon={ClipboardList} label="Forms" />
        <NavItem Icon={BarChart2} label="Analytics" />

        {/* ACCOUNT */}
        <div className="border-t border-[#1E293B] mx-3 my-2" />
        <div className="text-[11px] uppercase tracking-[0.08em] text-[#475569] px-4 mb-1">
          Account
        </div>
        <NavItem Icon={Settings} label="Settings" />
        <NavItem Icon={Sparkles} label="What's New" pulseDot />

        {/* Footer */}
        <div className="mt-auto px-4 py-4 border-t border-[#1E293B] flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-xs font-bold">
            HS
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] text-white font-medium leading-tight">Dr. Hariss</span>
            <span className="text-[11px] text-[#64748b] leading-tight">Owner</span>
          </div>
          <LogOut size={14} className="text-[#64748b] ml-auto" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-[60px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 flex-shrink-0">
          <div className="text-[18px] font-semibold text-[#0F172A]">
            {titleIsDashboard ? "Dashboard" : "Calendar"}
          </div>
          <div className="h-9 w-[260px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 text-[13px] text-[#94a3b8] flex items-center gap-2">
            <Search size={14} />
            <span className="flex-1">Search…</span>
            <span className="text-[10px] bg-[#E2E8F0] text-[#64748b] rounded px-1.5 py-0.5">
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
              HS
            </div>
          </div>
        </div>

        {/* Calendar content */}
        <div className="flex-1 bg-[#F8FAFC] overflow-hidden flex flex-col relative">
          {/* Toolbar */}
          <div className="px-6 py-3 bg-white border-b border-[#E2E8F0] flex items-center gap-3 flex-shrink-0">
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
              <ChevronLeft size={14} />
            </button>
            <button className="w-7 h-7 rounded-md border border-[#E2E8F0] flex items-center justify-center text-[#64748b]">
              <ChevronRight size={14} />
            </button>
            <button className="text-[12px] font-medium px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#64748b]">
              Today
            </button>
            <button className="ml-auto bg-[#2563EB] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg">
              + New appointment
            </button>
          </div>

          {/* Week grid */}
          <div className="flex flex-1 overflow-hidden">
            {/* Time column */}
            <div className="w-16 flex-shrink-0 border-r border-[#E2E8F0] bg-white">
              <div className="h-[33px] border-b border-[#E2E8F0]" />
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="h-16 border-b border-[#E2E8F0] text-[11px] text-[#94a3b8] px-2 pt-1"
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Day columns */}
            {[
              { key: "mon", label: "MON 13" },
              { key: "tue", label: "TUE 14" },
              { key: "wed", label: "WED 15", highlight: true },
              { key: "thu", label: "THU 16" },
              { key: "fri", label: "FRI 17" },
            ].map((day) => (
              <div key={day.key} className="flex-1 border-r border-[#E2E8F0] relative bg-white">
                <div
                  className={`text-[11px] text-center py-2 border-b border-[#E2E8F0] ${
                    day.highlight ? "text-[#2563EB] font-semibold" : "text-[#94a3b8]"
                  }`}
                >
                  {day.label}
                </div>
                <div className="relative">
                  {HOURS.map((h) => (
                    <div key={h} className="h-16 border-b border-[#E2E8F0]" />
                  ))}
                  {APPTS[day.key]?.map((a, i) => (
                    <ApptBlock key={i} appt={a} />
                  ))}
                  {day.key === "wed" && newBookingVisible && (
                    <ApptBlock
                      animated
                      appt={{
                        patient: "Sarah M.",
                        treatment: "Whitening",
                        top: 96,
                        height: 96,
                        color: "#2563EB",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Revenue card overlay */}
          <AnimatePresence>
            {showRevenueCard && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-4 right-4 bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)] w-48 z-40"
              >
                <div className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wide">
                  Revenue today
                </div>
                <div className="text-[24px] font-bold text-[#0F172A] mt-1">£720</div>
                <div className="text-[11px] text-[#16a34a] flex items-center gap-1 mt-1">
                  <TrendingUp size={12} /> vs £640 yesterday
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toast stack */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
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
                  <CheckCircle size={18} className="text-white flex-shrink-0" />
                  {t.message}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardAnimation() {
  return (
    <section className="bg-white pt-0 pb-24 overflow-hidden hidden md:block">
      <ContainerScroll titleComponent={<></>}>
        <DashboardMockup />
      </ContainerScroll>
    </section>
  );
}
