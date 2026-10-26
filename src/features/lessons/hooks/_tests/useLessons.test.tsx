import ReactTestRenderer from 'react-test-renderer';

import { logger } from '@/lib/logger';

import { useLessons } from '../useLessons';

const OUTSIDE_SCHEDULE = '2026-10-25';

async function renderLessons(rm: number | undefined) {
  const current: { lessons?: ReturnType<typeof useLessons> } = {};
  function Probe({ studentRm }: { studentRm: number | undefined }) {
    current.lessons = useLessons(studentRm, OUTSIDE_SCHEDULE);
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

describe('useLessons', () => {
  it('abre no primeiro dia com aulas quando hoje está fora da agenda', async () => {
    const { current } = await renderLessons(12567);
    expect(current.lessons?.isLoading).toBe(false);
    expect(current.lessons?.days).toHaveLength(7);
    expect(current.lessons?.selectedDay?.date).toBe('2025-03-17');
    expect(current.lessons?.dayOptions[1]).toEqual({
      value: '2025-03-17',
      label: '17 de março, segunda-feira',
    });
    expect(current.lessons?.selectedDay?.lessons[0]).toEqual({
      time: '07:15 - 08:00',
      subject: 'Matemática I',
    });
  });

  it('troca o dia selecionado', async () => {
    const { current } = await renderLessons(12567);
    await ReactTestRenderer.act(async () => {
      current.lessons?.selectDay('2025-03-22');
    });
    expect(current.lessons?.selectedDay?.date).toBe('2025-03-22');
    expect(current.lessons?.selectedDay?.lessons).toEqual([]);
  });

  it('recarrega e volta ao dia inicial ao trocar de aluno', async () => {
    const { current, rerender } = await renderLessons(12567);
    await ReactTestRenderer.act(async () => {
      current.lessons?.selectDay('2025-03-20');
    });
    await rerender(13752);
    expect(current.lessons?.selectedDay?.date).toBe('2025-03-17');
    expect(current.lessons?.error).toBeUndefined();
  });

  it('expõe o erro quando o aluno não existe', async () => {
    const spy = jest.spyOn(logger, 'error').mockImplementation(() => {});
    const { current } = await renderLessons(1);
    expect(current.lessons?.error?.message).toBe('Aluno não encontrado');
    expect(current.lessons?.days).toEqual([]);
    spy.mockRestore();
  });

  it('fica vazio sem aluno selecionado', async () => {
    const { current } = await renderLessons(undefined);
    expect(current.lessons?.isLoading).toBe(false);
    expect(current.lessons?.days).toEqual([]);
    expect(current.lessons?.selectedDay).toBeUndefined();
  });
});
