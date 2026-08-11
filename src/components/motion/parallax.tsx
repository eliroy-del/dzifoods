"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Pixels of travel across the full scroll of the element. Negative inverts. */
  distance?: number;
  /** Adds a gentle scale to sell depth on large photography. */
  scale?: boolean;
  axis?: "y" | "x";
}

/** Scroll-linked parallax layer. Springs the value so it never feels twitchy. */
export function Parallax({
  children,
  className,
  distance = 90,
  scale = false,
  axis = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const translate = useTransform(smooth, [0, 1], [distance, -distance]);
  const scaleValue = useTransform(smooth, [0, 0.5, 1], [1.06, 1, 1.06]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={{
          [axis === "y" ? "y" : "x"]: translate,
          ...(scale ? { scale: scaleValue } : {}),
        }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Slow drift for decorative elements (herbs, embers, gradient orbs).
 * Purely aesthetic, so it is skipped whenever motion is reduced.
 */
export function Float({
  children,
  className,
  duration = 9,
  delay = 0,
  distance = 18,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0], rotate: [0, 2.5, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
