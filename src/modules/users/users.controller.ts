import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';

import { LoginUserDto } from './dtos/login-user.dto';
import { SendEmailVerificationDto } from './dtos/send-email-verification.dto';
import { SignupUserDto } from './dtos/signup-user.dto';
import {
  SignupUserUseCase,
  LoginUserUseCase,
  SendEmailVerificationUseCase,
  VerifyEmailUseCase,
} from './usecases';

@Controller('/users')
export class UsersController {
  constructor(
    private signupUserUseCase: SignupUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private sendEmailVerificationUseCase: SendEmailVerificationUseCase,
    private verifyEmailUseCase: VerifyEmailUseCase,
  ) {}

  @Post('/signup')
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.signupUserUseCase.execute(signupUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  @Post('/send-verification')
  @HttpCode(200)
  sendEmailVerification(@Body() dto: SendEmailVerificationDto) {
    return this.sendEmailVerificationUseCase.execute(dto);
  }

  @Get('/verify')
  verifyEmail(@Query('token') token: string) {
    return this.verifyEmailUseCase.execute({ token });
  }
}
