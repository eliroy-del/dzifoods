import { MfaEnroll } from "@/app/admin/mfa/mfa-enroll";
import { requireSession } from "@/lib/auth/session";

export const metadata = { title: "Two-step verification" };

export default async function MfaPage() {
  await requireSession();

  return (
    <main className="bg-background flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg">
        <h1 className="font-display text-3xl">Two-step verification</h1>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Owners and managers must add an authenticator app (Google Authenticator, 1Password, Authy). Scan
          the code, then enter the six digits it shows.
        </p>
        <div className="border-border bg-card mt-8 rounded-3xl border p-8">
          <MfaEnroll />
        </div>
      </div>
    </main>
  );
}
