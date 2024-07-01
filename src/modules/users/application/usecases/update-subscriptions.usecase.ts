import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { Subscriptions } from '@/common/domain/@types/subscriptions';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  user_id: string;
  payload: Subscriptions;
};

type Output = void;

@Injectable()
export class UpdateSubscriptionsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.databaseService.users.findById(input.user_id);

    if (!user) {
      throw new NotFoundError();
    }

    user.subscriptions = input.payload;

    await this.databaseService.users.update(input.user_id, user);
  }
}
