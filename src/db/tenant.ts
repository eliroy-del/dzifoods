import "server-only";

import { and, eq, isNull, type SQL } from "drizzle-orm";
import type { AnyColumn } from "drizzle-orm";

/** Scope a query to the current restaurant. Always use this — never filter by restaurant_id by hand. */
export function withTenant(
  restaurantIdColumn: AnyColumn,
  restaurantId: string,
  extra?: SQL,
): SQL {
  const scope = eq(restaurantIdColumn, restaurantId);
  return extra ? and(scope, extra)! : scope;
}

export function notDeleted(deletedAtColumn: AnyColumn): SQL {
  return isNull(deletedAtColumn);
}
