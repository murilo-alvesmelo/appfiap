import { StyleSheet } from 'react-native';

import { AppText } from './AppText';

export type SectionTitleProps = {
  title: string;
};

/**
 * Título de seção do Figma ("AGENDA", "BOLETIM"): `primary`, negrito e centralizado.
 * @param title - Texto exibido (já em maiúsculas).
 */
export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <AppText
      variant="bodyLarge"
      color="primary"
      accessibilityRole="header"
      style={styles.title}
    >
      {title}
    </AppText>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
