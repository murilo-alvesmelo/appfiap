import { reportCardRepository } from './report-card.repository';

describe('reportCardRepository.getReportCardsByRm', () => {
  it('retorna os boletins do mais recente para o mais antigo', async () => {
    const cards = await reportCardRepository.getReportCardsByRm(12567);
    expect(cards.map(card => [card.year, card.className])).toEqual([
      [2025, '7EF'],
      [2024, '6EF'],
    ]);
  });

  it('mapeia 2025 com só o 1º trimestre avaliado', async () => {
    const [card2025] = await reportCardRepository.getReportCardsByRm(12567);
    expect(card2025?.terms.map(term => term.isEvaluated)).toEqual([
      true,
      false,
      false,
    ]);
    expect(card2025?.terms[0]?.subjects).toHaveLength(12);
    expect(card2025?.terms[0]?.subjects[0]).toEqual({
      name: 'Língua Portuguesa',
      grade: 9.5,
      absences: 0,
    });
  });

  it('mantém a lista de disciplinas de cada trimestre (RM 13752)', async () => {
    const [card] = await reportCardRepository.getReportCardsByRm(13752);
    expect(card?.terms[0]?.subjects).toHaveLength(11);
    expect(card?.terms[0]?.subjects.map(subject => subject.name)).not.toContain(
      'Arte',
    );
  });

  it('rejeita RM inexistente', async () => {
    await expect(reportCardRepository.getReportCardsByRm(1)).rejects.toThrow(
      'Aluno não encontrado',
    );
  });
});
