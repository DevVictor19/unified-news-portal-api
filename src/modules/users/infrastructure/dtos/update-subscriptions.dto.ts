import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class UpdateSubscriptionsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  courses: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  classes: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  subjects: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  post_type: string[];
}
