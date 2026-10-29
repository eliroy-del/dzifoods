"use client";

import { CartProvider, FavouritesProvider } from "@/components/providers/cart-provider";
import { PreferencesProvider } from "@/components/providers/preferences-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { TooltipProvider } from "@/components/ui/primitives";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <PreferencesProvider>
      <FavouritesProvider>
        <CartProvider>
          <TooltipProvider delayDuration={220} skipDelayDuration={400}>
            <SmoothScroll>{children}</SmoothScroll>
          </TooltipProvider>
        </CartProvider>
      </FavouritesProvider>
    </PreferencesProvider>
  );
}
