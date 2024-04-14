import { BadRequestException, Injectable } from '@nestjs/common';

import { PostTypeEntity } from '../entities/post-types.entity';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

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
      throw new BadRequestException('Post type already exists');
    }

    const postTypeEntity = new PostTypeEntity(input);

    await this.databaseService.postTypes.insert(postTypeEntity);
  }
}
