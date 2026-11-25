import { useEffect, useRef, useState } from "react";
import {
  Ban,
  CalendarPlus,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Printer,
  Square,
} from "lucide-react";
import {
  CLINICIANS,
  PRACTICE_HOURS,
  TODAY,
  addDays,
  clinicianHours,
  dayLabel,
  weekday,
  type Booking,
} from "@/components/training/tasks/bookPhone";

/*
 * The diary, copied from desk-care-hub @ #691:
 * - CalendarPage.tsx: opens in Week view the first time; top bar "← Week" (day view only),
 *   ‹ label ›, Print, help; Day | Week | Month | Year tabs; week label "7 December – 11 December
 *   2026" (Monday to Friday when the weekend is hidden); day label "Thursday 10 December 2026".
 * - CalendarWeekView.tsx: a column per day headed "THU" / date / "N apts" (click = that day);
 *   visits that overlap sit side by side (layoutApts); striped outside practice hours; a click on
 *   free time gives the hour or half hour, with no dentist (the drawer then says Any available).
 * - CalendarDayView.tsx: a column per clinician ("N appointments today" / "Not working today"),
 *   striped outside practice or clinician hours; a click gives that clinician.
 * - CalendarAppointmentBlock.tsx (Confirmed: clinician colour + "1e", 3px bar), SlotChoiceMenu.tsx,
 *   CalendarMiniSidebar.tsx (Blocked shown by default; Cancelled, Completed hidden).
 */

export const HOUR_HEIGHT = 64;
const GRID_START = 8;
const GRID_END = 19;
const HOURS = Array.from({ length: GRID_END - GRID_START }, (_, i) => GRID_START + i);
const DAY_ABBR = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const hourLabel = (h: number) => `${h > 12 ? h - 12 : h} ${h >= 12 ? "PM" : "AM"}`;
const yFor = (mins: number) => (mins / 60 - GRID_START) * HOUR_HEIGHT;
const STRIPES =
  "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(226,232,240,0.6) 8px, rgba(226,232,240,0.6) 9px)";

export type DiaryView = "week" | "day";
/** clinicianId "" = no dentist chosen (a click in the week view). */
export type SlotPick = { clinicianId: string; date: string; start: number };

function mondayOf(date: string): string {
  return addDays(date, -((weekday(date) + 6) % 7));
}

function weekLabel(date: string): string {
  const mon = mondayOf(date);
  const fri = addDays(mon, 4);
  const p = (d: string) => {
    const [, m, day] = d.split("-").map(Number);
    return { day, month: MONTH_NAMES[m - 1] };
  };
  const a = p(mon);
  const b = p(fri);
  return `${a.day} ${a.month} – ${b.day} ${b.month} ${fri.slice(0, 4)}`;
}

/** layoutApts (CalendarWeekView.tsx): overlapping visits share the width. */
function layout(bookings: Booking[]) {
  const sorted = [...bookings].sort((a, b) => a.start - b.start);
  const clusters: Booking[][] = [];
  for (const b of sorted) {
    const c = clusters.find(
      (cl) =>
        b.start < Math.max(...cl.map((x) => x.start + x.minutes)) &&
        b.start + b.minutes > Math.min(...cl.map((x) => x.start)),
    );
    if (c) c.push(b);
    else clusters.push([b]);
  }
  const out: { b: Booking; col: number; cols: number }[] = [];
  for (const cl of clusters) {
    const columns: Booking[][] = [];
    for (const b of cl) {
      const col = columns.find((c) => b.start >= c[c.length - 1].start + c[c.length - 1].minutes);
      if (col) col.push(b);
      else columns.push([b]);
    }
    columns.forEach((col, i) => col.forEach((b) => out.push({ b, col: i, cols: columns.length })));
  }
  return out;
}

function Block({
  b,
  col,
  cols,
  onClick,
  highlight,
}: {
  b: Booking;
  col: number;
  cols: number;
  onClick: () => void;
  highlight: boolean;
}) {
  const c = CLINICIANS.find((x) => x.id === b.clinicianId)!;
  const gap = cols > 1 ? 1 : 0;
  return (
    <div
      onClick={onClick}
      className={`absolute z-[2] cursor-pointer overflow-hidden rounded-md ${highlight ? "ring-2 ring-[#2563EB] ring-offset-1" : ""}`}
      style={{
        top: yFor(b.start),
        height: Math.max((b.minutes / 60) * HOUR_HEIGHT, 36),
        left: `calc(${(col / cols) * 100}% + ${gap + 2}px)`,
        width: `calc(${100 / cols}% - ${gap * 2 + 4}px)`,
        background: `${c.color}1e`,
        borderLeft: `3px solid ${c.color}`,
      }}
      data-testid={`booking-${b.id}`}
    >
      <div className="px-1.5 py-1">
        <span className="block truncate text-[11px] font-semibold" style={{ color: c.text }}>
          {b.patient}
        </span>
        <span className="block truncate text-[11px] text-[#64748B]">{b.treatment}</span>
      </div>
    </div>
  );
}

function Lines({ isOpen }: { isOpen: (t: number) => boolean }) {
  return (
    <>
      {HOURS.flatMap((h) =>
        [0, 30].map((m) => {
          const t = h * 60 + m;
          return (
            <div
              key={t}
              className={`pointer-events-none absolute w-full ${m === 0 ? "border-t border-[#E2E8F0]/70" : "border-t border-dashed border-[#E2E8F0]/40"}`}
              style={{
                top: yFor(t),
                height: HOUR_HEIGHT / 2,
                ...(isOpen(t) ? {} : { background: STRIPES, backgroundColor: "#F1F5F9" }),
              }}
            />
          );
        }),
      )}
    </>
  );
}

function TimeGutter() {
  return (
    <div className="relative w-[52px] flex-shrink-0 border-r border-[#E2E8F0] bg-white">
      {HOURS.map((h, i) => (
        <div
          key={h}
          className="absolute right-2 text-[12px] text-[#64748B]"
          style={{ top: i * HOUR_HEIGHT - 8 }}
        >
          {i === 0 ? "" : hourLabel(h)}
        </div>
      ))}
    </div>
  );
}

export function Diary({
  view,
  date,
  bookings,
  onView,
  onDate,
  onPickSlot,
  onBlockTime,
  onOther,
  highlightId,
}: {
  view: DiaryView;
  date: string;
  bookings: Booking[];
  onView: (v: DiaryView) => void;
  onDate: (d: string) => void;
  onPickSlot: (p: SlotPick) => void;
  onBlockTime: () => void;
  onOther: (what: string) => void;
  highlightId?: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<{ x: number; y: number; pick: SlotPick } | null>(null);
  const [open, close] = PRACTICE_HOURS;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = yFor(8 * 60 + 40);
  }, [view]);
  useEffect(() => setMenu(null), [date, view]);
  useEffect(() => {
    if (!menu) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [menu]);

  const practiceOpen = (d: string, t: number) =>
    weekday(d) >= 1 && weekday(d) <= 5 && t >= open && t < close;

  /** A click on free time: the hour or half hour clicked in (as the app). */
  const clickFree = (e: React.MouseEvent<HTMLDivElement>, d: string, clinicianId: string) => {
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const start =
      Math.floor((GRID_START * 60 + ((e.clientY - rect.top) / HOUR_HEIGHT) * 60) / 30) * 30;
    if (!practiceOpen(d, start)) return;
    if (clinicianId) {
      const hrs = clinicianHours(CLINICIANS.find((c) => c.id === clinicianId)!, d);
      if (!hrs || start < hrs[0] || start >= hrs[1]) return;
    }
    const box = rootRef.current!.getBoundingClientRect();
    setMenu({
      x: Math.max(4, Math.min(e.clientX - box.left, box.width - 190)),
      y: Math.max(4, Math.min(e.clientY - box.top, box.height - 100)),
      pick: { clinicianId, date: d, start },
    });
  };

  const step = view === "week" ? 7 : 1;
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(mondayOf(date), i));

  return (
    <div ref={rootRef} className="relative flex h-full bg-[#F8FAFC]">
      <MiniSidebar
        date={date}
        onDate={(d) => {
          onDate(d);
          onView("day");
        }}
        onBlockTime={onBlockTime}
        onOther={onOther}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Navigation + controls bar */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            {view === "day" && (
              <button
                type="button"
                onClick={() => onView("week")}
                className="mr-2 text-[13px] font-medium text-[#64748B] hover:text-[#0F172A]"
              >
                ← Week
              </button>
            )}
            <button
              type="button"
              onClick={() => onDate(addDays(date, -step))}
              aria-label="Previous"
              className="text-[#64748B] hover:text-[#0F172A]"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="select-none px-2 text-[15px] font-semibold" data-testid="diary-label">
              {view === "day" ? dayLabel(date) : weekLabel(date)}
            </span>
            <button
              type="button"
              onClick={() => onDate(addDays(date, step))}
              aria-label="Next"
              className="text-[#64748B] hover:text-[#0F172A]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => onOther("Print")}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-[#E2E8F0] px-3 text-[13px] font-medium text-[#64748B] hover:bg-[#F1F5F9]"
            >
              <Printer size={16} /> Print
            </button>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B]">
              <HelpCircle size={16} />
            </span>
          </div>
        </div>

        {/* View tabs */}
        <div className="flex flex-shrink-0 border-b-2 border-[#E2E8F0] bg-white">
          {(["Day", "Week", "Month", "Year"] as const).map((v) => {
            const active = v.toLowerCase() === view;
            return (
              <button
                key={v}
                type="button"
                onClick={() =>
                  v === "Day" || v === "Week"
                    ? onView(v.toLowerCase() as DiaryView)
                    : onOther(`${v} view`)
                }
                className={`-mb-[2px] h-[40px] whitespace-nowrap border-b-[3px] px-4 text-[13px] font-semibold sm:px-6 sm:text-[14px] ${
                  active
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                {v}
              </button>
            );
          })}
        </div>

        {view === "week" ? (
          <>
            <div className="flex flex-shrink-0 border-b border-[#E2E8F0] bg-white">
              <div className="w-[52px] flex-shrink-0 border-r border-[#E2E8F0]" />
              {weekDays.map((d) => {
                const n = bookings.filter((b) => b.date === d).length;
                const isToday = d === TODAY;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      onDate(d);
                      onView("day");
                    }}
                    className="flex-1 rounded border-r border-[#E2E8F0] py-2 text-center transition-colors last:border-r-0 hover:bg-[#2563EB]/5"
                    data-testid={`weekday-${d}`}
                  >
                    <div className="text-[11px] font-medium uppercase text-[#64748B]">
                      {DAY_ABBR[weekday(d)]}
                    </div>
                    <div
                      className={`mt-0.5 text-[20px] font-bold leading-tight ${
                        isToday
                          ? "mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-white"
                          : ""
                      }`}
                    >
                      {Number(d.slice(8))}
                    </div>
                    {n > 0 && (
                      <span className="mt-0.5 text-[11px] font-medium text-[#64748B]">
                        {n} apt{n !== 1 ? "s" : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-y-auto bg-white">
              <div className="flex" style={{ height: HOURS.length * HOUR_HEIGHT }}>
                <TimeGutter />
                {weekDays.map((d) => (
                  <div
                    key={d}
                    className="relative flex-1 border-r border-[#E2E8F0] last:border-r-0"
                  >
                    <Lines isOpen={(t) => practiceOpen(d, t)} />
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={(e) => clickFree(e, d, "")}
                      data-testid={`week-col-${d}`}
                    >
                      {layout(bookings.filter((b) => b.date === d)).map(({ b, col, cols }) => (
                        <Block
                          key={b.id}
                          b={b}
                          col={col}
                          cols={cols}
                          highlight={highlightId === b.id}
                          onClick={() => onOther("An existing appointment")}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-shrink-0 border-b border-[#E2E8F0] bg-white">
              <div className="w-[52px] flex-shrink-0 border-r border-[#E2E8F0]" />
              {CLINICIANS.map((c) => {
                const working = clinicianHours(c, date);
                const n = bookings.filter((b) => b.date === date && b.clinicianId === c.id).length;
                return (
                  <div
                    key={c.id}
                    className="min-w-[140px] flex-1 border-r border-[#E2E8F0] py-2.5 text-center last:border-r-0"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                        style={{ backgroundColor: c.bg, color: c.text }}
                      >
                        {c.initials}
                      </span>
                      <span className="text-[13px] font-semibold">{c.name}</span>
                    </div>
                    <div className="mt-0.5 text-[12px] text-[#64748B]">
                      {working
                        ? `${n} appointment${n === 1 ? "" : "s"} today`
                        : "Not working today"}
                    </div>
                  </div>
                );
              })}
            </div>
            <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-auto bg-white">
              <div className="flex" style={{ height: HOURS.length * HOUR_HEIGHT }}>
                <TimeGutter />
                {CLINICIANS.map((c) => {
                  const hrs = clinicianHours(c, date);
                  return (
                    <div
                      key={c.id}
                      className="relative min-w-[140px] flex-1 border-r border-[#E2E8F0] last:border-r-0"
                    >
                      <Lines
                        isOpen={(t) => practiceOpen(date, t) && !!hrs && t >= hrs[0] && t < hrs[1]}
                      />
                      <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={(e) => clickFree(e, date, c.id)}
                        data-testid={`day-col-${c.id}`}
                      >
                        {layout(
                          bookings.filter((b) => b.date === date && b.clinicianId === c.id),
                        ).map(({ b, col, cols }) => (
                          <Block
                            key={b.id}
                            b={b}
                            col={col}
                            cols={cols}
                            highlight={highlightId === b.id}
                            onClick={() => onOther("An existing appointment")}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {menu && (
        <>
          <div className="absolute inset-0 z-[40]" onClick={() => setMenu(null)} />
          <div
            className="absolute z-[41] w-[180px] rounded-[10px] border border-[#E2E8F0] bg-white py-2 shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
            style={{ left: menu.x, top: menu.y }}
            role="menu"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onPickSlot(menu.pick);
                setMenu(null);
              }}
              className="flex h-10 w-full items-center gap-2.5 px-4 text-[13px] font-medium hover:bg-[#F1F5F9]"
            >
              <CalendarPlus size={16} className="text-[#2563EB]" />
              Book appointment
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenu(null);
                onBlockTime();
              }}
              className="flex h-10 w-full items-center gap-2.5 px-4 text-[13px] font-medium hover:bg-[#F1F5F9]"
            >
              <Ban size={16} className="text-[#64748B]" />
              Block time
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const MINI_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_HEADERS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** CalendarMiniSidebar.tsx: month, Block time, DENTISTS, SHOW, Show weekend. */
function MiniSidebar({
  date,
  onDate,
  onBlockTime,
  onOther,
}: {
  date: string;
  onDate: (d: string) => void;
  onBlockTime: () => void;
  onOther: (what: string) => void;
}) {
  const [y, m] = date.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array(lead).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  const iso = (d: number) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  return (
    <div className="hidden w-[180px] flex-shrink-0 flex-col overflow-y-auto border-r border-[#E2E8F0] bg-white lg:flex xl:w-[220px]">
      <div className="p-4 pb-0">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onOther("Another month")}
            aria-label="Previous month"
            className="text-[#64748B]"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[14px] font-semibold">
            {MINI_MONTHS[m - 1]} {y}
          </span>
          <button
            type="button"
            onClick={() => onOther("Another month")}
            aria-label="Next month"
            className="text-[#64748B]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="mb-1 grid grid-cols-7">
          {DAY_HEADERS.map((d) => (
            <div key={d} className="text-center text-[11px] font-medium text-[#64748B]">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((d, i) => {
            if (d === null) return <span key={i} />;
            const v = iso(d);
            const isToday = v === TODAY;
            const isSel = v === date;
            const past = v < TODAY;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onDate(v)}
                className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-[13px] transition-colors ${
                  isToday && !isSel
                    ? "bg-[#2563EB] font-bold text-white"
                    : isSel
                      ? "border border-[#2563EB]/30 bg-[#2563EB]/10 font-bold text-[#2563EB]"
                      : past
                        ? "text-[#64748B]"
                        : "text-[#0F172A] hover:bg-[#F1F5F9]"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-4 px-4">
        <button
          type="button"
          onClick={onBlockTime}
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] text-[13px] font-medium text-[#64748B] hover:bg-[#F1F5F9]"
        >
          <Ban size={16} /> Block time
        </button>
      </div>
      <div className="mx-4 my-5 border-t border-[#E2E8F0]" />
      <div className="px-4">
        <p className="mb-2.5 text-[12px] font-medium uppercase tracking-[0.06em] text-[#64748B]">
          Dentists
        </p>
        {CLINICIANS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onOther("Hiding a dentist")}
            className="flex h-9 w-full items-center gap-2.5 rounded-lg px-2 hover:bg-[#F1F5F9]"
          >
            <span
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              style={{ backgroundColor: c.bg, color: c.text }}
            >
              {c.initials}
            </span>
            <span className="flex-1 truncate text-left text-[13px] font-medium">{c.name}</span>
            <CheckSquare size={18} className="flex-shrink-0 text-[#2563EB]" />
          </button>
        ))}
      </div>
      <div className="mx-4 my-5 border-t border-[#E2E8F0]" />
      <div className="px-4 pb-4">
        <p className="mb-2.5 text-[12px] font-medium uppercase tracking-[0.06em] text-[#64748B]">
          Show
        </p>
        {/* Defaults (CalendarPage.tsx): Blocked shown, Cancelled and Completed hidden. */}
        {(["Cancelled", "Blocked", "Completed"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => onOther("The Show filters")}
            className="flex h-9 w-full items-center gap-2.5 rounded-lg px-2 hover:bg-[#F1F5F9]"
          >
            <span className="flex-1 text-left text-[13px] font-medium">{l}</span>
            {l === "Blocked" ? (
              <CheckSquare size={18} className="flex-shrink-0 text-[#2563EB]" />
            ) : (
              <Square size={18} className="flex-shrink-0 text-[#E2E8F0]" />
            )}
          </button>
        ))}
        <div className="flex h-9 w-full items-center gap-2.5 px-2">
          <span className="flex-1 text-left text-[13px] font-medium">Show weekend</span>
          <span className="h-6 w-10 rounded-full bg-[#E2E8F0]">
            <span className="mx-1 mt-1 block h-4 w-4 rounded-full bg-white shadow" />
          </span>
        </div>
      </div>
    </div>
  );
}
