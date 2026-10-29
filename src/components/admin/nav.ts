import type { Permission } from "@/lib/auth/permissions";

export interface AdminNavItem {
  readonly href: string;
  readonly label: string;
  readonly icon: string;
  readonly permission: Permission;
  readonly group: "Today" | "Catalogue" | "Content" | "Team";
  readonly coming?: boolean;
}

export const ADMIN_NAV: readonly AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard", permission: "dashboard.view", group: "Today" },
  { href: "/admin/orders", label: "Orders", icon: "ClipboardList", permission: "orders.view", group: "Today", coming: true },
  { href: "/admin/inbox", label: "Inbox", icon: "Inbox", permission: "cms.edit", group: "Today", coming: true },
  { href: "/admin/menu", label: "Menu", icon: "UtensilsCrossed", permission: "menu.view", group: "Catalogue", coming: true },
  { href: "/admin/media", label: "Media", icon: "Image", permission: "cms.edit", group: "Catalogue", coming: true },
  { href: "/admin/events", label: "Events", icon: "CalendarDays", permission: "cms.edit", group: "Content", coming: true },
  { href: "/admin/gallery", label: "Gallery", icon: "Images", permission: "cms.edit", group: "Content", coming: true },
  { href: "/admin/pages", label: "Pages", icon: "FileText", permission: "cms.edit", group: "Content", coming: true },
  { href: "/admin/staff", label: "Staff", icon: "Users", permission: "staff.invite", group: "Team" },
  { href: "/admin/settings", label: "Settings", icon: "Settings", permission: "settings.view", group: "Team", coming: true },
];
