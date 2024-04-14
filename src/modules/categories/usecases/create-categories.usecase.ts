import { BadRequestException, Injectable } from '@nestjs/common';

import { CategoryEntity } from '../entities/categories.entity';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = {
  name: string;
};

type Output = void;

@Injectable()
export class CreateCategoriesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentCategory = await this.databaseService.categories.findByName(
      input.name,
    );

    if (existentCategory) {
      throw new BadRequestException('Category already exists');
    }

    const categoryEntity = new CategoryEntity(input);

    await this.databaseService.categories.insert(categoryEntity);
  }
}
