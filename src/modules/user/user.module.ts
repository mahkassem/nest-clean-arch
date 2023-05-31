import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
