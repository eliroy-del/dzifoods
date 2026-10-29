import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import type { StaffRole } from "@/db/schema/staff";
import { can, defaultHomePath, type Permission } from "@/lib/auth/permissions";
import { getStaffMembership } from "@/lib/data/staff";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface StaffSession {
  userId: string;
  email: string;
  displayName: string;
  staffId: string;
  restaurantId: string;
  restaurantName: string;
  restaurantSlug: string;
  role: StaffRole;
  aal: "aal1" | "aal2" | null;
}

export class AuthorizationError extends Error {
  constructor(
    message: string,
    readonly code: "unauthenticated" | "forbidden" = "forbidden",
  ) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export const getSession = cache(async (): Promise<StaffSession | null> => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const membership = await getStaffMembership(user.id);
  if (!membership) return null;

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  return {
    userId: user.id,
    email: user.email,
    displayName: membership.profileName ?? membership.displayName,
    staffId: membership.staffId,
    restaurantId: membership.restaurantId,
    restaurantName: membership.restaurantName,
    restaurantSlug: membership.restaurantSlug,
    role: membership.role,
    aal: aal?.currentLevel === "aal2" ? "aal2" : aal?.currentLevel === "aal1" ? "aal1" : null,
  };
});

export async function requireSession(): Promise<StaffSession> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function requirePermission(permission: Permission): Promise<StaffSession> {
  const session = await requireSession();
  if (!can(session.role, permission)) {
    throw new AuthorizationError("You do not have permission to do that.");
  }
  return session;
}

export async function requireRole(...roles: StaffRole[]): Promise<StaffSession> {
  const session = await requireSession();
  if (!roles.includes(session.role)) {
    throw new AuthorizationError("You do not have permission to do that.");
  }
  return session;
}

export { defaultHomePath };
