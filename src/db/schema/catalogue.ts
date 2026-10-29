import {
  boolean,
  integer,
  pgTable,
  smallint,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { idColumn, softDelete, timestamps } from "./common";
import { restaurants } from "./tenant";

export const menuCategories = pgTable(
  "menu_categories",
  {
    id: idColumn,
    restaurantId: uuid("restaurant_id")
      .notNull()
      .references(() => restaurants.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    tagline: text("tagline"),
    image: text("image"),
    sort: integer("sort").notNull().default(0),
    visibleOnline: boolean("visible_online").notNull().default(true),
    visiblePos: boolean("visible_pos").notNull().default(true),
    availableDays: smallint("available_days").array(),
    availableStart: text("available_start"),
    availableEnd: text("available_end"),
    ...timestamps,
    ...softDelete,
  },
  (table) => [uniqueIndex("menu_categories_restaurant_slug_idx").on(table.restaurantId, table.slug)],
);

export const menuItems = pgTable(
  "menu_items",
  {
    id: idColumn,
    restaurantId: uuid("restaurant_id")
      .notNull()
      .references(() => restaurants.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => menuCategories.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    ingredients: text("ingredients").array().notNull().default([]),
    /** Integer pesewas. */
    basePrice: integer("base_price").notNull(),
    priceMax: integer("price_max"),
    priceFrom: boolean("price_from").notNull().default(false),
    calories: integer("calories"),
    prepTime: integer("prep_time"),
    image: text("image"),
    spice: smallint("spice").notNull().default(0),
    badges: text("badges").array().notNull().default([]),
    dietary: text("dietary").array().notNull().default([]),
    pairing: text("pairing"),
    serves: text("serves"),
    sku: text("sku"),
    kitchenStation: text("kitchen_station"),
    visibleOnline: boolean("visible_online").notNull().default(true),
    visiblePos: boolean("visible_pos").notNull().default(true),
    isAvailable: boolean("is_available").notNull().default(true),
    sort: integer("sort").notNull().default(0),
    rating: integer("rating"),
    reviewCount: integer("review_count").notNull().default(0),
    ...timestamps,
    ...softDelete,
  },
  (table) => [uniqueIndex("menu_items_restaurant_slug_idx").on(table.restaurantId, table.slug)],
);

export const modifierGroups = pgTable("modifier_groups", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  minSelect: integer("min_select").notNull().default(0),
  maxSelect: integer("max_select").notNull().default(1),
  required: boolean("required").notNull().default(false),
  ...timestamps,
  ...softDelete,
});

export const modifiers = pgTable("modifiers", {
  id: idColumn,
  groupId: uuid("group_id")
    .notNull()
    .references(() => modifierGroups.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  /** Price delta in pesewas. */
  priceDelta: integer("price_delta").notNull().default(0),
  sort: integer("sort").notNull().default(0),
  ...timestamps,
  ...softDelete,
});

export const menuItemModifierGroups = pgTable(
  "menu_item_modifier_groups",
  {
    id: idColumn,
    menuItemId: uuid("menu_item_id")
      .notNull()
      .references(() => menuItems.id, { onDelete: "cascade" }),
    groupId: uuid("group_id")
      .notNull()
      .references(() => modifierGroups.id, { onDelete: "cascade" }),
    sort: integer("sort").notNull().default(0),
  },
  (table) => [uniqueIndex("menu_item_modifier_groups_unique").on(table.menuItemId, table.groupId)],
);
