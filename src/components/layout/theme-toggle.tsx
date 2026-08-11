"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch. Renders a stable placeholder until mounted so the button
 * never flickers between icons during hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "daylight" : "candlelight"} theme` : "Switch theme"}
      className={cn(
        "relative grid size-10 place-items-center rounded-full border border-current/15",
        "text-current/70 transition-all duration-300 hover:border-current/35 hover:text-current",
        "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
    >
      <Sun
        aria-hidden
        className={cn(
          "absolute size-4 transition-all duration-500",
          mounted && !isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0",
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute size-4 transition-all duration-500",
          !mounted || isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
