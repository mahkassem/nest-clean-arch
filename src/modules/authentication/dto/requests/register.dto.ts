import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Unique } from 'src/core/validators/unique-constraints.validator';
import { Role } from 'src/infrastructure/data/enums/role.enum';

export class RegisterRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Unique('User')
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Unique('User')
  phone: string;

  @ApiProperty({ type: 'file', required: false })
  @IsOptional()
  avatarFile: Express.Multer.File;

  @ApiProperty({ default: Role.CLIENT, enum: [Role.CLIENT, Role.DRIVER] })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
