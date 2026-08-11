import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section";
import { LOYALTY } from "@/constants/content";
import { cn } from "@/lib/utils";

/** The Ember Club — three tiers, with the middle one deliberately favoured. */
export function Loyalty({ className }: { className?: string }) {
  return (
    <section className={cn("section relative overflow-hidden", className)}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow={LOYALTY.eyebrow}
            title={LOYALTY.heading}
            description={LOYALTY.description}
            align="center"
            ornament
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" gap={0.1}>
          {LOYALTY.tiers.map((tier) => {
            const featured = "featured" in tier && tier.featured;
            return (
              <StaggerItem key={tier.id}>
                <Card
                  variant={featured ? "solid" : "outline"}
                  radius="xl"
                  hover="lift"
                  className={cn(
                    "flex h-full flex-col p-7",
                    featured && "border-accent/40 shadow-glow md:-mt-4 md:mb-4",
                  )}
                >
                  {featured ? (
                    <Badge variant="ember" size="sm" className="mb-4 self-start">
                      <Sparkles className="size-3" aria-hidden />
                      Most members
                    </Badge>
                  ) : null}

                  <h3 className="font-display text-3xl leading-none">{tier.name}</h3>
                  <p className="font-ui text-muted-foreground mt-2 text-xs tracking-[0.12em] uppercase">
                    {tier.requirement}
                  </p>

                  <ul className="mt-7 flex-1 space-y-3 text-sm">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3">
                        <Check className="text-accent mt-0.5 size-4 shrink-0" aria-hidden />
                        <span className="text-muted-foreground">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={featured ? "ember" : "outline"}
                    size="md"
                    uppercase
                    className="mt-8 w-full"
                  >
                    <Link href="/contact?topic=general">Join free</Link>
                  </Button>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
