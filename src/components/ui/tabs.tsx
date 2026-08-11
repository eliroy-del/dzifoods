"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type * as React from "react";

import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("hide-scrollbar flex gap-1 overflow-x-auto scroll-smooth", className)}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "font-ui text-muted-foreground relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-5 text-[0.8rem] font-medium whitespace-nowrap",
        "border border-transparent transition-all duration-300 ease-[var(--ease-luxe)]",
        "hover:border-border hover:text-foreground",
        "data-[state=active]:border-accent/40 data-[state=active]:bg-accent/12 data-[state=active]:text-accent",
        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "focus-visible:outline-none",
        "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 data-[state=active]:duration-500",
        className,
      )}
      {...props}
    />
  );
}
