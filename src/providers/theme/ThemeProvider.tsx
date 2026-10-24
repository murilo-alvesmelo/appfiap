import { ThemeProvider } from "@shopify/restyle";
import type { ReactNode } from "react";
import { StatusBar } from "react-native";

import { darkTheme, lightTheme } from "@/constants/theme";

import { useIsDarkTheme } from "./useIsDarkTheme";

/**
 * @description - Provider do tema Restyle. Escolhe claro/escuro via `useIsDarkTheme`
 * (padrão: escuro) e ajusta a status bar. Montado em `src/App.tsx`.
 */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const isDark = useIsDarkTheme();

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {children}
    </ThemeProvider>
  );
}
