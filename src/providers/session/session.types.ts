export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export type Session = {
  token: string;
  user: SessionUser;
};
