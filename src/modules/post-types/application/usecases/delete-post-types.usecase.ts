import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  postTypeId: string;
};

type Output = void;

@Injectable()
export class DeletePostTypesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentPostType = await this.databaseService.postTypes.findById(
      input.postTypeId,
    );

    if (!existentPostType) {
      throw new NotFoundError();
    }

    await this.databaseService.postTypes.delete(input.postTypeId);
  }
}
