import type { DaySchedule } from '@/data/school.types';

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const WEEKDAYS = [
  'domingo',
  'segunda-feira',
  'terça-feira',
  'quarta-feira',
  'quinta-feira',
  'sexta-feira',
  'sábado',
];

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * @description Converte uma data para `YYYY-MM-DD` no fuso local (usado para "hoje").
 * @param date - Data a converter.
 * @returns Data ISO sem horário, ex.: `"2025-03-17"`.
 */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
}

/**
 * @description Define o dia inicial da agenda: hoje, se existir nela; senão o primeiro
 * dia com aulas; senão o primeiro dia.
 * @param schedule - Agenda ordenada por data.
 * @param today - Data de hoje em `YYYY-MM-DD`.
 * @returns A data inicial, ou `undefined` se a agenda estiver vazia.
 */
export function getInitialDate(
  schedule: DaySchedule[],
  today: string,
): string | undefined {
  if (schedule.some(day => day.date === today)) return today;
  return (schedule.find(day => day.lessons.length > 0) ?? schedule[0])?.date;
}

/**
 * @description Formata o rótulo do dia em pt-BR, ex.: `"17 de março, segunda-feira"`.
 * @param isoDate - Data em `YYYY-MM-DD`.
 * @returns Rótulo com dia, mês e dia da semana.
 */
export function formatDayLabel(isoDate: string): string {
  const year = Number(isoDate.slice(0, 4));
  const month = Number(isoDate.slice(5, 7));
  const day = Number(isoDate.slice(8, 10));
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return `${day} de ${MONTHS[month - 1]}, ${WEEKDAYS[weekday]}`;
}
