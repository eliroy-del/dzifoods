import { ArrowRight, Phone, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import { Embers } from "@/components/motion/interactions";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { Ornament } from "@/components/ui/primitives";
import { Eyebrow } from "@/components/ui/section";
import { CONTACT } from "@/constants/site";
import { cn } from "@/lib/utils";

interface CallToActionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  image?: string;
}

/** The closing conversion band, reused at the foot of every page. */
export function CallToAction({
  eyebrow = "One table, one evening",
  title = "Reserve your table today.",
  description = "Thursday through Saturday books out about ten days ahead. Weeknights are quieter, and — between us — the better secret.",
  className,
  image = "/images/guests-celebration.webp",
}: CallToActionProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div aria-hidden className="absolute inset-0 -z-10">
        <ImageFrame
          src={image}
          alt=""
          ratio="auto"
          rounded={false}
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        <span className="from-forest-deep/95 via-forest-deep/85 absolute inset-0 bg-gradient-to-r to-black/75" />
      </div>

      <Embers count={14} />

      <div className="container-luxe relative py-24 text-center md:py-32">
        <Reveal>
          <Eyebrow align="center">{eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.05] font-medium text-balance text-white md:text-6xl">
            {title}
          </h2>
          <Ornament className="my-8" />
          <p className="text-cream/70 mx-auto max-w-xl text-lg leading-relaxed">{description}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="ember" size="xl" uppercase>
              <Link href="/reservations">
                Reserve now
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl" uppercase>
              <Link href="/menu">
                <UtensilsCrossed className="size-4" aria-hidden />
                View menu
              </Link>
            </Button>
          </div>

          <p className="text-cream/50 mt-8 text-sm">
            Prefer to speak to someone?{" "}
            <a href={CONTACT.phoneHref} className="link-underline inline-flex items-center gap-1.5 text-white">
              <Phone className="size-3.5" aria-hidden />
              {CONTACT.phone}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
