"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type Problem = {
  id: number;
  area: string;
  severity: "High" | "Medium" | "Critical";
  severityVariant: "success" | "danger" | "warning";
  headline: string;
  detail: string;
  cost: string;
};

const DEFAULT_PROBLEMS: Problem[] = [
  {
    id: 1,
    area: "Pricing",
    severity: "High",
    severityVariant: "warning",
    headline: "Overpaying for features you'll never use",
    detail:
      "Dentally starts at £185/month. EXACT charges more. Both lock you into annual contracts built around NHS workflows.",
    cost: "£1,000+/yr",
  },
  {
    id: 2,
    area: "Usability",
    severity: "Medium",
    severityVariant: "warning",
    headline: "3 training days. Still breaks on a Tuesday.",
    detail:
      "Legacy software, slow load times, confusing UI and a support line that puts you on hold.",
    cost: "Hours/wk",
  },
  {
    id: 3,
    area: "No-shows",
    severity: "Critical",
    severityVariant: "danger",
    headline: "Empty chairs are draining revenue weekly",
    detail:
      "Without automated reminders, the average practice loses 4–6 appointments a week to no-shows.",
    cost: "£600/wk",
  },
];

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "success" | "danger" | "warning";
}) => {
  const styles =
    variant === "success"
      ? "bg-lime-500/15 text-lime-800 dark:text-lime-300"
      : variant === "danger"
        ? "bg-red-500/15 text-red-800 dark:text-red-300"
        : "bg-yellow-500/15 text-yellow-800 dark:text-yellow-300";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        styles,
      )}
    >
      {children}
    </span>
  );
};

export type ProblemSectionProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  problems?: Problem[];
};

export default function ProblemSection({
  title = "Your current software is costing you more than you think",
  subtitle = "Most independent UK practices are overpaying for tools that are too complex, too slow and built for a different era of dentistry.",
  problems = DEFAULT_PROBLEMS,
  className,
}: ProblemSectionProps) {
  return (
    <section className="bg-background py-20 md:py-28 px-6 md:px-8">
      <div
        className={cn(
          "mx-auto w-full max-w-5xl rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
          className,
        )}
      >
        {/* Header */}
        <div className="flex flex-col gap-1 border-b border-border p-6">
          <div className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-lime-400/80" />
          </div>
          <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Table wrapper for responsive overflow */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Area</th>
                <th className="px-6 py-3 font-medium">Severity</th>
                <th className="px-6 py-3 font-medium">Problem</th>
                <th className="px-6 py-3 font-medium text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {problems.map((problem, idx) => (
                <tr
                  key={problem.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-6 py-4 text-muted-foreground">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium">{problem.area}</td>
                  <td className="px-6 py-4">
                    <Badge variant={problem.severityVariant}>
                      {problem.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {problem.headline}
                      </span>
                      <span className="mt-0.5 text-xs text-muted-foreground">
                        {problem.detail}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold tabular-nums">
                    {problem.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-3 text-xs text-muted-foreground">
          <span>
            Showing {problems.length}{" "}
            {problems.length === 1 ? "issue" : "issues"}
          </span>
          <span>There's a better way →</span>
        </div>
      </div>
    </section>
  );
}
