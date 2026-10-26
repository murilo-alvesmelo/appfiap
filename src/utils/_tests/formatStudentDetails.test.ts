import { formatStudentDetails } from '../formatStudentDetails';

describe('formatStudentDetails', () => {
  it('formata turma, RM e período', () => {
    expect(
      formatStudentDetails({
        rm: 12567,
        firstName: 'Rafael',
        lastName: 'da Silva',
        fullName: 'Rafael da Silva',
        className: '7EF',
        period: 'Matutino',
      }),
    ).toBe('7EF - RM 12567 - Matutino');
  });
});
