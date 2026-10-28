"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MousePointer2, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import { Embers } from "@/components/motion/interactions";
import { TextReveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { cn } from "@/lib/utils";

/**
 * The three-second sell.
 *
 * A full-bleed live-fire photograph, a slow ken-burns drift, drifting embers and
 * one decision: order online or explore the menu.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-forest-deep grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <ImageFrame
          src="/images/hero-signature.webp"
          alt=""
          ratio="auto"
          rounded={false}
          priority
          fetchPriority="high"
          sizes="100vw"
          className={cn("absolute inset-0 h-full w-full", !reduceMotion && "animate-ken-burns")}
          imageClassName="object-cover object-center"
        />
        <span className="from-forest-deep via-forest-deep/70 absolute inset-0 bg-gradient-to-r to-transparent" />
        <span className="from-forest-deep absolute inset-0 bg-gradient-to-t via-transparent to-black/45" />
      </div>

      <Embers count={22} />

      <div className="container-luxe relative z-2">
        <div className="max-w-2xl">
          <h1
            id="hero-heading"
            className="text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.98] font-medium text-white"
          >
            <TextReveal text="Experience dining" as="span" className="block" />
            <TextReveal
              text="like never before."
              as="span"
              className="text-gradient-gold block italic"
              delay={0.28}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-white/75 md:text-xl"
          >
            Fresh ingredients. Masterful chefs. Memorable moments. Twelve years of live-fire cooking
            in the heart of Accra.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button asChild variant="ember" size="xl" uppercase>
              <Link href="/order">
                <UtensilsCrossed className="size-4" aria-hidden />
                Order online
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl" uppercase>
              <Link href="/menu">View menu</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {!reduceMotion ? (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        >
          <MousePointer2 className="size-3.5 text-white/40" />
          <span className="relative h-10 w-px overflow-hidden bg-white/15">
            <span className="animate-scroll-hint bg-accent absolute inset-x-0 h-4" />
          </span>
        </div>
      ) : null}
    </section>
  );
}
