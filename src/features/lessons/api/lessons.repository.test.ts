import { lessonsRepository } from './lessons.repository';

describe('lessonsRepository.getScheduleByRm', () => {
  it('retorna a agenda ordenada do aluno', async () => {
    const schedule = await lessonsRepository.getScheduleByRm(12567);
    expect(schedule.map(day => day.date)).toEqual([
      '2025-03-16',
      '2025-03-17',
      '2025-03-18',
      '2025-03-19',
      '2025-03-20',
      '2025-03-21',
      '2025-03-22',
    ]);

    const monday = schedule[1];
    expect(monday?.lessons).toHaveLength(6);
    expect(monday?.lessons[0]).toEqual({
      time: '07:15 - 08:00',
      subject: 'Matemática I',
    });
  });

  it('rejeita RM inexistente', async () => {
    await expect(lessonsRepository.getScheduleByRm(1)).rejects.toThrow(
      'Aluno não encontrado',
    );
  });
});
