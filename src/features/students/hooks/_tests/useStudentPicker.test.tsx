import ReactTestRenderer from 'react-test-renderer';

import { useSelectedStudent } from '@/providers/selected-student';

import { useStudentPicker } from '../useStudentPicker';

jest.mock('@/providers/selected-student', () => ({
  useSelectedStudent: jest.fn(),
}));

const students = [
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
];

const selectStudent = jest.fn();

async function renderPicker() {
  jest.mocked(useSelectedStudent).mockReturnValue({
    students,
    selectedStudent: students[0],
    selectStudent,
  });
  const current: { picker?: ReturnType<typeof useStudentPicker> } = {};
  function Probe() {
    current.picker = useStudentPicker();
    return null;
  }
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<Probe />);
  });
  return current;
}

describe('useStudentPicker', () => {
  afterEach(() => {
    selectStudent.mockClear();
  });

  it('lista os alunos na ordem do responsável e indica o selecionado', async () => {
    const current = await renderPicker();
    expect(current.picker?.students.map(student => student.rm)).toEqual([
      12567, 12568,
    ]);
    expect(current.picker?.selectedRm).toBe(12567);
  });

  it('seleciona outro aluno', async () => {
    const current = await renderPicker();
    current.picker?.pickStudent(12568);
    expect(selectStudent).toHaveBeenCalledWith(12568);
  });

  it('tocar no aluno já selecionado não troca a seleção', async () => {
    const current = await renderPicker();
    current.picker?.pickStudent(12567);
    expect(selectStudent).not.toHaveBeenCalled();
  });
});
