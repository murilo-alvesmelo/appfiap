import type {
  SignInCredentials,
  SignInResponseDTO,
  SignInResult,
} from '../types/auth.types';

/**
 * @description Repositório de autenticação. Ele encapsula a lógica de comunicação com a API para autenticação.
 */
export const authRepository = {
  async signIn(_credentials: SignInCredentials): Promise<SignInResult> {
    const dto = {
      access_token: '<ACCESS_TOKEN>',
      user: {
        id: '1',
        full_name: 'John Doe',
        email: 'john.doe@example.com',
      },
    };
    return toSession(dto);
  },
};

function toSession(dto: SignInResponseDTO): SignInResult {
  return {
    token: dto.access_token,
    user: {
      id: dto.user.id,
      name: dto.user.full_name,
      email: dto.user.email,
    },
  };
}
