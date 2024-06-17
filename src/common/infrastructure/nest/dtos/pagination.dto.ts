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

  @IsString()
  @Length(1, 255)
  @Transform(({ value }) => value.trim())
  value: string;
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
