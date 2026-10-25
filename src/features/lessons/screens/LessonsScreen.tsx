import { Screen, SectionTitle, StateView } from '@/components/ui';
import { useSelectedStudent } from '@/providers/selected-student';

/** Tela de AGENDA do aluno selecionado. Provisória: o conteúdo real entra na próxima fase. */
export function LessonsScreen() {
  const { selectedStudent } = useSelectedStudent();

  return (
    <Screen edges={[]}>
      <SectionTitle title="AGENDA" />
      {selectedStudent ? (
        <StateView
          state="empty"
          message="As aulas do aluno aparecem aqui em breve"
        />
      ) : (
        <StateView
          state="empty"
          message="Nenhum aluno vinculado a este responsável"
        />
      )}
    </Screen>
  );
}
