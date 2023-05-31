import { IConfig } from '../interfaces/configuration.interface';
import appConfig from './application/application.config';
import dbConfig from './database/mysql.config';
import storageConfig from './storage/index';

export default () => ({
  app: appConfig(),
  db: dbConfig(),
  storage: storageConfig(),
}) as IConfig;