import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  ValidateNested,
} from 'class-validator';

import { IsStringOrStringArray } from '../decorators/is-string-or-array.decorator';

import { Operator } from '@/common/domain/repositories/base-search-repository.interface';

export class SearchDto {
  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => value.trim())
  field: string;

  @IsIn([
    'equals',
    'contains',
    'startsWith',
    'endsWith',
    'greaterThan',
    'lessThan',
  ])
  operator: Operator;

  @IsStringOrStringArray()
  @Length(1, 255, { each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((v) => v.trim()) : value.trim(),
  )
  value: string | string[];
}

export class OrderDto {
  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => value.trim())
  field: string;

  @IsIn(['ASC', 'DESC'])
  direction: 'ASC' | 'DESC';
}

export class PaginationDto {
  @IsPositive()
  @Transform(({ value }) => Number(value))
  @Max(100)
  limitPerPage: number;

  @IsPositive()
  @Transform(({ value }) => Number(value))
  pageNumber: number;

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(10)
  @Type(() => SearchDto)
  search?: SearchDto[];

  @ValidateNested({ each: true })
  @IsOptional()
  @IsObject()
  @Type(() => OrderDto)
  order?: OrderDto;
}
