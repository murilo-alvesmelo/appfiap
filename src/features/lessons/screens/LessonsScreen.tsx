import {
  Box,
  Dropdown,
  Screen,
  SectionTitle,
  StateView,
} from '@/components/ui';
import { useSelectedStudent } from '@/providers/selected-student';

import { LessonList } from '../components/LessonList';
import { useLessons } from '../hooks/useLessons';

/** Tela de AGENDA: aulas do dia do aluno selecionado, com seletor de dia. */
export function LessonsScreen() {
  const { selectedStudent } = useSelectedStudent();
  const { dayOptions, selectedDay, selectDay, isLoading, error, reload } =
    useLessons(selectedStudent?.rm);

  return (
    <Screen edges={[]}>
      <SectionTitle title="AGENDA" />
      {renderContent()}
    </Screen>
  );

  function renderContent() {
    if (!selectedStudent) {
      return (
        <StateView
          state="empty"
          message="Nenhum aluno vinculado a este responsável"
        />
      );
    }
    if (isLoading) return <StateView state="loading" />;
    if (error) {
      return (
        <StateView state="error" message={error.message} onRetry={reload} />
      );
    }
    if (!selectedDay) {
      return (
        <StateView
          state="empty"
          message="Agenda indisponível para este aluno"
        />
      );
    }
    return (
      <Box flex={1} paddingHorizontal="sm" gap="md">
        <Dropdown
          items={dayOptions}
          selectedItem={selectedDay.date}
          onSelect={selectDay}
          accessibilityLabel="Dia selecionado"
        />
        <LessonList lessons={selectedDay.lessons} />
      </Box>
    );
  }
}
