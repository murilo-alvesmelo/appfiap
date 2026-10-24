import { ActivityIndicator, Pressable, StyleSheet, type PressableProps } from "react-native";

import { useAppTheme } from "@/constants/theme";

import { AppText } from "./AppText";

export type ButtonProps = Omit<PressableProps, "children"> & {
  title: string;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
};

/**
 * Botão de ação do app.
 * @param variant - `primary` (fundo de destaque) ou `secondary` (neutro com borda).
 * @param isLoading - Mostra um spinner e desabilita o botão.
 */
export function Button({
  title,
  variant = "primary",
  isLoading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const theme = useAppTheme();
  const isPrimary = variant === "primary";
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      disabled={isDisabled}
      style={(state) => [
        styles.base,
        {
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.borderRadii.md,
        },
        isPrimary
          ? { backgroundColor: theme.colors.primary }
          : {
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderColor: theme.colors.border,
            },
        state.pressed && isPrimary && { backgroundColor: theme.colors.primaryPressed },
        isDisabled && styles.disabled,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={isPrimary ? theme.colors.onPrimary : theme.colors.primary}
        />
      ) : (
        <AppText variant="label" color={isPrimary ? "onPrimary" : "primary"}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});
