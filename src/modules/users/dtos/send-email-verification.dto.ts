import { IsEmail } from 'class-validator';

export class SendEmailVerificationDto {
  @IsEmail()
  email: string;
}
