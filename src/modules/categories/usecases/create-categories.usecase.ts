import { BadRequestException } from '@nestjs/common';

import { ICategoriesRepository } from '../database/repositories/categories-repository.interface';
import { CategoryEntityFactory } from '../entities/categories.factory';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  name: string;
};

type Output = void;

export class CreateCategoriesUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private categoryEntityFactory: CategoryEntityFactory,
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existentCategory = await this.categoriesRepository.findByName(
      input.name,
    );

    if (existentCategory) {
      throw new BadRequestException('Category already exists');
    }

    const categoryEntity = this.categoryEntityFactory.create(input);

    await this.categoriesRepository.insert(categoryEntity);
  }
}
