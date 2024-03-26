import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';

import { LoginUserDto } from './dtos/login-user.dto';
import { SignupUserDto } from './dtos/signup-user.dto';
import { SignupUserUseCase } from './usecases';
import { LoginUserUseCase } from './usecases/login-user.usecase';
import { VerifyEmailUseCase } from './usecases/verify-email.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private signupUserUseCase: SignupUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
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

  @Get('/verify')
  verifyEmail(@Query('token') token: string) {
    return this.verifyEmailUseCase.execute({ token });
  }
}
