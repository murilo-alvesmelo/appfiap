import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSelectedStudent } from '@/providers/selected-student';
import { useSession } from '@/providers/session';

import { AppHeader } from './AppHeader';

/**
 * Header das telas autenticadas: lê o responsável e o aluno selecionado dos
 * providers e liga as ações (trocar aluno, sair). Registrado como `header` das tabs.
 */
export function AuthenticatedHeader() {
  const { session, signOut } = useSession();
  const { students, selectedStudent } = useSelectedStudent();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <AppHeader
      guardianFirstName={session?.guardian.firstName ?? ''}
      student={selectedStudent}
      canSwitchStudent={students.length > 1}
      onSwitchStudent={() => navigation.navigate('StudentPicker')}
      onSignOut={signOut}
      topInset={insets.top}
    />
  );
}
