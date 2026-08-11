"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { toast } from "sonner";

import { COUPONS, ORDER_SETTINGS } from "@/constants/site";
import { getDish } from "@/constants/menu";
import { useLocalStorage } from "@/hooks";
import type { CartLine, CartTotals, Coupon, Dish, FulfilmentMethod } from "@/types";

export interface CartLineWithDish extends CartLine {
  readonly dish: Dish;
  readonly lineTotal: number;
}

interface CartValue {
  lines: readonly CartLineWithDish[];
  itemCount: number;
  totals: CartTotals;
  fulfilment: FulfilmentMethod;
  coupon: Coupon | null;
  isOpen: boolean;
  hydrated: boolean;
  meetsMinimum: boolean;
  add: (dishId: string, quantity?: number, options?: { silent?: boolean }) => void;
  setQuantity: (dishId: string, quantity: number) => void;
  remove: (dishId: string) => void;
  setNote: (dishId: string, note: string) => void;
  clear: () => void;
  setFulfilment: (method: FulfilmentMethod) => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  open: () => void;
  close: () => void;
  quantityOf: (dishId: string) => number;
}

const CartContext = createContext<CartValue | null>(null);

interface StoredCart {
  lines: CartLine[];
  fulfilment: FulfilmentMethod;
  couponCode: string | null;
}

const EMPTY_CART: StoredCart = { lines: [], fulfilment: "delivery", couponCode: null };

/**
 * Client-side ordering state.
 *
 * Only dish IDs and quantities are persisted — never prices — so a menu price
 * change can never be replayed from a stale cart in `localStorage`.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const { value, setValue, hydrated } = useLocalStorage<StoredCart>("dzifoods:cart", EMPTY_CART);
  const [isOpen, setIsOpen] = useState(false);

  const lines = useMemo<CartLineWithDish[]>(
    () =>
      value.lines
        .map((line) => {
          const dish = getDish(line.dishId);
          if (!dish) return null;
          return { ...line, dish, lineTotal: dish.price * line.quantity };
        })
        .filter((line): line is CartLineWithDish => line !== null),
    [value.lines],
  );

  const coupon = useMemo(
    () => COUPONS.find((entry) => entry.code === value.couponCode) ?? null,
    [value.couponCode],
  );

  const totals = useMemo<CartTotals>(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const couponApplies =
      coupon && (!coupon.minimumSubtotal || subtotal >= coupon.minimumSubtotal) ? coupon : null;
    const discount = couponApplies ? Math.round(subtotal * couponApplies.percentOff) : 0;
    const discounted = subtotal - discount;

    const deliveryFee =
      value.fulfilment === "pickup" || discounted >= ORDER_SETTINGS.freeDeliveryThreshold || subtotal === 0
        ? 0
        : ORDER_SETTINGS.deliveryFee;

    const serviceCharge = Math.round(discounted * ORDER_SETTINGS.serviceChargeRate);
    const vat = Math.round((discounted + serviceCharge) * ORDER_SETTINGS.vatRate);

    return {
      subtotal,
      discount,
      deliveryFee,
      serviceCharge,
      vat,
      total: discounted + deliveryFee + serviceCharge + vat,
    };
  }, [lines, coupon, value.fulfilment]);

  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  const add = useCallback<CartValue["add"]>(
    (dishId, quantity = 1, options) => {
      const dish = getDish(dishId);
      if (!dish) return;

      setValue((previous) => {
        const existing = previous.lines.find((line) => line.dishId === dishId);
        const nextLines = existing
          ? previous.lines.map((line) =>
              line.dishId === dishId
                ? { ...line, quantity: Math.min(20, line.quantity + quantity) }
                : line,
            )
          : [...previous.lines, { dishId, quantity }];
        return { ...previous, lines: nextLines };
      });

      if (!options?.silent) {
        toast.success(`${dish.name} added`, {
          description: "Your table is waiting — the cart is in the top right.",
        });
      }
    },
    [setValue],
  );

  const setQuantity = useCallback<CartValue["setQuantity"]>(
    (dishId, quantity) => {
      setValue((previous) => ({
        ...previous,
        lines:
          quantity <= 0
            ? previous.lines.filter((line) => line.dishId !== dishId)
            : previous.lines.map((line) => (line.dishId === dishId ? { ...line, quantity } : line)),
      }));
    },
    [setValue],
  );

  const remove = useCallback<CartValue["remove"]>(
    (dishId) => {
      const dish = getDish(dishId);
      setValue((previous) => ({
        ...previous,
        lines: previous.lines.filter((line) => line.dishId !== dishId),
      }));
      if (dish) toast(`${dish.name} removed`);
    },
    [setValue],
  );

  const setNote = useCallback<CartValue["setNote"]>(
    (dishId, note) => {
      setValue((previous) => ({
        ...previous,
        lines: previous.lines.map((line) => (line.dishId === dishId ? { ...line, note } : line)),
      }));
    },
    [setValue],
  );

  const clear = useCallback(() => setValue(EMPTY_CART), [setValue]);

  const setFulfilment = useCallback<CartValue["setFulfilment"]>(
    (fulfilment) => setValue((previous) => ({ ...previous, fulfilment })),
    [setValue],
  );

  const applyCoupon = useCallback<CartValue["applyCoupon"]>(
    (code) => {
      const normalised = code.trim().toUpperCase();
      const match = COUPONS.find((entry) => entry.code === normalised);

      if (!match) return { ok: false, message: "That code isn't recognised." };

      const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
      if (match.minimumSubtotal && subtotal < match.minimumSubtotal) {
        return {
          ok: false,
          message: `Spend ₵${match.minimumSubtotal} to use this code.`,
        };
      }

      setValue((previous) => ({ ...previous, couponCode: match.code }));
      return { ok: true, message: match.label };
    },
    [lines, setValue],
  );

  const removeCoupon = useCallback(
    () => setValue((previous) => ({ ...previous, couponCode: null })),
    [setValue],
  );

  const quantityOf = useCallback(
    (dishId: string) => lines.find((line) => line.dishId === dishId)?.quantity ?? 0,
    [lines],
  );

  const contextValue = useMemo<CartValue>(
    () => ({
      lines,
      itemCount,
      totals,
      fulfilment: value.fulfilment,
      coupon,
      isOpen,
      hydrated,
      meetsMinimum: totals.subtotal >= ORDER_SETTINGS.minimumOrder,
      add,
      setQuantity,
      remove,
      setNote,
      clear,
      setFulfilment,
      applyCoupon,
      removeCoupon,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      quantityOf,
    }),
    [
      lines,
      itemCount,
      totals,
      value.fulfilment,
      coupon,
      isOpen,
      hydrated,
      add,
      setQuantity,
      remove,
      setNote,
      clear,
      setFulfilment,
      applyCoupon,
      removeCoupon,
      quantityOf,
    ],
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}

/* -------------------------------------------------------------------------- */
/*                                  Favourites                                */
/* -------------------------------------------------------------------------- */

interface FavouritesValue {
  ids: readonly string[];
  has: (dishId: string) => boolean;
  toggle: (dishId: string) => void;
  clear: () => void;
  hydrated: boolean;
}

const FavouritesContext = createContext<FavouritesValue | null>(null);

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const { value, setValue, hydrated } = useLocalStorage<string[]>("dzifoods:favourites", []);

  const toggle = useCallback(
    (dishId: string) => {
      const dish = getDish(dishId);
      setValue((previous) => {
        const exists = previous.includes(dishId);
        if (dish) {
          toast(exists ? `${dish.name} removed from favourites` : `${dish.name} saved to favourites`);
        }
        return exists ? previous.filter((id) => id !== dishId) : [...previous, dishId];
      });
    },
    [setValue],
  );

  const contextValue = useMemo<FavouritesValue>(
    () => ({
      ids: value,
      has: (dishId: string) => value.includes(dishId),
      toggle,
      clear: () => setValue([]),
      hydrated,
    }),
    [value, toggle, setValue, hydrated],
  );

  return <FavouritesContext.Provider value={contextValue}>{children}</FavouritesContext.Provider>;
}

export function useFavourites(): FavouritesValue {
  const context = useContext(FavouritesContext);
  if (!context) throw new Error("useFavourites must be used inside <FavouritesProvider>");
  return context;
}
