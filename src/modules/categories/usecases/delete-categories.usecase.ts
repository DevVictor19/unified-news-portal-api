import { NotFoundException } from '@nestjs/common';

import { ICategoriesRepository } from '../database/repositories/categories-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  categoryId: string;
};

type Output = void;

export class DeleteCategoriesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(input: Input): Promise<Output> {
    const existentCategory = await this.categoriesRepository.findById(
      input.categoryId,
    );

    if (!existentCategory) {
      throw new NotFoundException('Category not found');
    }

    await this.categoriesRepository.delete(input.categoryId);
  }
}
