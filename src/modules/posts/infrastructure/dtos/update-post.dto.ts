import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  text: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  categories: string[];

  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  courses: string[];

  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  classes: string[];

  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  subjects: string[];

  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  post_types: string[];
}
