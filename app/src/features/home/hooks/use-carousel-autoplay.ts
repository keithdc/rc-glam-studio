/**
 * @file use-carousel-autoplay.ts — Advance a snap carousel on an interval
 * @feature home
 */
import { useEffect } from "react";

const AUTOPLAY_MS = 5000;

interface UseCarouselAutoplayOptions {
  enabled: boolean;
  paused: boolean;
  count: number;
  activeIndex: number;
  scrollToIndex: (index: number) => void;
}

/** Loops to the next slide every 5 seconds while enabled. */
function useCarouselAutoplay({
  enabled,
  paused,
  count,
  activeIndex,
  scrollToIndex,
}: UseCarouselAutoplayOptions): void {
  useEffect(() => {
    if (!enabled || paused || count < 2) {
      return;
    }
    const id = window.setInterval(() => {
      scrollToIndex((activeIndex + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      window.clearInterval(id);
    };
  }, [enabled, paused, count, activeIndex, scrollToIndex]);
}

export { useCarouselAutoplay };
