import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserSchema } from './entities/users.entity';
import { UsersFactory } from './entities/users.factory';
import { IHashProvider } from './providers/hash-provider.interface';
import { BcryptHashProvider } from './providers/implementations/bcrypt-hash.provider';
import { UsersMongoRepository } from './repositories/implementations/users-mongo.repository';
import { IUsersRepository } from './repositories/users-repository.interface';
import { SignupUserUseCase } from './usecases/signup-user.usecase';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
      provide: SignupUserUseCase,
      useFactory: (
        usersReporitory: IUsersRepository,
        usersFactory: UsersFactory,
        hashProvider: IHashProvider,
      ) => {
        return new SignupUserUseCase(
          usersReporitory,
          usersFactory,
          hashProvider,
        );
      },
      inject: ['UsersRepository', UsersFactory, 'HashProvider'],
    },
  ],
})
export class UsersModule {}
