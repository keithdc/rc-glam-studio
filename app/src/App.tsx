/**
 * @file App.tsx — Root application component with providers and routing
 * @shared
 * @dependencies @mui/material, react-router-dom, theme, color-mode context
 */
import { useMemo, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Box,
} from "@mui/material";
import getTheme from "./theme";
import { ColorModeProvider, useColorMode } from "./shared/hooks/use-color-mode";

const HomePage = lazy(() => import("./features/home/pages/home-page"));
const PortfolioPage = lazy(
  () => import("./features/portfolio/pages/portfolio-page"),
);

/** Loading fallback for lazy routes. */
function PageLoader(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

/** Inner component that consumes color mode and applies the correct theme. */
function AppContent(): React.JSX.Element {
  const { mode } = useColorMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
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
