import { readEnv } from 'src/core/helpers/env.helper';
import { IApplicationConfig } from 'src/core/interfaces/application.interface';

export default () => ({
  name: readEnv('APP_NAME'),
  env: readEnv('APP_ENV'),
  host: readEnv('APP_HOST'),
  port: readEnv('APP_PORT', 'number'),
  key: readEnv('APP_KEY'),
}) as IApplicationConfig;