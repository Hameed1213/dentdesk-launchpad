import type { ReactNode } from "react";
import { Check } from "lucide-react";

/*
 * Small building blocks for the feature-page screens (see screens.tsx and the feature routes).
 * Keep wording true to the product; names, dates and amounts are examples.
 */

export type Tone = "blue" | "green" | "amber" | "red" | "purple" | "grey";

const toneClass: Record<Tone, string> = {
  blue: "bg-[#EFF6FF] text-[#1D4ED8]",
  green: "bg-[#DCFCE7] text-[#166534]",
  amber: "bg-[#FEF3C7] text-[#92400E]",
  red: "bg-[#FEE2E2] text-[#B91C1C]",
  purple: "bg-[#F3E8FF] text-[#7E22CE]",
  grey: "bg-[#F1F5F9] text-[#475569]",
};

export function Badge({ tone = "blue", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

export function Btn({ children, ghost = false }: { children: ReactNode; ghost?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap ${
        ghost ? "border border-[#E2E8F0] bg-white text-[#334155]" : "bg-[#2563EB] text-white"
      }`}
    >
      {children}
    </span>
  );
}

/** White panel inside a screen. */
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-white border border-[#E2E8F0] ${className}`}>{children}</div>
  );
}

/** A list of rows: left title + subtitle, right slot. */
export function RowList({
  rows,
}: {
  rows: { title: ReactNode; sub?: ReactNode; right?: ReactNode; lead?: ReactNode }[];
}) {
  return (
    <Panel className="divide-y divide-[#F1F5F9]">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
          <div className="flex items-center gap-3 min-w-0">
            {r.lead}
            <div className="min-w-0">
              <p className="text-[12px] font-medium text-[#0F172A] truncate">{r.title}</p>
              {r.sub && <p className="text-[11px] text-[#64748B] truncate">{r.sub}</p>}
            </div>
          </div>
          {r.right && <div className="flex-shrink-0">{r.right}</div>}
        </div>
      ))}
    </Panel>
  );
}

/** Simple table with a header row. */
export function Table({ cols, rows, grid }: { cols: string[]; rows: ReactNode[][]; grid: string }) {
  return (
    <Panel className="overflow-hidden">
      <div
        className={`grid ${grid} px-4 py-2 text-[11px] font-medium text-[#64748B] border-b border-[#F1F5F9]`}
      >
        {cols.map((c, i) => (
          <span key={c} className={i === cols.length - 1 ? "text-right" : ""}>
            {c}
          </span>
        ))}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className={`grid ${grid} items-center px-4 py-2.5 text-[12px] text-[#334155] border-b last:border-b-0 border-[#F8FAFC]`}
        >
          {r.map((cell, j) => (
            <span
              key={j}
              className={
                j === r.length - 1 ? "text-right" : j === 0 ? "font-medium text-[#0F172A]" : ""
              }
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </Panel>
  );
}

/** A small stat tile. */
export function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Panel className="p-3">
      <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748B]">{label}</p>
      <p className="mt-1 text-[18px] font-semibold text-[#0F172A] leading-none">{value}</p>
      {sub && <p className="mt-1 text-[10px] text-[#64748B]">{sub}</p>}
    </Panel>
  );
}

/** Bar chart (heights in %). The last bar is highlighted. */
export function Bars({ values, labels }: { values: number[]; labels?: string[] }) {
  return (
    <div>
      <div className="flex items-end gap-2 h-[110px]">
        {values.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-md ${i === values.length - 1 ? "bg-[#2563EB]" : "bg-[#BFDBFE]"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      {labels && (
        <div className="mt-1.5 flex gap-2">
          {labels.map((l) => (
            <span key={l} className="flex-1 text-center text-[9px] text-[#94A3B8]">
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Tabs row at the top of a screen. The first is active. */
export function Tabs({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {items.map((t, i) => (
        <span
          key={t}
          className={`rounded-full px-2.5 py-1 text-[11px] ${
            i === active
              ? "bg-[#2563EB] font-semibold text-white"
              : "bg-white border border-[#E2E8F0] text-[#475569]"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/** A form field look-alike. */
export function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-medium text-[#64748B] mb-1">{label}</p>
      <div className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-[12px] text-[#0F172A]">
        {value}
      </div>
    </div>
  );
}

/** Ticked checklist used inside close-up cards. */
export function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2 text-[12px] text-[#334155]">
          <span className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Heading + text inside a close-up card. */
export function Zoom({
  title,
  children,
  width = "w-[220px]",
}: {
  title: string;
  children?: ReactNode;
  width?: string;
}) {
  return (
    <div className={width}>
      <p className="text-[12px] font-semibold text-[#0F172A]">{title}</p>
      {children && <div className="mt-2.5">{children}</div>}
    </div>
  );
}
