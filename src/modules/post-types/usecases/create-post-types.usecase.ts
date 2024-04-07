import { BadRequestException } from '@nestjs/common';

import { IPostTypesRepository } from '../database/repositories/post-types-repository.interface';
import { PostTypeEntityFactory } from '../entities/post-types.factory';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  name: string;
};

type Output = void;

export class CreatePostTypesUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private postTypeEntityFactory: PostTypeEntityFactory,
    private postTypesRepository: IPostTypesRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existentPostType = await this.postTypesRepository.findByName(
      input.name,
    );

    if (existentPostType) {
      throw new BadRequestException('Post type already exists');
    }

    const postTypeEntity = this.postTypeEntityFactory.create(input);

    await this.postTypesRepository.insert(postTypeEntity);
  }
}
