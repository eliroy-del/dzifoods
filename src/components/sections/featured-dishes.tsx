import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { DishCard } from "@/components/menu/dish-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section";
import { FEATURED_DISHES } from "@/constants/menu";
import { cn } from "@/lib/utils";

/**
 * The six plates we would want a first-time guest to see. Two large editorial
 * cards lead, the rest follow in a standard grid.
 */
export function FeaturedDishes({ className }: { className?: string }) {
  const [first, second, ...rest] = FEATURED_DISHES;

  return (
    <section className={cn("section bg-charcoal text-cream relative overflow-hidden", className)}>
      <div
        aria-hidden
        className="bg-forest/40 pointer-events-none absolute top-1/3 -left-40 size-[32rem] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-accent/10 pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full blur-3xl"
      />

      <div className="container-luxe relative">
        <Reveal>
          <SectionHeading
            eyebrow="Signature plates"
            title={
              <>
                The dishes people
                <br className="hidden md:block" /> book a flight for.
              </>
            }
            description="Six plates that have earned their place. Three of them have never left the menu, and two of them start an argument every time we try."
            className="[&_p]:text-cream/65"
            action={
              <Button asChild variant="gold" size="lg" uppercase>
                <Link href="/menu">
                  Explore every dish
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            }
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-2" gap={0.12}>
          {first ? (
            <StaggerItem>
              <DishCard dish={first} variant="featured" className="h-full !bg-white/4 !border-white/10" />
            </StaggerItem>
          ) : null}
          {second ? (
            <StaggerItem>
              <DishCard dish={second} variant="featured" className="h-full !bg-white/4 !border-white/10" />
            </StaggerItem>
          ) : null}
        </Stagger>

        <Stagger className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {rest.map((dish) => (
            <StaggerItem key={dish.id}>
              <DishCard dish={dish} className="h-full !bg-white/4 !border-white/10" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
