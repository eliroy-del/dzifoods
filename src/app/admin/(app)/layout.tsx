import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/shell";
import { TooltipProvider } from "@/components/ui/primitives";
import { roleRequiresMfa } from "@/lib/auth/permissions";
import { requireSession } from "@/lib/auth/session";

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  if (roleRequiresMfa(session.role) && session.aal !== "aal2") {
    redirect("/admin/mfa");
  }

  return (
    <TooltipProvider>
      <AdminShell
        restaurantName={session.restaurantName}
        displayName={session.displayName}
        email={session.email}
        role={session.role}
      >
        {children}
      </AdminShell>
    </TooltipProvider>
  );
}
