"use client";

import { Check, Globe } from "lucide-react";

import { usePreferences } from "@/components/providers/preferences-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/primitives";
import { CURRENCIES, LOCALES } from "@/constants/site";
import { cn } from "@/lib/utils";
import type { CurrencyCode, LocaleCode } from "@/types";

/**
 * Combined language + currency switcher.
 *
 * Currency conversion is live; language is a UI-ready placeholder pending
 * `next-intl` message catalogues (the selection persists so the wiring is trivial).
 */
export function LocaleCurrencySwitcher({ className }: { className?: string }) {
  const { currency, setCurrency, locale, setLocale } = usePreferences();
  const active = CURRENCIES.find((entry) => entry.code === currency) ?? CURRENCIES[0]!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "font-ui inline-flex h-10 items-center gap-2 rounded-full border border-current/15 px-3.5",
          "text-current/75 text-xs font-medium transition-all duration-300",
          "hover:border-current/35 hover:text-current",
          "focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-2",
          className,
        )}
        aria-label={`Language and currency: ${locale.toUpperCase()}, ${active.code}`}
      >
        <Globe className="size-3.5" aria-hidden />
        <span aria-hidden>
          {locale.toUpperCase()} · {active.symbol}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        {LOCALES.map((entry) => (
          <DropdownMenuItem
            key={entry.code}
            onSelect={() => setLocale(entry.code as LocaleCode)}
            className="justify-between"
          >
            <span>{entry.nativeLabel}</span>
            {locale === entry.code ? <Check className="size-3.5" aria-hidden /> : null}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        {CURRENCIES.map((entry) => (
          <DropdownMenuItem
            key={entry.code}
            onSelect={() => setCurrency(entry.code as CurrencyCode)}
            className="justify-between"
          >
            <span>
              <span className="font-medium">{entry.symbol}</span>
              <span className="text-muted-foreground ml-2 text-xs">{entry.label}</span>
            </span>
            {currency === entry.code ? <Check className="size-3.5" aria-hidden /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
