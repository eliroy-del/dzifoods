"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/media";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

interface MegaMenuProps {
  item: NavItem;
  open: boolean;
  onNavigate: () => void;
}

/**
 * Desktop mega-menu panel. Rendered inside the header so it inherits the same
 * stacking context, and unmounted when closed so its links leave the tab order.
 */
export function MegaMenu({ item, open, onNavigate }: MegaMenuProps) {
  if (!item.mega) return null;
  const { columns, feature } = item.mega;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 top-full pt-3"
        >
          <div
            className={cn(
              "container-luxe",
              // A slim wrapper keeps the panel inset from the viewport edges.
            )}
          >
            <div className="bg-popover/95 border-border overflow-hidden rounded-3xl border shadow-lift backdrop-blur-2xl">
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr_1fr_20rem]">
                {columns.map((column) => (
                  <div key={column.title} className="border-border/60 p-7 lg:border-r">
                    <p className="font-ui text-gold mb-5 text-[0.62rem] font-semibold tracking-[0.24em] uppercase">
                      {column.title}
                    </p>
                    <ul className="space-y-1">
                      {column.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            className={cn(
                              "group/link block rounded-xl px-3 py-2.5 transition-colors",
                              "hover:bg-accent/8 focus-visible:outline-ring focus-visible:outline-2",
                            )}
                          >
                            <span className="font-ui group-hover/link:text-accent flex items-center gap-1.5 text-sm font-medium transition-colors">
                              {link.label}
                              <ArrowUpRight
                                aria-hidden
                                className="size-3 -translate-x-1 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100"
                              />
                            </span>
                            {link.description ? (
                              <span className="text-muted-foreground mt-0.5 block text-xs leading-relaxed">
                                {link.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <Link
                  href={feature.href}
                  onClick={onNavigate}
                  className="group/feature relative flex min-h-64 flex-col justify-end overflow-hidden p-7"
                >
                  <ImageFrame
                    src={feature.image}
                    alt=""
                    ratio="auto"
                    rounded={false}
                    overlay="editorial"
                    zoom
                    sizes="320px"
                    className="absolute inset-0"
                  />
                  <div className="relative z-2">
                    <p className="font-ui text-gold text-[0.62rem] font-semibold tracking-[0.24em] uppercase">
                      {feature.eyebrow}
                    </p>
                    <p className="font-display mt-2 text-2xl leading-tight text-white">
                      {feature.title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/75">{feature.description}</p>
                    <Button
                      variant="glass"
                      size="sm"
                      uppercase
                      asChild={false}
                      className="pointer-events-none mt-4"
                    >
                      {feature.cta}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
