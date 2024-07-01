import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';

import {
  SignupUserDto,
  LoginUserDto,
  SendEmailVerificationDto,
  SendPasswordRecoveryEmailDto,
  ChangePasswordDto,
  UpdateSubscriptionsDto,
} from './dtos';
import {
  SignupUserUseCase,
  LoginUserUseCase,
  SendEmailVerificationUseCase,
  ChangePasswordUseCase,
  SendPasswordRecoveryEmailUseCase,
  VerifyEmailUseCase,
  UpdateSubscriptionsUseCase,
} from '../application/usecases';

@Controller('users')
export class UsersController {
  constructor(
    private signupUserUseCase: SignupUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private sendEmailVerificationUseCase: SendEmailVerificationUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
    private sendPasswordRecoveryEmailUseCase: SendPasswordRecoveryEmailUseCase,
    private verifyEmailUseCase: VerifyEmailUseCase,
    private updateSubscriptionsUseCase: UpdateSubscriptionsUseCase,
  ) {}

  @Post('signup')
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.signupUserUseCase.execute(signupUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }

  @Post('send-email-verification')
  @HttpCode(200)
  sendEmailVerification(@Body() dto: SendEmailVerificationDto) {
    return this.sendEmailVerificationUseCase.execute(dto);
  }

  @Post('send-password-recovery')
  @HttpCode(200)
  sendPasswordRecoveryEmail(@Body() dto: SendPasswordRecoveryEmailDto) {
    return this.sendPasswordRecoveryEmailUseCase.execute(dto);
  }

  @Patch('change-password')
  changePassword(
    @Query('token') token: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.changePasswordUseCase.execute({
      password: dto.password,
      token,
    });
  }

  @Get('verify')
  verifyEmail(@Query('token') token: string) {
    return this.verifyEmailUseCase.execute({ token });
  }

  @Put('subscriptions')
  updateSubscriptions(@Body() dto: UpdateSubscriptionsDto, @Req() req: any) {
    const user_id: string = req.user.userId;
    return this.updateSubscriptionsUseCase.execute({
      payload: dto,
      user_id,
    });
  }
}
