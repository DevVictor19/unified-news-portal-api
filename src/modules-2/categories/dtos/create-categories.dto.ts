import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  @Length(2, 55)
  @Transform(({ value }) => value?.trim())
  name: string;
}
