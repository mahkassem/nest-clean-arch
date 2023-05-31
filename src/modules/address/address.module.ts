import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Module } from '@nestjs/common';
import { SetFavoriteAddressTransaction } from './utils/transactions/set-favorite-address.transaction';

@Module({
    controllers: [
        AddressController
    ],
    providers: [
        AddressService,
        SetFavoriteAddressTransaction,
    ],
})
export class AddressModule { }
