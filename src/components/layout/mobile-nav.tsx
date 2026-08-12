"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/primitives";
import { CONTACT, SOCIALS } from "@/constants/site";
import { resolveBrandIcon } from "@/components/ui/brand-icons";
import { useLockScroll, useOpeningStatus } from "@/hooks";
import { cn } from "@/lib/utils";

const PRIMARY_LINKS = [
  { label: "Menus", href: "/menu" },
  { label: "Reservations", href: "/reservations" },
  { label: "Order online", href: "/order" },
  { label: "Our story", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Guest stories", href: "/testimonials" },
  { label: "Gift cards", href: "/gift-cards" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/**
 * Full-height mobile navigation.
 *
 * Hand-rolled rather than Radix-based so the staggered link reveal can be
 * choreographed; focus is trapped by rendering it as a modal region with the
 * page inert behind it (scroll lock + `aria-modal`).
 */
export function MobileNav({ tone = "auto" }: { tone?: "auto" | "light" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const status = useOpeningStatus();
  useLockScroll(open);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className={cn(
          "grid size-10 place-items-center rounded-full border border-current/15 transition-colors lg:hidden",
          "hover:border-current/40",
          tone === "light" ? "text-white" : "text-foreground",
        )}
      >
        <Menu className="size-4" aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-110 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "bg-background fixed inset-y-0 right-0 z-120 flex w-full max-w-sm flex-col",
                "border-l border-border shadow-lift lg:hidden",
              )}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-muted-foreground hover:text-foreground grid size-10 place-items-center rounded-full border border-border transition-colors"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6" data-lenis-prevent>
                <ul className="space-y-0.5">
                  {PRIMARY_LINKS.map((link, index) => {
                    const active = pathname === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.12 + index * 0.035,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors",
                            active ? "bg-accent/10 text-accent" : "hover:bg-muted/60",
                          )}
                        >
                          <span className="font-display text-xl">{link.label}</span>
                          <ArrowRight
                            aria-hidden
                            className="size-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-60"
                          />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                <Separator className="my-6" />

                <div className="space-y-3 text-sm">
                  <a
                    href={CONTACT.phoneHref}
                    className="text-muted-foreground hover:text-accent flex items-center gap-3 transition-colors"
                  >
                    <Phone className="size-4" aria-hidden />
                    {CONTACT.phone}
                  </a>
                  <p className="text-muted-foreground flex items-center gap-3">
                    <Clock className="size-4" aria-hidden />
                    {status?.label ?? `${CONTACT.address.district}, ${CONTACT.address.city}`}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  {SOCIALS.map((social) => {
                    const Icon = resolveBrandIcon(social.icon);
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="text-muted-foreground hover:border-accent/50 hover:text-accent grid size-10 place-items-center rounded-full border border-border transition-colors"
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </nav>

              <div className="space-y-3 border-t border-border px-5 py-5">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LocaleCurrencySwitcher />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild variant="outline" size="md" uppercase>
                    <Link href="/order">Order</Link>
                  </Button>
                  <Button asChild variant="ember" size="md" uppercase>
                    <Link href="/reservations">Reserve</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
