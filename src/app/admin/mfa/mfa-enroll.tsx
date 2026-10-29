"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function MfaEnroll() {
  const router = useRouter();
  const [qr, setQr] = useState<string | null>(null);
  const [factorId, setFactorId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = createBrowserSupabaseClient();
      const factors = await supabase.auth.mfa.listFactors();
      const existing = factors.data?.totp[0];
      if (existing) {
        setFactorId(existing.id);
        return;
      }
      const { data, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "DZIFOODS admin",
      });
      if (cancelled) return;
      if (enrollError || !data) {
        setError(enrollError?.message ?? "Could not start authenticator setup.");
        return;
      }
      setFactorId(data.id);
      setQr(data.totp.qr_code);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!factorId) return;
    const code = String(new FormData(event.currentTarget).get("code") ?? "");
    setPending(true);
    const supabase = createBrowserSupabaseClient();
    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error || !challenge.data) {
      setPending(false);
      setError(challenge.error?.message ?? "Could not start verification.");
      return;
    }
    const verified = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.data.id,
      code,
    });
    setPending(false);
    if (verified.error) {
      setError(verified.error.message);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {qr ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qr} alt="Authenticator QR code" className="bg-bone mx-auto size-48 rounded-xl p-2" />
      ) : (
        <p className="text-muted-foreground text-sm">
          {factorId
            ? "Enter a code from your authenticator app."
            : "Preparing your authenticator…"}
        </p>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Six-digit code" htmlFor="mfa-code">
          <Input id="mfa-code" name="code" inputMode="numeric" autoComplete="one-time-code" required />
        </Field>
        {error ? <p className="text-destructive text-sm">{error}</p> : null}
        <Button type="submit" variant="ember" size="lg" className="w-full" loading={pending} disabled={!factorId}>
          Confirm and continue
        </Button>
      </form>
    </div>
  );
}
