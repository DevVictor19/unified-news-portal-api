import { Body, Controller, Post } from '@nestjs/common';

import { SignupUserDto } from './dtos/signup-user.dto';
import { SignupUserUseCase } from './usecases';

@Controller('/users')
export class UsersController {
  constructor(private signupUserUseCase: SignupUserUseCase) {}

  @Post('/')
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.signupUserUseCase.execute(signupUserDto);
  }
}
