import { createAsyncStorage } from '@react-native-async-storage/async-storage';

import { logger } from './logger';
import { storage } from './storage';

const isString = (value: unknown): value is string => typeof value === 'string';

describe('storage', () => {
  afterEach(async () => {
    await createAsyncStorage('appfiap').clear();
  });

  it('salva e lê um valor em JSON', async () => {
    await storage.setItem('guardianId', '1');
    await expect(storage.getItem('guardianId', isString)).resolves.toBe('1');
  });

  it('retorna undefined quando a chave não existe', async () => {
    await expect(storage.getItem('missing', isString)).resolves.toBeUndefined();
  });

  it('retorna undefined quando o valor não passa na validação', async () => {
    await storage.setItem('guardianId', 1);
    await expect(storage.getItem('guardianId', isString)).resolves.toBeUndefined();
  });

  it('retorna undefined e loga quando o valor salvo não é JSON válido', async () => {
    const logError = jest.spyOn(logger, 'error').mockImplementation(() => {});
    await createAsyncStorage('appfiap').setItem('guardianId', '{quebrado');
    await expect(storage.getItem('guardianId', isString)).resolves.toBeUndefined();
    expect(logError).toHaveBeenCalled();
    logError.mockRestore();
  });

  it('remove um valor', async () => {
    await storage.setItem('guardianId', '1');
    await storage.removeItem('guardianId');
    await expect(storage.getItem('guardianId', isString)).resolves.toBeUndefined();
  });
});
