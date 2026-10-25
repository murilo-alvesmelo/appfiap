import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppText } from './AppText';
import { ExpandChevron } from './ExpandChevron';
import { Box } from './primitives';

export type DropdownItem<T extends string | number> = {
  value: T;
  label: string;
};

export type DropdownProps<T extends string | number> = {
  items: DropdownItem<T>[];
  selectedItem: T;
  onSelect: (value: T) => void;
  accessibilityLabel?: string;
};

/**
 * @description - Dropdown do app: mostra o item selecionado e, aberto, lista os itens
 * num card flutuante sobre o conteúdo. Ao escolher um item, chama `onSelect` e fecha.
 */
export function Dropdown<T extends string | number>({
  items,
  selectedItem,
  onSelect,
  accessibilityLabel = 'Selecionado',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel =
    items.find(item => item.value === selectedItem)?.label ?? '';

  function handleSelect(value: T) {
    setIsOpen(false);
    onSelect(value);
  }

  return (
    <Box style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${accessibilityLabel}: ${selectedLabel}`}
        accessibilityHint="Abre a lista de opções"
        accessibilityState={{ expanded: isOpen }}
        onPress={() => setIsOpen(open => !open)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="surface"
          borderRadius="md"
          paddingHorizontal="md"
          style={styles.trigger}
        >
          <AppText>{selectedLabel}</AppText>
          <ExpandChevron isExpanded={isOpen} />
        </Box>
      </Pressable>

      {isOpen && (
        <Box
          position="absolute"
          left={0}
          right={0}
          marginTop="sm"
          paddingVertical="sm"
          backgroundColor="surface"
          borderRadius="md"
          style={styles.menu}
        >
          {items.map(item => (
            <Pressable
              key={item.value}
              accessibilityRole="button"
              accessibilityState={{ selected: item.value === selectedItem }}
              onPress={() => handleSelect(item.value)}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Box
                paddingHorizontal="md"
                justifyContent="center"
                style={styles.option}
              >
                <AppText>{item.label}</AppText>
              </Box>
            </Pressable>
          ))}
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  trigger: {
    minHeight: 46,
  },
  menu: {
    top: '100%',
    elevation: 4,
  },
  option: {
    minHeight: 36,
  },
  pressed: {
    opacity: 0.6,
  },
});
