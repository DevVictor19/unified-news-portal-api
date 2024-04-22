import { Module } from '@nestjs/common';

import { HashProvider } from './providers/hash/hash.provider';
import { TemplateEngineProvider } from './providers/template-engine/template-engine.provider';
import { MailService } from './services/mail/mail.service';
import { UsersController } from './users.controller';
import { IHashProvider } from '../application/providers/hash-provider.interface';
import { ITemplateEngineProvider } from '../application/providers/template-engine-provider.interface';
import { IMailService } from '../application/services/mail-service.interface';
import {
  ChangePasswordUseCase,
  LoginUserUseCase,
  SendEmailVerificationUseCase,
  SendPasswordRecoveryEmailUseCase,
  SignupUserUseCase,
  VerifyEmailUseCase,
} from '../application/usecases';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: IHashProvider,
      useClass: HashProvider,
    },
    {
      provide: ITemplateEngineProvider,
      useClass: TemplateEngineProvider,
    },
    {
      provide: IMailService,
      useClass: MailService,
    },
    ChangePasswordUseCase,
    LoginUserUseCase,
    SendEmailVerificationUseCase,
    SendPasswordRecoveryEmailUseCase,
    SignupUserUseCase,
    VerifyEmailUseCase,
  ],
})
export class UsersModule {}
