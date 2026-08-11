"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "border-border group border-b transition-colors last:border-b-0",
        "data-[state=open]:border-accent/30",
        className,
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group/trigger flex flex-1 items-start justify-between gap-6 py-6 text-left",
          "font-display text-lg leading-snug transition-colors md:text-xl",
          "hover:text-accent data-[state=open]:text-accent",
          "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-4",
          className,
        )}
        {...props}
      >
        <span className="text-balance">{children}</span>
        <span
          aria-hidden
          className={cn(
            "border-border text-muted-foreground mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border",
            "transition-all duration-400 ease-[var(--ease-luxe)]",
            "group-hover/trigger:border-accent/50 group-hover/trigger:text-accent",
            "group-data-[state=open]/trigger:border-accent/50 group-data-[state=open]/trigger:rotate-135 group-data-[state=open]/trigger:text-accent",
          )}
        >
          <Plus className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
      )}
      {...props}
    >
      <div className={cn("text-muted-foreground max-w-3xl pr-10 pb-7 leading-relaxed", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
