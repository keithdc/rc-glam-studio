/**
 * @file box-reveal.tsx — MagicUI Box Reveal animation component
 * @shared
 * @dependencies framer-motion
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

interface BoxRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

/** Reveals content with a colored box sliding over it. */
function BoxReveal({
  children,
  width = "fit-content",
  boxColor = "#B76E79",
  duration = 0.5,
  delay = 0,
  className,
}: BoxRevealProps): React.JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", width, overflow: "hidden" }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration, ease: "easeIn", delay }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor,
        }}
      />
    </div>
  );
}

export { BoxReveal };
