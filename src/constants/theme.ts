import { createTheme, useTheme } from '@shopify/restyle';

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

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

export const fonts = {
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Regular',
  bold: 'Montserrat-Bold',
} as const;

const textVariants = {
  defaults: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    color: 'text',
    includeFontPadding: false,
  },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  subtitle: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  display: { fontFamily: fonts.regular, fontSize: 32, lineHeight: 39 },
  bodyLarge: { fontFamily: fonts.regular, fontSize: 20, lineHeight: 24 },
  bodyLargeBold: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 24 },
  bodyStrong: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 20 },
  button: { fontFamily: fonts.medium, fontSize: 20, lineHeight: 24 },
} as const;

export const lightTheme = createTheme({
  colors: {
    primary: '#0BA892',
    primaryPressed: '#08897A',
    onPrimary: '#FFFFFF',
    onPrimaryDisabled: '#B3E9E0',
    background: '#FFFFFF',
    surface: '#F2F2F2',
    surfaceRaised: '#E0E0E0',
    border: '#000000',
    text: '#000000',
    textMuted: '#6B6B6B',
    danger: '#0BA892',
    success: '#0BA892',
  },
  spacing,
  borderRadii,
  breakpoints,
  textVariants,
});

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  ...lightTheme,
  colors: {
    primary: '#29F4D5',
    primaryPressed: '#1FC9AF',
    onPrimary: '#000000',
    onPrimaryDisabled: '#777777',
    background: '#000000',
    surface: '#262626',
    surfaceRaised: '#4D4D4D',
    border: '#FFFFFF',
    text: '#FFFFFF',
    textMuted: '#777777',
    danger: '#29F4D5',
    success: '#29F4D5',
  },
};

export type ColorToken = keyof AppTheme['colors'];
export type TypographyVariant = Exclude<
  keyof AppTheme['textVariants'],
  'defaults'
>;

/** Tema ativo tipado. Use quando um valor do tema não puder ir via props do Restyle. */
export const useAppTheme = () => useTheme<AppTheme>();
