"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitContact } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Field, Honeypot, Input, Select, Textarea } from "@/components/ui/field";
import { contactSchema, type ContactValues } from "@/lib/validators";

const TOPICS = [
  { value: "general", label: "General enquiry" },
  { value: "reservations", label: "Reservations" },
  { value: "events", label: "Events & large parties" },
  { value: "feedback", label: "Feedback" },
  { value: "press", label: "Press & media" },
  { value: "careers", label: "Careers" },
] as const;

interface ContactFormProps {
  defaultTopic?: ContactValues["topic"];
}

export function ContactForm({ defaultTopic = "general" }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: defaultTopic,
      message: "",
      botField: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitContact(values);

    if (result.status === "success") {
      toast.success("Message sent", { description: result.message });
      reset({ ...values, name: "", email: "", phone: "", message: "", botField: "" });
    } else {
      toast.error("We couldn't send that", { description: result.message });
    }
  });

  if (isSubmitSuccessful) {
    return (
      <div
        role="status"
        className="border-success/30 bg-success/8 flex items-start gap-3 rounded-2xl border px-5 py-6"
      >
        <Check className="text-success mt-0.5 size-5 shrink-0" aria-hidden />
        <div>
          <p className="font-display text-lg">Thank you — we have it.</p>
          <p className="text-muted-foreground mt-1 text-sm">
            We reply within one working day. For anything urgent tonight, call us directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Honeypot />

      <Field label="Your name" htmlFor="contact-name" error={errors.name?.message}>
        <Input id="contact-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field label="Phone" htmlFor="contact-phone" optional error={errors.phone?.message}>
          <Input id="contact-phone" type="tel" autoComplete="tel" placeholder="+233 …" {...register("phone")} />
        </Field>
      </div>

      <Field label="Topic" htmlFor="contact-topic" error={errors.topic?.message}>
        <Select id="contact-topic" aria-invalid={!!errors.topic} {...register("topic")}>
          {TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Message" htmlFor="contact-message" error={errors.message?.message}>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Tell us what you need — the more detail, the faster we can help."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      <Button type="submit" variant="ember" size="lg" uppercase loading={isSubmitting}>
        Send message
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </form>
  );
}
