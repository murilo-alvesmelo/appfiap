import type { SignInCredentials, SignInFieldErrors } from "../types/auth.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

/**
 * @description Valida as credenciais de login. Retorna um objeto com os erros encontrados.
 * @param credentials - Credenciais de login a serem validadas.
 * @returns Um objeto com os erros encontrados.
 */
export function validateSignIn(
  credentials: SignInCredentials,
): SignInFieldErrors {
  const errors: SignInFieldErrors = {};

  if (!EMAIL_PATTERN.test(credentials.email.trim())) {
    errors.email = "Informe um e-mail válido";
  }
  if (credentials.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha deve ter ao menos ${MIN_PASSWORD_LENGTH} caracteres`;
  }

  return errors;
}

export function hasErrors(errors: SignInFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
