"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type * as React from "react";

import { Ornament } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

interface FormSuccessProps {
  eyebrow?: string;
  title: string;
  description: React.ReactNode;
  reference?: string;
  /** Key/value facts — delivery window, table time, gift card amount. */
  details?: readonly { readonly label: string; readonly value: string }[];
  actions?: React.ReactNode;
  className?: string;
}

/**
 * The confirmation state shared by every flow that returns a reference:
 * reservations, orders, gift cards and event seats.
 *
 * The seal draws itself once, which reads as a stamp rather than a spinner.
 */
export function FormSuccess({
  eyebrow = "Confirmed",
  title,
  description,
  reference,
  details,
  actions,
  className,
}: FormSuccessProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "border-border bg-surface/60 relative overflow-hidden rounded-3xl border px-6 py-14 text-center md:px-12",
        className,
      )}
    >
      <span
        aria-hidden
        className="from-success/12 pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b to-transparent"
      />

      <div className="relative mx-auto grid size-20 place-items-center">
        <motion.span
          aria-hidden
          initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-success/40 bg-success/12 absolute inset-0 rounded-full border"
        />
        {reduceMotion ? null : (
          <motion.span
            aria-hidden
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeOut", repeat: 1 }}
            className="border-success/50 absolute inset-0 rounded-full border"
          />
        )}
        <motion.span
          initial={reduceMotion ? false : { scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.22, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-success relative"
        >
          <Check className="size-9" strokeWidth={2.4} aria-hidden />
        </motion.span>
      </div>

      <p className="font-ui text-gold mt-7 text-[0.66rem] font-semibold tracking-[0.26em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl leading-tight text-balance md:text-4xl">
        {title}
      </h2>
      <Ornament className="my-6" />
      <p className="text-muted-foreground mx-auto max-w-xl text-sm leading-relaxed md:text-base">
        {description}
      </p>

      {reference ? (
        <p className="border-border bg-card font-ui mt-8 inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm">
          <span className="text-muted-foreground text-[0.66rem] tracking-[0.18em] uppercase">
            Reference
          </span>
          <span className="font-semibold tracking-[0.08em]">{reference}</span>
        </p>
      ) : null}

      {details && details.length > 0 ? (
        <dl className="border-border mx-auto mt-10 grid max-w-2xl gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.label} className="bg-card px-5 py-5">
              <dt className="font-ui text-muted-foreground text-[0.62rem] tracking-[0.18em] uppercase">
                {detail.label}
              </dt>
              <dd className="font-display mt-1.5 text-lg">{detail.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {actions ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      ) : null}
    </div>
  );
}
