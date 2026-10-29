"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  Image,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

import { signOut } from "@/app/admin/actions";
import { ADMIN_NAV } from "@/components/admin/nav";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/primitives";
import { Input } from "@/components/ui/field";
import { can, type Permission } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils";
import type { StaffRole } from "@/db/schema/staff";

const ICONS = {
  LayoutDashboard,
  ClipboardList,
  Inbox,
  UtensilsCrossed,
  Image,
  CalendarDays,
  Images,
  FileText,
  Users,
  Settings,
} as const;

interface AdminShellProps {
  children: React.ReactNode;
  restaurantName: string;
  displayName: string;
  email: string;
  role: StaffRole;
}

export function AdminShell({ children, restaurantName, displayName, email, role }: AdminShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const items = ADMIN_NAV.filter((item) => can(role, item.permission));

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const crumbs = useMemo(() => {
    const current = items.find((item) => item.href === pathname);
    return current ? current.label : "Dashboard";
  }, [items, pathname]);

  return (
    <div className="bg-background text-foreground flex min-h-dvh">
      <aside
        className={cn(
          "border-border bg-surface hidden shrink-0 flex-col border-r md:flex",
          collapsed ? "w-[4.5rem]" : "w-60",
        )}
      >
        <div className="flex h-14 items-center justify-between px-4">
          {collapsed ? (
            <span className="font-display text-accent text-lg">D</span>
          ) : (
            <span className="font-display text-lg">DZIFOODS</span>
          )}
          <Button variant="ghost" size="icon-sm" onClick={() => setCollapsed((value) => !value)} aria-label="Collapse menu">
            <Menu className="size-4" />
          </Button>
        </div>
        <NavList items={items} pathname={pathname} collapsed={collapsed} />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
          <aside className="border-border bg-background relative z-10 flex h-full w-64 flex-col border-r">
            <div className="flex h-14 items-center justify-between px-4">
              <span className="font-display text-lg">DZIFOODS</span>
              <Button variant="ghost" size="icon-sm" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="size-4" />
              </Button>
            </div>
            <NavList items={items} pathname={pathname} collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border bg-background/80 sticky top-0 z-20 flex h-14 items-center gap-3 border-b px-4 backdrop-blur-md">
          <Button variant="ghost" size="icon-sm" className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-4" />
          </Button>
          <p className="text-muted-foreground min-w-0 flex-1 truncate text-sm">
            {restaurantName}
            <span className="mx-2 text-border">/</span>
            {crumbs}
          </p>
          <Button variant="ghost" size="icon-sm" onClick={() => setCommandOpen(true)} aria-label="Search">
            <Search className="size-4" />
          </Button>
          <UserMenu name={displayName} email={email} role={role} />
        </header>
        <div className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>
      </div>

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        items={items}
        role={role}
      />
    </div>
  );
}

function NavList({
  items,
  pathname,
  collapsed,
  onNavigate,
}: {
  items: typeof ADMIN_NAV;
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const groups = ["Today", "Catalogue", "Content", "Team"] as const;
  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-2 py-4">
      {groups.map((group) => {
        const groupItems = items.filter((item) => item.group === group);
        if (groupItems.length === 0) return null;
        return (
          <div key={group}>
            {collapsed ? null : (
              <p className="text-muted-foreground px-3 pb-2 text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
                {group}
              </p>
            )}
            <ul className="space-y-1">
              {groupItems.map((item) => {
                const Icon = ICONS[item.icon as keyof typeof ICONS];
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.coming ? "#" : item.href}
                      onClick={onNavigate}
                      aria-disabled={item.coming}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                        active ? "bg-accent/12 text-accent" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        item.coming && "pointer-events-none opacity-50",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      {collapsed ? null : (
                        <span className="flex-1 truncate">
                          {item.label}
                          {item.coming ? <span className="ml-2 text-[0.65rem] tracking-wide uppercase">Soon</span> : null}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function UserMenu({ name, email, role }: { name: string; email: string; role: StaffRole }) {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="max-w-48">
          <span className="truncate">{name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {email}
          <span className="mt-1 block font-normal normal-case tracking-normal">{role.replace("_", " ")}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Switch to {theme === "dark" ? "daylight" : "candlelight"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            void signOut();
          }}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CommandPalette({
  open,
  onOpenChange,
  items,
  role,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: typeof ADMIN_NAV;
  role: StaffRole;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const filtered = items.filter(
    (item) => !item.coming && can(role, item.permission as Permission) && item.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] max-w-lg translate-y-0 p-0" showClose={false}>
        <DialogTitle className="sr-only">Jump to</DialogTitle>
        <div className="border-border flex items-center gap-2 border-b px-4">
          <Search className="text-muted-foreground size-4" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to… ⌘K"
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            autoFocus
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                className="hover:bg-muted w-full rounded-xl px-3 py-2.5 text-left text-sm"
                onClick={() => {
                  onOpenChange(false);
                  router.push(item.href);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
