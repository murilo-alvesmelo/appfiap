import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { CloseIcon } from '@/components/svg/CloseIcon';
import { AppText, Box, Screen, StateView } from '@/components/ui';
import { useAppTheme } from '@/constants/theme';

import { StudentCard } from '../components/StudentCard';
import { useStudentPicker } from '../hooks/useStudentPicker';

/**
 * @description - Modal de seleção de aluno. Ao escolher um
 * aluno, atualiza o provider e volta para a tela anterior. Com um aluno só, fecha sozinha.
 */
export function StudentPickerScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const { students, selectedRm, pickStudent } = useStudentPicker();
  const hasSingleStudent = students.length === 1;

  useEffect(() => {
    if (hasSingleStudent && navigation.canGoBack()) navigation.goBack();
  }, [hasSingleStudent, navigation]);

  const handleSelect = (rm: number) => {
    pickStudent(rm);
    navigation.goBack();
  };

  return (
    <Screen>
      <Box flexDirection="row" justifyContent="flex-end">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar seleção de aluno"
          hitSlop={8}
          onPress={() => navigation.goBack()}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Box flexDirection="row" alignItems="center" gap="sm">
            <AppText variant="label" color="primary" style={styles.bold}>
              FECHAR
            </AppText>
            <CloseIcon color={theme.colors.primary} />
          </Box>
        </Pressable>
      </Box>

      {students.length === 0 ? (
        <StateView
          state="empty"
          message="Nenhum aluno vinculado a este responsável"
        />
      ) : (
        <Box flex={1} justifyContent="center" gap="xxl" style={styles.content}>
          <AppText
            variant="bodyLarge"
            accessibilityRole="header"
            style={styles.centered}
          >
            {'Escolha o perfil\nque você quer visualizar'}
          </AppText>
          <Box gap="md">
            {students.map((student, index) => (
              <StudentCard
                key={student.rm}
                student={student}
                index={index}
                isSelected={student.rm === selectedRm}
                onPress={handleSelect}
              />
            ))}
          </Box>
        </Box>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    marginBottom: '40%',
  },
  centered: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.6,
  },
});
