import type { Student } from '@/data/school.types';

/**
 * @description Monta a linha de detalhes do aluno exibida no header.
 * @param student - Aluno selecionado.
 * @returns Ex.: `"7EF - RM 12567 - Matutino"`.
 */
export function formatStudentDetails(student: Student): string {
  return `${student.className} - RM ${student.rm} - ${student.period}`;
}
