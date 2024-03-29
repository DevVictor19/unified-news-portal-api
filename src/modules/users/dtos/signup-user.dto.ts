import { IsEmail, IsString, Length } from 'class-validator';

export class SignupUserDto {
  @IsString()
  @Length(4, 55)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 25)
  password: string;
}
