import { StyleSheet, TextInput, type TextInputProps } from "react-native";

import { useAppTheme } from "@/constants/theme";

import { AppText } from "./AppText";
import { Box } from "./primitives";

export type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

/**
 * Campo de texto com label e mensagem de erro.
 * @param error - Quando definido, destaca a borda e exibe a mensagem abaixo do campo.
 */
export function Input({ label, error, style, ...rest }: InputProps) {
  const theme = useAppTheme();
  const hasError = error !== undefined;

  return (
    <Box gap="xs">
      <AppText variant="label">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={theme.colors.textMuted}
        style={[
          styles.input,
          {
            ...theme.textVariants.body,
            paddingHorizontal: theme.spacing.md,
            borderRadius: theme.borderRadii.md,
            borderColor: hasError ? theme.colors.danger : theme.colors.border,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
          },
          style,
        ]}
        {...rest}
      />
      {hasError && (
        <AppText variant="caption" color="danger">
          {error}
        </AppText>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderWidth: 1,
  },
});
