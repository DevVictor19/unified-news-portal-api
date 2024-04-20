import { Module } from '@nestjs/common';

import { IHashProvider } from './providers/hash/hash-provider.interface';
import { HashProvider } from './providers/hash/hash.provider';
import { ITemplateEngineProvider } from './providers/template-engine/template-engine-provider.interface';
import { TemplateEngineProvider } from './providers/template-engine/template-engine.provider';
import { IMailService } from './services/mail/mail-service.interface';
import { MailService } from './services/mail/mail.service';
import {
  ChangePasswordUseCase,
  LoginUserUseCase,
  SendEmailVerificationUseCase,
  SendPasswordRecoveryEmailUseCase,
  SignupUserUseCase,
  VerifyEmailUseCase,
} from './usecases';
import { UsersController } from './users.controller';

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
