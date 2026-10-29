"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { sendPasswordReset } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const email = String(new FormData(event.currentTarget).get("email") ?? "");
    const result = await sendPasswordReset(email);
    setPending(false);
    setMessage(result.message ?? "If that account exists, a reset email is on its way.");
  }

  return (
    <main className="bg-background flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="border-border bg-card w-full max-w-md rounded-3xl border p-8 shadow-card">
        <h1 className="font-display text-3xl">Reset password</h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <Field label="Email" htmlFor="reset-email">
            <Input id="reset-email" name="email" type="email" required autoComplete="username" />
          </Field>
          {message ? <p className="text-sm">{message}</p> : null}
          <Button type="submit" variant="ember" size="lg" className="w-full" loading={pending}>
            Send reset link
          </Button>
        </form>
        <p className="mt-6 text-center">
          <Link href="/admin/login" className="text-muted-foreground text-sm">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
