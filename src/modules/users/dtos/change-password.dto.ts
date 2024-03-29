import { IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @Length(4, 25)
  password: string;
}
