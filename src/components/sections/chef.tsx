import { ArrowRight, Award, Quote } from "lucide-react";
import Link from "next/link";

import { Parallax } from "@/components/motion/parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { Eyebrow } from "@/components/ui/section";
import { getDish } from "@/constants/menu";
import { EXECUTIVE_CHEF } from "@/constants/people";
import { cn } from "@/lib/utils";

/** Chef portrait, philosophy, awards and the dish he is known for. */
export function ChefSection({ className }: { className?: string }) {
  const chef = EXECUTIVE_CHEF;
  const signature = getDish(chef.signatureDishId);

  return (
    <section id="chef" className={cn("section bg-surface/40 relative overflow-hidden", className)}>
      <div className="container-luxe">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <Reveal direction="right">
            <div className="relative">
              <ImageFrame
                src={chef.photo.src}
                alt={chef.photo.alt}
                ratio="3/4"
                className="rounded-3xl shadow-luxe"
                sizes="(max-width: 1024px) 100vw, 520px"
              />

              {signature ? (
                <Parallax distance={-40} className="absolute -right-5 bottom-10 w-40 md:-right-10 md:w-52">
                  <div className="glass rounded-2xl p-3 shadow-lift">
                    <ImageFrame
                      src={signature.image}
                      alt={signature.name}
                      ratio="4/3"
                      sizes="200px"
                      className="rounded-xl"
                    />
                    <p className="font-ui text-gold mt-3 text-[0.58rem] tracking-[0.2em] uppercase">
                      Signature dish
                    </p>
                    <p className="font-display mt-1 text-sm leading-snug">{signature.name}</p>
                  </div>
                </Parallax>
              ) : null}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>Meet the kitchen</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[1.06] font-medium md:text-5xl">{chef.name}</h2>
              <p className="font-ui text-accent mt-3 text-sm tracking-[0.14em] uppercase">{chef.role}</p>

              <blockquote className="border-gold/40 mt-8 border-l-2 pl-6">
                <Quote className="text-gold size-5" aria-hidden />
                <p className="font-display mt-3 text-2xl leading-snug italic">{chef.philosophy}</p>
              </blockquote>

              <div className="text-muted-foreground mt-8 space-y-4 leading-relaxed">
                {chef.biography.slice(0, 2).map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <p className="font-ui text-muted-foreground mb-3 text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
                Specialities
              </p>
              <ul className="flex flex-wrap gap-2">
                {chef.specialties.map((speciality) => (
                  <li key={speciality}>
                    <Badge variant="outline" size="md">
                      {speciality}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Stagger className="mt-8 space-y-3" gap={0.07}>
              {chef.awards.map((award) => (
                <StaggerItem key={award} className="flex items-start gap-3 text-sm">
                  <Award className="text-gold mt-0.5 size-4 shrink-0" aria-hidden />
                  <span className="text-muted-foreground">{award}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="ember" size="lg" uppercase>
                <Link href="/reservations?seating=chefs-counter">
                  Book the chef&rsquo;s counter
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="link" size="none" uppercase>
                <Link href="/about#chef">Meet the whole brigade</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
