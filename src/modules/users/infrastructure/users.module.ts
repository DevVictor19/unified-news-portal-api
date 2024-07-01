import { Module } from '@nestjs/common';

import { HashProvider } from './providers/hash/hash.provider';
import { TemplateEngineProvider } from './providers/template-engine/template-engine.provider';
import { MailService } from './services/mail/mail.service';
import { UsersAdminController } from './users-admin.controller';
import { UsersController } from './users.controller';
import { IHashProvider } from '../application/providers/hash-provider.interface';
import { ITemplateEngineProvider } from '../application/providers/template-engine-provider.interface';
import { IMailService } from '../application/services/mail-service.interface';
import {
  ChangePasswordUseCase,
  ChangeUserRoleUseCase,
  CreateUserUseCase,
  DeleteUserUseCase,
  FindByIdUserUseCase,
  LoginUserUseCase,
  SearchUsersUseCase,
  SendEmailVerificationUseCase,
  SendPasswordRecoveryEmailUseCase,
  SignupUserUseCase,
  UpdateSubscriptionsUseCase,
  VerifyEmailUseCase,
} from '../application/usecases';
import { UpdateComunicationsUseCase } from '../application/usecases/update-comunications.usecase';

@Module({
  controllers: [UsersController, UsersAdminController],
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
    ChangeUserRoleUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    FindByIdUserUseCase,
    SearchUsersUseCase,
    UpdateSubscriptionsUseCase,
    UpdateComunicationsUseCase,
  ],
})
export class UsersModule {}
