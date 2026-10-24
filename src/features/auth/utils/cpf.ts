const CPF_LENGTH = 11;

/**
 * Remove tudo que não for dígito.
 * @param value - Texto digitado (com ou sem máscara).
 */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Aplica a máscara de CPF `XXX.XXX.XXX-XX` de forma progressiva,
 * conforme os dígitos são digitados. Dígitos além de 11 são descartados.
 * @param value - Texto digitado (com ou sem máscara).
 * @returns CPF mascarado até onde houver dígitos.
 */
export function formatCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, CPF_LENGTH);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
}

/**
 * Indica se o CPF tem os 11 dígitos.
 * @param value - CPF com ou sem máscara.
 */
export function isCpfComplete(value: string): boolean {
  return onlyDigits(value).length === CPF_LENGTH;
}
