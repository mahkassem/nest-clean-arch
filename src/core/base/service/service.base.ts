import { Injectable, Scope, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { BaseEntity } from 'src/infrastructure/base/base.entity';
import { GlobalExceptionFilter } from 'src/core/filters/exceptions/global-exception.filter';
import { PaginatedRequest } from '../requests/paginated.request';

export interface IBaseService<T extends BaseEntity> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
  softDelete(id: string): Promise<UpdateResult>;
  restore(id: string): Promise<UpdateResult>;
  count(): Promise<number>;
}

@Injectable({ scope: Scope.REQUEST })
export abstract class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(
    @InjectRepository(Repository<T>)
    public _repo: Repository<T>
  ) { }

  @UseInterceptors(GlobalExceptionFilter)
  async findAllActive(options?: PaginatedRequest): Promise<T[]> {
    let query: any;
    if (!isNaN(options.skip)) query = { skip: options.skip };
    if (!isNaN(options.take)) query = { ...query, take: options.take };
    if (options.where && options.where.length) query = { ...query, where: options.where, is_active: true };
    if (options.order) query = { ...query, order: options.order };
    if (options.relations) query = { ...query, relations: options.relations };
    if (options.select) query = { ...query, select: options.select };

    return await this._repo.find(query);
  }

  @UseInterceptors(GlobalExceptionFilter)
  async findAll(options?: PaginatedRequest): Promise<T[]> {
    let query: any;
    if (!isNaN(options.skip)) query = { skip: options.skip };
    if (!isNaN(options.take)) query = { ...query, take: options.take };
    if (options.where && options.where.length) query = { ...query, where: options.where };
    if (options.order) query = { ...query, order: options.order };
    if (options.relations) query = { ...query, relations: options.relations };
    if (options.select) query = { ...query, select: options.select };

    return await this._repo.find(query);
  }

  async findOne(column: string | Partial<T>): Promise<T> {
    const query = typeof column === 'string' ? { id: column } : column;
    return await this._repo.createQueryBuilder().where(query).getOne();
  }

  async create(entity: T): Promise<T> {
    return await this._repo.save(entity);
  }

  async update(entity: T): Promise<T> {
    // update the entity
    return await this._repo.save(entity);
  }

  async delete(id: string): Promise<DeleteResult> {
    // delete the entity
    return await this._repo.delete(id);
  }

  async softDelete(id: string): Promise<UpdateResult> {
    const entity = await this._repo.softDelete(id);
    return entity;
  }

  async restore(id: string): Promise<UpdateResult> {
    const entity = await this._repo.restore(id);
    return entity;
  }

  async count(): Promise<number> {
    return await this._repo.createQueryBuilder().getCount();
  }
}
