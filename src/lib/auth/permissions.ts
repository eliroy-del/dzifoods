import type { StaffRole } from "@/db/schema/staff";

/**
 * Permission matrix. Roles are a convenience; every mutation checks a
 * permission string, so custom roles can be added later without rewriting UI.
 */
export const PERMISSIONS = [
  "dashboard.view",
  "staff.invite",
  "staff.manage",
  "staff.manage_owners",
  "menu.view",
  "menu.edit",
  "menu.edit_price",
  "menu.86",
  "cms.edit",
  "settings.view",
  "settings.edit",
  "settings.billing",
  "orders.view",
  "orders.create",
  "orders.charge",
  "orders.void",
  "orders.refund",
  "orders.discount",
  "reports.view",
  "reports.view_financial",
  "inventory.view",
  "inventory.edit",
  "pos.access",
  "pos.take_payment",
  "kds.access",
  "kds.86",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const ALL: readonly Permission[] = PERMISSIONS;

const MANAGER: readonly Permission[] = PERMISSIONS.filter(
  (permission) => permission !== "settings.billing" && permission !== "staff.manage_owners",
);

const CONTENT_EDITOR: readonly Permission[] = [
  "dashboard.view",
  "cms.edit",
  "menu.view",
];

const CASHIER: readonly Permission[] = [
  "dashboard.view",
  "pos.access",
  "pos.take_payment",
  "orders.view",
  "orders.create",
  "orders.charge",
];

const WAITER: readonly Permission[] = [
  "dashboard.view",
  "pos.access",
  "orders.view",
  "orders.create",
];

const KITCHEN: readonly Permission[] = ["kds.access", "kds.86", "menu.86"];

const ROLE_PERMISSIONS: Record<StaffRole, readonly Permission[]> = {
  owner: ALL,
  manager: MANAGER,
  content_editor: CONTENT_EDITOR,
  cashier: CASHIER,
  waiter: WAITER,
  kitchen: KITCHEN,
};

export function can(role: StaffRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function permissionsFor(role: StaffRole): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}

export function defaultHomePath(role: StaffRole): string {
  if (role === "kitchen") return "/kds";
  if (role === "cashier" || role === "waiter") return "/pos";
  return "/admin";
}

export const MFA_REQUIRED_ROLES: readonly StaffRole[] = ["owner", "manager"];

export function roleRequiresMfa(role: StaffRole): boolean {
  return MFA_REQUIRED_ROLES.includes(role);
}
