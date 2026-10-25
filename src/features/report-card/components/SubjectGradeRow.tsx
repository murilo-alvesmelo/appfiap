import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { AppText, Box, ExpandChevron } from '@/components/ui';
import type { SubjectGrade } from '@/data/school.types';

import { formatAbsences, formatGrade } from '../utils/reportCard';

type SubjectGradeRowProps = {
  subject: SubjectGrade;
  index: number;
};

/**
 * Linha de disciplina do trimestre: nome em maiúsculas e chevron. Ao tocar, expande a nota geral e as faltas.
 * @param subject - Disciplina com nota e faltas.
 * @param index - Posição na lista (atraso da entrada em sequência).
 */
export function SubjectGradeRow({ subject, index }: SubjectGradeRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const grade = formatGrade(subject.grade);
  const absences = formatAbsences(subject.absences);

  return (
    <Animated.View entering={FadeIn.delay(index * 40).duration(250)}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={subject.name}
        accessibilityHint="Mostra a nota e as faltas"
        accessibilityState={{ expanded: isExpanded }}
        onPress={() => setIsExpanded(expanded => !expanded)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="sm"
          paddingHorizontal="sm"
          style={styles.row}
        >
          <AppText variant="caption" style={styles.name}>
            {subject.name}
          </AppText>
          <ExpandChevron isExpanded={isExpanded} />
        </Box>
      </Pressable>

      {isExpanded && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
        >
          <Box
            flexDirection="column"
            paddingHorizontal="sm"
            paddingBottom="sm"
            accessible
            accessibilityLabel={`Nota ${grade}, faltas ${absences}`}
          >
            <GradeValue label="Nota" value={grade} />
            <GradeValue label="Faltas" value={absences} />
          </Box>
        </Animated.View>
      )}
    </Animated.View>
  );
}

function GradeValue({ label, value }: { label: string; value: string }) {
  return (
    <Box flexDirection="row" alignItems="baseline" gap="xs">
      <AppText variant="caption" color="text">
        {label}:
      </AppText>
      <AppText variant="bodyStrong" color="text" style={styles.value}>
        {value}
      </AppText>
    </Box>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 37,
  },
  name: {
    flexShrink: 1,
    textTransform: 'uppercase',
  },
  value: {
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.6,
  },
});
