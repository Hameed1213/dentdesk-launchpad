"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = false,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-slate-950 transition-bg",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            `[--white-gradient:repeating-linear-gradient(100deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.72)_8%,rgba(255,255,255,0)_14%,rgba(255,255,255,0)_18%,rgba(255,255,255,0.58)_24%)]
            [--aurora:repeating-linear-gradient(100deg,var(--sky-200)_8%,var(--blue-200)_16%,var(--sky-300)_24%,var(--cyan-200)_32%,var(--blue-300)_40%,var(--sky-100)_48%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:220%,_180%]
            [background-position:50%_50%,50%_50%]
            filter blur-[22px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:180%,_100%]
            after:animate-aurora after:opacity-90
            pointer-events-none
            absolute -inset-[12%] opacity-95 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_50%_35%,black_18%,var(--transparent)_72%)]`,
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};
