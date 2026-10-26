import type { DaySchedule } from '@/data/school.types';

import { formatDayLabel, getInitialDate, toIsoDate } from '../schedule';

const lesson = { time: '07:15 - 08:00', subject: 'Matemática I' };

const schedule: DaySchedule[] = [
  { date: '2025-03-16', lessons: [] },
  { date: '2025-03-17', lessons: [lesson] },
  { date: '2025-03-18', lessons: [lesson] },
  { date: '2025-03-22', lessons: [] },
];

describe('getInitialDate', () => {
  it('usa hoje quando existe na agenda', () => {
    expect(getInitialDate(schedule, '2025-03-18')).toBe('2025-03-18');
  });

  it('usa hoje mesmo quando o dia não tem aulas', () => {
    expect(getInitialDate(schedule, '2025-03-16')).toBe('2025-03-16');
  });

  it('usa o primeiro dia com aulas quando hoje está fora da agenda', () => {
    expect(getInitialDate(schedule, '2026-10-25')).toBe('2025-03-17');
  });

  it('usa o primeiro dia quando nenhum tem aulas', () => {
    const empty = schedule.map(day => ({ ...day, lessons: [] }));
    expect(getInitialDate(empty, '2026-10-25')).toBe('2025-03-16');
  });

  it('retorna undefined para agenda vazia', () => {
    expect(getInitialDate([], '2026-10-25')).toBeUndefined();
  });
});

describe('formatDayLabel', () => {
  it.each([
    ['2025-03-16', '16 de março, domingo'],
    ['2025-03-17', '17 de março, segunda-feira'],
    ['2025-03-22', '22 de março, sábado'],
    ['2025-01-01', '1 de janeiro, quarta-feira'],
  ])('%p → %p', (date, label) => {
    expect(formatDayLabel(date)).toBe(label);
  });
});

describe('toIsoDate', () => {
  it('formata a data local com zeros à esquerda', () => {
    expect(toIsoDate(new Date(2025, 2, 7))).toBe('2025-03-07');
  });
});
