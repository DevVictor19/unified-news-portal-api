import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { SignupUserDto } from './dtos/signup-user.dto';
import { SignupUserUseCase } from './usecases';
import { VerifyEmailUseCase } from './usecases/verify-email.usecase';

@Controller('/users')
export class UsersController {
  constructor(
    private signupUserUseCase: SignupUserUseCase,
    private verifyEmailUseCase: VerifyEmailUseCase,
  ) {}

  @Post('/signup')
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.signupUserUseCase.execute(signupUserDto);
  }

  @Get('/verify')
  verifyEmail(@Query('token') token: string) {
    return this.verifyEmailUseCase.execute({ token });
  }
}
