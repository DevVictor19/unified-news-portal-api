import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateSubjectsDto {
  @IsString()
  @Length(2, 25)
  @Transform(({ value }) => value?.trim())
  name: string;
}
