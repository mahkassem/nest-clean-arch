import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import ConfigurationSetup from 'src/core/setups/configuration.setup';
import DatabaseSetup from 'src/core/setups/database.setup';
import { DB_ENTITIES } from 'src/infrastructure/context/database.context';
import { DB_SEEDERS } from './initial.seeder';

seeder({
  imports: [
    ConfigurationSetup(),
    DatabaseSetup(),
    TypeOrmModule.forFeature(DB_ENTITIES),
  ],
}).run(DB_SEEDERS);
