import guardiansData from '@/data/responsaveis.json';
import type { GuardianDTO } from '@/data/school.dto';
import { toSchedule } from '@/data/school.mappers';
import type { DaySchedule } from '@/data/school.types';

const guardians: GuardianDTO[] = guardiansData;

/**
 * @description Repositório de aulas. Lê a agenda dos alunos do JSON local.
 */
export const lessonsRepository = {
  /**
   * Busca a agenda do aluno pelo RM.
   * @param rm - RM do aluno.
   * @returns Dias da agenda ordenados por data, com as aulas ordenadas por horário.
   * @throws Error se o aluno não existir.
   */
  async getScheduleByRm(rm: number): Promise<DaySchedule[]> {
    const student = guardians
      .flatMap(guardian => guardian.alunos)
      .find(item => item.rm === rm);
    if (!student) throw new Error('Aluno não encontrado');
    return toSchedule(student.agenda);
  },
};
