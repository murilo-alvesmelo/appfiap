import { StyleSheet } from 'react-native';

import { AppText } from './AppText';

export type SectionTitleProps = {
  title: string;
};

/**
 * @description - Título de seção do app, usado em telas como Agenda e Boletim.
 * @param title - Texto exibido (já em maiúsculas).
 */
export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <AppText
      variant="bodyLargeBold"
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
