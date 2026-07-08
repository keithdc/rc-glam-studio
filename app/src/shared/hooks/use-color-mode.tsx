/**
 * @file use-color-mode.tsx — Theme color mode context and hook
 * @shared
 * @dependencies react
 */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import type { ReactNode } from "react";

type ColorMode = "light" | "dark";

interface ColorModeContextValue {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue>({
  mode: "dark",
  toggleColorMode: () => {},
});

interface ColorModeProviderProps {
  children: ReactNode;
}

/** Provides light/dark mode state and toggle function to the app. */
function ColorModeProvider({
  children,
}: ColorModeProviderProps): React.JSX.Element {
  const [mode, setMode] = useState<ColorMode>(() => {
    const stored = localStorage.getItem("rc-glam-color-mode");
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
  });

  const toggleColorMode = useCallback((): void => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("rc-glam-color-mode", next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode, toggleColorMode],
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

/** Returns the current color mode and a function to toggle it. */
function useColorMode(): ColorModeContextValue {
  return useContext(ColorModeContext);
}

export { ColorModeProvider, useColorMode };
