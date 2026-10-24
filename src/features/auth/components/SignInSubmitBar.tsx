import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import { useAppTheme } from '@/constants/theme';

type SignInSubmitBarProps = {
  onPress: () => void;
  disabled: boolean;
  isLoading: boolean;
  /** Espaço extra na base (inset da safe area). */
  bottomInset: number;
};

/**
 * Barra "FAZER LOGIN" colada na base da tela. Desabilitada, o texto fica
 * apagado; carregando, mostra um spinner no lugar do texto.
 */
export function SignInSubmitBar({
  onPress,
  disabled,
  isLoading,
  bottomInset,
}: SignInSubmitBarProps) {
  const theme = useAppTheme();
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Fazer login"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.bar,
        {
          minHeight: BAR_HEIGHT + bottomInset,
          paddingBottom: bottomInset,
          backgroundColor: pressed
            ? theme.colors.primaryPressed
            : theme.colors.primary,
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.onPrimary} />
      ) : (
        <AppText
          variant="button"
          color={disabled ? 'onPrimaryDisabled' : 'onPrimary'}
        >
          FAZER LOGIN
        </AppText>
      )}
    </Pressable>
  );
}

const BAR_HEIGHT = 60;

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
