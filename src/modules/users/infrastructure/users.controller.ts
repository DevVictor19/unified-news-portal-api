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
import { ApiTags } from '@nestjs/swagger';

import {
  SignupUserDto,
  LoginUserDto,
  SendEmailVerificationDto,
  SendPasswordRecoveryEmailDto,
  ChangePasswordDto,
  UpdateSubscriptionsDto,
  UpdateComunicationsDto,
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
import { UpdateComunicationsUseCase } from '../application/usecases/update-comunications.usecase';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import { StudentRoute } from '@/common/infrastructure/nest/decorators/roles.decorator';

@ApiTags('Users')
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
    private updateComunicationsUseCase: UpdateComunicationsUseCase,
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
  @ProtectedRoute()
  @StudentRoute()
  updateSubscriptions(@Body() dto: UpdateSubscriptionsDto, @Req() req: any) {
    const user_id: string = req.user.userId;
    return this.updateSubscriptionsUseCase.execute({
      payload: dto,
      user_id,
    });
  }

  @Patch('comunications')
  @ProtectedRoute()
  @StudentRoute()
  updateComunications(@Body() dto: UpdateComunicationsDto, @Req() req: any) {
    const user_id: string = req.user.userId;
    return this.updateComunicationsUseCase.execute({
      payload: dto.comunications,
      user_id,
    });
  }
}
