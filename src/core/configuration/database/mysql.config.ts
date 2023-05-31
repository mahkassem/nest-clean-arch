import { readEnv } from 'src/core/helpers/env.helper';
import { IDatabaseConfig } from 'src/core/interfaces/database.interface';

export default () => ({
  type: 'mysql',
  host: readEnv('MYSQL_HOST'),
  port: readEnv('MYSQL_PORT', 'number'),
  username: readEnv('MYSQL_USERNAME'),
  password: readEnv('MYSQL_PASSWORD'),
  database: readEnv('MYSQL_DATABASE'),
  synchronize: readEnv('MYSQL_SYNC', 'boolean'),
  autoLoadEntities: readEnv('MYSQL_AUTOLOAD', 'boolean'),
  cache: {
    type: readEnv('CACHE_TYPE'),
    duration: readEnv('CACHE_DURATION', 'number'),
  },
  legacySpatialSupport: false,
}) as IDatabaseConfig;
