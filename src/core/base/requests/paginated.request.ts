import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { toRightNumber } from 'src/core/helpers/cast.helper';
import {
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

export interface WhereFilter {
  [key: string]: string;
}

export type SortHandle = 'ASC' | 'DESC';

export interface SortFilter {
  [key: string]: SortHandle;
}

export interface IncludesFilter {
  [key: string]: boolean | IncludesFilter;
}

export class PaginatedRequest {
  @Transform(({ value }) => toRightNumber(value, { min: 1 }))
  @ApiProperty({ required: false, minimum: 1 })
  @IsOptional()
  @IsNumber()
  page: number;

  @Transform(({ value }) => toRightNumber(value, { min: 1 }))
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  filters: string[]; // [ 'name=John', 'age=20,name=Mahmoud' ]

  @ApiProperty({ required: false })
  @IsOptional()
  sortBy: string[]; // [ 'name,ASC', 'age,DESC' ]

  @ApiProperty({ required: false })
  @IsOptional()
  includes: string[]; // [ 'addresses', 'profile' ]

  @ApiProperty({ required: false })
  @IsOptional()
  select: object;

  get skip(): number {
    if (this.page && !this.limit) {
      return (this.page - 1) * 10;
    }
    return (this.page - 1) * this.limit;
  }

  get take(): number {
    if (this.page && !this.limit) return 10;
    return this.limit;
  }

  get where(): WhereFilter | WhereFilter[] {
    const whereFilters: WhereFilter[] | WhereFilter = [];

    // convert filters to array if it's a string
    if (this.filters && typeof this.filters === 'string') {
      this.filters = [this.filters];
    }

    // return empty object if filters is empty
    if (!this.filters) return {};

    // convert filters to where filters
    this.filters.forEach((filter) => {
      let whereFilter = {};
      const filterParts = filter.split(',');
      filterParts.forEach((filterPart) => {
        const operator = this.getOperator(filterPart);

        const [key, value] = filterPart.split(operator);
        switch (operator) {
          case '<':
            whereFilter = { ...whereFilter, [key]: LessThan(value) };
            break;
          case '>':
            whereFilter = { ...whereFilter, [key]: MoreThan(value) };
            break;
          case '<=':
            whereFilter = { ...whereFilter, [key]: LessThanOrEqual(value) };
            break;
          case '>=':
            whereFilter = { ...whereFilter, [key]: MoreThanOrEqual(value) };
            break;
          case '!=':
            whereFilter = { ...whereFilter, [key]: Not(value) };
            break;
          default:
            whereFilter = { ...whereFilter, [key]: value };
            break;
        }
      });
      whereFilters.push(whereFilter);
    });
    return whereFilters;
  }

  get order(): SortFilter {
    let orderFilters: SortFilter;

    // convert sortBy to array if it's a string
    if (this.sortBy && typeof this.sortBy === 'string') {
      this.sortBy = [this.sortBy];
    }

    // return empty object if sortBy is empty
    if (!this.sortBy) return orderFilters;

    // convert sortBy to order filters
    this.sortBy.forEach((sort) => {
      const [key, value] = sort.split('=').slice(0, 2);
      orderFilters = {
        ...orderFilters,
        [key]: value ? (value as SortHandle) : 'ASC',
      };
    });

    return orderFilters;
  }

  get relations(): IncludesFilter {
    let relations: IncludesFilter;
    // convert includes to array if it's a string
    if (this.includes && typeof this.includes === 'string') {
      this.includes = [this.includes];
    }

    // return empty object if includes is empty
    if (!this.includes) return relations;

    // convert includes to relations
    this.includes.forEach((include) => {
      relations = { ...relations, ...this.handleSubRelations(include) };
    });

    return relations;
  }

  // handle sub relations with level limit of x
  private handleSubRelations(include: string): IncludesFilter {
    const subRelations = include.split('.');
    if (subRelations.length > 1) {
      const subRelation = subRelations.shift();
      return { [subRelation]: this.handleSubRelations(subRelations.join('.')) };
    } else {
      return { [include]: true };
    }
  }

  private getOperator(statement: string): string {
    if (statement.includes('<=')) return '<=';
    if (statement.includes('>=')) return '>=';
    if (statement.includes('<')) return '<';
    if (statement.includes('>')) return '>';
    if (statement.includes('!=')) return '!=';
    return '=';
  }
}
