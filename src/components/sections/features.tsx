import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section";
import { FEATURES } from "@/constants/content";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Amenity grid. Server-rendered — the only motion is the scroll-in stagger,
 * which keeps this section free of client JavaScript beyond the wrapper.
 */
export function Features({ className }: { className?: string }) {
  return (
    <section className={cn("section bg-surface/40 relative overflow-hidden", className)}>
      <div
        aria-hidden
        className="bg-accent/6 pointer-events-none absolute -top-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full blur-3xl"
      />
      <div className="container-luxe relative">
        <Reveal>
          <SectionHeading
            eyebrow="Why guests return"
            title={
              <>
                Everything you would hope for.
                <br className="hidden md:block" /> Several things you wouldn&rsquo;t.
              </>
            }
            description="Twelve years of small decisions, most of which you will never notice — which is rather the point."
            align="center"
            ornament
          />
        </Reveal>

        <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" gap={0.06}>
          {FEATURES.map((feature) => {
            const Icon = resolveIcon(feature.icon);
            return (
              <StaggerItem key={feature.id}>
                <Card
                  variant="solid"
                  radius="xl"
                  hover="both"
                  className="group h-full border-border/70 p-6"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "border-accent/25 bg-accent/10 text-accent grid size-12 place-items-center rounded-2xl border",
                      "transition-all duration-500 ease-[var(--ease-luxe)] group-hover:scale-110 group-hover:rotate-6",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-display mt-5 text-lg leading-snug">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
