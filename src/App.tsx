import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type Theme,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { darkTheme, lightTheme } from '@/constants/theme';
import { restoreGuardian } from '@/features/auth';
import { RootNavigator } from '@/navigation';
import { SelectedStudentProvider } from '@/providers/selected-student';
import { SessionProvider } from '@/providers/session';
import { AppThemeProvider, useIsDarkTheme } from '@/providers/theme';

/**
 * @description - Raiz do app: providers globais + navegação.
 */
export function App() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <SessionProvider resolveGuardian={restoreGuardian}>
          <SelectedStudentProvider>
            <NavigationContainer theme={useNavigationTheme()}>
              <RootNavigator />
            </NavigationContainer>
          </SelectedStudentProvider>
        </SessionProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

/** Tema do React Navigation derivado das cores do Restyle (evita fundo branco no dark). */
function useNavigationTheme(): Theme {
  const isDark = useIsDarkTheme();
  const base = isDark ? DarkTheme : DefaultTheme;
  const { colors } = isDark ? darkTheme : lightTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.border,
      notification: colors.danger,
    },
  };
}
