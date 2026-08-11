"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type * as React from "react";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";
type Tag = "div" | "section" | "li" | "article" | "span" | "header" | "figure" | "ul";

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  span: motion.span,
  header: motion.header,
  figure: motion.figure,
  ul: motion.ul,
} as const;

/**
 * The tag maps are indexed dynamically, so both sides are narrowed to a single
 * permissive component type. Every prop these components accept is declared
 * explicitly below, which keeps the call sites type-safe.
 */
type AnyMotion = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children?: React.ReactNode;
  initial?: string;
  animate?: string;
  whileInView?: string;
  viewport?: { once?: boolean; amount?: number };
  variants?: Variants;
  transition?: { delay?: number };
}>;

type AnyStatic = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children?: React.ReactNode;
}>;

const OFFSET = 34;

function buildVariants(direction: Direction, distance: number, blur: boolean): Variants {
  const axis =
    direction === "up"
      ? { y: distance }
      : direction === "down"
        ? { y: -distance }
        : direction === "left"
          ? { x: distance }
          : direction === "right"
            ? { x: -distance }
            : {};

  return {
    hidden: { opacity: 0, ...axis, filter: blur ? "blur(8px)" : "blur(0px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

export interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  direction?: Direction;
  delay?: number;
  distance?: number;
  blur?: boolean;
  /** How much of the element must be visible before it animates (0 – 1). */
  amount?: number;
  once?: boolean;
  as?: Tag;
}

/**
 * Scroll-triggered entrance animation. Honours `prefers-reduced-motion` by
 * rendering the final state immediately, so content is never hidden from
 * guests who opted out of animation.
 */
export function Reveal({
  children,
  className,
  style,
  id,
  direction = "up",
  delay = 0,
  distance = OFFSET,
  blur = true,
  amount = 0.25,
  once = true,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Static = as as unknown as AnyStatic;
    return (
      <Static className={className} style={style} id={id}>
        {children}
      </Static>
    );
  }

  const Component = MOTION_TAGS[as] as AnyMotion;

  return (
    <Component
      className={className}
      style={style}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={buildVariants(direction, distance, blur)}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

/**
 * Parent for a list of `<StaggerItem>`s — children animate in sequence as the
 * group scrolls into view.
 */
export function Stagger({
  children,
  className,
  style,
  id,
  delay = 0,
  gap = 0.09,
  amount = 0.15,
  as = "div",
}: RevealProps & { gap?: number }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Static = as as unknown as AnyStatic;
    return (
      <Static className={className} style={style} id={id}>
        {children}
      </Static>
    );
  }

  const Component = MOTION_TAGS[as] as AnyMotion;

  return (
    <Component
      className={className}
      style={style}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  style,
  direction = "up",
  distance = 26,
  as = "div",
}: Omit<RevealProps, "delay" | "amount" | "once">) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Static = as as unknown as AnyStatic;
    return (
      <Static className={className} style={style}>
        {children}
      </Static>
    );
  }

  const Component = MOTION_TAGS[as] as AnyMotion;

  return (
    <Component className={className} style={style} variants={buildVariants(direction, distance, false)}>
      {children}
    </Component>
  );
}

/**
 * Word-by-word headline reveal for hero and section titles. The full sentence
 * stays in the accessibility tree as a single string.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Component = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
        className="inline"
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={cn("inline-block", wordClassName)}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
