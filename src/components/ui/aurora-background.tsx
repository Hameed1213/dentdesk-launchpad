import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-zinc-950 text-white transition-bg overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Aurora layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          aria-hidden
          className="absolute -inset-[10px] pointer-events-none will-change-transform"
          style={{
            backgroundImage:
              "repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%), repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #ddd6fe 25%, #60a5fa 30%)",
            backgroundSize: "300%, 200%",
            backgroundPosition: "50% 50%, 50% 50%",
            filter: "blur(40px)",
            opacity: 0.6,
            mixBlendMode: "screen",
            animation: "aurora 60s linear infinite",
            ...(showRadialGradient
              ? {
                  maskImage:
                    "radial-gradient(ellipse 80% 60% at 100% 0%, black 10%, transparent 70%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 60% at 100% 0%, black 10%, transparent 70%)",
                }
              : {}),
          }}
        />
      </div>

      {/* Bottom fade to white for smooth transition into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%)",
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};
