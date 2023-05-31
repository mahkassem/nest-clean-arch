import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { JwtStrategy } from "src/modules/authentication/strategies/jwt.strategy";

export default () => (
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      defaultStrategy: JwtStrategy,
      ...jwtOptions(config),
    }),
    inject: [ConfigService],
  })
);

export const jwtOptions = (config: ConfigService): JwtModuleOptions => ({
  secret: config.get<string>('app.key'),
  signOptions: { expiresIn: config.get<string>('JWT_EXPIRATION') },
});

export const jwtSignOptions = (config: ConfigService) => ({
  secret: config.get<string>('app.key'),
  expiresIn: config.get<string>('JWT_EXPIRATION'),
});