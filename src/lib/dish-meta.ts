import type { BadgeProps } from "@/components/ui/badge";
import type { DietaryTag, DishBadge } from "@/types";

/** Presentation metadata for dish badges, kept out of the components. */
export const BADGE_META: Record<
  DishBadge,
  { label: string; variant: NonNullable<BadgeProps["variant"]>; priority: number }
> = {
  signature: { label: "Signature", variant: "gold", priority: 1 },
  "chef-recommendation": { label: "Chef's pick", variant: "ember", priority: 2 },
  "best-seller": { label: "Best seller", variant: "ember", priority: 3 },
  limited: { label: "Limited", variant: "outline", priority: 4 },
  new: { label: "New", variant: "success", priority: 5 },
  popular: { label: "Popular", variant: "neutral", priority: 6 },
};

export const DIETARY_META: Record<DietaryTag, { label: string; short: string }> = {
  vegetarian: { label: "Vegetarian", short: "V" },
  vegan: { label: "Vegan", short: "VG" },
  "gluten-free": { label: "Gluten free", short: "GF" },
  "dairy-free": { label: "Dairy free", short: "DF" },
  "nut-free": { label: "Nut free", short: "NF" },
};

/** The single most important badge, for tight card layouts. */
export function primaryBadge(badges: readonly DishBadge[]): DishBadge | undefined {
  return [...badges].sort((a, b) => BADGE_META[a].priority - BADGE_META[b].priority)[0];
}
