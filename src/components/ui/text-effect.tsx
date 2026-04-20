"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type PresetType = "blur" | "fade-in-blur" | "scale" | "fade" | "slide";
type PerType = "word" | "char" | "line";

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  blur: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: { hidden: { opacity: 0, filter: "blur(12px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
  },
  "fade-in-blur": {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: { hidden: { opacity: 0, y: 12, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
  },
  scale: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: { hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } },
  },
  fade: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  },
  slide: {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } },
    item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  },
};

interface TextEffectProps {
  children: string;
  per?: PerType;
  as?: keyof JSX.IntrinsicElements;
  variants?: { container?: Variants; item?: Variants };
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  segmentClassName?: string;
}

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  trigger = true,
  segmentClassName,
}: TextEffectProps) {
  const segments =
    per === "char" ? children.split("") : per === "line" ? children.split("\n") : children.split(/(\s+)/);

  const containerVariants = variants?.container ?? presetVariants[preset].container;
  const itemVariants = variants?.item ?? presetVariants[preset].item;

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.p;

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          transition={{ delayChildren: delay }}
          className={cn(className)}
        >
          {segments.map((segment, index) => (
            <motion.span
              key={`${segment}-${index}`}
              variants={itemVariants}
              className={cn("inline-block whitespace-pre", segmentClassName)}
            >
              {segment}
            </motion.span>
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
