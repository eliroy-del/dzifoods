import { InviteForm } from "@/app/admin/(app)/staff/invite-form";
import { Card } from "@/components/ui/card";
import { can } from "@/lib/auth/permissions";
import { requireSession } from "@/lib/auth/session";
import { listStaff } from "@/lib/data/staff";

export const metadata = { title: "Staff" };

export default async function StaffPage() {
  const session = await requireSession();
  const staff = await listStaff(session.restaurantId);

  return (
    <div>
      <h1 className="font-display text-4xl">Staff</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Invite-only. New people get a login; set their password with{" "}
        <code className="text-foreground">npm run admin:password — email</code>.
      </p>

      {can(session.role, "staff.invite") ? (
        <Card variant="solid" radius="xl" className="mt-8 p-6 md:p-8">
          <h2 className="font-display text-2xl">Invite someone</h2>
          <div className="mt-6">
            <InviteForm />
          </div>
        </Card>
      ) : null}

      <div className="border-border mt-10 overflow-hidden rounded-3xl border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground text-[0.65rem] tracking-[0.14em] uppercase">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id} className="border-border border-t">
                <td className="px-5 py-3">{member.displayName}</td>
                <td className="px-5 py-3">{member.email ?? "—"}</td>
                <td className="px-5 py-3 capitalize">{member.role.replace("_", " ")}</td>
                <td className="px-5 py-3">{member.active ? "Active" : "Off"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
