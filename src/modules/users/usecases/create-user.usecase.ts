import { UsersFactory } from '../entities/users.factory';
import { IUsersRepository } from '../repositories/users-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = void;

export class CreateUserUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private usersFactory: UsersFactory,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const userEntity = this.usersFactory.create(input);
    await this.usersRepository.insert(userEntity);
  }
}
