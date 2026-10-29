import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { idColumn, softDelete, timestamps } from "./common";
import { staffMembers } from "./staff";
import { restaurants } from "./tenant";

export const contentStatusEnum = pgEnum("content_status", ["draft", "published", "scheduled"]);

const contentMeta = {
  status: contentStatusEnum("status").notNull().default("published"),
  publishAt: timestamp("publish_at", { withTimezone: true }),
  sort: integer("sort").notNull().default(0),
  lastEditedBy: uuid("last_edited_by").references(() => staffMembers.id, { onDelete: "set null" }),
};

export const mediaAssets = pgTable("media_assets", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  alt: text("alt").notNull(),
  width: integer("width"),
  height: integer("height"),
  blurData: text("blur_data"),
  folder: text("folder"),
  tags: text("tags").array().notNull().default([]),
  ...timestamps,
  ...softDelete,
});

export const events = pgTable("events", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  kind: text("kind").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  price: text("price").notNull(),
  seatsLeft: integer("seats_left").notNull().default(0),
  description: text("description").notNull(),
  image: text("image"),
  host: text("host"),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const galleryItems = pgTable("gallery_items", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull(),
  caption: text("caption").notNull(),
  orientation: text("orientation").notNull().default("landscape"),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const testimonials = pgTable("testimonials", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  role: text("role"),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull().default(5),
  initials: text("initials"),
  verified: boolean("verified").notNull().default(true),
  source: text("source"),
  date: text("date"),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const faqs = pgTable("faqs", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  topic: text("topic").notNull(),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const jobOpenings = pgTable("job_openings", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  type: text("type").notNull(),
  location: text("location").notNull(),
  summary: text("summary").notNull(),
  responsibilities: text("responsibilities").array().notNull().default([]),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const people = pgTable("people", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  photoSrc: text("photo_src"),
  photoAlt: text("photo_alt"),
  biography: text("biography").array().notNull().default([]),
  philosophy: text("philosophy"),
  specialties: text("specialties").array().notNull().default([]),
  awards: text("awards").array().notNull().default([]),
  signatureDishSlug: text("signature_dish_slug"),
  instagram: text("instagram"),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const timelineEntries = pgTable("timeline_entries", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const features = pgTable("features", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon"),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const stats = pgTable("stats", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  value: integer("value").notNull(),
  suffix: text("suffix"),
  prefix: text("prefix"),
  label: text("label").notNull(),
  description: text("description"),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const processSteps = pgTable("process_steps", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  step: integer("step").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon"),
  duration: text("duration"),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const privateSpaces = pgTable("private_spaces", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  capacity: text("capacity"),
  minimumSpend: text("minimum_spend"),
  description: text("description").notNull(),
  image: text("image"),
  includes: text("includes").array().notNull().default([]),
  bestFor: text("best_for").array().notNull().default([]),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const giftCardTiers = pgTable("gift_card_tiers", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  /** Amount in pesewas. */
  amount: integer("amount").notNull(),
  label: text("label").notNull(),
  description: text("description"),
  popular: boolean("popular").notNull().default(false),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const pages = pgTable("pages", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  ...contentMeta,
  ...timestamps,
  ...softDelete,
});

export const coupons = pgTable("coupons", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  label: text("label").notNull(),
  percentOffBps: integer("percent_off_bps").notNull(),
  minSubtotalPesewas: integer("min_subtotal_pesewas"),
  validFrom: timestamp("valid_from", { withTimezone: true }),
  validTo: timestamp("valid_to", { withTimezone: true }),
  usageLimit: integer("usage_limit"),
  channels: text("channels").array().notNull().default(["web"]),
  active: boolean("active").notNull().default(true),
  extras: jsonb("extras").$type<Record<string, unknown>>().notNull().default({}),
  ...timestamps,
  ...softDelete,
});
