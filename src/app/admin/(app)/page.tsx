import Link from "next/link";

import { Card } from "@/components/ui/card";
import { countMenuItems, listStaff } from "@/lib/data/staff";
import { requireSession } from "@/lib/auth/session";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const session = await requireSession();
  const [menuCount, staff] = await Promise.all([
    countMenuItems(session.restaurantId),
    listStaff(session.restaurantId),
  ]);

  const supabase = createServiceSupabaseClient();
  const [{ count: eventCount }, { count: faqCount }] = await Promise.all([
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("restaurant_id", session.restaurantId)
      .is("deleted_at", null),
    supabase
      .from("faqs")
      .select("id", { count: "exact", head: true })
      .eq("restaurant_id", session.restaurantId)
      .is("deleted_at", null),
  ]);

  const stats = [
    { label: "Menu items", value: menuCount, href: "/admin/menu" },
    { label: "Events", value: eventCount ?? 0, href: "/admin/events" },
    { label: "Staff", value: staff.length, href: "/admin/staff" },
    { label: "FAQs", value: faqCount ?? 0, href: "/admin/pages" },
  ];

  return (
    <div>
      <p className="font-ui text-muted-foreground text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
        Today
      </p>
      <h1 className="font-display mt-2 text-4xl">Good to see you, {session.displayName.split(" ")[0]}.</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
        The public site still reads from the content files. Phase 2 will wire these numbers live. Orders, POS
        and the kitchen display come in the next phases.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} variant="solid" radius="xl" className="p-6">
            <p className="text-muted-foreground text-xs tracking-[0.16em] uppercase">{stat.label}</p>
            <p className="font-display mt-3 text-4xl">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card variant="outline" radius="xl" className="mt-8 p-8">
        <h2 className="font-display text-2xl">Empty on purpose</h2>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
          There are no live orders yet. When Phase 3 lands, this is where today&apos;s tickets, unread
          enquiries and low stock will sit.
        </p>
        <Link href="/admin/staff" className="text-accent mt-6 inline-flex text-sm">
          Invite a manager →
        </Link>
      </Card>
    </div>
  );
}
