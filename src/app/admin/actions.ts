"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { writeAuditLog } from "@/lib/audit";
import { requirePermission } from "@/lib/auth/session";
import type { StaffRole } from "@/db/schema/staff";
import { createServerSupabaseClient, createServiceSupabaseClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/env";
import type { ActionState } from "@/types";

const inviteSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  name: z.string().trim().min(2).max(80),
  role: z.enum(["manager", "content_editor", "cashier", "waiter", "kitchen"]),
});

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function inviteStaff(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const session = await requirePermission("staff.invite");
  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Check the name, email and role, then try again." };
  }

  const { email, name, role } = parsed.data;
  const admin = createServiceSupabaseClient();

  const { data: created, error } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    app_metadata: { role, restaurant_slug: session.restaurantSlug },
    user_metadata: { display_name: name },
  });

  if (error || !created.user) {
    return { status: "error", message: error?.message ?? "Could not create that login." };
  }

  const { error: profileError } = await admin.from("users").upsert({
    id: created.user.id,
    email,
    display_name: name,
  });
  if (profileError) {
    return { status: "error", message: profileError.message };
  }

  const { data: staff, error: staffError } = await admin
    .from("staff_members")
    .insert({
      restaurant_id: session.restaurantId,
      user_id: created.user.id,
      display_name: name,
      role: role as StaffRole,
      active: true,
    })
    .select("id")
    .single();

  if (staffError) {
    return { status: "error", message: staffError.message };
  }

  await admin.from("staff_invites").insert({
    restaurant_id: session.restaurantId,
    email,
    display_name: name,
    role,
    invited_by_staff_id: session.staffId,
  });

  await writeAuditLog({
    session,
    action: "staff.invite",
    entity: "staff_members",
    entityId: staff.id as string,
    after: { email, role, name },
  });

  revalidatePath("/admin/staff");
  return {
    status: "success",
    message: `${name} can sign in at /admin/login. Set their password with npm run admin:password — ${email}`,
  };
}

export async function sendPasswordReset(email: string): Promise<ActionState> {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getSiteUrl()}/admin/auth/callback?next=/admin/reset-password`,
  });
  if (error) return { status: "error", message: error.message };
  return { status: "success", message: "If that account exists, a reset email is on its way." };
}
