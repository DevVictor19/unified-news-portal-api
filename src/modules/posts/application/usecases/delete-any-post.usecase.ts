import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  post_id: string;
};

type Output = void;

@Injectable()
export class DeleteAnyPostUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const post = await this.databaseService.posts.findById(input.post_id);

    if (!post) {
      throw new NotFoundError();
    }

    await this.databaseService.posts.delete(input.post_id);
  }
}
