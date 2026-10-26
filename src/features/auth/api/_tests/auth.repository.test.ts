import { authRepository } from '../auth.repository';

describe('authRepository.signIn', () => {
  it.each([
    ['96929456004', '123456', 'Gustavo'],
    ['969.294.560-04', '123456', 'Gustavo'],
    ['508.795.670-07', '987654', 'Adelaide'],
  ])('autentica %p / %p', async (cpf, password, firstName) => {
    const guardian = await authRepository.signIn({ cpf, password });
    expect(guardian.firstName).toBe(firstName);
  });

  it('não expõe a senha', async () => {
    const guardian = await authRepository.signIn({
      cpf: '96929456004',
      password: '123456',
    });
    expect(guardian).not.toHaveProperty('senha');
    expect(guardian).not.toHaveProperty('password');
  });

  it('rejeita CPF inexistente', async () => {
    await expect(
      authRepository.signIn({ cpf: '11111111111', password: '123456' }),
    ).rejects.toThrow('Usuário ou senha inválida.');
  });

  it('rejeita senha errada', async () => {
    await expect(
      authRepository.signIn({ cpf: '96929456004', password: '987654' }),
    ).rejects.toThrow('Usuário ou senha inválida.');
  });
});

describe('authRepository.getGuardianById', () => {
  it('retorna o responsável pelo id', async () => {
    const guardian = await authRepository.getGuardianById('2');
    expect(guardian.firstName).toBe('Adelaide');
    expect(guardian.students.map(student => student.rm)).toEqual([13752]);
  });

  it('rejeita id inexistente', async () => {
    await expect(authRepository.getGuardianById('999')).rejects.toThrow(
      'Responsável não encontrado',
    );
  });
});
