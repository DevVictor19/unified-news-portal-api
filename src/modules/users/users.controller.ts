import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';

import { SignupUserDto, LoginUserDto, SendEmailVerificationDto } from './dtos';
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

  @Post('/send-email-verification')
  @HttpCode(200)
  sendEmailVerification(@Body() dto: SendEmailVerificationDto) {
    return this.sendEmailVerificationUseCase.execute(dto);
  }

  @Get('/verify')
  verifyEmail(@Query('token') token: string) {
    return this.verifyEmailUseCase.execute({ token });
  }
}
