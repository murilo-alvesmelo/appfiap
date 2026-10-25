import { useCallback } from 'react';

import type { Student } from '@/data/school.types';
import { useSelectedStudent } from '@/providers/selected-student';

type UseStudentPickerResult = {
  students: Student[];
  selectedRm: number | undefined;
  pickStudent: (rm: number) => void;
};

/**
 * @description - Regras da seleção de aluno: lista os alunos do responsável,
 * indica o selecionado e troca a seleção no provider.
 * @returns Alunos, RM selecionado e `pickStudent`.
 */
export function useStudentPicker(): UseStudentPickerResult {
  const { students, selectedStudent, selectStudent } = useSelectedStudent();
  const selectedRm = selectedStudent?.rm;

  const pickStudent = useCallback(
    (rm: number) => {
      if (rm !== selectedRm) selectStudent(rm);
    },
    [selectedRm, selectStudent],
  );

  return { students, selectedRm, pickStudent };
}
