/**
 * @file logo.tsx — Theme-aware logo component
 * @shared
 * @dependencies @mui/material, use-color-mode
 *
 * Uses the dark-bg logo with mix-blend-mode: lighten in dark mode,
 * and the light-bg logo with mix-blend-mode: darken in light mode.
 * This makes the solid background effectively invisible.
 */
import { Box } from "@mui/material";
import { useColorMode } from "@/shared/hooks/use-color-mode";
import type { SxProps, Theme } from "@mui/material";

interface LogoProps {
  height?: number | { xs?: number; sm?: number; md?: number };
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

/** Renders the RC Glam Studio logo, auto-switching between dark/light variants. */
function Logo({ height = 40, sx, onClick }: LogoProps): React.JSX.Element {
  const { mode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Box
      component="img"
      src={"/logo-light.png"}
      alt="RC Glam Studio"
      onClick={onClick}
      sx={{
        height,
        width: "auto",
        cursor: onClick ? "pointer" : "default",
        // mix-blend-mode makes the solid background transparent:
        // "lighten" removes black bg in dark mode
        // "darken" removes white/cream bg in light mode
        mixBlendMode: isDark ? "lighten" : "darken",
        ...sx,
      }}
    />
  );
}

export default Logo;
