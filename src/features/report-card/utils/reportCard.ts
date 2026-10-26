import type { ReportCard } from '@/data/school.types';

/**
 * @description Define o ano inicial do boletim: o ano preferido, se existir; senão o mais recente.
 * @param reportCards - Boletins do aluno.
 * @param preferredYear - Ano preferido. Padrão: o ano corrente (data do dispositivo).
 * @returns O ano inicial, ou `undefined` se não houver boletim.
 */
export function getInitialYear(
  reportCards: ReportCard[],
  preferredYear: number = new Date().getFullYear(),
): number | undefined {
  if (reportCards.some(card => card.year === preferredYear)) {
    return preferredYear;
  }
  return reportCards.reduce<number | undefined>(
    (latest, card) =>
      latest === undefined || card.year > latest ? card.year : latest,
    undefined,
  );
}

/**
 * @description Formata a nota com uma casa decimal e vírgula. Sem nota, retorna "–" (nunca `0`).
 * @param grade - Nota da disciplina, ou `null` se não avaliada.
 * @returns Ex.: `"9,5"`, `"8,0"` ou `"–"`.
 */
export function formatGrade(grade: number | null): string {
  return grade === null ? '–' : grade.toFixed(1).replace('.', ',');
}

/**
 * @description Formata a quantidade de faltas. Sem valor, retorna "–".
 * @param absences - Faltas na disciplina, ou `null` se não avaliada.
 * @returns Ex.: `"0"`, `"2"` ou `"–"`.
 */
export function formatAbsences(absences: number | null): string {
  return absences === null ? '–' : String(absences);
}

/**
 * @description Formata o rótulo do boletim no seletor de ano, com a turma daquele ano.
 * @param reportCard - Boletim (turma e ano).
 * @returns Ex.: `"7EF - 2025"`.
 */
export function formatReportCardLabel(
  reportCard: Pick<ReportCard, 'className' | 'year'>,
): string {
  return `${reportCard.className} - ${reportCard.year}`;
}

/**
 * @description formata o título do trimestre, usado no acordeão de disciplinas.
 * @param termNumber - Número do trimestre.
 * @returns Ex.: `"1º TRIMESTRE"`.
 */
export function formatTermTitle(termNumber: number): string {
  return `${termNumber}º TRIMESTRE`;
}
