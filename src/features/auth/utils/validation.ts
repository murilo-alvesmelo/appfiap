import type { SignInCredentials, SignInFieldErrors } from '../types/auth.types';
import { isCpfComplete } from './cpf';

/**
 * @description Valida as credenciais de login. Retorna um objeto com os erros encontrados.
 * @param credentials - Credenciais de login a serem validadas.
 * @returns Um objeto com os erros encontrados.
 */
export function validateSignIn(
  credentials: SignInCredentials,
): SignInFieldErrors {
  const errors: SignInFieldErrors = {};

  if (!isCpfComplete(credentials.cpf)) {
    errors.cpf = 'Informe um CPF com 11 dígitos';
  }
  if (credentials.password.length === 0) {
    errors.password = 'Informe a senha';
  }

  return errors;
}

/**
 * Indica se a validação encontrou algum erro.
 * @param errors - Resultado de `validateSignIn`.
 */
export function hasErrors(errors: SignInFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
