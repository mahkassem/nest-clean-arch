import {
    Entity,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export abstract class AuditableEntity extends BaseEntity {
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}