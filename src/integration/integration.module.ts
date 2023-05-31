import { Global, Module } from '@nestjs/common';
import { GatewaysModule } from './gateways/gateways.module';
import { ImageManager } from './sharp/image.manager';
import { StorageManager } from './storage/storage.manager';

@Global()
@Module({
    imports: [
        GatewaysModule, // *Socket.io
    ],
    providers: [
        StorageManager,
        ImageManager,
    ],
    exports: [
        StorageManager,
        ImageManager,
    ]
})
export class IntegrationModule { }
