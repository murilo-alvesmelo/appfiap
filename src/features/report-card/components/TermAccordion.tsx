import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { AppText, Box, ExpandChevron } from '@/components/ui';
import type { Term } from '@/data/school.types';

import { formatTermTitle } from '../utils/reportCard';
import { SubjectGradeRow } from './SubjectGradeRow';

type TermAccordionProps = {
  term: Term;
};

/**
 * @description - Accordion do trimestre: mostra o título e, ao expandir, as disciplinas com nota e faltas.
 * @param term - Trimestre com as disciplinas.
 */
export function TermAccordion({ term }: TermAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const title = formatTermTitle(term.number);

  return (
    <Box gap="sm">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={term.isEvaluated ? title : `${title}, não avaliado`}
        accessibilityHint="Mostra as disciplinas do trimestre"
        accessibilityState={{ expanded: isExpanded }}
        onPress={() => setIsExpanded(expanded => !expanded)}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="surfaceRaised"
          borderRadius="md"
          paddingHorizontal="md"
          style={styles.header}
        >
          <AppText variant="bodyStrong" color="primary" style={styles.title}>
            {title}
          </AppText>
          <ExpandChevron isExpanded={isExpanded} />
        </Box>
      </Pressable>

      {isExpanded && (
        <Animated.View exiting={FadeOut.duration(150)}>
          {term.isEvaluated ? (
            term.subjects.map((subject, index) => (
              <SubjectGradeRow
                key={subject.name}
                subject={subject}
                index={index}
              />
            ))
          ) : (
            <Animated.View entering={FadeIn.duration(250)}>
              <Box paddingHorizontal="sm" paddingVertical="sm">
                <AppText color="textMuted">Não avaliado</AppText>
              </Box>
            </Animated.View>
          )}
        </Animated.View>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 90,
  },
  title: {
    fontWeight: '700',
  },
});
