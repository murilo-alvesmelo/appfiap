import type { Guardian } from '@/data/school.types';

import { authRepository } from './api/auth.repository';

export { SignInScreen } from './screens/SignInScreen';
export { validateSignIn } from './utils/validation';
export type { SignInCredentials } from './types/auth.types';

/**
 * @description Busca o responsável pelo id salvo na sessão. Injetado no
 * `SessionProvider` pelo `App.tsx` para restaurar a sessão no boot.
 * @param id - Id do responsável persistido.
 * @returns O `Guardian`, sem senha.
 * @throws Error se o responsável não existir mais.
 */
export function restoreGuardian(id: string): Promise<Guardian> {
  return authRepository.getGuardianById(id);
}
