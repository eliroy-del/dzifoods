"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { Check, Minus, Plus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                  Checkbox                                  */
/* -------------------------------------------------------------------------- */

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(function Checkbox({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "border-input bg-surface/70 grid size-5 shrink-0 place-items-center rounded-[0.4rem] border transition-all",
        "data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        "aria-invalid:border-destructive disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="size-3.5" strokeWidth={3} aria-hidden />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

/** Checkbox + label + description, sized for touch. */
export function CheckboxField({
  id,
  label,
  description,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  id: string;
  label: React.ReactNode;
  description?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Checkbox id={id} className="mt-0.5" {...props} />
      <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed">
        <span className="text-foreground">{label}</span>
        {description ? <span className="text-muted-foreground block text-xs">{description}</span> : null}
      </label>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Radio cards                                */
/* -------------------------------------------------------------------------- */

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
  return <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-3", className)} {...props} />;
});

export interface RadioCardProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: string;
  description?: string;
  meta?: string;
  icon?: React.ReactNode;
}

export const RadioCard = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioCardProps
>(function RadioCard({ className, label, description, meta, icon, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "group border-border bg-surface/50 relative flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left",
        "transition-all duration-300 ease-[var(--ease-luxe)]",
        "hover:border-accent/40 hover:bg-surface",
        "data-[state=checked]:border-accent data-[state=checked]:bg-accent/8",
        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "border-input mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
          "group-data-[state=checked]:border-accent group-data-[state=checked]:bg-accent",
        )}
      >
        <span className="bg-accent-foreground size-1.5 scale-0 rounded-full transition-transform group-data-[state=checked]:scale-100" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          {icon ? <span className="text-accent">{icon}</span> : null}
          <span className="font-ui text-sm font-medium">{label}</span>
        </span>
        {description ? (
          <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">{description}</span>
        ) : null}
      </span>
      {meta ? (
        <span className="text-muted-foreground font-ui shrink-0 text-[0.7rem] tracking-[0.08em] uppercase">
          {meta}
        </span>
      ) : null}
    </RadioGroupPrimitive.Item>
  );
});

/* -------------------------------------------------------------------------- */
/*                                   Switch                                   */
/* -------------------------------------------------------------------------- */

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(function Switch({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        "bg-input relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        "data-[state=checked]:bg-accent",
        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="bg-background pointer-events-none block size-5 translate-x-0.5 rounded-full shadow-sm transition-transform duration-300 data-[state=checked]:translate-x-[1.375rem]" />
    </SwitchPrimitive.Root>
  );
});

/* -------------------------------------------------------------------------- */
/*                                Toggle group                                */
/* -------------------------------------------------------------------------- */

export const ToggleGroup = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(function ToggleGroup({ className, ...props }, ref) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("border-border bg-surface/60 inline-flex gap-1 rounded-full border p-1", className)}
      {...props}
    />
  );
});

export const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(function ToggleGroupItem({ className, ...props }, ref) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "font-ui text-muted-foreground inline-flex h-9 items-center gap-2 rounded-full px-4 text-xs font-medium",
        "transition-all duration-300 hover:text-foreground",
        "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                              Quantity stepper                              */
/* -------------------------------------------------------------------------- */

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Accessible name, e.g. "Quantity of Miso-Glazed Black Cod". */
  label: string;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  label,
  size = "md",
  className,
}: QuantityStepperProps) {
  const buttonSize = size === "sm" ? "size-8" : "size-10";

  return (
    <div
      className={cn(
        "border-border bg-surface/60 inline-flex items-center rounded-full border",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className={cn(
          buttonSize,
          "text-muted-foreground grid place-items-center rounded-full transition-colors",
          "hover:text-accent disabled:opacity-30 disabled:hover:text-muted-foreground",
          "focus-visible:outline-ring focus-visible:outline-2",
        )}
      >
        <Minus className={size === "sm" ? "size-3.5" : "size-4"} aria-hidden />
      </button>
      <span
        aria-live="polite"
        aria-label={label}
        className={cn(
          "font-ui tabular-nums text-center font-semibold",
          size === "sm" ? "w-6 text-xs" : "w-8 text-sm",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className={cn(
          buttonSize,
          "text-muted-foreground grid place-items-center rounded-full transition-colors",
          "hover:text-accent disabled:opacity-30 disabled:hover:text-muted-foreground",
          "focus-visible:outline-ring focus-visible:outline-2",
        )}
      >
        <Plus className={size === "sm" ? "size-3.5" : "size-4"} aria-hidden />
      </button>
    </div>
  );
}
