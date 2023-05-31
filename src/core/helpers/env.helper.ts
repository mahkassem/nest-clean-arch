import * as dotenv from 'dotenv';

dotenv.config();

/**
 * 
 * @param key Environment variable key
 * @param type Environment variable type: 'string', 'number', 'boolean'
 * @returns Environment variable value of type TEnvValue: string, number, boolean
 */
export const readEnv = (key: string, type: TEnv = 'string'): TEnvValue => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  switch (type) {
    case 'number':
      return parseInt(value, 10);
    case 'boolean':
      return value === 'true';
    default:
      return value;
  }
}
