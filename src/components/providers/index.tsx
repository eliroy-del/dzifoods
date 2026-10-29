"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";

/** Root providers shared by the public site, admin, POS and KDS. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      themes={["light", "dark"]}
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
