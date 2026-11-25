import type { ReactNode } from "react";
import {
  BarChart2,
  Bell,
  Building,
  Calendar,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  ListPlus,
  LogOut,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import ToothIcon from "@/components/icons/ToothIcon";

/*
 * The practice app's frame, copied from desk-care-hub @ #691: Sidebar.tsx (w-60, #0F172A,
 * MAIN / TOOLS / ACCOUNT, active item #1E293B), Header.tsx (60px, page title, "Search
 * patients... ⌘K", "New appointment"), ui/Notice.tsx and ui/custom-toast.tsx. Inside training it
 * is drawn in a box, not the whole window. Sidebar items not used by a task call `onOther`.
 */

type NavItem = { label: string; icon: LucideIcon | typeof ToothIcon };

const MAIN: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Calendar", icon: Calendar },
  { label: "Patients", icon: Users },
  { label: "Messages", icon: MessageSquare },
];
const TOOLS: NavItem[] = [
  { label: "Payments", icon: CreditCard },
  { label: "Recalls", icon: RefreshCw },
  { label: "Waitlist", icon: ListPlus },
  { label: "Automations", icon: Zap },
  { label: "Forms", icon: ClipboardList },
  { label: "Services", icon: ToothIcon },
  { label: "Analytics", icon: BarChart2 },
];
const ACCOUNT: NavItem[] = [
  { label: "Settings", icon: Settings },
  { label: "What's New", icon: Sparkles },
];

function Section({
  label,
  items,
  active,
  onOther,
}: {
  label: string;
  items: NavItem[];
  active: string;
  onOther: (label: string) => void;
}) {
  return (
    <>
      <div className="mb-1 mt-3 px-4 text-[11px] font-medium uppercase tracking-[0.08em] text-[#475569]">
        {label}
      </div>
      {items.map(({ label: l, icon: Icon }) => {
        const on = l === active;
        return (
          <button
            key={l}
            type="button"
            onClick={() => !on && onOther(l)}
            className={`group mx-2 flex h-9 w-[calc(100%-16px)] items-center gap-[10px] rounded-lg px-[10px] text-left transition-colors ${
              on ? "bg-[#1E293B]" : "hover:bg-[#1E293B]"
            }`}
          >
            <Icon
              size={18}
              color={on ? "#ffffff" : "#64748b"}
              className={on ? "" : "group-hover:!text-white"}
            />
            <span
              className={`text-[13px] font-medium ${on ? "text-white" : "text-[#94a3b8] group-hover:text-white"}`}
            >
              {l}
            </span>
          </button>
        );
      })}
    </>
  );
}

export function AppChrome({
  practice,
  page,
  user,
  onOther,
  onNewAppointment,
  showReports = false,
  children,
}: {
  practice: string;
  page: string;
  user: { first: string; last: string; role: string };
  onOther: (what: string) => void;
  onNewAppointment: () => void;
  showReports?: boolean;
  children: ReactNode;
}) {
  const initials = `${user.first[0] ?? ""}${user.last[0] ?? ""}`.toUpperCase();
  return (
    <div className="relative flex h-full overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      <aside className="hidden w-60 flex-shrink-0 flex-col bg-[#0F172A] lg:flex">
        <div className="border-b border-[#1E293B] px-4 pb-4 pt-5">
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-extrabold">
              <span className="text-[#60a5fa]">Dent</span>
              <span className="text-white">Dock</span>
            </span>
            <span className="rounded bg-[#1E293B] px-2 py-[2px] text-[11px] font-medium text-[#64748b]">
              Admin
            </span>
          </div>
        </div>
        <div className="mx-2 mb-2 mt-2 flex items-center gap-2 rounded-lg bg-[#1E293B] px-3 py-[10px]">
          <Building size={16} className="flex-shrink-0 text-[#64748b]" />
          <span className="flex-1 truncate text-[13px] font-medium text-[#cbd5e1]">{practice}</span>
        </div>
        <nav className="flex-1 overflow-y-auto pb-2">
          <Section label="Main" items={MAIN} active={page} onOther={onOther} />
          <div className="mx-4 my-2 border-t border-[#1E293B]" />
          <Section label="Tools" items={TOOLS} active={page} onOther={onOther} />
          <div className="mx-4 my-2 border-t border-[#1E293B]" />
          <Section label="Account" items={ACCOUNT} active={page} onOther={onOther} />
        </nav>
        <div className="flex items-center gap-[10px] border-t border-[#1E293B] p-4">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[12px] font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-medium text-[#cbd5e1]">
              {user.first} {user.last}
            </div>
            <div className="text-[11px] text-[#475569]">{user.role}</div>
          </div>
          <button
            type="button"
            onClick={() => onOther("Sign out")}
            aria-label="Sign out"
            className="text-[#475569]"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[60px] flex-shrink-0 items-center justify-between gap-3 border-b border-[#E2E8F0] bg-white px-4 md:px-6">
          <h1 className="min-w-0 truncate text-[18px] font-semibold">{page}</h1>
          <div className="flex flex-shrink-0 items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => onOther("Search")}
              className="relative hidden h-9 w-44 items-center rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] pl-9 text-left text-sm text-[#64748B] md:flex xl:w-64"
            >
              <Search size={16} className="absolute left-3" />
              Search patients... ⌘K
            </button>
            <button
              type="button"
              onClick={() => onOther("Notifications")}
              aria-label="Notifications"
              className="relative p-2 text-[#64748B] transition-colors hover:text-[#0F172A]"
            >
              <Bell size={20} />
            </button>
            {/* "View reports" shows only with the Analytics permission (Header.tsx canSeeReports),
                which a receptionist doesn't have by default, so a reception task leaves it out. */}
            {showReports && (
              <button
                type="button"
                onClick={() => onOther("View reports")}
                className="hidden h-9 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3.5 text-[13px] font-semibold hover:border-[#cbd5e1] hover:bg-[#f8fafc] sm:flex"
              >
                <BarChart2 size={16} className="text-[#64748B]" />
                <span className="hidden xl:inline">View reports</span>
              </button>
            )}
            <button
              type="button"
              onClick={onNewAppointment}
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 text-[13px] font-semibold text-white shadow-[0_1px_3px_rgba(37,99,235,0.3)] transition-colors hover:bg-[#1d4ed8]"
            >
              <Plus size={16} />
              <span className="hidden lg:inline">New appointment</span>
            </button>
          </div>
        </header>
        <div className="relative min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

export type NoticeTone = "warning" | "danger" | "info";
const STRIP: Record<NoticeTone, string> = {
  warning: "border-l-[#d97706]",
  danger: "border-l-[#dc2626]",
  info: "border-l-[#2563eb]",
};
const ICON: Record<NoticeTone, string> = {
  warning: "text-[#d97706]",
  danger: "text-[#dc2626]",
  info: "text-[#2563eb]",
};

/** ui/Notice.tsx: white, thin grey border, coloured strip on the left. */
export function Notice({
  tone,
  icon: Icon,
  title,
  children,
  className = "",
}: {
  tone: NoticeTone;
  icon?: LucideIcon;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-md border border-l-[3px] border-[#E2E8F0] bg-white px-3 py-2.5 text-[13px] ${STRIP[tone]} ${className}`}
    >
      {Icon && <Icon size={15} aria-hidden className={`mt-0.5 flex-shrink-0 ${ICON[tone]}`} />}
      <div className="min-w-0 flex-1">
        {title && <div className="font-semibold text-[#0F172A]">{title}</div>}
        {children && <div className={`text-[#475569] ${title ? "mt-0.5" : ""}`}>{children}</div>}
      </div>
    </div>
  );
}

/** ui/custom-toast.tsx (success): blue, white text, bottom centre. */
export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      className="pointer-events-none absolute bottom-6 left-1/2 z-[60] -translate-x-1/2"
      role="status"
    >
      <div className="inline-flex min-w-[280px] items-center gap-3 rounded-xl bg-[#2563EB] px-[18px] py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        <CheckCircle2 size={18} className="flex-shrink-0 text-white" />
        <span className="flex-1 text-[14px] font-medium text-white">{message}</span>
      </div>
    </div>
  );
}
