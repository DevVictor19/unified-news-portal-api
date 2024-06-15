import { Injectable } from '@nestjs/common';

import { PostTypeEntity } from '../../domain/entities/post-types.entity';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  name: string;
};

type Output = void;

@Injectable()
export class CreatePostTypesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentPostType = await this.databaseService.postTypes.findByName(
      input.name,
    );

    if (existentPostType) {
      throw new BadRequestError();
    }

    const postTypeEntity = new PostTypeEntity(input);

    await this.databaseService.postTypes.insert(postTypeEntity);
  }
}
