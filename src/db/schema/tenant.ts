import { boolean, integer, jsonb, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { idColumn, timestamps } from "./common";

export const restaurants = pgTable("restaurants", {
  id: idColumn,
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  legalName: text("legal_name"),
  ...timestamps,
});

export const restaurantSettings = pgTable("restaurant_settings", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" })
    .unique(),
  tagline: text("tagline"),
  shortDescription: text("short_description"),
  description: text("description"),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  email: text("email"),
  address: jsonb("address").$type<Record<string, string>>().notNull().default({}),
  geo: jsonb("geo").$type<{ lat: number; lng: number }>(),
  hours: jsonb("hours").$type<unknown>().notNull().default([]),
  socials: jsonb("socials").$type<unknown>().notNull().default([]),
  currencyCode: text("currency_code").notNull().default("GHS"),
  timezone: text("timezone").notNull().default("Africa/Accra"),
  serviceChargeBps: integer("service_charge_bps").notNull().default(0),
  delivery: jsonb("delivery").$type<Record<string, unknown>>().notNull().default({}),
  receipt: jsonb("receipt").$type<Record<string, unknown>>().notNull().default({}),
  seo: jsonb("seo").$type<Record<string, unknown>>().notNull().default({}),
  announcement: jsonb("announcement").$type<Record<string, unknown>>(),
  extras: jsonb("extras").$type<Record<string, unknown>>().notNull().default({}),
  ...timestamps,
});

export const taxRates = pgTable(
  "tax_rates",
  {
    id: idColumn,
    restaurantId: uuid("restaurant_id")
      .notNull()
      .references(() => restaurants.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    /** Rate in basis points. 1500 = 15%. */
    rateBps: integer("rate_bps").notNull(),
    appliesTo: text("applies_to").notNull().default("all"),
    inclusive: boolean("inclusive").notNull().default(true),
    active: boolean("active").notNull().default(true),
    ...timestamps,
  },
  (table) => [uniqueIndex("tax_rates_restaurant_name_idx").on(table.restaurantId, table.name)],
);
