import { FlatList, StyleSheet } from 'react-native';

import { NoClassRoom } from '@/components/svg/NoClassRoom';
import { AppText, Box } from '@/components/ui';
import { useAppTheme } from '@/constants/theme';
import type { Lesson } from '@/data/school.types';

import { LessonItem } from './LessonItem';

type LessonListProps = {
  lessons: Lesson[];
};

/**
 * Lista de aulas de um dia em timeline. Sem aulas, mostra a ilustração e "Sem aulas neste dia".
 * @param lessons - Aulas do dia, já ordenadas por horário.
 */
export function LessonList({ lessons }: LessonListProps) {
  const theme = useAppTheme();

  if (!lessons.length) {
    return (
      <Box alignItems="center" gap="lg" paddingTop="sm">
        <NoClassRoom />
        <AppText variant="bodyLarge" style={styles.emptyText}>
          Sem aulas neste dia
        </AppText>
      </Box>
    );
  }

  return (
    <FlatList
      data={lessons}
      keyExtractor={lesson => lesson.time}
      renderItem={({ item, index }) => (
        <LessonItem index={index} lesson={item} />
      )}
      contentContainerStyle={{
        paddingTop: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
      }}
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
  },
});
