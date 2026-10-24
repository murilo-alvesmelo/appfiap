/**
 * @description Função de tracking de logs.
 */
export const logger = {
  debug: (...args: unknown[]) => {
    if (__DEV__) console.debug(...args);
  },
  info: (...args: unknown[]) => {
    if (__DEV__) console.info(...args);
  },
  error: (error: unknown, context?: Record<string, unknown>) => {
    console.error(error, context);
  },
};
