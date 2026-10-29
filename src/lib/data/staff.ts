import "server-only";

import { and, eq, isNull } from "drizzle-orm";

import { db } from "@/db";
import { staffMembers, users, type StaffRole } from "@/db/schema/staff";
import { restaurants } from "@/db/schema/tenant";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export interface StaffMembership {
  staffId: string;
  displayName: string;
  role: StaffRole;
  restaurantId: string;
  restaurantName: string;
  restaurantSlug: string;
  profileName: string | null;
}

export async function getStaffMembership(userId: string): Promise<StaffMembership | null> {
  if (db) {
    const [row] = await db
      .select({
        staffId: staffMembers.id,
        displayName: staffMembers.displayName,
        role: staffMembers.role,
        restaurantId: staffMembers.restaurantId,
        restaurantName: restaurants.name,
        restaurantSlug: restaurants.slug,
        profileName: users.displayName,
      })
      .from(staffMembers)
      .innerJoin(restaurants, eq(restaurants.id, staffMembers.restaurantId))
      .leftJoin(users, eq(users.id, staffMembers.userId))
      .where(
        and(eq(staffMembers.userId, userId), eq(staffMembers.active, true), isNull(staffMembers.deletedAt)),
      )
      .limit(1);
    return row ?? null;
  }

  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase
    .from("staff_members")
    .select(
      "id, display_name, role, restaurant_id, restaurants!inner(name, slug), users(display_name)",
    )
    .eq("user_id", userId)
    .eq("active", true)
    .is("deleted_at", null)
    .maybeSingle();

  if (error || !data) return null;

  const restaurantRel = data.restaurants as unknown;
  const restaurant = (Array.isArray(restaurantRel) ? restaurantRel[0] : restaurantRel) as {
    name: string;
    slug: string;
  };
  const profileRel = data.users as unknown;
  const profile = (Array.isArray(profileRel) ? profileRel[0] : profileRel) as {
    display_name: string;
  } | null;

  return {
    staffId: data.id as string,
    displayName: data.display_name as string,
    role: data.role as StaffRole,
    restaurantId: data.restaurant_id as string,
    restaurantName: restaurant.name,
    restaurantSlug: restaurant.slug,
    profileName: profile?.display_name ?? null,
  };
}

export async function listStaff(restaurantId: string) {
  if (db) {
    return db
      .select({
        id: staffMembers.id,
        displayName: staffMembers.displayName,
        role: staffMembers.role,
        active: staffMembers.active,
        userId: staffMembers.userId,
        email: users.email,
        createdAt: staffMembers.createdAt,
      })
      .from(staffMembers)
      .leftJoin(users, eq(users.id, staffMembers.userId))
      .where(and(eq(staffMembers.restaurantId, restaurantId), isNull(staffMembers.deletedAt)));
  }

  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase
    .from("staff_members")
    .select("id, display_name, role, active, user_id, created_at, users(email)")
    .eq("restaurant_id", restaurantId)
    .is("deleted_at", null)
    .order("created_at");

  if (error) throw error;

  return (data ?? []).map((row) => {
    const profileRel = row.users as unknown;
    const profile = (Array.isArray(profileRel) ? profileRel[0] : profileRel) as {
      email: string;
    } | null;
    return {
      id: row.id as string,
      displayName: row.display_name as string,
      role: row.role as StaffRole,
      active: row.active as boolean,
      userId: row.user_id as string | null,
      email: profile?.email ?? null,
      createdAt: new Date(row.created_at as string),
    };
  });
}

export async function countMenuItems(restaurantId: string): Promise<number> {
  if (db) {
    const { menuItems } = await import("@/db/schema/catalogue");
    const rows = await db
      .select({ id: menuItems.id })
      .from(menuItems)
      .where(and(eq(menuItems.restaurantId, restaurantId), isNull(menuItems.deletedAt)));
    return rows.length;
  }

  const supabase = createServiceSupabaseClient();
  const { count, error } = await supabase
    .from("menu_items")
    .select("id", { count: "exact", head: true })
    .eq("restaurant_id", restaurantId)
    .is("deleted_at", null);
  if (error) throw error;
  return count ?? 0;
}
