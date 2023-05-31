import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/infrastructure/data/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);