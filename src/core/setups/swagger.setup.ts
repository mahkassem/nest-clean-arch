import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AddressModule } from 'src/modules/address/address.module';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { DriverModule } from 'src/modules/driver/driver.module';
import { FileModule } from 'src/modules/file/file.module';
import { OrderModule } from 'src/modules/order/order.module';
import { UserModule } from 'src/modules/user/user.module';
import { VehicleModule } from 'src/modules/vehicle/vehicle.module';

export default (app: INestApplication, config: ConfigService) => {
  const operationIdFactory = (controllerKey: string, methodKey: string) =>
    methodKey;

  const publicConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`${config.get('APP_NAME')} API`)
    .setDescription(`${config.get('APP_NAME')} API description`)
    .setVersion('v1')
    .setContact('Contact', 'https://www.alexforprog.com', 'dev@alexforprog.com')
    .setLicense('Developed by AlexForProg', 'https://www.alexforprog.com')
    .addServer(config.get('APP_HOST'))
    .build();

  // use fs to read all files in a directory: src/modules/**/*.module.ts

  const publicDocument = SwaggerModule.createDocument(app, publicConfig, {
    include: [
      AuthenticationModule,
      UserModule,
      AddressModule,
      DriverModule,
      VehicleModule,
      FileModule,
      OrderModule,
    ],
    operationIdFactory,
  });

  SwaggerModule.setup('swagger', app, publicDocument);
};
