"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

/** Toast notifications, themed to match the current palette. */
export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === "light" ? "light" : "dark"}
      position="bottom-right"
      closeButton
      gap={10}
      offset={20}
      toastOptions={{
        classNames: {
          toast:
            "!bg-popover !text-popover-foreground !border-border !rounded-2xl !shadow-lift !font-sans",
          title: "!font-ui !font-medium !text-sm",
          description: "!text-muted-foreground !text-xs",
          actionButton: "!bg-accent !text-accent-foreground !rounded-full !font-ui",
          cancelButton: "!bg-muted !text-muted-foreground !rounded-full",
          closeButton: "!bg-popover !border-border",
        },
      }}
    />
  );
}
