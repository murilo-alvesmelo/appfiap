import { Image, StyleSheet, type ImageSourcePropType } from 'react-native';

const logo: ImageSourcePropType = require('@/assets/images/logo.png');

export type LogoProps = {
  size?: 'large' | 'small';
};

/**
 * Logo FIAP School.
 * @param size - `large` (tela de login) ou `small` (cabeçalho). Padrão: `large`.
 */
export function Logo({ size = 'large' }: LogoProps) {
  return (
    <Image
      source={logo}
      resizeMode="contain"
      accessibilityRole="image"
      accessibilityLabel="FIAP School"
      style={styles[size]}
    />
  );
}

const styles = StyleSheet.create({
  large: { width: 306, height: 49 },
  small: { width: 100, height: 16 },
});
