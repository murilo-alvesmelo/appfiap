import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { formatStudentDetails } from '@/components/layout';
import { AppText, Box } from '@/components/ui';
import type { Student } from '@/data/school.types';

type StudentCardProps = {
  student: Student;
  index: number;
  isSelected: boolean;
  onPress: (rm: number) => void;
};

/**
 * @description - Card de um aluno na seleção de perfil: nome completo e
 * "turma - RM - período". O aluno selecionado ganha borda `primary`.
 * @param student - Aluno exibido.
 * @param index - Posição na lista (atraso da animação de entrada).
 * @param isSelected - Se é o aluno selecionado atualmente.
 * @param onPress - Recebe o RM do aluno tocado.
 */
export function StudentCard({
  student,
  index,
  isSelected,
  onPress,
}: StudentCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(300)}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${student.fullName}, RM ${student.rm}, turma ${student.className}`}
        accessibilityState={{ selected: isSelected }}
        onPress={() => onPress(student.rm)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Box
          backgroundColor="surfaceRaised"
          borderRadius="md"
          borderWidth={1}
          borderColor={isSelected ? 'primary' : 'surfaceRaised'}
          padding="md"
          gap="md"
        >
          <AppText>{student.fullName.toUpperCase()}</AppText>
          <AppText>{formatStudentDetails(student)}</AppText>
        </Box>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
