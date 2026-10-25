import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Guardian } from '@/data/school.types';
import { logger } from '@/lib/logger';
import { storage } from '@/lib/storage';

import type { Session } from './session.types';

const SESSION_KEY = 'session.guardianId';

type SessionStatus = 'restoring' | 'signedIn' | 'signedOut';

type SessionContextValue = {
  session: Session | undefined;
  isSignedIn: boolean;
  /** `true` enquanto a sessão salva é restaurada no boot. */
  isRestoring: boolean;
  signIn: (guardian: Guardian) => void;
  signOut: () => void;
};

type SessionProviderProps = {
  children: ReactNode;
  /** Busca o responsável pelo id salvo. Injetado pelo `App.tsx` (providers não importam features). */
  resolveGuardian: (id: string) => Promise<Guardian>;
};

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined,
);

const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * @description Provider da sessão do responsável. Persiste só o id do responsável
 * e, no boot, restaura o `Guardian` via `resolveGuardian`. Sessão inválida volta ao login.
 */
export function SessionProvider({
  children,
  resolveGuardian,
}: SessionProviderProps) {
  const [session, setSession] = useState<Session>();
  const [status, setStatus] = useState<SessionStatus>('restoring');

  useEffect(() => {
    let isActive = true;

    async function restore() {
      const guardianId = await storage.getItem(SESSION_KEY, isString);
      if (guardianId === undefined) {
        if (isActive) setStatus('signedOut');
        return;
      }
      try {
        const guardian = await resolveGuardian(guardianId);
        if (!isActive) return;
        setSession({ guardian });
        setStatus('signedIn');
      } catch (error) {
        logger.error(error, { guardianId });
        await storage.removeItem(SESSION_KEY);
        if (isActive) setStatus('signedOut');
      }
    }

    restore();
    return () => {
      isActive = false;
    };
  }, [resolveGuardian]);

  const signIn = useCallback((guardian: Guardian) => {
    setSession({ guardian });
    setStatus('signedIn');
    storage.setItem(SESSION_KEY, guardian.id).catch((error: unknown) => {
      logger.error(error);
    });
  }, []);

  const signOut = useCallback(() => {
    setSession(undefined);
    setStatus('signedOut');
    storage.removeItem(SESSION_KEY).catch((error: unknown) => {
      logger.error(error);
    });
  }, []);

  const value = useMemo(
    () => ({
      session,
      isSignedIn: status === 'signedIn',
      isRestoring: status === 'restoring',
      signIn,
      signOut,
    }),
    [session, status, signIn, signOut],
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
    throw new Error('useSession must be used within <SessionProvider>');
  }
  return context;
}
