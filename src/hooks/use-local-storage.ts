"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Persisted state that hydrates safely.
 *
 * The first render always returns `initialValue` so server and client markup
 * match; the stored value is adopted in an effect immediately afterwards.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored) as T);
    } catch {
      // Private browsing or corrupted payload — fall back to the initial value.
    } finally {
      setHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked; state still works for this session.
    }
  }, [key, value, hydrated]);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return { value, setValue, hydrated, reset } as const;
}
