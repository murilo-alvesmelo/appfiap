import { AppText, Button, Screen } from '@/components/ui';
import { useSession } from '@/providers/session';

/**
 * @description Tela de exemplo da área logada. Provisória: o botão "Sair"
 * sai daqui quando o header (Fase 3) existir.
 */
export function HomeScreen() {
  const { session, signOut } = useSession();

  return (
    <Screen edges={[]}>
      <AppText variant="title">Olá, {session?.guardian.firstName}</AppText>
      <AppText color="textMuted">
        Este é o template base. Crie novas features em src/features seguindo o
        AGENTS.md.
      </AppText>
      <Button title="Sair" variant="secondary" onPress={signOut} />
    </Screen>
  );
}
