import { formatCpf, isCpfComplete, onlyDigits } from '../cpf';

describe('formatCpf', () => {
  it.each([
    ['', ''],
    ['969', '969'],
    ['9692', '969.2'],
    ['969294', '969.294'],
    ['9692945', '969.294.5'],
    ['969294560', '969.294.560'],
    ['9692945600', '969.294.560-0'],
    ['96929456004', '969.294.560-04'],
  ])('mascara %p como %p', (input, expected) => {
    expect(formatCpf(input)).toBe(expected);
  });

  it('ignora caracteres que não são dígitos', () => {
    expect(formatCpf('969.294.560-04')).toBe('969.294.560-04');
    expect(formatCpf('96a9 29-4')).toBe('969.294');
  });

  it('descarta dígitos além de 11', () => {
    expect(formatCpf('9692945600412')).toBe('969.294.560-04');
  });
});

describe('isCpfComplete', () => {
  it('exige 11 dígitos', () => {
    expect(isCpfComplete('969.294.560-04')).toBe(true);
    expect(isCpfComplete('969.294.560-0')).toBe(false);
  });
});

describe('onlyDigits', () => {
  it('remove a máscara', () => {
    expect(onlyDigits('969.294.560-04')).toBe('96929456004');
  });
});
