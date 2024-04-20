import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, IsString, Length, Max } from 'class-validator';

export class SearchQueryDto {
  @IsOptional()
  @IsString()
  @Length(1, 55)
  searchTerm?: string;

  @IsPositive()
  @Transform(({ value }) => Number(value))
  @Max(100)
  limitPerPage: number;

  @IsPositive()
  @Transform(({ value }) => Number(value))
  pageNumber: number;
}
