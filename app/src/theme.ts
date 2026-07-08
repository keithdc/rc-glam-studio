/**
 * @file theme.ts — MUI theme configuration for RC Glam Studio (light + dark)
 * @shared
 * @dependencies @mui/material
 *
 * Color palette derived from the logo:
 * - Primary: Rose Gold (#B76E79) — warm, elegant, luxurious
 * - Secondary: Deep Burgundy (#722F37) — sophisticated, rich
 * - Accent: Soft Champagne (#F5E6D3) — light, airy warmth
 * - Dark: Charcoal (#1A1A2E) — modern, sleek contrast
 */
import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

/** Creates a theme instance for the given color mode. */
function getTheme(mode: PaletteMode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#B76E79",
        light: "#D4A0A7",
        dark: "#8B4A52",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#722F37",
        light: "#9B5A62",
        dark: "#4A1E24",
        contrastText: "#FFFFFF",
      },
      background: {
        default: isDark ? "#0D0D0D" : "#FFFAF8",
        paper: isDark ? "#1A1A2E" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#F5F5F5" : "#1A1A2E",
        secondary: isDark ? "#B0B0B0" : "#5A5A6E",
      },
      divider: isDark
        ? "rgba(183, 110, 121, 0.15)"
        : "rgba(183, 110, 121, 0.2)",
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h1: {
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: "'Playfair Display', serif",
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontFamily: "'Playfair Display', serif",
        fontWeight: 600,
      },
      h4: {
        fontFamily: "'Playfair Display', serif",
        fontWeight: 500,
      },
      h5: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
      },
      h6: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
      },
      body1: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        lineHeight: 1.8,
      },
      body2: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
      },
      button: {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        textTransform: "none",
        letterSpacing: "0.05em",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            padding: "12px 32px",
            fontSize: "0.95rem",
          },
          contained: {
            boxShadow: "0 4px 20px rgba(183, 110, 121, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 30px rgba(183, 110, 121, 0.5)",
            },
          },
          outlined: {
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isDark
              ? "rgba(26, 26, 46, 0.6)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border: isDark
              ? "1px solid rgba(183, 110, 121, 0.15)"
              : "1px solid rgba(183, 110, 121, 0.2)",
          },
        },
      },
    },
  });
}

export default getTheme;
