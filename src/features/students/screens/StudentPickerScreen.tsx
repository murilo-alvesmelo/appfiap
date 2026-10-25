import { Screen, StateView } from '@/components/ui';

/** Seleção de aluno. Provisória: a lista real entra na Fase 6. */
export function StudentPickerScreen() {
  return (
    <Screen>
      <StateView state="empty" message="Seleção de aluno em breve" />
    </Screen>
  );
}
