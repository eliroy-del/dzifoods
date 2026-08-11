"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitApplication } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Field, Honeypot, Input, Select, Textarea } from "@/components/ui/field";
import { JOB_OPENINGS } from "@/constants/careers";
import { careersSchema, type CareersValues } from "@/lib/validators";

interface CareersFormProps {
  defaultRole?: string;
}

export function CareersForm({ defaultRole }: CareersFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CareersValues>({
    resolver: zodResolver(careersSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: defaultRole ?? "",
      experience: "2-4",
      portfolio: "",
      message: "",
      botField: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitApplication(values);

    if (result.status === "success") {
      toast.success("Application received", { description: result.message });
      reset();
    } else {
      toast.error("We couldn't submit that", { description: result.message });
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
          <p className="font-display text-lg">Application received.</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Our head of people replies within five working days. Good kitchens take their time hiring.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Honeypot />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="career-name" error={errors.name?.message}>
          <Input id="career-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field label="Phone" htmlFor="career-phone" error={errors.phone?.message}>
          <Input
            id="career-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+233 …"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
        <Field label="Email" htmlFor="career-email" error={errors.email?.message} className="sm:col-span-2">
          <Input
            id="career-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
      </div>

      <Field label="Role" htmlFor="career-role" error={errors.role?.message}>
        <Select id="career-role" aria-invalid={!!errors.role} {...register("role")}>
          <option value="">Select a role</option>
          {JOB_OPENINGS.map((job) => (
            <option key={job.id} value={job.title}>
              {job.title}
            </option>
          ))}
          <option value="General application">General application</option>
        </Select>
      </Field>

      <Field label="Experience" htmlFor="career-experience" error={errors.experience?.message}>
        <Select id="career-experience" aria-invalid={!!errors.experience} {...register("experience")}>
          <option value="0-1">0 – 1 years</option>
          <option value="2-4">2 – 4 years</option>
          <option value="5-9">5 – 9 years</option>
          <option value="10-plus">10+ years</option>
        </Select>
      </Field>

      <Field
        label="Portfolio or LinkedIn"
        htmlFor="career-portfolio"
        optional
        error={errors.portfolio?.message}
      >
        <Input id="career-portfolio" type="url" placeholder="https://" {...register("portfolio")} />
      </Field>

      <Field
        label="Tell us about yourself"
        htmlFor="career-message"
        error={errors.message?.message}
        hint="What you cook, where you've worked, and why DZIFOODS."
      >
        <Textarea id="career-message" rows={6} aria-invalid={!!errors.message} {...register("message")} />
      </Field>

      <Button type="submit" variant="ember" size="lg" uppercase loading={isSubmitting}>
        Submit application
        <ArrowRight className="size-4" aria-hidden />
      </Button>
    </form>
  );
}
