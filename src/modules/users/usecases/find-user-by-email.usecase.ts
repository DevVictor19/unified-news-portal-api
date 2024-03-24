import { NotFoundException } from '@nestjs/common';

import { User } from '../entities/users.entity';
import { IUsersRepository } from '../repositories/users-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  email: string;
};

type Output = User;

export class FindUserByEmailUseCase implements IBaseUseCase<Input, Output> {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(input: Input): Promise<Output> {
    const result = await this.usersRepository.findByEmail(input.email);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }
}
