/**
 * @file App.tsx — Root application component with providers
 * @shared
 * @dependencies @mui/material, theme, color-mode context
 */
import { useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "./theme";
import { ColorModeProvider, useColorMode } from "./shared/hooks/use-color-mode";
import HomePage from "./features/home/pages/home-page";

/** Inner component that consumes color mode and applies the correct theme. */
function AppContent(): React.JSX.Element {
  const { mode } = useColorMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}

/** Root component that wraps the app with color mode context. */
function App(): React.JSX.Element {
  return (
    <ColorModeProvider>
      <AppContent />
    </ColorModeProvider>
  );
}

export default App;
