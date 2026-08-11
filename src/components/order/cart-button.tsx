"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

/** Header basket trigger with a live item count. */
export function CartButton({ className }: { className?: string }) {
  const { itemCount, open, hydrated } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={itemCount > 0 ? `Your order, ${itemCount} items` : "Your order, empty"}
      className={cn(
        "relative grid size-10 place-items-center rounded-full border border-current/15",
        "text-current/75 transition-all duration-300 hover:border-current/35 hover:text-current",
        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      <ShoppingBag className="size-4" aria-hidden />
      {hydrated && itemCount > 0 ? (
        <span
          aria-hidden
          className="bg-accent text-accent-foreground font-ui absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full px-1 text-[0.6rem] font-bold tabular-nums"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}
