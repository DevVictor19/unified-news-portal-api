import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  user_id: string;
};

type Output = void;

@Injectable()
export class DeleteUserUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.databaseService.users.findById(input.user_id);

    if (!user) {
      throw new NotFoundError();
    }

    await this.databaseService.users.delete(input.user_id);
  }
}
