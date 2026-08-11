"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { TriangleAlert } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                    Label                                   */
/* -------------------------------------------------------------------------- */

export function Label({
  className,
  optional,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { optional?: boolean }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "font-ui text-[0.7rem] font-semibold tracking-[0.16em] uppercase",
        "text-muted-foreground flex items-center gap-2",
        className,
      )}
      {...props}
    >
      {children}
      {optional ? <span className="text-muted-foreground/60 normal-case tracking-normal">optional</span> : null}
    </LabelPrimitive.Root>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Inputs                                   */
/* -------------------------------------------------------------------------- */

const fieldSurface = [
  "w-full rounded-xl border bg-surface/70 px-4 font-sans text-[0.95rem] text-foreground",
  "border-input placeholder:text-muted-foreground/60",
  "transition-[border-color,box-shadow,background-color] duration-300",
  "hover:border-input/80",
  "focus-visible:border-accent focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25",
  "disabled:cursor-not-allowed disabled:opacity-60",
  "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
];

export const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  function Input({ className, type = "text", ...props }, ref) {
    return <input ref={ref} type={type} className={cn(fieldSurface, "h-12", className)} {...props} />;
  },
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(function Textarea({ className, rows = 4, ...props }, ref) {
  return (
    <textarea ref={ref} rows={rows} className={cn(fieldSurface, "resize-y py-3", className)} {...props} />
  );
});

/** Native select styled to match — lighter than a Radix listbox for simple lists. */
export const Select = React.forwardRef<HTMLSelectElement, React.ComponentPropsWithoutRef<"select">>(
  function Select({ className, children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(fieldSurface, "h-12 cursor-pointer appearance-none pr-11", className)}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="text-muted-foreground pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                                Field wrapper                               */
/* -------------------------------------------------------------------------- */

interface FieldProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

/**
 * Wires up label, hint and error text with the ARIA attributes a screen reader
 * needs. Pass `aria-describedby={`${id}-hint ${id}-error`}` free of charge.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  optional,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Label htmlFor={htmlFor} optional={optional}>
        {label}
      </Label>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="text-muted-foreground/80 text-xs">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-destructive flex items-center gap-1.5 text-xs font-medium"
        >
          <TriangleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Honeypot: invisible to humans, irresistible to bots. Anything submitted here
 * is treated as spam by the server action.
 */
export function Honeypot({ name = "botField" }: { name?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={`${name}-hp`}>Leave this field empty</label>
      <input id={`${name}-hp`} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
