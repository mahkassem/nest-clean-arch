import { CacheModule } from "@nestjs/common";

export default () => (
  CacheModule.register({
    isGlobal: true,
  })
);