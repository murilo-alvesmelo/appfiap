import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';

type HeaderActionProps = {
  label: string;
  accessibilityLabel: string;
  onPress: () => void;
};

/** Ação em texto do canto do header ("TROCAR PERFIL", "SAIR"). */
export function HeaderAction({
  label,
  accessibilityLabel,
  onPress,
}: HeaderActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <AppText variant="caption">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
});
