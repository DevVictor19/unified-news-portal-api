import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserSchema } from './entities/users.entity';
import { UsersFactory } from './entities/users.factory';
import { BcryptHashProvider } from './providers/hash/bcrypt/bcrypt-hash.provider';
import { IHashProvider } from './providers/hash/hash-provider.interface';
import { JsonWebTokenProvider } from './providers/jwt/jsonwebtoken/jsonwebtoken.provider';
import { IJwtProvider } from './providers/jwt/jwt-provider.interface';
import { IMailProvider } from './providers/mail/mail-provider.interface';
import { NodeMailerMailProvider } from './providers/mail/nodemailer/nodemailer-mail.provider';
import { HandleBarsTemplateEngineProvider } from './providers/template-engine/handlebars/handlebars-template-engine.provider';
import { ITemplateEngineProvider } from './providers/template-engine/template-engine-provider.interface';
import { UsersMongoRepository } from './repositories/mongo/users-mongo.repository';
import { IUsersRepository } from './repositories/users-repository.interface';
import {
  LoginUserUseCase,
  SignupUserUseCase,
  VerifyEmailUseCase,
  SendEmailVerificationUseCase,
} from './usecases';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersRepository',
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
      provide: 'HashProvider',
      useClass: BcryptHashProvider,
    },
    {
      provide: 'TemplateEngineProvider',
      useClass: HandleBarsTemplateEngineProvider,
    },
    {
      provide: 'JwtProvider',
      useFactory: (configService: ConfigService) => {
        return new JsonWebTokenProvider(
          configService.getOrThrow<string>('server.secret_key'),
        );
      },
      inject: [ConfigService],
    },
    {
      provide: 'MailProvider',
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
        'UsersRepository',
        UsersFactory,
        'HashProvider',
        'TemplateEngineProvider',
        'JwtProvider',
        'MailProvider',
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
      inject: ['UsersRepository', 'HashProvider', 'JwtProvider'],
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
        'UsersRepository',
        'TemplateEngineProvider',
        'MailProvider',
        'JwtProvider',
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
      inject: ['JwtProvider', 'UsersRepository'],
    },
  ],
})
export class UsersModule {}
