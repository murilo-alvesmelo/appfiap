import { AppText, Screen } from "@/components/ui";
import { useSession } from "@/providers/session";

export function HomeScreen() {
  const { session } = useSession();

  return (
    <Screen edges={[]}>
      <AppText variant="title">Olá, {session?.user.name}</AppText>
      <AppText color="textMuted">
        Este é o template base. Crie novas features em src/features seguindo o
        AGENTS.md.
      </AppText>
    </Screen>
  );
}
