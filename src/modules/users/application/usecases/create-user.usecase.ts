import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../domain/entities/users.entity';
import { IHashProvider } from '../providers/hash-provider.interface';

import { EmailInUseError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = void;

@Injectable()
export class CreateUserUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private databaseService: IDatabaseService,
    private hashProvider: IHashProvider,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.databaseService.users.findByEmail(
      input.email,
    );

    if (existingUser) {
      throw new EmailInUseError();
    }

    const hashedPassword = await this.hashProvider.generateHash(input.password);

    const user = new UserEntity({
      email: input.email,
      name: input.name,
      password: hashedPassword,
      email_is_verified: true,
    });

    await this.databaseService.users.insert(user);
  }
}
