
import { ConfigModule } from '@nestjs/config';
import config from '../configuration';
import { configSchema } from '../configuration/config.schema';

export default () => (
  ConfigModule.forRoot({
    cache: true,
    isGlobal: true,
    load: [config],
    validationSchema: configSchema,
  })
);