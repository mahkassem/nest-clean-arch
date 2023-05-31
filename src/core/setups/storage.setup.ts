import { StorageModule } from "@codebrew/nestjs-storage";
import { DriverType } from "@codebrew/nestjs-storage/dist";
import { ConfigModule, ConfigService } from "@nestjs/config";

export default () => (
  StorageModule.forRoot({
    default: 'local',
    disks: {
      local: {
        driver: DriverType.LOCAL,
        config: {
          root: process.cwd(),
        },
      },
      s3: {
        driver: DriverType.S3,
        config: {
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) =>
            config.get<string>('storage.s3'),
          inject: [ConfigService],
        },
      },
    },
  })
)