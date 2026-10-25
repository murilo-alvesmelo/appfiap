import { ScrollView } from 'react-native';
import Animated, {
  FadeInDown,
  LinearTransition,
} from 'react-native-reanimated';

import { Screen, SectionTitle, StateView } from '@/components/ui';
import { useAppTheme } from '@/constants/theme';
import { useSelectedStudent } from '@/providers/selected-student';

import { TermAccordion } from '../components/TermAccordion';
import { YearSelector } from '../components/YearSelector';
import { useReportCard } from '../hooks/useReportCard';

export function ReportCardScreen() {
  const theme = useAppTheme();
  const { selectedStudent } = useSelectedStudent();
  const {
    yearOptions,
    selectedReportCard,
    selectYear,
    isLoading,
    error,
    reload,
  } = useReportCard(selectedStudent?.rm);

  return (
    <Screen edges={[]}>
      <SectionTitle title="BOLETIM" />
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
    if (!selectedReportCard) {
      return (
        <StateView
          state="empty"
          message="Boletim indisponível para este aluno"
        />
      );
    }
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.sm,
          paddingBottom: theme.spacing.md,
          gap: theme.spacing.md,
        }}
      >
        <YearSelector
          options={yearOptions}
          selectedYear={selectedReportCard.year}
          onSelect={selectYear}
        />
        {selectedReportCard.terms.map((term, index) => (
          <Animated.View
            key={`${selectedStudent.rm}-${selectedReportCard.year}-${term.number}`}
            entering={FadeInDown.delay(index * 80).duration(300)}
            layout={LinearTransition.duration(250)}
          >
            <TermAccordion term={term} />
          </Animated.View>
        ))}
      </ScrollView>
    );
  }
}
