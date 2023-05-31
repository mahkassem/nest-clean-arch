import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import mysqlConfig from 'src/core/configuration/database/mysql.config';
import { DB_ENTITIES, DB_VIEWS } from './database.context';
import { SnakeNamingStrategy } from '../presistance/naming.strategy';

@Injectable()
export default class AppDbContext implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...mysqlConfig() as TypeOrmModuleOptions,
      entities: [
        ...DB_ENTITIES,
        ...DB_VIEWS,
      ],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
