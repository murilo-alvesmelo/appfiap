import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AppText, Box } from '@/components/ui';

import type { SignInCredentials } from '../types/auth.types';
import { formatCpf, isCpfComplete, onlyDigits } from '../utils/cpf';
import { CredentialField } from './CredentialField';
import { SignInSubmitBar } from './SignInSubmitBar';

type SignInFormProps = {
  onSubmit: (credentials: SignInCredentials) => void;
  errorMessage?: string;
  isLoading: boolean;
  /** Inset inferior da safe area, repassado à barra do botão. */
  bottomInset: number;
};

/**
 * @description - Formulário de login: campos de CPF e senha, botão de enviar e mensagem de erro.
 * @param onSubmit - Callback chamado ao enviar o formulário.
 * @param errorMessage - Mensagem de erro exibida abaixo dos campos.
 * @param isLoading - Se o formulário está em estado de carregamento (desabilita o botão).
 * @param bottomInset - Inset inferior da safe area, repassado à barra do botão.
 */
export function SignInForm({
  onSubmit,
  errorMessage,
  isLoading,
  bottomInset,
}: SignInFormProps) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = isCpfComplete(cpf) && password.length > 0;

  return (
    <Box flex={1} justifyContent="space-between">
      <Box paddingHorizontal="xxl" gap="xl">
        <CredentialField
          label="CPF"
          value={cpf}
          onChangeText={value => setCpf(formatCpf(value))}
          keyboardType="number-pad"
          maxLength={14}
          autoComplete="off"
          textContentType="none"
        />
        <CredentialField
          label="SENHA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          textContentType="password"
        />
        {errorMessage !== undefined && (
          <AppText variant="bodyStrong" color="danger" style={styles.error}>
            {errorMessage}
          </AppText>
        )}
      </Box>
      <SignInSubmitBar
        disabled={!canSubmit}
        isLoading={isLoading}
        bottomInset={bottomInset}
        onPress={() => onSubmit({ cpf: onlyDigits(cpf), password })}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
  },
});
