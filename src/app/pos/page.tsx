import { redirect } from "next/navigation";

import { can } from "@/lib/auth/permissions";
import { requireSession } from "@/lib/auth/session";

export const metadata = { title: "POS" };

export default async function PosPage() {
  const session = await requireSession();
  if (!can(session.role, "pos.access") && session.role !== "owner" && session.role !== "manager") {
    redirect("/admin");
  }

  return (
    <main className="bg-background flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-ui text-muted-foreground text-[0.65rem] tracking-[0.22em] uppercase">Point of sale</p>
      <h1 className="font-display mt-3 text-4xl">The counter arrives in Phase 4</h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
        This terminal is protected. PIN unlock, tables, tickets and cash drawers land with the POS build.
      </p>
    </main>
  );
}
