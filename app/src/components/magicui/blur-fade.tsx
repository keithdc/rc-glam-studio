/**
 * @file blur-fade.tsx — MagicUI Blur Fade animation component
 * @shared
 * @dependencies framer-motion
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

/** Animates children with a blur + fade + slide effect on scroll into view. */
function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps): React.JSX.Element {
  const ref = useRef(null);
  const inViewResult = useInView(ref, {
    once: true,
    margin: inViewMargin as `${number}px`,
  });
  const isInView = !inView || inViewResult;

  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: "blur(0px)" },
  };

  const combinedVariants = variant ?? defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { BlurFade };
