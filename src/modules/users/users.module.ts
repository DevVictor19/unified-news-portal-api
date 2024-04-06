import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  UserMongoEntity,
  UserMongoSchema,
} from './database/models/mongo/users-mongo.model';
import { UsersMongoRepository } from './database/repositories/mongo/users-mongo.repository';
import { USERS_REPOSITORY } from './database/repositories/users-repository.constants';
import { IUsersRepository } from './database/repositories/users-repository.interface';
import { UserEntityFactory } from './entities/users.factory';
import { BcryptHashProvider } from './providers/hash/bcrypt/bcrypt-hash.provider';
import { IHashProvider } from './providers/hash/hash-provider.interface';
import { HandleBarsTemplateEngineProvider } from './providers/template-engine/handlebars/handlebars-template-engine.provider';
import { ITemplateEngineProvider } from './providers/template-engine/template-engine-provider.interface';
import { IMailService } from './services/mail/mail-service.interface';
import { NodeMailerMailService } from './services/mail/nodemailer/nodemailer-mail.service';
import {
  LoginUserUseCase,
  SignupUserUseCase,
  VerifyEmailUseCase,
  SendEmailVerificationUseCase,
  SendPasswordRecoveryEmailUseCase,
  ChangePasswordUseCase,
} from './usecases';
import { UsersController } from './users.controller';
import { PROVIDERS } from '../../common/enums/providers.enum';
import { IJwtProvider } from '../common/jwt/providers/jwt/jwt-provider.interface';

import { SERVICES } from '@/common/enums/services.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMongoEntity.name, schema: UserMongoSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useFactory: (userModel: Model<UserMongoEntity>) => {
        return new UsersMongoRepository(userModel);
      },
      inject: [getModelToken(UserMongoEntity.name)],
    },
    {
      provide: UserEntityFactory,
      useClass: UserEntityFactory,
    },
    {
      provide: PROVIDERS.HASH,
      useClass: BcryptHashProvider,
    },
    {
      provide: PROVIDERS.TEMPLATE_ENGINE,
      useClass: HandleBarsTemplateEngineProvider,
    },
    {
      provide: SERVICES.MAIL,
      useFactory: (configService: ConfigService) => {
        const mailUser = configService.getOrThrow<string>('mail.email');
        const mailName = configService.getOrThrow<string>('mail.name');
        const mailPassword = configService.getOrThrow<string>('mail.password');
        return new NodeMailerMailService(mailUser, mailName, mailPassword);
      },
      inject: [ConfigService],
    },
    {
      provide: SignupUserUseCase,
      useFactory: (
        usersRepository: IUsersRepository,
        userEntityFactory: UserEntityFactory,
        hashProvider: IHashProvider,
        templateProvider: ITemplateEngineProvider,
        jwtProvider: IJwtProvider,
        mailService: IMailService,
        configService: ConfigService,
      ) => {
        const serverUrl = configService.getOrThrow<string>('server.url');

        return new SignupUserUseCase(
          usersRepository,
          userEntityFactory,
          hashProvider,
          templateProvider,
          jwtProvider,
          mailService,
          serverUrl,
        );
      },
      inject: [
        USERS_REPOSITORY,
        UserEntityFactory,
        PROVIDERS.HASH,
        PROVIDERS.TEMPLATE_ENGINE,
        PROVIDERS.JWT,
        SERVICES.MAIL,
        ConfigService,
      ],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (
        usersRepository: IUsersRepository,
        hashProvider: IHashProvider,
        jwtProvider: IJwtProvider,
      ) => {
        return new LoginUserUseCase(usersRepository, hashProvider, jwtProvider);
      },
      inject: [USERS_REPOSITORY, PROVIDERS.HASH, PROVIDERS.JWT],
    },
    {
      provide: SendEmailVerificationUseCase,
      useFactory: (
        usersRepository: IUsersRepository,
        templateProvider: ITemplateEngineProvider,
        mailService: IMailService,
        jwtProvider: IJwtProvider,
        configService: ConfigService,
      ) => {
        const serverUrl = configService.getOrThrow<string>('server.url');
        return new SendEmailVerificationUseCase(
          usersRepository,
          templateProvider,
          mailService,
          jwtProvider,
          serverUrl,
        );
      },
      inject: [
        USERS_REPOSITORY,
        PROVIDERS.TEMPLATE_ENGINE,
        SERVICES.MAIL,
        PROVIDERS.JWT,
        ConfigService,
      ],
    },
    {
      provide: VerifyEmailUseCase,
      useFactory: (
        jwtProvider: IJwtProvider,
        usersRepository: IUsersRepository,
      ) => {
        return new VerifyEmailUseCase(jwtProvider, usersRepository);
      },
      inject: [PROVIDERS.JWT, USERS_REPOSITORY],
    },
    {
      provide: SendPasswordRecoveryEmailUseCase,
      useFactory: (
        usersRepository: IUsersRepository,
        jwtProvider: IJwtProvider,
        templateProvider: ITemplateEngineProvider,
        mailService: IMailService,
      ) => {
        return new SendPasswordRecoveryEmailUseCase(
          usersRepository,
          jwtProvider,
          templateProvider,
          mailService,
        );
      },
      inject: [
        USERS_REPOSITORY,
        PROVIDERS.JWT,
        PROVIDERS.TEMPLATE_ENGINE,
        SERVICES.MAIL,
      ],
    },
    {
      provide: ChangePasswordUseCase,
      useFactory: (
        usersRepository: IUsersRepository,
        jwtProvider: IJwtProvider,
        hashProvider: IHashProvider,
      ) => {
        return new ChangePasswordUseCase(
          usersRepository,
          jwtProvider,
          hashProvider,
        );
      },
      inject: [USERS_REPOSITORY, PROVIDERS.JWT, PROVIDERS.HASH],
    },
  ],
})
export class UsersModule {}
