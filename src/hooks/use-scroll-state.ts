"use client";

import { useEffect, useRef, useState } from "react";

export interface ScrollState {
  /** Pixels scrolled from the top of the document. */
  readonly y: number;
  /** True once the header should switch from transparent to solid. */
  readonly scrolled: boolean;
  /** Hides the header when scrolling down, reveals it when scrolling up. */
  readonly direction: "up" | "down";
  /** 0 – 1 progress through the whole document. */
  readonly progress: number;
}

/**
 * A single rAF-throttled scroll listener shared by the header and the scroll
 * progress bar, so we never attach two competing listeners.
 */
export function useScrollState(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    scrolled: false,
    direction: "up",
    progress: 0,
  });
  const lastY = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const delta = y - lastY.current;

      setState((previous) => {
        const direction: "up" | "down" =
          Math.abs(delta) < 4 ? previous.direction : delta > 0 ? "down" : "up";
        return {
          y,
          scrolled: y > threshold,
          direction,
          progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
        };
      });

      lastY.current = y;
      frame.current = 0;
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [threshold]);

  return state;
}
