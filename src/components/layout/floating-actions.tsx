"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, CalendarCheck, Phone, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { CONTACT } from "@/constants/site";
import { useScrollState } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * Floating action cluster: WhatsApp, call, reserve, back-to-top and the
 * concierge chat entry point.
 *
 * Collapsed to a single button by default so it never competes with the
 * content, and it only appears once the guest has scrolled past the hero.
 */
export function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const { y } = useScrollState();
  const visible = y > 620;

  const actions = [
    {
      key: "whatsapp",
      label: "Chat on WhatsApp",
      href: `${CONTACT.whatsappHref}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`,
      icon: WhatsAppIcon,
      external: true,
      className: "bg-[#25D366] text-black",
    },
    {
      key: "call",
      label: `Call ${CONTACT.phone}`,
      href: CONTACT.phoneHref,
      icon: Phone,
      external: false,
      className: "bg-forest text-cream",
    },
    {
      key: "reserve",
      label: "Reserve a table",
      href: "/reservations",
      icon: CalendarCheck,
      external: false,
      className: "bg-accent text-accent-foreground",
    },
  ] as const;

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-70 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {visible ? (
          <motion.button
            key="top"
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="glass pointer-events-auto grid size-11 place-items-center rounded-full text-foreground shadow-lift transition-colors hover:text-accent"
          >
            <ArrowUp className="size-4" aria-hidden />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {expanded
          ? actions.map((action, index) => {
              const Icon = action.icon;
              const content = (
                <>
                  <Icon className="size-5" aria-hidden />
                  <span className="sr-only">{action.label}</span>
                </>
              );

              return (
                <motion.div
                  key={action.key}
                  initial={{ opacity: 0, y: 16, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.85 }}
                  transition={{ delay: index * 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-auto"
                >
                  {action.external ? (
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={action.label}
                      className={cn(
                        "grid size-12 place-items-center rounded-full shadow-lift transition-transform hover:scale-105",
                        action.className,
                      )}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={action.href}
                      title={action.label}
                      className={cn(
                        "grid size-12 place-items-center rounded-full shadow-lift transition-transform hover:scale-105",
                        action.className,
                      )}
                    >
                      {content}
                    </Link>
                  )}
                </motion.div>
              );
            })
          : null}
      </AnimatePresence>

      {/* Concierge placeholder — swap the toast for your assistant of choice. */}
      <AnimatePresence>
        {expanded ? (
          <motion.button
            key="concierge"
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.85 }}
            transition={{ delay: 0.15, duration: 0.28 }}
            onClick={() =>
              toast("Concierge is warming up", {
                description:
                  "Our AI concierge arrives soon. In the meantime, WhatsApp reaches a real person in about a minute.",
              })
            }
            className="glass pointer-events-auto grid size-12 place-items-center rounded-full text-foreground shadow-lift transition-colors hover:text-accent"
          >
            <Bot className="size-5" aria-hidden />
            <span className="sr-only">Ask the concierge</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setExpanded((previous) => !previous)}
        aria-expanded={expanded}
        aria-label={expanded ? "Close quick actions" : "Open quick actions"}
        className={cn(
          "pointer-events-auto grid size-14 place-items-center rounded-full shadow-lift transition-all duration-400",
          expanded
            ? "bg-foreground text-background rotate-90"
            : "bg-accent text-accent-foreground hover:scale-105",
        )}
      >
        {expanded ? <X className="size-5" aria-hidden /> : <Plus className="size-6" aria-hidden />}
      </button>
    </div>
  );
}
