import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { AppText, Box } from '@/components/ui';
import { useAppTheme } from '@/constants/theme';

type CredentialFieldProps = TextInputProps & {
  label: string;
};

/**
 * Campo do login no layout do Figma: label centralizado, valor grande
 * centralizado e só uma linha inferior.
 * @param label - Texto exibido acima do campo (ex.: `CPF`).
 */
export function CredentialField({ label, style, ...rest }: CredentialFieldProps) {
  const theme = useAppTheme();

  return (
    <Box alignItems="center">
      <AppText variant="bodyLarge">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={theme.colors.textMuted}
        selectionColor={theme.colors.primary}
        style={[
          styles.input,
          {
            ...theme.textVariants.display,
            color: theme.colors.text,
            marginTop: theme.spacing.lg,
          },
          style,
        ]}
        {...rest}
      />
      <Box
        alignSelf="stretch"
        marginTop="sm"
        backgroundColor="border"
        style={styles.line}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    textAlign: 'center',
    padding: 0,
  },
  line: {
    height: 1,
  },
});
