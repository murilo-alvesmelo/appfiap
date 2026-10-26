import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DropdownItem } from '@/components/ui';
import type { ReportCard } from '@/data/school.types';
import { logger } from '@/lib/logger';

import { reportCardRepository } from '../api/report-card.repository';
import { formatReportCardLabel, getInitialYear } from '../utils/reportCard';

/**
 * @description Carrega os boletins do aluno e controla o ano selecionado. Ao trocar de aluno,
 * recarrega e volta ao ano inicial (o ano corrente, se existir; senão o mais recente).
 * @param rm - RM do aluno selecionado (`undefined` quando não há aluno).
 * @returns `reportCards`, `yearOptions` (itens do dropdown, ex.: "7EF - 2025"), `selectedReportCard`,
 * `selectYear`, `isLoading`, `error` e `reload`.
 */
export function useReportCard(rm: number | undefined) {
  const [reportCards, setReportCards] = useState<ReportCard[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(rm !== undefined);
  const requestIdRef = useRef(0);

  const reload = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    if (rm === undefined) {
      setReportCards([]);
      setSelectedYear(undefined);
      setError(undefined);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(undefined);
    try {
      const cards = await reportCardRepository.getReportCardsByRm(rm);
      if (requestId !== requestIdRef.current) return;
      setReportCards(cards);
      setSelectedYear(getInitialYear(cards));
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      logger.error(err, { rm });
      setError(
        err instanceof Error
          ? err
          : new Error('Não foi possível carregar o boletim'),
      );
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, [rm]);

  useEffect(() => {
    reload();
  }, [reload]);

  const yearOptions = useMemo<DropdownItem<number>[]>(
    () =>
      reportCards.map(card => ({
        value: card.year,
        label: formatReportCardLabel(card),
      })),
    [reportCards],
  );
  const selectedReportCard = reportCards.find(
    card => card.year === selectedYear,
  );

  return {
    reportCards,
    yearOptions,
    selectedReportCard,
    selectYear: setSelectedYear,
    isLoading,
    error,
    reload,
  };
}
