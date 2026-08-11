"use client";

import { createContext, useCallback, useContext, useMemo } from "react";

import { useLocalStorage } from "@/hooks";
import { DEFAULT_CURRENCY } from "@/constants/site";
import { formatPrice } from "@/lib/utils";
import type { CurrencyCode, LocaleCode } from "@/types";

interface PreferencesValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  locale: LocaleCode;
  setLocale: (code: LocaleCode) => void;
  /** Formats a base (GHS) price in the guest's chosen currency. */
  price: (baseAmount: number) => string;
  hydrated: boolean;
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

interface StoredPreferences {
  currency: CurrencyCode;
  locale: LocaleCode;
}

/**
 * Guest display preferences (currency + language).
 *
 * Kept separate from the cart so that changing currency never touches order
 * state — prices are always stored in the base currency and converted on read.
 */
export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const { value, setValue, hydrated } = useLocalStorage<StoredPreferences>("dzifoods:preferences", {
    currency: DEFAULT_CURRENCY,
    locale: "en",
  });

  const setCurrency = useCallback(
    (currency: CurrencyCode) => setValue((previous) => ({ ...previous, currency })),
    [setValue],
  );

  const setLocale = useCallback(
    (locale: LocaleCode) => setValue((previous) => ({ ...previous, locale })),
    [setValue],
  );

  const contextValue = useMemo<PreferencesValue>(
    () => ({
      currency: value.currency,
      setCurrency,
      locale: value.locale,
      setLocale,
      price: (baseAmount: number) => formatPrice(baseAmount, value.currency),
      hydrated,
    }),
    [value.currency, value.locale, setCurrency, setLocale, hydrated],
  );

  return <PreferencesContext.Provider value={contextValue}>{children}</PreferencesContext.Provider>;
}

export function usePreferences(): PreferencesValue {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("usePreferences must be used inside <PreferencesProvider>");
  return context;
}
