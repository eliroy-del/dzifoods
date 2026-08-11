"use client";

import { Heart, Plus, Timer } from "lucide-react";
import { useState } from "react";

import { DishDialog } from "@/components/menu/dish-dialog";
import { useCart, useFavourites } from "@/components/providers/cart-provider";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageFrame, Steam } from "@/components/ui/media";
import { SpiceMeter, Stars } from "@/components/ui/rating";
import { BADGE_META, DIETARY_META, primaryBadge } from "@/lib/dish-meta";
import { cn } from "@/lib/utils";
import type { Dish } from "@/types";

interface DishCardProps {
  dish: Dish;
  /**
   * `default` — grid card
   * `featured` — tall editorial card for the home page showcase
   * `row` — dense list row for search results and the cart upsell
   */
  variant?: "default" | "featured" | "row";
  priority?: boolean;
  className?: string;
}

export function DishCard({ dish, variant = "default", priority = false, className }: DishCardProps) {
  const [open, setOpen] = useState(false);
  const { add } = useCart();
  const favourites = useFavourites();
  const { price } = usePreferences();

  const badge = primaryBadge(dish.badges);
  const isFavourite = favourites.has(dish.id);
  const titleId = `dish-${dish.id}-title`;

  const favouriteButton = (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        favourites.toggle(dish.id);
      }}
      aria-pressed={isFavourite}
      aria-label={isFavourite ? `Remove ${dish.name} from favourites` : `Save ${dish.name} to favourites`}
      className={cn(
        "glass-dark grid size-9 place-items-center rounded-full text-white/80 transition-all duration-300",
        "hover:scale-110 hover:text-white",
      )}
    >
      <Heart className={cn("size-4", isFavourite && "fill-accent text-accent")} aria-hidden />
    </button>
  );

  if (variant === "row") {
    return (
      <>
        <div
          className={cn(
            "group border-border hover:border-accent/40 flex items-center gap-4 rounded-2xl border p-3 transition-colors",
            className,
          )}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="focus-visible:outline-ring flex min-w-0 flex-1 items-center gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ImageFrame
              src={dish.image}
              alt={dish.name}
              ratio="square"
              sizes="96px"
              zoom
              className="size-20 shrink-0 rounded-xl"
            />
            <span className="min-w-0 flex-1">
              <span className="font-ui group-hover:text-accent block truncate text-sm font-medium transition-colors">
                {dish.name}
              </span>
              <span className="text-muted-foreground mt-0.5 line-clamp-1 block text-xs">
                {dish.description}
              </span>
              <span className="mt-1.5 flex items-center gap-3">
                <span className="font-ui text-sm font-semibold">{price(dish.price)}</span>
                <SpiceMeter level={dish.spice} />
              </span>
            </span>
          </button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={`Add ${dish.name} to your order`}
            onClick={() => add(dish.id)}
          >
            <Plus className="size-4" aria-hidden />
          </Button>
        </div>
        <DishDialog dish={dish} open={open} onOpenChange={setOpen} />
      </>
    );
  }

  const featured = variant === "featured";

  return (
    <>
      <Card
        variant="solid"
        radius="xl"
        hover="both"
        className={cn("group flex h-full flex-col", className)}
      >
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-labelledby={titleId}
            className="focus-visible:outline-ring block w-full focus-visible:outline-2 focus-visible:-outline-offset-4"
          >
            <ImageFrame
              src={dish.image}
              alt={dish.name}
              ratio={featured ? "3/2" : "4/3"}
              rounded={false}
              zoom
              priority={priority}
              overlay={featured ? "bottom" : "none"}
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 620px"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              }
            />
            {dish.prepTime > 15 ? <Steam className="opacity-0 transition-opacity duration-700 group-hover:opacity-100" /> : null}
          </button>

          <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-2">
            <span className="flex flex-wrap gap-2">
              {badge ? (
                <Badge variant={BADGE_META[badge].variant} size="sm" className="backdrop-blur-md">
                  {BADGE_META[badge].label}
                </Badge>
              ) : null}
              {featured && dish.badges.includes("limited") && badge !== "limited" ? (
                <Badge variant="outline" size="sm" className="bg-black/40 text-white backdrop-blur-md">
                  Limited
                </Badge>
              ) : null}
            </span>
            <span className="pointer-events-auto">{favouriteButton}</span>
          </div>

          {featured ? (
            <div className="pointer-events-none absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
              <p className="font-display text-2xl leading-tight text-white md:text-3xl">{dish.name}</p>
              <p className="font-display shrink-0 text-2xl text-white">{price(dish.price)}</p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          {!featured ? (
            <div className="flex items-start justify-between gap-3">
              <h3 id={titleId} className="font-display text-xl leading-tight">
                {dish.name}
              </h3>
              <p className="font-ui shrink-0 text-base font-semibold tabular-nums">
                {price(dish.price)}
              </p>
            </div>
          ) : (
            <h3 id={titleId} className="sr-only">
              {dish.name}
            </h3>
          )}

          <p
            className={cn(
              "text-muted-foreground text-sm leading-relaxed",
              featured ? "line-clamp-3" : "mt-2 line-clamp-2",
            )}
          >
            {dish.description}
          </p>

          <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <Stars value={dish.rating} size="sm" showValue reviewCount={dish.reviewCount} />
            <span className="flex items-center gap-1.5">
              <Timer className="size-3.5" aria-hidden />
              {dish.prepTime} min
            </span>
            <span>{dish.calories} kcal</span>
            <SpiceMeter level={dish.spice} />
          </div>

          {dish.dietary.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {dish.dietary.map((tag) => (
                <li key={tag}>
                  <Badge variant="forest" size="sm" title={DIETARY_META[tag].label}>
                    {DIETARY_META[tag].short}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-5 flex items-center gap-2 pt-1">
            <Button variant="ember" size="md" className="flex-1" onClick={() => add(dish.id)}>
              <Plus className="size-4" aria-hidden />
              Add to order
            </Button>
            <Button variant="outline" size="md" onClick={() => setOpen(true)}>
              Details
            </Button>
          </div>
        </div>
      </Card>

      <DishDialog dish={dish} open={open} onOpenChange={setOpen} />
    </>
  );
}
