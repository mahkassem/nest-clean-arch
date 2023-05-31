import { Inject, Injectable, Scope, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/infrastructure/entities/user/user.entity';
import { GlobalExceptionFilter } from 'src/core/filters/exceptions/global-exception.filter';
import { PaginatedRequest } from '../requests/paginated.request';
import { BaseService, IBaseService } from './service.base';
import { OwnedEntity } from 'src/infrastructure/base/owned.entity';


export interface IBaseUserService<T extends OwnedEntity> extends IBaseService<T> {
  findAllActive(options?: PaginatedRequest): Promise<T[]>;
  get currentUser(): User;
}

@Injectable({ scope: Scope.REQUEST })
export abstract class BaseUserService<T extends OwnedEntity> extends BaseService<T> implements IBaseUserService<T> {
  constructor(
    @InjectRepository(Repository<T>)
    public _repo: Repository<T>,
    @Inject(REQUEST) private readonly request: Request
  ) {
    super(_repo);
  }

  @UseInterceptors(GlobalExceptionFilter)
  async findAllOwned(options?: PaginatedRequest): Promise<T[]> {
    if (options.filters)
      options.filters.push(`user_id=${this.currentUser.id}`);
    else
      options.filters = [`user_id=${this.currentUser.id}`]
    return await this.findAll(options);
  }

  get currentUser(): User {
    return this.request.user;
  }
}
