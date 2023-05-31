import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity as TypeORMBaseEntity,
} from 'typeorm';

@Entity()
export abstract class BaseEntity extends TypeORMBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
}