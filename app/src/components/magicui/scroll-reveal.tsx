/**
 * @file scroll-reveal.tsx — Bi-directional scroll-aware reveal animation
 * @shared
 * @dependencies framer-motion
 *
 * Unlike BlurFade (one-shot), this component animates IN when scrolling
 * into view and animates OUT (reverses) when scrolling out of view.
 * This creates the polished forward/backward feel seen in modern portfolio sites.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the element slides from on reveal */
  direction?: Direction;
  /** Animation duration in seconds */
  duration?: number;
  /** Stagger delay for sequenced items */
  delay?: number;
  /** Pixel offset for the slide */
  offset?: number;
  /** Blur amount on hidden state */
  blur?: string;
  /** Scale on hidden state (1 = no scale, 0.9 = slight shrink) */
  scale?: number;
  /** How much of the element must be visible to trigger (-margin shrinks trigger area) */
  viewMargin?: string;
}

/** Bi-directional scroll reveal — animates in/out as you scroll up and down. */
function ScrollReveal({
  children,
  className,
  direction = "up",
  duration = 0.6,
  delay = 0,
  offset = 50,
  blur = "8px",
  scale = 1,
  viewMargin = "-100px",
}: ScrollRevealProps): React.JSX.Element {
  const ref = useRef(null);
  // once: false — re-triggers when scrolling back
  const isInView = useInView(ref, {
    once: false,
    margin: viewMargin as `${number}px`,
  });

  const directionOffsets: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: offset },
    down: { x: 0, y: -offset },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionOffsets[direction];

  const variants = {
    hidden: {
      opacity: 0,
      x,
      y,
      filter: `blur(${blur})`,
      scale,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { ScrollReveal };
