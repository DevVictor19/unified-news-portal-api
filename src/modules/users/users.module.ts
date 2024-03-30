import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserSchema } from './entities/users.entity';
import { UsersFactory } from './entities/users.factory';
import { BcryptHashProvider } from './providers/hash/bcrypt/bcrypt-hash.provider';
import { IHashProvider } from './providers/hash/hash-provider.interface';
import { IMailProvider } from './providers/mail/mail-provider.interface';
import { NodeMailerMailProvider } from './providers/mail/nodemailer/nodemailer-mail.provider';
import { HandleBarsTemplateEngineProvider } from './providers/template-engine/handlebars/handlebars-template-engine.provider';
import { ITemplateEngineProvider } from './providers/template-engine/template-engine-provider.interface';
import { UsersMongoRepository } from './repositories/mongo/users-mongo.repository';
import { USERS_REPOSITORY } from './repositories/users-repository.constants';
import { IUsersRepository } from './repositories/users-repository.interface';
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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useFactory: (userModel: Model<User>) => {
        return new UsersMongoRepository(userModel);
      },
      inject: [getModelToken(User.name)],
    },
    {
      provide: UsersFactory,
      useClass: UsersFactory,
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
      provide: PROVIDERS.MAIL,
      useFactory: (configService: ConfigService) => {
        const mailUser = configService.getOrThrow<string>('mail.email');
        const mailName = configService.getOrThrow<string>('mail.name');
        const mailPassword = configService.getOrThrow<string>('mail.password');
        return new NodeMailerMailProvider(mailUser, mailName, mailPassword);
      },
      inject: [ConfigService],
    },
    {
      provide: SignupUserUseCase,
      useFactory: (
        usersRepository: IUsersRepository,
        usersFactory: UsersFactory,
        hashProvider: IHashProvider,
        templateProvider: ITemplateEngineProvider,
        jwtProvider: IJwtProvider,
        mailProvider: IMailProvider,
        configService: ConfigService,
      ) => {
        const serverUrl = configService.getOrThrow<string>('server.url');

        return new SignupUserUseCase(
          usersRepository,
          usersFactory,
          hashProvider,
          templateProvider,
          jwtProvider,
          mailProvider,
          serverUrl,
        );
      },
      inject: [
        USERS_REPOSITORY,
        UsersFactory,
        PROVIDERS.HASH,
        PROVIDERS.TEMPLATE_ENGINE,
        PROVIDERS.JWT,
        PROVIDERS.MAIL,
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
        mailProvider: IMailProvider,
        jwtProvider: IJwtProvider,
        configService: ConfigService,
      ) => {
        const serverUrl = configService.getOrThrow<string>('server.url');
        return new SendEmailVerificationUseCase(
          usersRepository,
          templateProvider,
          mailProvider,
          jwtProvider,
          serverUrl,
        );
      },
      inject: [
        USERS_REPOSITORY,
        PROVIDERS.TEMPLATE_ENGINE,
        PROVIDERS.MAIL,
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
        mailProvider: IMailProvider,
      ) => {
        return new SendPasswordRecoveryEmailUseCase(
          usersRepository,
          jwtProvider,
          templateProvider,
          mailProvider,
        );
      },
      inject: [
        USERS_REPOSITORY,
        PROVIDERS.JWT,
        PROVIDERS.TEMPLATE_ENGINE,
        PROVIDERS.MAIL,
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
