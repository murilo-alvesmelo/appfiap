import type { ReportCard } from '@/data/school.types';

import {
  formatAbsences,
  formatGrade,
  formatReportCardLabel,
  formatTermTitle,
  getInitialYear,
} from '../reportCard';

const card = (year: number): ReportCard => ({
  year,
  className: '7EF',
  terms: [],
});

describe('getInitialYear', () => {
  it('abre no ano preferido quando existe', () => {
    expect(getInitialYear([card(2024), card(2025)], 2024)).toBe(2024);
  });

  it('abre no ano mais recente quando o preferido não existe', () => {
    expect(getInitialYear([card(2022), card(2024), card(2023)], 2030)).toBe(
      2024,
    );
  });

  it('usa o ano corrente como preferido por padrão', () => {
    const currentYear = new Date().getFullYear();
    expect(
      getInitialYear([card(currentYear - 1), card(currentYear), card(currentYear + 1)]),
    ).toBe(currentYear);
  });

  it('retorna undefined sem boletins', () => {
    expect(getInitialYear([])).toBeUndefined();
  });
});

describe('formatGrade', () => {
  it('usa uma casa decimal e vírgula', () => {
    expect(formatGrade(9.5)).toBe('9,5');
    expect(formatGrade(8)).toBe('8,0');
    expect(formatGrade(0)).toBe('0,0');
  });

  it('mostra "–" para nota nula', () => {
    expect(formatGrade(null)).toBe('–');
  });
});

describe('formatAbsences', () => {
  it('formata faltas e trata nulo', () => {
    expect(formatAbsences(0)).toBe('0');
    expect(formatAbsences(3)).toBe('3');
    expect(formatAbsences(null)).toBe('–');
  });
});

describe('rótulos', () => {
  it('formata turma e ano', () => {
    expect(formatReportCardLabel({ className: '6EF', year: 2024 })).toBe(
      '6EF - 2024',
    );
  });

  it('formata o título do trimestre', () => {
    expect(formatTermTitle(1)).toBe('1º TRIMESTRE');
  });
});
