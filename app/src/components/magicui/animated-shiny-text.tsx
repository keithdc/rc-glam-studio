/**
 * @file animated-shiny-text.tsx — MagicUI Animated Shiny Text component
 * @shared
 * @dependencies tailwind-merge, clsx
 */
import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

/** Text with an animated shine/shimmer effect sweeping across. */
function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps): React.JSX.Element {
  return (
    <p
      style={
        {
          "--shiny-width": `${String(shimmerWidth)}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-400/70",
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        "bg-gradient-to-r from-transparent via-rose-gold/80 via-50% to-transparent",
        className,
      )}
    >
      {children}
    </p>
  );
}

export { AnimatedShinyText };
