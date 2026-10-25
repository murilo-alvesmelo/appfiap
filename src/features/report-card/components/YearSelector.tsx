import { AppText, Box, Dropdown, type DropdownItem } from '@/components/ui';

type YearSelectorProps = {
  options: DropdownItem<number>[];
  selectedYear: number;
  onSelect: (year: number) => void;
};

/**
 * @description - Seletor de ano do boletim: se houver mais de um ano, mostra um dropdown; se houver apenas um, mostra o ano em um card.
 * @param options - Anos disponíveis, do mais recente para o mais antigo.
 * @param selectedYear - Ano exibido.
 * @param onSelect - Chamado com o ano escolhido.
 */
export function YearSelector({
  options,
  selectedYear,
  onSelect,
}: YearSelectorProps) {
  if (options.length > 1) {
    return (
      <Dropdown
        items={options}
        selectedItem={selectedYear}
        onSelect={onSelect}
        accessibilityLabel="Ano do boletim"
      />
    );
  }

  const label = options.find(option => option.value === selectedYear)?.label;
  return (
    <Box
      justifyContent="center"
      backgroundColor="surface"
      borderRadius="md"
      paddingHorizontal="md"
    >
      <AppText accessibilityLabel={`Ano do boletim: ${label}`}>{label}</AppText>
    </Box>
  );
}
