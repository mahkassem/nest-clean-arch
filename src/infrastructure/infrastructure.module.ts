import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DB_ENTITIES } from './context/database.context';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature(DB_ENTITIES)
    ],
    exports: [TypeOrmModule]
})
export class InfrastructureModule { }
