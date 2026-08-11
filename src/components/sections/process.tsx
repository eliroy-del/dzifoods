import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section";
import { PROCESS_STEPS } from "@/constants/content";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * The arc of an evening, as an alternating timeline. The connecting line is
 * decorative; each step is a list item so the order is clear to screen readers.
 */
export function Process({ className }: { className?: string }) {
  return (
    <section className={cn("section relative overflow-hidden", className)}>
      <div className="container-luxe">
        <Reveal>
          <SectionHeading
            eyebrow="Your evening"
            title="Eight moments, from the door to the last spoon."
            description="We have thought about all of them. You only have to arrive."
            align="center"
            ornament
          />
        </Reveal>

        <div className="relative mt-16">
          <span
            aria-hidden
            className="via-accent/35 absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-transparent to-transparent md:left-1/2 md:-translate-x-px"
          />

          <Stagger as="ul" className="space-y-10 md:space-y-0" gap={0.09}>
            {PROCESS_STEPS.map((step, index) => {
              const Icon = resolveIcon(step.icon);
              const alignRight = index % 2 === 1;

              return (
                <StaggerItem
                  as="li"
                  key={step.step}
                  className={cn(
                    "relative pl-16 md:w-1/2 md:pl-0",
                    alignRight ? "md:ml-auto md:pl-16" : "md:pr-16 md:text-right",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "border-accent/40 bg-background text-accent absolute top-0 left-0 grid size-12 place-items-center rounded-full border",
                      "shadow-[0_0_0_6px_var(--background)]",
                      alignRight ? "md:left-0 md:-translate-x-1/2" : "md:right-0 md:left-auto md:translate-x-1/2",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>

                  <div className={cn("pb-2 md:py-8", alignRight ? "md:pl-8" : "md:pr-8")}>
                    <p className="font-ui text-gold text-[0.62rem] font-semibold tracking-[0.24em] uppercase">
                      Step {step.step} · {step.duration}
                    </p>
                    <h3 className="font-display mt-2 text-2xl leading-tight">{step.title}</h3>
                    <p className="text-muted-foreground mt-2 max-w-md leading-relaxed md:inline-block">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
