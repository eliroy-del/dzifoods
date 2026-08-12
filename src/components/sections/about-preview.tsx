import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { Eyebrow } from "@/components/ui/section";
import { ABOUT_STORY, VALUES } from "@/constants/content";
import { EXECUTIVE_CHEF } from "@/constants/people";
import { resolveIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** Editorial "our story" block with an offset image pair. */
export function AboutPreview({ className }: { className?: string }) {
  return (
    <section id="story" className={cn("section relative overflow-hidden", className)}>
      <div className="container-luxe">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right" className="relative">
            <div className="relative">
              <Parallax distance={40}>
                <ImageFrame
                  src="/images/interior-dining.webp"
                  alt="The DZIFOODS dining room at night, lit by brass pendants and candles"
                  ratio="4/3"
                  className="rounded-3xl shadow-luxe"
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
              </Parallax>

              <Parallax distance={-64} className="absolute -right-4 -bottom-16 w-2/5 md:-right-10 md:w-1/3">
                <ImageFrame
                  src="/images/kitchen-pass.webp"
                  alt="A chef plating at the pass under a brass heat lamp"
                  ratio="square"
                  className="border-background rounded-3xl border-4 shadow-lift"
                  sizes="240px"
                />
              </Parallax>

              <div className="glass absolute -top-6 -left-4 max-w-[13rem] rounded-2xl p-4 md:-left-10">
                <Quote className="text-gold size-5" aria-hidden />
                <p className="font-display mt-2 text-sm leading-snug italic">
                  &ldquo;{EXECUTIVE_CHEF.philosophy}&rdquo;
                </p>
                <p className="text-muted-foreground font-ui mt-2 text-[0.6rem] tracking-[0.16em] uppercase">
                  {EXECUTIVE_CHEF.name}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:pl-4">
            <Reveal>
              <Eyebrow>{ABOUT_STORY.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[1.06] font-medium text-balance md:text-5xl">
                {ABOUT_STORY.heading}
              </h2>
              <p className="text-muted-foreground mt-6 text-lg leading-relaxed">{ABOUT_STORY.lead}</p>
              <p className="text-muted-foreground mt-4 leading-relaxed">{ABOUT_STORY.body[0]}</p>
            </Reveal>

            <Stagger className="mt-9 grid gap-5 sm:grid-cols-2" gap={0.08}>
              {VALUES.map((value) => {
                const Icon = resolveIcon(value.icon);
                return (
                  <StaggerItem key={value.id} className="flex gap-4">
                    <span
                      aria-hidden
                      className="border-gold/30 text-gold grid size-10 shrink-0 place-items-center rounded-xl border"
                    >
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="font-ui block text-sm font-semibold">{value.title}</span>
                      <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                        {value.description}
                      </span>
                    </span>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <Reveal delay={0.1} className="mt-10">
              <Button asChild variant="forest" size="lg" uppercase>
                <Link href="/about">
                  Read our story
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>

        <Stagger
          className="border-border mt-20 grid gap-10 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4"
          gap={0.1}
        >
          {STATS.map((stat) => (
            <StaggerItem key={stat.id}>
              <p className="font-display text-gradient-ember text-5xl leading-none font-medium md:text-6xl">
                <CountUp to={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </p>
              <p className="font-ui mt-4 text-sm font-semibold tracking-[0.08em] uppercase">
                {stat.label}
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{stat.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
