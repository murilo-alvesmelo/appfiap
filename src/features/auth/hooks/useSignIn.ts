import { useState } from "react";

import { logger } from "@/lib/logger";
import { useSession } from "@/providers/session";

import { authRepository } from "../api/auth.repository";
import type { SignInCredentials, SignInFieldErrors } from "../types/auth.types";
import { hasErrors, validateSignIn } from "../utils/validation";

/**
 * @description - Orquestra o login: valida as credenciais, chama o repository e salva a sessão.
 *
 * @returns `submit` para enviar o formulário, erros por campo, `isLoading` e `errorMessage`.
 */
export function useSignIn() {
  const { signIn } = useSession();
  const [fieldErrors, setFieldErrors] = useState<SignInFieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  async function submit(credentials: SignInCredentials): Promise<void> {
    const errors = validateSignIn(credentials);
    setFieldErrors(errors);
    if (hasErrors(errors)) return;

    setIsLoading(true);
    setErrorMessage(undefined);
    try {
      signIn(await authRepository.signIn(credentials));
    } catch (error) {
      logger.error(error);
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Não foi possível entrar",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { submit, fieldErrors, isLoading, errorMessage };
}
