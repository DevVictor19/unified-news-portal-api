import { IsEmail } from 'class-validator';

export class SendPasswordRecoveryEmailDto {
  @IsEmail()
  email: string;
}
