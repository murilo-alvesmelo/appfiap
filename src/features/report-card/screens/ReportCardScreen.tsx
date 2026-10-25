import { Screen, SectionTitle, StateView } from '@/components/ui';
import { useSelectedStudent } from '@/providers/selected-student';

/** Tela de BOLETIM do aluno selecionado. Provisória: o conteúdo real entra na próxima fase. */
export function ReportCardScreen() {
  const { selectedStudent } = useSelectedStudent();

  return (
    <Screen edges={[]}>
      <SectionTitle title="BOLETIM" />
      {selectedStudent ? (
        <StateView
          state="empty"
          message="O boletim do aluno aparece aqui em breve"
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
