/**
 * @file scroll-parallax.tsx — Scroll-linked parallax effect component
 * @shared
 * @dependencies framer-motion
 *
 * Creates a parallax effect where elements move at different speeds
 * relative to scroll position. Great for layered depth effects.
 */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  /** Parallax speed multiplier. Positive = moves slower, Negative = moves faster */
  speed?: number;
  /** Whether to apply opacity fade based on scroll */
  fade?: boolean;
}

/** Applies a parallax offset to children based on scroll progress through the element. */
function ScrollParallax({
  children,
  className,
  speed = 0.3,
  fade = false,
}: ScrollParallaxProps): React.JSX.Element {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3],
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity: fade ? opacity : 1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { ScrollParallax };
