/**
 * @file protected-image.tsx — Image with save-as deterrents and brand watermark
 * @shared
 * @dependencies @mui/material
 *
 * Deters casual right-click save and drag-off. Cannot block OS screenshots.
 */
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface ProtectedImageProps {
  src: string;
  alt: string;
  /** Stretch to fill the parent (thumbnails). Default true. */
  fill?: boolean;
  /** Repeat a light "Rhoda Cordova MUA" overlay. Default true. */
  watermark?: boolean;
  sx?: SxProps<Theme>;
}

const WATERMARK_COPIES = 18;

/** Renders an image that cannot be easily saved via right-click or drag. */
function ProtectedImage({
  src,
  alt,
  fill = true,
  watermark = true,
  sx,
}: ProtectedImageProps): React.JSX.Element {
  return (
    <Box
      onContextMenu={(event: React.MouseEvent): void => {
        event.preventDefault();
      }}
      sx={{
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        width: "100%",
        height: fill ? "100%" : "auto",
        lineHeight: 0,
        "@media print": { visibility: "hidden" },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        draggable={false}
        sx={{
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
          ...sx,
        }}
      />
      {watermark && (
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: "-45%",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            gap: { xs: 3, md: 5 },
            transform: "rotate(-28deg)",
            pointerEvents: "none",
            opacity: 0.28,
          }}
        >
          {Array.from({ length: WATERMARK_COPIES }, (_, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                fontFamily: "Playfair Display, serif",
                fontSize: { xs: "0.7rem", md: "0.85rem" },
                letterSpacing: "0.12em",
                whiteSpace: "nowrap",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(26, 26, 46, 0.45)",
              }}
            >
              Rhoda Cordova MUA
            </Box>
          ))}
        </Box>
      )}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
        }}
      />
    </Box>
  );
}

export default ProtectedImage;
