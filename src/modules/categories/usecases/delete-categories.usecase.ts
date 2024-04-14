import { Injectable, NotFoundException } from '@nestjs/common';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = {
  categoryId: string;
};

type Output = void;

@Injectable()
export class DeleteCategoriesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentCategory = await this.databaseService.categories.findById(
      input.categoryId,
    );

    if (!existentCategory) {
      throw new NotFoundException('Category not found');
    }

    await this.databaseService.categories.delete(input.categoryId);
  }
}
