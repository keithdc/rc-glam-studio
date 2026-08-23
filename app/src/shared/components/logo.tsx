/**
 * @file logo.tsx — Option D crest mark and Rhoda Cordova MUA lockup
 * @shared
 * @dependencies @mui/material, use-color-mode
 *
 * Crest mark uses a transparent PNG. Full vertical lockup swaps light/dark plates.
 */
import { Box, Typography } from "@mui/material";
import { useColorMode } from "@/shared/hooks/use-color-mode";
import type { SxProps, Theme } from "@mui/material";

type ResponsiveHeight = number | { xs?: number; sm?: number; md?: number };

interface LogoProps {
  /** `mark` = RC crest only; `full` = crest expanded with Rhoda Cordova */
  variant?: "mark" | "full";
  /** Layout when variant is full */
  layout?: "horizontal" | "vertical";
  /** Height of the logo artwork in px */
  height?: ResponsiveHeight;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

interface BrandMarkProps {
  height: ResponsiveHeight;
  src: string;
  sx?: SxProps<Theme>;
}

/** Transparent RC crest artwork. */
function BrandMark({ height, src, sx }: BrandMarkProps): React.JSX.Element {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      aria-hidden="true"
      sx={{
        height,
        width: "auto",
        flexShrink: 0,
        display: "block",
        ...sx,
      }}
    />
  );
}

/** Wordmark used beside the compact crest in horizontal lockups. */
function BrandName(): React.JSX.Element {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      <Typography
        component="span"
        sx={{
          fontFamily: "Playfair Display, serif",
          fontWeight: 500,
          fontSize: { xs: "0.95rem", md: "1.05rem" },
          lineHeight: 1.15,
          color: "text.primary",
          whiteSpace: "nowrap",
        }}
      >
        Rhoda Cordova
      </Typography>
      <Typography
        component="span"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.6rem",
          fontWeight: 500,
          letterSpacing: "0.32em",
          color: "text.secondary",
          mt: 0.25,
        }}
      >
        MUA
      </Typography>
    </Box>
  );
}

/** Renders the D crest mark, or expands it to Rhoda Cordova MUA. */
function Logo({
  variant = "full",
  layout = "horizontal",
  height = 40,
  sx,
  onClick,
}: LogoProps): React.JSX.Element {
  const { mode } = useColorMode();
  const isDark = mode === "dark";
  const isVerticalFull = variant === "full" && layout === "vertical";

  const src = isVerticalFull
    ? isDark
      ? "/logo-d-full-dark.png"
      : "/logo-d-full-light.png"
    : "/logo-d-mark.png";

  return (
    <Box
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event: React.KeyboardEvent): void => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label="Rhoda Cordova MUA"
      sx={{
        display: "inline-flex",
        flexDirection: isVerticalFull ? "column" : "row",
        alignItems: "center",
        gap: isVerticalFull ? 0 : 1.5,
        cursor: onClick ? "pointer" : "default",
        ...sx,
      }}
    >
      <BrandMark height={height} src={src} />
      {variant === "full" && layout === "horizontal" && <BrandName />}
    </Box>
  );
}

export default Logo;
export { BrandMark };
