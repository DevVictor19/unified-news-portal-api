import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4, 55)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 25)
  password: string;
}
