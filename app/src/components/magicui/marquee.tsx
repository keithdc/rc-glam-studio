/**
 * @file marquee.tsx — MagicUI Marquee component
 * @shared
 * @dependencies tailwind-merge, clsx
 */
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  className?: string;
  children?: React.ReactNode;
}

/** An infinite scrolling component for displaying content in a loop. */
function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps): React.JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={`marquee-${String(i)}`}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "flex-col" : "flex-row",
            vertical ? "animate-marquee-vertical" : "animate-marquee",
            reverse && "direction-reverse [animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export { Marquee };
