import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Session } from "./session.types";

type SessionContextValue = {
  session: Session | undefined;
  isSignedIn: boolean;
  signIn: (session: Session) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined,
);

/**
 * @description Provider para a sessão do usuário. Ele mantém o estado da sessão e fornece funções para fazer login e logout.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>();

  const signIn = useCallback((next: Session) => {
    setSession(next);
  }, []);

  const signOut = useCallback(() => {
    setSession(undefined);
  }, []);

  const value = useMemo(
    () => ({ session, isSignedIn: session !== undefined, signIn, signOut }),
    [session, signIn, signOut],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

/**
 * @description Acessa a sessão atual. Precisa estar dentro de `<SessionProvider>`.
 */
export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within <SessionProvider>");
  }
  return context;
}
