import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserSchema } from './entities/users.entity';
import { UsersFactory } from './entities/users.factory';
import { IHashProvider } from './providers/hash-provider.interface';
import { BcryptHashProvider } from './providers/implementations/bcrypt-hash.provider';
import { HandleBarsTemplateEngineProvider } from './providers/implementations/handlebars-template-engine.provider';
import { JsonWebTokenProvider } from './providers/implementations/jsonwebtoken.provider';
import { NodeMailerMailProvider } from './providers/implementations/nodemailer-mail.provider';
import { IJwtProvider } from './providers/jwt-provider.interface';
import { IMailProvider } from './providers/mail-provider.interface';
import { ITemplateEngineProvider } from './providers/template-engine-provider.interface';
import { UsersMongoRepository } from './repositories/implementations/users-mongo.repository';
import { IUsersRepository } from './repositories/users-repository.interface';
import { SignupUserUseCase } from './usecases';
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
        usersReporitory: IUsersRepository,
        usersFactory: UsersFactory,
        hashProvider: IHashProvider,
        templateProvider: ITemplateEngineProvider,
        jwtProvider: IJwtProvider,
        mailProvider: IMailProvider,
        configService: ConfigService,
      ) => {
        const serverUrl = configService.getOrThrow<string>('server.url');

        return new SignupUserUseCase(
          usersReporitory,
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
  ],
})
export class UsersModule {}
