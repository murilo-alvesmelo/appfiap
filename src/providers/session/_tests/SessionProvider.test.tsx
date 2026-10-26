import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import ReactTestRenderer from 'react-test-renderer';

import type { Guardian } from '@/data/school.types';
import { logger } from '@/lib/logger';

import { SessionProvider, useSession } from '../SessionProvider';

const rawStorage = createAsyncStorage('appfiap');

const guardian: Guardian = {
  id: '1',
  cpf: '96929456004',
  email: 'gustavo@example.com',
  firstName: 'Gustavo',
  lastName: 'da Silva',
  students: [],
};

async function resolveGuardian(id: string): Promise<Guardian> {
  if (id !== guardian.id) throw new Error('Responsável não encontrado');
  return guardian;
}

async function renderSession() {
  const current: { value?: ReturnType<typeof useSession> } = {};
  function Probe() {
    current.value = useSession();
    return null;
  }
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(
      <SessionProvider resolveGuardian={resolveGuardian}>
        <Probe />
      </SessionProvider>,
    );
  });
  return current;
}

describe('SessionProvider', () => {
  afterEach(async () => {
    await rawStorage.clear();
  });

  it('sem sessão salva, termina deslogado', async () => {
    const current = await renderSession();
    expect(current.value?.isRestoring).toBe(false);
    expect(current.value?.isSignedIn).toBe(false);
  });

  it('signIn persiste só o id do responsável', async () => {
    const current = await renderSession();
    await ReactTestRenderer.act(async () => {
      current.value?.signIn(guardian);
    });
    expect(current.value?.isSignedIn).toBe(true);
    expect(current.value?.session?.guardian.firstName).toBe('Gustavo');
    await expect(rawStorage.getItem('session.guardianId')).resolves.toBe('"1"');
  });

  it('restaura a sessão salva ao reabrir', async () => {
    await rawStorage.setItem('session.guardianId', '"1"');
    const current = await renderSession();
    expect(current.value?.isSignedIn).toBe(true);
    expect(current.value?.session?.guardian.id).toBe('1');
  });

  it('sessão com id inexistente limpa o storage e volta ao login', async () => {
    const logError = jest.spyOn(logger, 'error').mockImplementation(() => {});
    await rawStorage.setItem('session.guardianId', '"999"');
    const current = await renderSession();
    expect(current.value?.isSignedIn).toBe(false);
    await expect(rawStorage.getItem('session.guardianId')).resolves.toBeNull();
    logError.mockRestore();
  });

  it('signOut limpa a sessão persistida', async () => {
    await rawStorage.setItem('session.guardianId', '"1"');
    const current = await renderSession();
    await ReactTestRenderer.act(async () => {
      current.value?.signOut();
    });
    expect(current.value?.isSignedIn).toBe(false);
    await expect(rawStorage.getItem('session.guardianId')).resolves.toBeNull();
  });
});
