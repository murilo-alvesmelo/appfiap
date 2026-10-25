import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DropdownItem } from '@/components/ui';
import type { DaySchedule } from '@/data/school.types';
import { logger } from '@/lib/logger';

import { lessonsRepository } from '../api/lessons.repository';
import { formatDayLabel, getInitialDate, toIsoDate } from '../utils/schedule';

/**
 * @description Carrega a agenda do aluno e controla o dia selecionado. Ao trocar de aluno,
 * recarrega e recalcula o dia inicial (hoje, se existir na agenda; senão o primeiro dia com aulas).
 * @param rm - RM do aluno selecionado (`undefined` quando não há aluno).
 * @param today - Data de hoje em `YYYY-MM-DD`. Padrão: data local atual.
 * @returns `days`, `dayOptions` (itens do dropdown com o rótulo do dia), `selectedDay`, `selectDay`, `isLoading`, `error` e `reload`.
 */
export function useLessons(
  rm: number | undefined,
  today: string = toIsoDate(new Date()),
) {
  const [days, setDays] = useState<DaySchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(rm !== undefined);
  const requestIdRef = useRef(0);

  const reload = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    if (rm === undefined) {
      setDays([]);
      setSelectedDate(undefined);
      setError(undefined);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(undefined);
    try {
      const schedule = await lessonsRepository.getScheduleByRm(rm);
      if (requestId !== requestIdRef.current) return;
      setDays(schedule);
      setSelectedDate(getInitialDate(schedule, today));
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      logger.error(err, { rm });
      setError(
        err instanceof Error
          ? err
          : new Error('Não foi possível carregar a agenda'),
      );
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, [rm, today]);

  useEffect(() => {
    reload();
  }, [reload]);

  const dayOptions = useMemo<DropdownItem<string>[]>(
    () =>
      days.map(day => ({ value: day.date, label: formatDayLabel(day.date) })),
    [days],
  );
  const selectedDay = days.find(day => day.date === selectedDate);

  return {
    days,
    dayOptions,
    selectedDay,
    selectDay: setSelectedDate,
    isLoading,
    error,
    reload,
  };
}
