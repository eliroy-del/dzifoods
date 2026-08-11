"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { subscribeToNewsletter } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Honeypot, Input } from "@/components/ui/field";
import { newsletterSchema, type NewsletterValues } from "@/lib/validators";
import { cn } from "@/lib/utils";

/** Inline email capture used in the footer and the newsletter section. */
export function NewsletterForm({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", consent: true, botField: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await subscribeToNewsletter(values);

    if (result.status === "success") {
      toast.success("Welcome to the Sunday Send", { description: result.message });
      reset({ email: "", consent: true, botField: "" });
    } else {
      toast.error("We couldn't sign you up", { description: result.message });
    }
  });

  if (isSubmitSuccessful) {
    return (
      <p
        className={cn(
          "font-ui flex items-center gap-2.5 text-sm",
          tone === "dark" ? "text-gold" : "text-success",
          className,
        )}
        role="status"
      >
        <Check className="size-4" aria-hidden />
        You&rsquo;re on the list. The next letter goes out on Sunday.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("relative", className)} noValidate>
      <Honeypot />
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            className={cn(
              tone === "dark" &&
                "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:bg-white/10",
            )}
            {...register("email")}
          />
          {errors.email ? (
            <p id="newsletter-email-error" role="alert" className="text-destructive mt-2 text-xs">
              {errors.email.message}
            </p>
          ) : null}
        </div>
        <Button type="submit" variant="ember" size="lg" uppercase loading={isSubmitting}>
          Subscribe
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
      <p className={cn("mt-3 text-xs", tone === "dark" ? "text-cream/50" : "text-muted-foreground")}>
        One email a month. Unsubscribe in a single click.
      </p>
    </form>
  );
}
