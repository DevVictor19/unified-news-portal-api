import { Module } from '@nestjs/common';

import { UserModel } from './entities/users.entity';
import { UsersFactory } from './entities/users.factory';
import { UsersMongoRepository } from './repositories/implementations/users-mongo.repository';
import { IUsersRepository } from './repositories/users-repository.interface';
import { CreateUserUseCase, FindUserByEmailUseCase } from './usecases';

@Module({
  exports: [CreateUserUseCase, FindUserByEmailUseCase],
  providers: [
    {
      provide: 'UsersRepository',
      useFactory: () => {
        return new UsersMongoRepository(UserModel);
      },
    },
    {
      provide: UsersFactory,
      useClass: UsersFactory,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        usersFactory: UsersFactory,
        usersRepository: IUsersRepository,
      ) => {
        return new CreateUserUseCase(usersFactory, usersRepository);
      },
      inject: [UsersFactory, 'UsersRepository'],
    },
    {
      provide: FindUserByEmailUseCase,
      useFactory: (usersRepository: IUsersRepository) => {
        return new FindUserByEmailUseCase(usersRepository);
      },
      inject: ['UsersRepository'],
    },
  ],
})
export class UsersModule {}
