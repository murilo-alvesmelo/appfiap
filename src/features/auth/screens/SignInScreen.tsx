import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Logo, Screen } from '@/components/ui';

import { SignInForm } from '../components/SignInForm';
import { useSignIn } from '../hooks/useSignIn';

/** Tela de login (CPF + senha) conforme o Figma. */
export function SignInScreen() {
  const { submit, errorMessage, isLoading } = useSignIn();
  const insets = useSafeAreaInsets();

  return (
    <Screen edges={['top']} padded={false}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Box alignItems="center" paddingTop="xxl" paddingBottom="xxl">
          <Logo size="large" />
        </Box>
        <Box flex={1} paddingTop="xl">
          <SignInForm
            onSubmit={submit}
            errorMessage={errorMessage}
            isLoading={isLoading}
            bottomInset={insets.bottom}
          />
        </Box>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
