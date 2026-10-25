import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StateView } from '@/components/ui';
import { SignInScreen } from '@/features/auth';
import { useSession } from '@/providers/session';

import { AppTabs } from './AppTabs';
import type { RootStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * @description - Stack raiz. Mostra o fluxo logado ou deslogado conforme a sessão;
 * ao chamar `signIn`/`signOut` a troca de tela acontece sozinha. Enquanto a sessão
 * salva é restaurada, mostra loading (sem piscar o login).
 */
export function RootNavigator() {
  const { isSignedIn, isRestoring } = useSession();

  if (isRestoring) return <StateView state="loading" />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name="AppTabs" component={AppTabs} />
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
    </Stack.Navigator>
  );
}
