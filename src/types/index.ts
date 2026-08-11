/**
 * Domain model for DZIFOODS.
 *
 * Every content shape lives here so the `constants/*` fixtures can later be
 * replaced by a headless CMS (Sanity, Payload, Strapi, Contentful) without
 * touching a single component.
 */

import type { LocalImageSrc } from "@/lib/generated/blur-data";

/* -------------------------------------------------------------------------- */
/*                                   Shared                                   */
/* -------------------------------------------------------------------------- */

export type ImageSrc = LocalImageSrc | (string & {});

export interface Photo {
  readonly src: ImageSrc;
  /** Always required — decorative-only images should pass an empty string. */
  readonly alt: string;
}

export type CurrencyCode = "GHS" | "USD" | "GBP" | "EUR";

export interface Currency {
  readonly code: CurrencyCode;
  readonly symbol: string;
  readonly label: string;
  /** Multiplier applied to the base price, which is stored in GHS. */
  readonly rate: number;
}

export type LocaleCode = "en" | "fr" | "tw";

export interface Locale {
  readonly code: LocaleCode;
  readonly label: string;
  readonly nativeLabel: string;
}

/* -------------------------------------------------------------------------- */
/*                                    Menu                                    */
/* -------------------------------------------------------------------------- */

export type MenuCategoryId =
  | "starters"
  | "breakfast"
  | "lunch"
  | "dinner"
  | "seafood"
  | "grill"
  | "steak"
  | "pizza"
  | "pasta"
  | "rice"
  | "local"
  | "desserts"
  | "drinks"
  | "cocktails"
  | "wine"
  | "mocktails"
  | "coffee";

export type MenuGroupId = "kitchen" | "fire" | "roots" | "sweet" | "bar";

export interface MenuCategory {
  readonly id: MenuCategoryId;
  readonly name: string;
  readonly group: MenuGroupId;
  readonly tagline: string;
  readonly image: ImageSrc;
}

export interface MenuGroup {
  readonly id: MenuGroupId;
  readonly name: string;
  readonly description: string;
}

export type DishBadge =
  | "chef-recommendation"
  | "best-seller"
  | "popular"
  | "new"
  | "limited"
  | "signature";

export type DietaryTag = "vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "nut-free";

/** 0 = not spicy, 3 = fiery. Rendered as flame pips. */
export type SpiceLevel = 0 | 1 | 2 | 3;

export interface Dish {
  readonly id: string;
  readonly name: string;
  readonly category: MenuCategoryId;
  readonly description: string;
  readonly ingredients: readonly string[];
  /** Base price in GHS (minor units are not used — prices are whole cedis). */
  readonly price: number;
  readonly calories: number;
  /** Kitchen preparation time in minutes. */
  readonly prepTime: number;
  readonly image: ImageSrc;
  readonly spice: SpiceLevel;
  readonly badges: readonly DishBadge[];
  readonly dietary: readonly DietaryTag[];
  readonly rating: number;
  readonly reviewCount: number;
  /** Sommelier or bar pairing suggestion shown in the dish detail dialog. */
  readonly pairing?: string;
  readonly serves?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Ordering                                  */
/* -------------------------------------------------------------------------- */

export type FulfilmentMethod = "delivery" | "pickup";

export interface CartLine {
  readonly dishId: string;
  readonly quantity: number;
  readonly note?: string;
}

export interface CartTotals {
  readonly subtotal: number;
  readonly discount: number;
  readonly deliveryFee: number;
  readonly serviceCharge: number;
  readonly vat: number;
  readonly total: number;
}

export interface Coupon {
  readonly code: string;
  readonly label: string;
  /** Percentage discount between 0 and 1. */
  readonly percentOff: number;
  readonly minimumSubtotal?: number;
}

/* -------------------------------------------------------------------------- */
/*                                 Reservation                                */
/* -------------------------------------------------------------------------- */

export type OccasionId =
  | "none"
  | "birthday"
  | "anniversary"
  | "business"
  | "wedding"
  | "date-night"
  | "celebration";

export interface Occasion {
  readonly id: OccasionId;
  readonly label: string;
  readonly description: string;
}

export type SeatingId = "indoor" | "terrace" | "chefs-counter" | "private-room";

export interface SeatingOption {
  readonly id: SeatingId;
  readonly label: string;
  readonly description: string;
  readonly capacity: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Editorial                                 */
/* -------------------------------------------------------------------------- */

export interface Feature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  /** Lucide icon name, resolved through `lib/icons.ts`. */
  readonly icon: string;
}

export interface Stat {
  readonly id: string;
  readonly value: number;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly label: string;
  readonly description: string;
}

export interface TimelineEntry {
  readonly year: string;
  readonly title: string;
  readonly description: string;
  readonly image?: ImageSrc;
}

export interface Chef {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly photo: Photo;
  readonly biography: readonly string[];
  readonly philosophy: string;
  readonly specialties: readonly string[];
  readonly awards: readonly string[];
  readonly signatureDishId: string;
  readonly instagram?: string;
}

export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly quote: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly initials: string;
  readonly verified: boolean;
  readonly source: "Google" | "TripAdvisor" | "OpenTable" | "In House";
  readonly date: string;
}

export interface RestaurantEvent {
  readonly id: string;
  readonly title: string;
  readonly kind: "Wine Tasting" | "Live Music" | "Chef's Table" | "Holiday Menu" | "Brunch";
  readonly date: string;
  readonly time: string;
  readonly price: string;
  readonly seatsLeft: number;
  readonly description: string;
  readonly image: ImageSrc;
  readonly host?: string;
}

export type GalleryCategory = "Food" | "Restaurant" | "Kitchen" | "Events" | "People";

export interface GalleryItem {
  readonly id: string;
  readonly photo: Photo;
  readonly category: GalleryCategory;
  readonly caption: string;
  readonly orientation: "portrait" | "landscape" | "square";
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly topic: "Reservations" | "Dining" | "Orders & Delivery" | "Events" | "Gift Cards";
}

export interface PrivateSpace {
  readonly id: string;
  readonly name: string;
  readonly capacity: string;
  readonly minimumSpend: string;
  readonly description: string;
  readonly image: ImageSrc;
  readonly includes: readonly string[];
  readonly bestFor: readonly string[];
}

export interface ProcessStep {
  readonly step: number;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly duration: string;
}

export interface JobOpening {
  readonly id: string;
  readonly title: string;
  readonly department: "Kitchen" | "Front of House" | "Bar" | "Support";
  readonly type: "Full-time" | "Part-time" | "Apprenticeship";
  readonly location: string;
  readonly summary: string;
  readonly responsibilities: readonly string[];
}

export interface GiftCardTier {
  readonly id: string;
  readonly amount: number;
  readonly label: string;
  readonly description: string;
  readonly popular?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly icon?: string;
}

export interface NavColumn {
  readonly title: string;
  readonly links: readonly NavLink[];
}

export interface NavItem extends NavLink {
  readonly mega?: {
    readonly columns: readonly NavColumn[];
    readonly feature: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly image: ImageSrc;
      readonly href: string;
      readonly cta: string;
    };
  };
}

/* -------------------------------------------------------------------------- */
/*                              Form result shape                             */
/* -------------------------------------------------------------------------- */

export interface ActionState {
  readonly status: "idle" | "success" | "error";
  readonly message?: string;
  /** Booking / order reference returned on success, e.g. `DZI-8F3K2Q`. */
  readonly reference?: string;
  readonly fieldErrors?: Record<string, string[]>;
  /** Extra success details, such as a delivery estimate. */
  readonly data?: Record<string, string>;
}
