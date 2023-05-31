import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/entities/user/user.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/core/base/service/service.base';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {
    super(userRepo);
  }
}
