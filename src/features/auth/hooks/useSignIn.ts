import { useRef, useState } from 'react';

import { logger } from '@/lib/logger';
import { useSession } from '@/providers/session';

import { authRepository } from '../api/auth.repository';
import type { SignInCredentials, SignInFieldErrors } from '../types/auth.types';
import { hasErrors, validateSignIn } from '../utils/validation';

const INVALID_CREDENTIALS_MESSAGE =
  'Usuário ou senha inválida.\nPode tentar novamente?';

/**
 * @description - Orquestra o login: valida as credenciais, chama o repository e salva a sessão.
 * Qualquer falha (validação ou autenticação) vira a mesma mensagem única do Figma.
 *
 * @returns `submit` para enviar o formulário, erros por campo, `isLoading` e `errorMessage`.
 */
export function useSignIn() {
  const { signIn } = useSession();
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const isSubmittingRef = useRef(false);

  async function submit(credentials: SignInCredentials): Promise<void> {
    if (isSubmittingRef.current) return;

    const errors = validateSignIn(credentials);
    setFieldErrors(errors);
    if (hasErrors(errors)) {
      setErrorMessage(INVALID_CREDENTIALS_MESSAGE);
      return;
    }

    isSubmittingRef.current = true;
    setIsLoading(true);
    setErrorMessage(undefined);
    try {
      signIn(await authRepository.signIn(credentials));
    } catch (error) {
      logger.error(error);
      setErrorMessage(INVALID_CREDENTIALS_MESSAGE);
    } finally {
      isSubmittingRef.current = false;
      setIsLoading(false);
    }
  }

  return { submit, fieldErrors, isLoading, errorMessage };
}
