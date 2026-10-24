import type { Session } from '@/providers/session';

export type SignInCredentials = {
  cpf: string;
  password: string;
};

export type SignInResponseDTO = {
  access_token: string;
  user: {
    id: string;
    full_name: string;
    email: string;
  };
};

export type SignInResult = Session;

export type SignInFieldErrors = Partial<
  Record<keyof SignInCredentials, string>
>;
