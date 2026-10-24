import { createTheme, useTheme } from "@shopify/restyle";

/**
 * Design tokens. Every color, spacing, radius and font size used in the app
 * must come from here — never hardcode values in components.
 * Components read these through Restyle props (`Box`, `Text`) or `useAppTheme()`.
 * O tema ativo é escolhido em `src/providers/theme`.
 */

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

const borderRadii = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
} as const;

/** Breakpoints de largura de tela. O primeiro precisa começar em 0. */
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

const textVariants = {
  defaults: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: "text",
    includeFontPadding: false,
  },
  title: { fontSize: 28, lineHeight: 34, fontWeight: "700" },
  subtitle: { fontSize: 20, lineHeight: 26, fontWeight: "600" },
  body: { fontSize: 16, lineHeight: 22, fontWeight: "400" },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: "400" },
  label: { fontSize: 14, lineHeight: 20, fontWeight: "600" },
} as const;

/** Tema claro. Define o shape que todos os temas devem seguir. */
export const lightTheme = createTheme({
  colors: {
    primary: "#2563EB",
    primaryPressed: "#1D4ED8",
    onPrimary: "#FFFFFF",
    background: "#FFFFFF",
    surface: "#F4F4F5",
    border: "#E4E4E7",
    text: "#18181B",
    textMuted: "#71717A",
    danger: "#DC2626",
    success: "#16A34A",
  },
  spacing,
  borderRadii,
  breakpoints,
  textVariants,
});

export type AppTheme = typeof lightTheme;

/** Tema escuro. Mesmo shape do `lightTheme`; só as cores mudam. */
export const darkTheme: AppTheme = {
  ...lightTheme,
  colors: {
    primary: "#3B82F6",
    primaryPressed: "#2563EB",
    onPrimary: "#FFFFFF",
    background: "#09090B",
    surface: "#18181B",
    border: "#27272A",
    text: "#FAFAFA",
    textMuted: "#A1A1AA",
    danger: "#F87171",
    success: "#4ADE80",
  },
};

export type ColorToken = keyof AppTheme["colors"];
export type TypographyVariant = Exclude<keyof AppTheme["textVariants"], "defaults">;

/** Tema ativo tipado. Use quando um valor do tema não puder ir via props do Restyle. */
export const useAppTheme = () => useTheme<AppTheme>();
