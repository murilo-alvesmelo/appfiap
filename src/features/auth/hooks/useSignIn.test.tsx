import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import ReactTestRenderer from 'react-test-renderer';

import { logger } from '@/lib/logger';
import { SessionProvider, useSession } from '@/providers/session';

import { authRepository } from '../api/auth.repository';
import { useSignIn } from './useSignIn';

async function renderSignIn() {
  const current: {
    signIn?: ReturnType<typeof useSignIn>;
    session?: ReturnType<typeof useSession>;
  } = {};
  function Probe() {
    current.signIn = useSignIn();
    current.session = useSession();
    return null;
  }
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(
      <SessionProvider resolveGuardian={authRepository.getGuardianById}>
        <Probe />
      </SessionProvider>,
    );
  });
  return current;
}

describe('useSignIn', () => {
  afterEach(async () => {
    await createAsyncStorage('appfiap').clear();
  });

  it('credencial válida inicia a sessão', async () => {
    const current = await renderSignIn();
    await ReactTestRenderer.act(async () => {
      await current.signIn?.submit({
        cpf: '969.294.560-04',
        password: '123456',
      });
    });
    expect(current.session?.isSignedIn).toBe(true);
    expect(current.session?.session?.guardian.firstName).toBe('Gustavo');
    expect(current.signIn?.errorMessage).toBeUndefined();
  });

  it.each([
    ['senha errada', '969.294.560-04', '000000'],
    ['CPF inexistente', '111.111.111-11', '123456'],
    ['CPF incompleto', '969.294', '123456'],
  ])(
    '%s mostra a mensagem única e continua deslogado',
    async (_, cpf, password) => {
      const logError = jest.spyOn(logger, 'error').mockImplementation(() => {});
      const current = await renderSignIn();
      await ReactTestRenderer.act(async () => {
        await current.signIn?.submit({ cpf, password });
      });
      expect(current.session?.isSignedIn).toBe(false);
      expect(current.signIn?.errorMessage).toBe(
        'Usuário ou senha inválida.\nPode tentar novamente?',
      );
      logError.mockRestore();
    },
  );
});
