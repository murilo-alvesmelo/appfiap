import { useColorScheme } from 'react-native';

type ColorSchemePreference = 'dark' | 'light' | 'system';

const COLOR_SCHEME_PREFERENCE: ColorSchemePreference = 'dark';

/**
 * @description - Diz se o tema escuro está ativo, conforme `COLOR_SCHEME_PREFERENCE`.
 * Fonte única para o tema do Restyle e do React Navigation.
 * @returns `true` quando o tema escuro deve ser usado.
 */
export function useIsDarkTheme(): boolean {
  const systemScheme = useColorScheme();
  if (COLOR_SCHEME_PREFERENCE === 'system') return systemScheme === 'dark';
  return COLOR_SCHEME_PREFERENCE === 'dark';
}
