import { redirect } from "next/navigation";

import { can } from "@/lib/auth/permissions";
import { requireSession } from "@/lib/auth/session";

export const metadata = { title: "Kitchen" };

export default async function KdsPage() {
  const session = await requireSession();
  if (!can(session.role, "kds.access") && session.role !== "owner" && session.role !== "manager") {
    redirect("/admin");
  }

  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-ui text-muted-foreground text-[0.65rem] tracking-[0.22em] uppercase">Kitchen display</p>
      <h1 className="font-display mt-3 text-4xl">Tickets arrive in Phase 4</h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
        This screen is protected. Live tickets, bump and 86 will show here once the kitchen display is built.
      </p>
    </main>
  );
}
