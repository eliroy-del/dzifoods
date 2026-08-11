import type * as React from "react";

import { PageHero } from "@/components/layout/page-hero";
import { cn } from "@/lib/utils";

interface LegalPageProps {
  title: string;
  eyebrow: string;
  description: string;
  updated: string;
  path: string;
  children: React.ReactNode;
}

/** Shared shell for privacy, terms and accessibility pages. */
export function LegalPage({ title, eyebrow, description, updated, path, children }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image="/images/interior-dining.webp"
        imageAlt=""
        crumbs={[
          { label: "Home", href: "/" },
          { label: title, href: path },
        ]}
        size="md"
        meta={[{ label: "Last updated", value: updated }]}
      />
      <article className="container-luxe max-w-3xl pb-24 md:pb-32">{children}</article>
    </>
  );
}

export function LegalSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border-border/60 max-w-3xl border-b py-10 last:border-0", className)}>
      <h2 className="font-display text-2xl leading-tight">{title}</h2>
      <div className="text-muted-foreground mt-4 space-y-4 text-sm leading-relaxed md:text-base">
        {children}
      </div>
    </section>
  );
}
