/**
 * @file use-snap-carousel.ts — Track and control a CSS scroll-snap scroller
 * @feature home
 */
import { useCallback, useRef, useState } from "react";

interface UseSnapCarouselResult {
  activeIndex: number;
  scrollerRef: React.RefObject<HTMLDivElement>;
  setSlideRef: (index: number) => (node: HTMLDivElement | null) => void;
  scrollToIndex: (index: number) => void;
  handleScroll: () => void;
}

/** Keeps the nearest snapped slide in sync and scrolls to a chosen index. */
function useSnapCarousel(): UseSnapCarouselResult {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const setSlideRef = useCallback(
    (index: number) =>
      (node: HTMLDivElement | null): void => {
        slideRefs.current[index] = node;
      },
    [],
  );

  const scrollToIndex = useCallback((index: number): void => {
    const scroller = scrollerRef.current;
    const slide = slideRefs.current[index];
    if (scroller == null || slide == null) {
      return;
    }
    const left = slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const handleScroll = useCallback((): void => {
    const scroller = scrollerRef.current;
    if (scroller == null) {
      return;
    }
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearest = 0;
    let nearestDist = Number.POSITIVE_INFINITY;
    slideRefs.current.forEach((slide, index) => {
      if (slide == null) {
        return;
      }
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const dist = Math.abs(center - slideCenter);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = index;
      }
    });
    setActiveIndex(nearest);
  }, []);

  return {
    activeIndex,
    scrollerRef,
    setSlideRef,
    scrollToIndex,
    handleScroll,
  };
}

export { useSnapCarousel };
