"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

function DialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-100 bg-black/70 backdrop-blur-md",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

const contentVariants = cva(
  [
    "bg-popover text-popover-foreground fixed z-101 flex flex-col border border-border shadow-lift",
    "focus:outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out duration-400",
  ],
  {
    variants: {
      side: {
        center: [
          "top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2",
          "max-h-[90dvh] rounded-3xl",
          "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        ],
        right: [
          "inset-y-0 right-0 h-dvh w-full max-w-[26rem] rounded-l-3xl border-y-0 border-r-0",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        ],
        left: [
          "inset-y-0 left-0 h-dvh w-full max-w-[24rem] rounded-r-3xl border-y-0 border-l-0",
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        ],
        bottom: [
          "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-3xl border-x-0 border-b-0",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        ],
      },
    },
    defaultVariants: { side: "center" },
  },
);

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof contentVariants> {
  showClose?: boolean;
  overlayClassName?: string;
}

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent(
  { className, children, side, showClose = true, overlayClassName, ...props },
  ref,
) {
  return (
    <DialogPortal>
      <DialogOverlay className={overlayClassName} />
      <DialogPrimitive.Content ref={ref} className={cn(contentVariants({ side }), className)} {...props}>
        {children}
        {showClose ? (
          <DialogPrimitive.Close
            className={cn(
              "text-muted-foreground hover:text-foreground absolute top-4 right-4 z-10",
              "grid size-10 place-items-center rounded-full border border-border bg-background/80",
              "transition-colors hover:border-accent/50 focus-visible:outline-ring focus-visible:outline-2",
            )}
          >
            <X className="size-4" aria-hidden />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

export function DialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-2 border-b border-border p-6", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-3 border-t border-border p-6 sm:flex-row", className)}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-2xl leading-tight md:text-3xl", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  );
}
