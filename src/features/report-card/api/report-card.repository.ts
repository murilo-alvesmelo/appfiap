import guardiansData from '@/data/responsaveis.json';
import type { GuardianDTO } from '@/data/school.dto';
import { toReportCard } from '@/data/school.mappers';
import type { ReportCard } from '@/data/school.types';

const guardians: GuardianDTO[] = guardiansData;

/**
 * @description Repositório de boletins. Lê o boletim dos alunos do JSON local.
 */
export const reportCardRepository = {
  /**
   * Busca todos os boletins do aluno pelo RM.
   * @param rm - RM do aluno.
   * @returns Boletins ordenados do ano mais recente para o mais antigo (lista vazia se não houver).
   * @throws Error se o aluno não existir.
   */
  async getReportCardsByRm(rm: number): Promise<ReportCard[]> {
    const student = guardians
      .flatMap(guardian => guardian.alunos)
      .find(item => item.rm === rm);
    if (!student) throw new Error('Aluno não encontrado');
    return student.boletim.map(toReportCard).sort((a, b) => b.year - a.year);
  },
};
