import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { idColumn, softDelete, timestamps } from "./common";
import { restaurants } from "./tenant";

export const staffRoleEnum = pgEnum("staff_role", [
  "owner",
  "manager",
  "content_editor",
  "cashier",
  "waiter",
  "kitchen",
]);

export type StaffRole = (typeof staffRoleEnum.enumValues)[number];

/** App profile, 1:1 with auth.users. */
export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  displayName: text("display_name").notNull(),
  ...timestamps,
});

export const staffMembers = pgTable(
  "staff_members",
  {
    id: idColumn,
    restaurantId: uuid("restaurant_id")
      .notNull()
      .references(() => restaurants.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    displayName: text("display_name").notNull(),
    role: staffRoleEnum("role").notNull(),
    pinHash: text("pin_hash"),
    pinFailedAttempts: integer("pin_failed_attempts").notNull().default(0),
    pinLockedUntil: timestamp("pin_locked_until", { withTimezone: true }),
    active: boolean("active").notNull().default(true),
    hourlyRatePesewas: integer("hourly_rate_pesewas"),
    ...timestamps,
    ...softDelete,
  },
  (table) => [uniqueIndex("staff_members_restaurant_user_idx").on(table.restaurantId, table.userId)],
);

export const auditLogs = pgTable("audit_logs", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  actorStaffId: uuid("actor_staff_id").references(() => staffMembers.id, { onDelete: "set null" }),
  actorUserId: uuid("actor_user_id"),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: uuid("entity_id"),
  before: jsonb("before").$type<Record<string, unknown>>(),
  after: jsonb("after").$type<Record<string, unknown>>(),
  ip: text("ip"),
  createdAt: timestamps.createdAt,
});

export const staffInvites = pgTable("staff_invites", {
  id: idColumn,
  restaurantId: uuid("restaurant_id")
    .notNull()
    .references(() => restaurants.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  displayName: text("display_name").notNull(),
  role: staffRoleEnum("role").notNull(),
  invitedByStaffId: uuid("invited_by_staff_id").references(() => staffMembers.id, {
    onDelete: "set null",
  }),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  ...timestamps,
});
