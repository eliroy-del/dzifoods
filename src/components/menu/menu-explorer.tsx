"use client";

import { Flame, Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

import { DishCard } from "@/components/menu/dish-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { useFavourites } from "@/components/providers/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/controls";
import { Input } from "@/components/ui/field";
import { DIETARY_FILTERS, DISHES, MENU_CATEGORIES, MENU_GROUPS } from "@/constants/menu";
import { cn } from "@/lib/utils";
import type { DietaryTag, Dish, MenuCategoryId } from "@/types";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

const SORTS: readonly { readonly id: SortKey; readonly label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "rating", label: "Highest rated" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

const BADGE_WEIGHT: Record<string, number> = {
  signature: 4,
  "best-seller": 3,
  "chef-recommendation": 2,
  popular: 1,
};

function score(dish: Dish): number {
  const badgeScore = dish.badges.reduce((sum, badge) => sum + (BADGE_WEIGHT[badge] ?? 0), 0);
  return badgeScore * 10 + dish.rating;
}

function matchesQuery(dish: Dish, query: string): boolean {
  if (!query) return true;
  const haystack = [dish.name, dish.description, ...dish.ingredients].join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

interface MenuExplorerProps {
  /** Category pre-selected from the `?category=` search param. */
  initialCategory?: MenuCategoryId | "all";
  initialQuery?: string;
}

/**
 * The full menu: search, category rail, dietary filters, spice ceiling,
 * favourites-only toggle and sorting — all client-side over a static dataset,
 * so filtering is instant and needs no network round trip.
 */
export function MenuExplorer({ initialCategory = "all", initialQuery = "" }: MenuExplorerProps) {
  const [category, setCategory] = useState<MenuCategoryId | "all">(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [dietary, setDietary] = useState<readonly DietaryTag[]>([]);
  const [maxSpice, setMaxSpice] = useState<number | null>(null);
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const favourites = useFavourites();
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const filtered = DISHES.filter((dish) => {
      if (category !== "all" && dish.category !== category) return false;
      if (!matchesQuery(dish, deferredQuery)) return false;
      if (dietary.length > 0 && !dietary.every((tag) => dish.dietary.includes(tag))) return false;
      if (maxSpice !== null && dish.spice > maxSpice) return false;
      if (favouritesOnly && !favourites.has(dish.id)) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      default:
        sorted.sort((a, b) => score(b) - score(a));
    }
    return sorted;
  }, [category, deferredQuery, dietary, maxSpice, favouritesOnly, sort, favourites]);

  const activeFilterCount =
    dietary.length + (maxSpice !== null ? 1 : 0) + (favouritesOnly ? 1 : 0) + (query ? 1 : 0);

  const reset = () => {
    setQuery("");
    setDietary([]);
    setMaxSpice(null);
    setFavouritesOnly(false);
    setSort("recommended");
  };

  const toggleDietary = (tag: DietaryTag) =>
    setDietary((previous) =>
      previous.includes(tag) ? previous.filter((entry) => entry !== tag) : [...previous, tag],
    );

  const categoriesByGroup = MENU_GROUPS.map((group) => ({
    group,
    categories: MENU_CATEGORIES.filter((entry) => entry.group === group.id),
  }));

  return (
    <div className="container-luxe">
      {/* ---------------------------- Search + sort ---------------------------- */}
      <div className="border-border/70 bg-surface/70 sticky top-[4.75rem] z-30 -mx-4 mb-10 rounded-3xl border px-4 py-4 backdrop-blur-xl sm:mx-0 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dishes, ingredients — try “truffle” or “plantain”"
              aria-label="Search the menu"
              className="pl-11"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full transition-colors"
              >
                <X className="size-4" aria-hidden />
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="menu-sort" className="sr-only">
              Sort dishes
            </label>
            <select
              id="menu-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="border-input bg-surface/70 font-ui focus-visible:border-accent h-11 cursor-pointer rounded-full border px-4 text-xs focus-visible:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>

            <Button
              variant={filtersOpen ? "forest" : "outline"}
              size="md"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-controls="menu-filters"
              className="rounded-full"
            >
              <SlidersHorizontal className="size-4" aria-hidden />
              Filters
              {activeFilterCount > 0 ? (
                <span className="bg-accent text-accent-foreground font-ui grid size-5 place-items-center rounded-full text-[0.65rem] font-bold">
                  {activeFilterCount}
                </span>
              ) : null}
            </Button>
          </div>
        </div>

        {filtersOpen ? (
          <div id="menu-filters" className="border-border/70 mt-4 grid gap-6 border-t pt-5 md:grid-cols-3">
            <fieldset>
              <legend className="font-ui text-muted-foreground text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                Dietary
              </legend>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
                {DIETARY_FILTERS.map((filter) => (
                  <div key={filter.id} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`diet-${filter.id}`}
                      checked={dietary.includes(filter.id)}
                      onCheckedChange={() => toggleDietary(filter.id)}
                    />
                    <label htmlFor={`diet-${filter.id}`} className="cursor-pointer text-sm">
                      {filter.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-ui text-muted-foreground text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                Heat ceiling
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { value: null, label: "Any" },
                  { value: 0, label: "None" },
                  { value: 1, label: "Mild" },
                  { value: 2, label: "Medium" },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setMaxSpice(option.value)}
                    aria-pressed={maxSpice === option.value}
                    className={cn(
                      "font-ui border-border rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                      maxSpice === option.value
                        ? "border-accent bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:border-accent/40 hover:text-foreground",
                    )}
                  >
                    {option.value !== null && option.value > 0 ? (
                      <Flame className="mr-1 inline size-3" aria-hidden />
                    ) : null}
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col items-start gap-3">
              <span className="font-ui text-muted-foreground text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                Saved
              </span>
              <button
                type="button"
                onClick={() => setFavouritesOnly((only) => !only)}
                aria-pressed={favouritesOnly}
                className={cn(
                  "font-ui border-border inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                  favouritesOnly
                    ? "border-accent bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:border-accent/40 hover:text-foreground",
                )}
              >
                <Heart className={cn("size-3.5", favouritesOnly && "fill-current")} aria-hidden />
                Favourites only
                {favourites.ids.length > 0 ? ` (${favourites.ids.length})` : ""}
              </button>
              {activeFilterCount > 0 ? (
                <button
                  type="button"
                  onClick={reset}
                  className="font-ui text-accent link-underline text-xs"
                >
                  Clear all filters
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {/* --------------------------- Category rail --------------------------- */}
      <div className="hide-scrollbar mask-fade-x -mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <div className="flex w-max items-center gap-2">
          <CategoryChip active={category === "all"} onClick={() => setCategory("all")}>
            Everything
            <span className="text-[0.65rem] opacity-60">{DISHES.length}</span>
          </CategoryChip>
          {categoriesByGroup.map(({ group, categories }) => (
            <div key={group.id} className="flex items-center gap-2">
              <span
                aria-hidden
                className="bg-border mx-1 h-6 w-px"
                title={group.name}
              />
              {categories.map((entry) => (
                <CategoryChip
                  key={entry.id}
                  active={category === entry.id}
                  onClick={() => setCategory(entry.id)}
                >
                  {entry.name}
                </CategoryChip>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------ Results ------------------------------ */}
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
        <p aria-live="polite" className="text-muted-foreground text-sm">
          <span className="text-foreground font-ui font-semibold">{results.length}</span>{" "}
          {results.length === 1 ? "dish" : "dishes"}
          {category !== "all" ? ` in ${MENU_CATEGORIES.find((c) => c.id === category)?.name}` : ""}
          {deferredQuery ? ` matching “${deferredQuery}”` : ""}
        </p>
        {category !== "all" ? (
          <Badge variant="gold" size="sm">
            {MENU_CATEGORIES.find((c) => c.id === category)?.tagline}
          </Badge>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="border-border mt-10 rounded-3xl border border-dashed py-20 text-center">
          <p className="font-display text-2xl">Nothing matches that just yet.</p>
          <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm">
            Try a broader search, or let our team suggest something — the kitchen is happy to cook
            off-menu for allergies and preferences.
          </p>
          <Button variant="outline" size="md" className="mt-7" onClick={reset}>
            Clear filters
          </Button>
        </div>
      ) : (
        <Stagger
          key={`${category}-${sort}-${deferredQuery}`}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.05}
        >
          {results.map((dish, index) => (
            <StaggerItem key={dish.id}>
              <DishCard dish={dish} priority={index < 3} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

function CategoryChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "font-ui inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium",
        "transition-all duration-300 ease-[var(--ease-luxe)]",
        active
          ? "border-forest bg-forest text-cream shadow-sm"
          : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
