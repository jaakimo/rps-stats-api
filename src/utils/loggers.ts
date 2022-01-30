export const errorLogger = (e: unknown, ...rest: unknown[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(e, ...rest);
  }
};
export const logger = (message: string, ...rest: unknown[]) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${message}`, ...rest);
  }
};
