import guardiansData from '@/data/responsaveis.json';
import type { GuardianDTO } from '@/data/school.dto';
import { toGuardian } from '@/data/school.mappers';
import type { Guardian } from '@/data/school.types';

import type { SignInCredentials } from '../types/auth.types';
import { onlyDigits } from '../utils/cpf';

const guardians: GuardianDTO[] = guardiansData;

/**
 * @description Repositório de autenticação. Lê os responsáveis do JSON local;
 * a senha é comparada aqui dentro e nunca sai deste arquivo.
 */
export const authRepository = {
  /**
   * Autentica o responsável por CPF e senha.
   * @param credentials - CPF (com ou sem máscara) e senha.
   * @returns O `Guardian` autenticado, sem senha.
   * @throws Error se o CPF não existir ou a senha estiver errada.
   */
  async signIn({ cpf, password }: SignInCredentials): Promise<Guardian> {
    const digits = onlyDigits(cpf);
    const guardian = guardians.find(item => item.cpf === digits);
    if (!guardian || guardian.senha !== password) {
      throw new Error('Usuário ou senha inválida.');
    }
    return toGuardian(guardian);
  },

  /**
   * Busca o responsável pelo id (usado para restaurar a sessão).
   * @param id - Id do responsável.
   * @returns O `Guardian`, sem senha.
   * @throws Error se o responsável não existir.
   */
  async getGuardianById(id: string): Promise<Guardian> {
    const guardian = guardians.find(item => String(item.id) === id);
    if (!guardian) throw new Error('Responsável não encontrado');
    return toGuardian(guardian);
  },
};
