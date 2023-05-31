import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ActionResponse<T> {
  @ApiProperty() @Expose() message: string;
  @ApiProperty()
  @Expose()
  data: T;
  @ApiProperty() @Expose() statusCode: HttpStatus;

  constructor(
    data: T = null,
    options?: {
      statusCode?: HttpStatus;
      message?: string;
      meta?: { page: number; limit: number; total: number };
    },
  ) {
    this.message = options?.message || 'Success';
    this.data = data;
    this.statusCode = options?.statusCode || HttpStatus.OK;
  }
}
