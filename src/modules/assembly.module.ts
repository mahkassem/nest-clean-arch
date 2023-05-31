import { AddressModule } from './address/address.module';

import { Module } from '@nestjs/common';

@Module({
    imports: [
        AddressModule,
    ],
    exports: [
        AddressModule,
    ],
})
export class AssemblyModule { }
