import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserMongoEntityMapper } from './database/models/mongo/users-mongo-model.mapper';
import {
  UserMongoEntity,
  UserMongoSchema,
} from './database/models/mongo/users-mongo.model';
import { UsersMongoRepository } from './database/repositories/mongo/users-mongo.repository';
import { IUsersRepository } from './database/repositories/users-repository.interface';
import { UserEntityFactory } from './entities/users.factory';
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
  imports: [
    MongooseModule.forFeature([
      { name: UserMongoEntity.name, schema: UserMongoSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UserMongoEntityMapper,
    UserEntityFactory,
    {
      provide: IUsersRepository,
      useClass: UsersMongoRepository,
    },
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
