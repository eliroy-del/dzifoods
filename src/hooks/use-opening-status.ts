"use client";

import { useEffect, useState } from "react";

import { getOpeningStatus, type OpeningStatus } from "@/lib/hours";

/**
 * Live "open now" state.
 *
 * Computed after mount (and refreshed every minute) so the server never bakes a
 * stale clock into the HTML.
 */
export function useOpeningStatus(): OpeningStatus | null {
  const [status, setStatus] = useState<OpeningStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpeningStatus(new Date()));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return status;
}
