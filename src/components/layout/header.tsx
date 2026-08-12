"use client";

import { ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LocaleCurrencySwitcher } from "@/components/layout/locale-currency";
import { Logo } from "@/components/layout/logo";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartButton } from "@/components/order/cart-button";
import { Button } from "@/components/ui/button";
import { CONTACT, NAV_ITEMS } from "@/constants/site";
import { useScrollState } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * Sticky header: transparent over the hero, frosted and solid once scrolled.
 */
export function Header() {
  const pathname = usePathname();
  const { scrolled, direction, y } = useScrollState(40);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const overlay = !scrolled;
  const hidden = direction === "down" && y > 520 && !openMenu;

  useEffect(() => setOpenMenu(null), [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 170);
  };

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  return (
    <>
      <a
        href="#main"
        className={cn(
          "bg-accent text-accent-foreground font-ui sr-only z-200 rounded-full px-5 py-3 text-sm font-medium",
          "focus:not-sr-only focus:fixed focus:top-4 focus:left-4",
        )}
      >
        Skip to content
      </a>

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-80 transition-transform duration-500 ease-[var(--ease-luxe)]",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
        onMouseLeave={scheduleClose}
      >
        <header
          data-overlay={overlay || undefined}
          className={cn(
            "relative transition-[background-color,box-shadow,border-color,color] duration-500",
            overlay
              ? "border-b border-transparent bg-transparent text-white"
              : "text-foreground border-b border-border bg-background/85 shadow-card backdrop-blur-2xl",
          )}
        >
          <div className="container-luxe flex h-18 items-center justify-between gap-6 lg:h-20">
            <Logo tone={overlay ? "light" : "auto"} priority />

            <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const isOpen = openMenu === item.label;

                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenMenu(item.mega ? item.label : null);
                    }}
                    onFocus={() => setOpenMenu(item.mega ? item.label : null)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={item.mega ? isOpen : undefined}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "link-underline font-ui relative inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[0.82rem] font-medium transition-colors",
                        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                        active
                          ? "text-accent"
                          : overlay
                            ? "text-white/85 hover:text-white"
                            : "hover:text-accent",
                      )}
                    >
                      {item.label}
                      {item.mega ? (
                        <ChevronDown
                          aria-hidden
                          className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-180")}
                        />
                      ) : null}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={CONTACT.phoneHref}
                className="font-ui hidden items-center gap-2 rounded-full border border-current/15 px-4 py-2.5 text-xs font-medium transition-colors hover:border-current/40 xl:inline-flex"
              >
                <Phone className="size-3.5" aria-hidden />
                {CONTACT.phone}
              </a>

              <div className="hidden items-center gap-2 md:flex">
                <LocaleCurrencySwitcher />
                <ThemeToggle />
              </div>

              <CartButton />

              <Button asChild variant="ember" size="md" uppercase className="hidden sm:inline-flex">
                <Link href="/reservations">Reserve</Link>
              </Button>

              <MobileNav tone={overlay ? "light" : "auto"} />
            </div>
          </div>

          <div onMouseEnter={cancelClose} className="hidden lg:block">
            {NAV_ITEMS.filter((item) => item.mega).map((item) => (
              <MegaMenu
                key={item.label}
                item={item}
                open={openMenu === item.label}
                onNavigate={() => setOpenMenu(null)}
              />
            ))}
          </div>
        </header>
      </div>
    </>
  );
}
