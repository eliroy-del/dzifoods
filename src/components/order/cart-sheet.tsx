"use client";

import { ArrowRight, Bike, Percent, ShoppingBag, Store, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/components/providers/cart-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuantityStepper, ToggleGroup, ToggleGroupItem } from "@/components/ui/controls";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/field";
import { ImageFrame } from "@/components/ui/media";
import { Separator } from "@/components/ui/primitives";
import { ORDER_SETTINGS } from "@/constants/site";
import { cn, pluralize } from "@/lib/utils";
import type { FulfilmentMethod } from "@/types";

/** Slide-over basket, opened from the header or any "add to order" button. */
export function CartSheet() {
  const cart = useCart();
  const { price } = usePreferences();
  const [couponInput, setCouponInput] = useState("");

  const handleCoupon = () => {
    if (!couponInput.trim()) return;
    const result = cart.applyCoupon(couponInput);
    if (result.ok) {
      toast.success("Code applied", { description: result.message });
      setCouponInput("");
    } else {
      toast.error("Couldn't apply that code", { description: result.message });
    }
  };

  const remaining = ORDER_SETTINGS.freeDeliveryThreshold - cart.totals.subtotal;

  return (
    <Dialog open={cart.isOpen} onOpenChange={(open) => (open ? cart.open() : cart.close())}>
      <DialogContent side="right" showClose={false} className="gap-0 p-0">
        <header className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <DialogTitle className="text-2xl">Your order</DialogTitle>
            <DialogDescription>
              {cart.itemCount > 0
                ? `${pluralize(cart.itemCount, "item")} · ${cart.fulfilment === "delivery" ? ORDER_SETTINGS.deliveryEstimate : ORDER_SETTINGS.pickupEstimate}`
                : "Nothing here yet"}
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={cart.close}
            aria-label="Close your order"
            className="text-muted-foreground hover:text-foreground hover:border-accent/50 grid size-10 shrink-0 place-items-center rounded-full border border-border transition-colors"
          >
            <X className="size-4" aria-hidden />
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <EmptyCart onClose={cart.close} />
        ) : (
          <>
            <div className="border-b border-border px-6 py-4">
              <ToggleGroup
                type="single"
                value={cart.fulfilment}
                onValueChange={(next) => next && cart.setFulfilment(next as FulfilmentMethod)}
                className="w-full"
                aria-label="Delivery or collection"
              >
                <ToggleGroupItem value="delivery" className="flex-1 justify-center">
                  <Bike className="size-3.5" aria-hidden />
                  Delivery
                </ToggleGroupItem>
                <ToggleGroupItem value="pickup" className="flex-1 justify-center">
                  <Store className="size-3.5" aria-hidden />
                  Collection
                </ToggleGroupItem>
              </ToggleGroup>

              {cart.fulfilment === "delivery" && remaining > 0 ? (
                <p className="text-muted-foreground mt-3 text-xs">
                  Add <span className="text-accent font-medium">{price(remaining)}</span> more for free
                  delivery.
                </p>
              ) : null}
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto overscroll-contain" data-lenis-prevent>
              {cart.lines.map((line) => (
                <li key={line.dishId} className="flex gap-4 px-6 py-5">
                  <ImageFrame
                    src={line.dish.image}
                    alt={line.dish.name}
                    ratio="square"
                    sizes="80px"
                    className="size-20 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-ui text-sm leading-snug font-medium">{line.dish.name}</h3>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.dishId)}
                        aria-label={`Remove ${line.dish.name}`}
                        className="text-muted-foreground hover:text-destructive shrink-0 transition-colors"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {price(line.dish.price)} each
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <QuantityStepper
                        size="sm"
                        value={line.quantity}
                        onChange={(next) => cart.setQuantity(line.dishId, next)}
                        label={`quantity of ${line.dish.name}`}
                      />
                      <span className="font-ui text-sm font-semibold tabular-nums">
                        {price(line.lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              {cart.coupon ? (
                <div className="border-success/30 bg-success/10 mb-4 flex items-center justify-between gap-3 rounded-xl border px-4 py-3">
                  <span className="text-success flex items-center gap-2 text-xs font-medium">
                    <Percent className="size-3.5" aria-hidden />
                    {cart.coupon.code} — {cart.coupon.label}
                  </span>
                  <button
                    type="button"
                    onClick={cart.removeCoupon}
                    className="text-muted-foreground hover:text-foreground text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="mb-4 flex gap-2">
                  <Input
                    value={couponInput}
                    onChange={(event) => setCouponInput(event.target.value.toUpperCase())}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleCoupon();
                      }
                    }}
                    placeholder="Promo code"
                    aria-label="Promo code"
                    className="h-11"
                  />
                  <Button type="button" variant="outline" size="md" onClick={handleCoupon}>
                    Apply
                  </Button>
                </div>
              )}

              <dl className="space-y-2 text-sm">
                <Row label="Subtotal" value={price(cart.totals.subtotal)} />
                {cart.totals.discount > 0 ? (
                  <Row label="Discount" value={`− ${price(cart.totals.discount)}`} accent="success" />
                ) : null}
                {cart.fulfilment === "delivery" ? (
                  <Row
                    label="Delivery"
                    value={cart.totals.deliveryFee === 0 ? "Free" : price(cart.totals.deliveryFee)}
                  />
                ) : null}
                <Row label="Service (5%)" value={price(cart.totals.serviceCharge)} />
                <Row label="VAT & levies" value={price(cart.totals.vat)} />
                <Separator className="my-3" />
                <div className="flex items-baseline justify-between">
                  <dt className="font-display text-lg">Total</dt>
                  <dd className="font-display text-2xl font-medium tabular-nums">
                    {price(cart.totals.total)}
                  </dd>
                </div>
              </dl>

              {!cart.meetsMinimum ? (
                <p className="text-muted-foreground mt-3 text-xs">
                  Minimum order is {price(ORDER_SETTINGS.minimumOrder)}.
                </p>
              ) : null}

              <Button
                asChild
                variant="ember"
                size="lg"
                uppercase
                className="mt-4 w-full"
                disabled={!cart.meetsMinimum}
              >
                <Link href="/order/checkout" onClick={cart.close}>
                  Checkout
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>

              <button
                type="button"
                onClick={cart.clear}
                className="text-muted-foreground hover:text-destructive mt-3 w-full text-center text-xs transition-colors"
              >
                Empty basket
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "success";
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("tabular-nums", accent === "success" && "text-success")}>{value}</dd>
    </div>
  );
}

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
      <span className="border-border text-muted-foreground grid size-16 place-items-center rounded-full border">
        <ShoppingBag className="size-6" aria-hidden />
      </span>
      <div>
        <p className="font-display text-xl">Your basket is empty</p>
        <p className="text-muted-foreground mt-2 text-sm">
          The jollof has a four-hour head start on you. Best not to keep it waiting.
        </p>
      </div>
      <Badge variant="gold">Free delivery over ₵450</Badge>
      <Button asChild variant="ember" size="md" onClick={onClose}>
        <Link href="/menu">Browse the menu</Link>
      </Button>
    </div>
  );
}
