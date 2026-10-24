import { ThemeProvider } from "@shopify/restyle";
import type { ReactNode } from "react";
import { StatusBar, useColorScheme } from "react-native";

import { darkTheme, lightTheme } from "@/constants/theme";

/**
 * @description - Provider do tema Restyle. Segue o esquema de cores do sistema
 * (claro/escuro) e ajusta a status bar. Montado em `src/App.tsx`.
 */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const isDark = useColorScheme() === "dark";

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {children}
    </ThemeProvider>
  );
}
