export type SignInCredentials = {
  cpf: string;
  password: string;
};

export type SignInFieldErrors = Partial<
  Record<keyof SignInCredentials, string>
>;
