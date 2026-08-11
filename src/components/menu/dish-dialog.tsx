"use client";

import { Flame, Heart, Plus, Timer, Utensils, Wine } from "lucide-react";
import { useState } from "react";

import { useCart, useFavourites } from "@/components/providers/cart-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/controls";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageFrame, Steam } from "@/components/ui/media";
import { Separator } from "@/components/ui/primitives";
import { SpiceMeter, Stars } from "@/components/ui/rating";
import { getCategory } from "@/constants/menu";
import { BADGE_META, DIETARY_META } from "@/lib/dish-meta";
import { cn } from "@/lib/utils";
import type { Dish } from "@/types";

interface DishDialogProps {
  dish: Dish;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Full dish detail: photography, ingredients, nutrition and pairing. */
export function DishDialog({ dish, open, onOpenChange }: DishDialogProps) {
  const { add } = useCart();
  const favourites = useFavourites();
  const { price } = usePreferences();
  const [quantity, setQuantity] = useState(1);
  const category = getCategory(dish.category);
  const isFavourite = favourites.has(dish.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0">
        <div className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-2 md:overflow-hidden" data-lenis-prevent>
          <div className="relative">
            <ImageFrame
              src={dish.image}
              alt={dish.name}
              ratio="4/3"
              rounded={false}
              priority
              sizes="(max-width: 768px) 100vw, 448px"
              className="md:h-full md:[aspect-ratio:auto]"
            />
            {dish.prepTime > 12 ? <Steam /> : null}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {dish.badges.map((badge) => (
                <Badge key={badge} variant={BADGE_META[badge].variant} size="sm">
                  {BADGE_META[badge].label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col p-6 md:overflow-y-auto md:p-8">
            {category ? (
              <p className="font-ui text-gold text-[0.65rem] font-semibold tracking-[0.24em] uppercase">
                {category.name}
              </p>
            ) : null}

            <DialogTitle className="mt-3 pr-10">{dish.name}</DialogTitle>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Stars value={dish.rating} showValue reviewCount={dish.reviewCount} size="sm" />
              <SpiceMeter level={dish.spice} showLabel />
            </div>

            <DialogDescription className="mt-4 text-[0.95rem]">{dish.description}</DialogDescription>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Metric icon={<Flame className="size-4" />} value={`${dish.calories}`} label="kcal" />
              <Metric icon={<Timer className="size-4" />} value={`${dish.prepTime}`} label="minutes" />
              <Metric
                icon={<Utensils className="size-4" />}
                value={dish.serves ? dish.serves.split(",")[0]! : "One"}
                label="serves"
              />
            </div>

            <div className="mt-6">
              <p className="font-ui text-muted-foreground mb-3 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                In the dish
              </p>
              <ul className="flex flex-wrap gap-2">
                {dish.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="border-border bg-surface/60 rounded-full border px-3 py-1.5 text-xs"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {dish.dietary.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {dish.dietary.map((tag) => (
                  <Badge key={tag} variant="forest" size="sm">
                    {DIETARY_META[tag].label}
                  </Badge>
                ))}
              </div>
            ) : null}

            {dish.pairing ? (
              <p className="text-muted-foreground border-gold/40 mt-6 flex items-start gap-3 border-l-2 pl-4 text-sm italic">
                <Wine className="text-gold mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  <span className="text-foreground not-italic">Pairs with </span>
                  {dish.pairing}
                </span>
              </p>
            ) : null}

            <Separator className="my-6" />

            <div className="mt-auto flex items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-xs">Price</p>
                <p className="font-display text-3xl font-medium">{price(dish.price)}</p>
              </div>
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                label={`quantity of ${dish.name}`}
              />
            </div>

            <div className="mt-4 flex gap-3">
              <Button
                variant="ember"
                size="lg"
                uppercase
                className="flex-1"
                onClick={() => {
                  add(dish.id, quantity);
                  onOpenChange(false);
                  setQuantity(1);
                }}
              >
                <Plus className="size-4" aria-hidden />
                Add to order
              </Button>
              <Button
                variant="outline"
                size="lg"
                aria-pressed={isFavourite}
                aria-label={isFavourite ? `Remove ${dish.name} from favourites` : `Save ${dish.name}`}
                onClick={() => favourites.toggle(dish.id)}
                className="px-5"
              >
                <Heart
                  className={cn("size-4 transition-colors", isFavourite && "fill-accent text-accent")}
                  aria-hidden
                />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="border-border bg-surface/50 rounded-xl border px-2 py-3">
      <span className="text-accent flex justify-center" aria-hidden>
        {icon}
      </span>
      <p className="font-ui mt-1.5 text-sm font-semibold">{value}</p>
      <p className="text-muted-foreground text-[0.65rem] tracking-[0.1em] uppercase">{label}</p>
    </div>
  );
}
