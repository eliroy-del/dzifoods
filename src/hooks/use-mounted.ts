"use client";

import { useEffect, useState } from "react";

/**
 * True only after the first client render. Use it to gate anything that would
 * otherwise cause a hydration mismatch (clocks, `localStorage`, theme, portals).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
