"use client";

import { ThemeProvider } from "next-themes";

import { CartProvider, FavouritesProvider } from "@/components/providers/cart-provider";
import { PreferencesProvider } from "@/components/providers/preferences-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { TooltipProvider } from "@/components/ui/primitives";
import { Toaster } from "@/components/ui/toaster";

/**
 * All client-side context in one place, mounted once in the root layout.
 * Dark ("Candlelight") is the intended DZIFOODS experience, so it is the default.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      themes={["light", "dark"]}
    >
      <PreferencesProvider>
        <FavouritesProvider>
          <CartProvider>
            <TooltipProvider delayDuration={220} skipDelayDuration={400}>
              <SmoothScroll>{children}</SmoothScroll>
              <Toaster />
            </TooltipProvider>
          </CartProvider>
        </FavouritesProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
