import { NotFoundException } from '@nestjs/common';

import { IPostTypesRepository } from '../database/repositories/post-types-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  postTypeId: string;
};

type Output = void;

export class DeletePostTypesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private postTypesRepository: IPostTypesRepository) {}

  async execute(input: Input): Promise<Output> {
    const existentPostType = await this.postTypesRepository.findById(
      input.postTypeId,
    );

    if (!existentPostType) {
      throw new NotFoundException('Post type not found');
    }

    await this.postTypesRepository.delete(input.postTypeId);
  }
}
