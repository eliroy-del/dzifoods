import "server-only";

import { headers } from "next/headers";

import { db } from "@/db";
import { auditLogs } from "@/db/schema/staff";
import type { StaffSession } from "@/lib/auth/session";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

interface AuditInput {
  session: StaffSession;
  action: string;
  entity: string;
  entityId?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}

export async function writeAuditLog(input: AuditInput): Promise<void> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? headerStore.get("x-real-ip") ?? null;

  const row = {
    restaurantId: input.session.restaurantId,
    actorStaffId: input.session.staffId,
    actorUserId: input.session.userId,
    action: input.action,
    entity: input.entity,
    entityId: input.entityId,
    before: input.before,
    after: input.after,
    ip,
  };

  if (db) {
    await db.insert(auditLogs).values(row);
    return;
  }

  const supabase = createServiceSupabaseClient();
  const { error } = await supabase.from("audit_logs").insert({
    restaurant_id: row.restaurantId,
    actor_staff_id: row.actorStaffId,
    actor_user_id: row.actorUserId,
    action: row.action,
    entity: row.entity,
    entity_id: row.entityId,
    before: row.before,
    after: row.after,
    ip: row.ip,
  });
  if (error) throw error;
}
