import { StyleSheet } from 'react-native';

import { AppText, Box, Logo } from '@/components/ui';
import type { Student } from '@/data/school.types';

import { formatStudentDetails } from '../../utils/formatStudentDetails';
import { HeaderAction } from './HeaderAction';

type AppHeaderProps = {
  guardianFirstName: string;
  student?: Student;
  canSwitchStudent: boolean;
  onSwitchStudent: () => void;
  onSignOut: () => void;
  topInset: number;
};

/**
 * @description - Cabeçalho do app, exibido em todas as telas. Mostra o logo, nome do responsável, nome e detalhes do aluno selecionado, botão de trocar aluno e botão de sair.
 * @param guardianFirstName - Primeiro nome do responsável .
 * @param student - Aluno selecionado.
 * @param canSwitchStudent - Se o responsável tem mais de um aluno.
 * @param onSwitchStudent - Callback para trocar o aluno selecionado.
 * @param onSignOut - Callback para sair da conta.
 * @param topInset - Espaçamento superior.
 */
export function AppHeader({
  guardianFirstName,
  student,
  canSwitchStudent,
  onSwitchStudent,
  onSignOut,
  topInset,
}: AppHeaderProps) {
  return (
    <Box
      backgroundColor="background"
      paddingHorizontal="md"
      paddingBottom="lg"
      gap="lg"
      style={{ paddingTop: topInset }}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingTop="sm"
      >
        <Logo size="small" />
        <Box flexDirection="row" gap="md">
          {canSwitchStudent && (
            <HeaderAction
              label="TROCAR PERFIL"
              accessibilityLabel="Trocar aluno"
              onPress={onSwitchStudent}
            />
          )}
          <HeaderAction
            label="SAIR"
            accessibilityLabel="Sair da conta"
            onPress={onSignOut}
          />
        </Box>
      </Box>

      <AppText variant="bodyLarge" style={styles.centered}>
        Olá,{' '}
        <AppText variant="bodyLargeBold">
          {guardianFirstName.toUpperCase()}
        </AppText>
      </AppText>

      {student && (
        <Box alignItems="center" gap="sm">
          <AppText>{student.firstName.toUpperCase()}</AppText>
          <AppText>{formatStudentDetails(student)}</AppText>
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
  },
});
