import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '../../domain/entities/categories.entity';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

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
      throw new BadRequestError();
    }

    const categoryEntity = new CategoryEntity(input);

    await this.databaseService.categories.insert(categoryEntity);
  }
}
