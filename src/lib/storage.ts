import { createAsyncStorage } from '@react-native-async-storage/async-storage';

import { logger } from './logger';

const asyncStorage = createAsyncStorage('appfiap');

/**
 * @description Persistência local com valores serializados em JSON.
 */
export const storage = {
  /**
   * Lê e valida um valor salvo.
   * @param key - Chave do valor.
   * @param isValid - Type guard que confirma o formato do valor lido.
   * @returns O valor, ou `undefined` se não existir, não for JSON válido ou não passar no `isValid`.
   */
  async getItem<T>(
    key: string,
    isValid: (value: unknown) => value is T,
  ): Promise<T | undefined> {
    try {
      const raw = await asyncStorage.getItem(key);
      if (raw === null) return undefined;
      const value: unknown = JSON.parse(raw);
      return isValid(value) ? value : undefined;
    } catch (error) {
      logger.error(error, { key });
      return undefined;
    }
  },

  /**
   * Salva um valor serializado em JSON.
   * @param key - Chave do valor.
   * @param value - Valor serializável em JSON.
   */
  async setItem(key: string, value: unknown): Promise<void> {
    await asyncStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * Remove um valor salvo.
   * @param key - Chave do valor.
   */
  async removeItem(key: string): Promise<void> {
    await asyncStorage.removeItem(key);
  },
};
