"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MousePointer2, Star, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

import { Embers } from "@/components/motion/interactions";
import { TextReveal } from "@/components/motion/reveal";
import { ReservationWidget } from "@/components/reservation/reservation-widget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { Marquee } from "@/components/ui/section";
import { POPULAR_DISHES } from "@/constants/menu";
import { SITE } from "@/constants/site";
import { useOpeningStatus } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * The three-second sell.
 *
 * A full-bleed live-fire photograph, a slow ken-burns drift, drifting embers and
 * one decision to make: reserve, or order. Everything else is trust signal.
 */
export function Hero() {
  const status = useOpeningStatus();
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-forest-deep grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32 pb-10 lg:pt-40"
    >
      {/* Backdrop */}
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
        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <Badge variant="glass" size="md">
                <Star className="text-gold size-3" fill="currentColor" aria-hidden />
                {SITE.awards[0]}
              </Badge>
              {status ? (
                <Badge variant="glass" size="md">
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 rounded-full",
                      status.isOpen ? "bg-success animate-pulse" : "bg-white/50",
                    )}
                  />
                  {status.label}
                </Badge>
              ) : null}
            </motion.div>

            <h1
              id="hero-heading"
              className="mt-7 text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.98] font-medium text-white"
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
              in the heart of Accra — and one table with your name on it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button asChild variant="ember" size="xl" uppercase>
                <Link href="/reservations">
                  Reserve a table
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl" uppercase>
                <Link href="/order">
                  <UtensilsCrossed className="size-4" aria-hidden />
                  Order online
                </Link>
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.05 }}
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5"
            >
              <Stat value={`${SITE.rating.value}★`} label={`${(SITE.rating.count / 1000).toFixed(1)}k reviews`} />
              <Stat value="480k+" label="Guests served" />
              <Stat value="27" label="Awards won" />
              <Stat value="12 yrs" label="On Senchi Link" />
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ReservationWidget />
          </motion.div>
        </div>

        {/* Popular tonight */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex items-center gap-6">
            <p className="font-ui shrink-0 text-[0.62rem] font-semibold tracking-[0.24em] text-white/45 uppercase">
              Popular tonight
            </p>
            <Marquee speed={38} className="flex-1">
              {POPULAR_DISHES.slice(0, 8).map((dish) => (
                <span
                  key={dish.id}
                  className="font-display flex items-center gap-3 px-6 text-lg whitespace-nowrap text-white/70"
                >
                  {dish.name}
                  <span aria-hidden className="bg-accent/70 size-1 rotate-45" />
                </span>
              ))}
            </Marquee>
          </div>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="font-display block text-2xl font-medium text-white">{value}</span>
        <span className="font-ui mt-0.5 block text-[0.65rem] tracking-[0.18em] text-white/45 uppercase">
          {label}
        </span>
      </dd>
    </div>
  );
}
