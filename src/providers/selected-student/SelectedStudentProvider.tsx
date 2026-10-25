import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Student } from '@/data/school.types';
import { logger } from '@/lib/logger';
import { storage } from '@/lib/storage';
import { useSession } from '@/providers/session';

const SELECTED_STUDENT_KEY = 'session.selectedStudentRm';

type SelectedStudentContextValue = {
  /** Alunos do responsável logado (vazio se deslogado ou sem alunos). */
  students: Student[];
  /** Aluno selecionado; por padrão, o primeiro da lista. */
  selectedStudent: Student | undefined;
  selectStudent: (rm: number) => void;
};

const SelectedStudentContext = createContext<
  SelectedStudentContextValue | undefined
>(undefined);

const EMPTY_STUDENTS: Student[] = [];

const isNumber = (value: unknown): value is number => typeof value === 'number';

/**
 * @description Provider do aluno selecionado. Seleciona o primeiro aluno por padrão,
 * persiste o RM escolhido e o limpa quando a sessão termina (logout).
 * Precisa estar dentro de `<SessionProvider>`.
 */
export function SelectedStudentProvider({ children }: { children: ReactNode }) {
  const { session, isRestoring } = useSession();
  const guardian = session?.guardian;
  const students = guardian?.students ?? EMPTY_STUDENTS;
  const [selectedRm, setSelectedRm] = useState<number>();

  useEffect(() => {
    if (isRestoring) return;
    if (!guardian) {
      setSelectedRm(undefined);
      storage.removeItem(SELECTED_STUDENT_KEY).catch((error: unknown) => {
        logger.error(error);
      });
      return;
    }

    let isActive = true;
    storage.getItem(SELECTED_STUDENT_KEY, isNumber).then(rm => {
      if (isActive) setSelectedRm(rm);
    });
    return () => {
      isActive = false;
    };
  }, [guardian, isRestoring]);

  const selectStudent = useCallback(
    (rm: number) => {
      if (!students.some(student => student.rm === rm)) return;
      setSelectedRm(rm);
      storage.setItem(SELECTED_STUDENT_KEY, rm).catch((error: unknown) => {
        logger.error(error);
      });
    },
    [students],
  );

  const selectedStudent =
    students.find(student => student.rm === selectedRm) ?? students[0];

  const value = useMemo(
    () => ({ students, selectedStudent, selectStudent }),
    [students, selectedStudent, selectStudent],
  );

  return (
    <SelectedStudentContext.Provider value={value}>
      {children}
    </SelectedStudentContext.Provider>
  );
}

/**
 * @description Acessa o aluno selecionado. Precisa estar dentro de `<SelectedStudentProvider>`.
 */
export function useSelectedStudent(): SelectedStudentContextValue {
  const context = useContext(SelectedStudentContext);
  if (!context) {
    throw new Error(
      'useSelectedStudent must be used within <SelectedStudentProvider>',
    );
  }
  return context;
}
