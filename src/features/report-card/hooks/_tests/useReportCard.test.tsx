import ReactTestRenderer from 'react-test-renderer';

import { logger } from '@/lib/logger';

import { useReportCard } from '../useReportCard';

async function renderReportCard(rm: number | undefined) {
  const current: { reportCard?: ReturnType<typeof useReportCard> } = {};
  function Probe({ studentRm }: { studentRm: number | undefined }) {
    current.reportCard = useReportCard(studentRm);
    return null;
  }
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<Probe studentRm={rm} />);
  });
  async function rerender(nextRm: number | undefined) {
    await ReactTestRenderer.act(async () => {
      renderer?.update(<Probe studentRm={nextRm} />);
    });
  }
  return { current, rerender };
}

describe('useReportCard', () => {
  it('abre em 2025 com a turma do boletim', async () => {
    const { current } = await renderReportCard(12567);
    expect(current.reportCard?.isLoading).toBe(false);
    expect(current.reportCard?.selectedReportCard?.year).toBe(2025);
    expect(current.reportCard?.selectedReportCard?.className).toBe('7EF');
    expect(current.reportCard?.yearOptions).toEqual([
      { value: 2025, label: '7EF - 2025' },
      { value: 2024, label: '6EF - 2024' },
    ]);
  });

  it('troca para 2024 com os 3 trimestres avaliados', async () => {
    const { current } = await renderReportCard(12567);
    await ReactTestRenderer.act(async () => {
      current.reportCard?.selectYear(2024);
    });
    expect(current.reportCard?.selectedReportCard?.className).toBe('6EF');
    expect(
      current.reportCard?.selectedReportCard?.terms.every(
        term => term.isEvaluated,
      ),
    ).toBe(true);
  });

  it('tem um só ano para quem só tem 2025', async () => {
    const { current } = await renderReportCard(12568);
    expect(current.reportCard?.yearOptions).toEqual([
      { value: 2025, label: '2EM - 2025' },
    ]);
  });

  it('recarrega e volta para 2025 ao trocar de aluno', async () => {
    const { current, rerender } = await renderReportCard(12567);
    await ReactTestRenderer.act(async () => {
      current.reportCard?.selectYear(2024);
    });
    await rerender(13752);
    expect(current.reportCard?.selectedReportCard?.year).toBe(2025);
    expect(current.reportCard?.selectedReportCard?.className).toBe('1EF');
  });

  it('expõe o erro quando o aluno não existe', async () => {
    const spy = jest.spyOn(logger, 'error').mockImplementation(() => {});
    const { current } = await renderReportCard(1);
    expect(current.reportCard?.error?.message).toBe('Aluno não encontrado');
    expect(current.reportCard?.selectedReportCard).toBeUndefined();
    spy.mockRestore();
  });

  it('fica vazio sem aluno selecionado', async () => {
    const { current } = await renderReportCard(undefined);
    expect(current.reportCard?.isLoading).toBe(false);
    expect(current.reportCard?.reportCards).toEqual([]);
  });
});
