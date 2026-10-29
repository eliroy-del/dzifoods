import { Suspense } from "react";
import { redirect } from "next/navigation";

import { LoginForm } from "@/app/admin/login/login-form";
import { getSession } from "@/lib/auth/session";

export const metadata = { title: "Sign in" };

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <main className="bg-background flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="border-border bg-card w-full max-w-md rounded-3xl border p-8 shadow-card md:p-10">
        <p className="font-ui text-muted-foreground text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
          DZIFOODS
        </p>
        <h1 className="font-display mt-3 text-3xl">Staff sign in</h1>
        <p className="text-muted-foreground mt-2 text-sm">Owners, managers and the floor team.</p>
        <div className="mt-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
