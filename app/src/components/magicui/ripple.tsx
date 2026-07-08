/**
 * @file ripple.tsx — MagicUI Ripple background animation
 * @shared
 * @dependencies tailwind-merge, clsx
 */
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

/** Creates expanding ripple circles for a dynamic background effect. */
function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}: RippleProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const circleSize = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${String(i * 0.06)}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={`ripple-${String(i)}`}
            className="absolute animate-ripple rounded-full border bg-rose-gold/25"
            style={
              {
                "--i": i,
                width: `${String(circleSize)}px`,
                height: `${String(circleSize)}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `rgba(183, 110, 121, ${String(borderOpacity / 100)})`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export { Ripple };
