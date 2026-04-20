"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

export type PresetType = "fade" | "slide" | "scale" | "blur" | "blur-slide";

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const presetVariants: Record<PresetType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "blur-slide": {
    hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  variants?: { container?: Variants; item?: Variants };
  preset?: PresetType;
  as?: keyof React.JSX.IntrinsicElements;
  asChild?: keyof React.JSX.IntrinsicElements;
}

export function AnimatedGroup({
  children,
  className,
  variants,
  preset = "fade",
  as = "div",
  asChild = "div",
}: AnimatedGroupProps) {
  const containerVariants = variants?.container || defaultContainerVariants;
  const itemVariants = variants?.item || presetVariants[preset];

  const MotionContainer = motion[as as keyof typeof motion] as typeof motion.div;
  const MotionItem = motion[asChild as keyof typeof motion] as typeof motion.div;

  return (
    <MotionContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionItem key={index} variants={itemVariants}>
          {child}
        </MotionItem>
      ))}
    </MotionContainer>
  );
}
