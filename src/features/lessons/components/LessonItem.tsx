import { StyleSheet } from 'react-native';

import { AppText, Box } from '@/components/ui';
import type { Lesson } from '@/data/school.types';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type LessonItemProps = {
  index: number;
  lesson: Lesson;
};

/**
 * Item da timeline de aulas: marcador circular vazado ao lado do horário e a disciplina abaixo.
 * @param lesson - Aula exibida.
 * @param index - Índice do item na lista.
 */
export function LessonItem({ lesson, index }: LessonItemProps) {
  return (
    <Animated.View
      entering={FadeIn.delay(index * 200).duration(300)}
      exiting={FadeOut.duration(200)}
    >
      <Box flexDirection="row" gap="sm" paddingBottom="md">
        <Box
          borderRadius="full"
          borderWidth={1}
          borderColor="text"
          style={styles.marker}
        />
        <Box flex={1} gap="xs">
          <AppText variant="caption">{lesson.time}</AppText>
          <AppText variant="bodyStrong" style={styles.subject}>
            {lesson.subject}
          </AppText>
        </Box>
      </Box>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 7,
    height: 7,
    marginTop: 6,
  },
  subject: {
    fontWeight: '700',
  },
});
