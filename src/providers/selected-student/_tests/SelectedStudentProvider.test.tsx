import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import ReactTestRenderer from 'react-test-renderer';

import type { Guardian } from '@/data/school.types';
import { SessionProvider, useSession } from '@/providers/session';
import {
  SelectedStudentProvider,
  useSelectedStudent,
} from '../SelectedStudentProvider';

const rawStorage = createAsyncStorage('appfiap');

const guardian: Guardian = {
  id: '1',
  cpf: '96929456004',
  email: 'gustavo@example.com',
  firstName: 'Gustavo',
  lastName: 'da Silva',
  students: [
    {
      rm: 12567,
      firstName: 'Rafael',
      lastName: 'da Silva',
      fullName: 'Rafael da Silva',
      className: '7EF',
      period: 'Matutino',
    },
    {
      rm: 12568,
      firstName: 'Joana',
      lastName: 'da Silva',
      fullName: 'Joana da Silva',
      className: '2EM',
      period: 'Matutino',
    },
  ],
};

async function resolveGuardian(id: string): Promise<Guardian> {
  if (id !== guardian.id) throw new Error('Responsável não encontrado');
  return guardian;
}

async function renderSelectedStudent() {
  const current: {
    session?: ReturnType<typeof useSession>;
    selected?: ReturnType<typeof useSelectedStudent>;
  } = {};
  function Probe() {
    current.session = useSession();
    current.selected = useSelectedStudent();
    return null;
  }
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(
      <SessionProvider resolveGuardian={resolveGuardian}>
        <SelectedStudentProvider>
          <Probe />
        </SelectedStudentProvider>
      </SessionProvider>,
    );
  });
  return current;
}

describe('SelectedStudentProvider', () => {
  afterEach(async () => {
    await rawStorage.clear();
  });

  it('deslogado, não tem alunos', async () => {
    const current = await renderSelectedStudent();
    expect(current.selected?.students).toEqual([]);
    expect(current.selected?.selectedStudent).toBeUndefined();
  });

  it('após o login, seleciona o primeiro aluno', async () => {
    const current = await renderSelectedStudent();
    await ReactTestRenderer.act(async () => {
      current.session?.signIn(guardian);
    });
    expect(current.selected?.selectedStudent?.rm).toBe(12567);
  });

  it('selectStudent troca e persiste o RM', async () => {
    const current = await renderSelectedStudent();
    await ReactTestRenderer.act(async () => {
      current.session?.signIn(guardian);
    });
    await ReactTestRenderer.act(async () => {
      current.selected?.selectStudent(12568);
    });
    expect(current.selected?.selectedStudent?.rm).toBe(12568);
    await expect(rawStorage.getItem('session.selectedStudentRm')).resolves.toBe(
      '12568',
    );
  });

  it('ignora RM que não pertence ao responsável', async () => {
    const current = await renderSelectedStudent();
    await ReactTestRenderer.act(async () => {
      current.session?.signIn(guardian);
    });
    await ReactTestRenderer.act(async () => {
      current.selected?.selectStudent(99999);
    });
    expect(current.selected?.selectedStudent?.rm).toBe(12567);
  });

  it('restaura o aluno salvo ao reabrir', async () => {
    await rawStorage.setItem('session.guardianId', '"1"');
    await rawStorage.setItem('session.selectedStudentRm', '12568');
    const current = await renderSelectedStudent();
    expect(current.selected?.selectedStudent?.rm).toBe(12568);
  });

  it('RM salvo inválido cai no primeiro aluno', async () => {
    await rawStorage.setItem('session.guardianId', '"1"');
    await rawStorage.setItem('session.selectedStudentRm', '13752');
    const current = await renderSelectedStudent();
    expect(current.selected?.selectedStudent?.rm).toBe(12567);
  });

  it('logout limpa o aluno selecionado', async () => {
    await rawStorage.setItem('session.guardianId', '"1"');
    await rawStorage.setItem('session.selectedStudentRm', '12568');
    const current = await renderSelectedStudent();
    await ReactTestRenderer.act(async () => {
      current.session?.signOut();
    });
    expect(current.selected?.selectedStudent).toBeUndefined();
    await expect(
      rawStorage.getItem('session.selectedStudentRm'),
    ).resolves.toBeNull();
  });
});
