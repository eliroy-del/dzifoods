"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password.length < 12) {
      setError("Use at least 12 characters.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords did not match.");
      return;
    }
    setPending(true);
    const supabase = createBrowserSupabaseClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setPending(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    router.replace("/admin");
  }

  return (
    <main className="bg-background flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="border-border bg-card w-full max-w-md rounded-3xl border p-8 shadow-card">
        <h1 className="font-display text-3xl">Choose a new password</h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <Field label="New password" htmlFor="new-password">
            <Input id="new-password" name="password" type="password" required autoComplete="new-password" />
          </Field>
          <Field label="Confirm" htmlFor="confirm-password">
            <Input id="confirm-password" name="confirm" type="password" required autoComplete="new-password" />
          </Field>
          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          <Button type="submit" variant="ember" size="lg" className="w-full" loading={pending}>
            Save password
          </Button>
        </form>
      </div>
    </main>
  );
}
