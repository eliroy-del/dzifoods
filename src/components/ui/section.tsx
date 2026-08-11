import type * as React from "react";

import { Ornament } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/** Small gold caption that sits above every section heading. */
export function Eyebrow({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <p
      className={cn(
        "font-ui text-gold flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.28em] uppercase",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span aria-hidden className="bg-gold/60 h-px w-8" />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg" | "xl";
  ornament?: boolean;
  className?: string;
  /** Rendered to the right of the heading on desktop — usually a CTA. */
  action?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
}

const titleSizes = {
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl lg:text-[3.4rem]",
  xl: "text-4xl md:text-6xl lg:text-7xl",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  size = "lg",
  ornament = false,
  className,
  action,
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-5", align === "center" && "items-center", action && "max-w-3xl")}>
        {eyebrow ? <Eyebrow align={align}>{eyebrow}</Eyebrow> : null}
        <Heading
          id={id}
          className={cn("text-balance leading-[1.04] font-medium", titleSizes[size])}
        >
          {title}
        </Heading>
        {ornament ? <Ornament className="my-1" /> : null}
        {description ? (
          <p
            className={cn(
              "text-muted-foreground max-w-2xl text-base leading-relaxed md:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/**
 * Infinite marquee. Children are rendered twice and the track slides exactly
 * half its width, which makes the loop seamless at any content length.
 */
export function Marquee({
  children,
  className,
  speed = 42,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("mask-fade-x group relative overflow-hidden", className)} aria-hidden>
      <div
        className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
    </div>
  );
}
