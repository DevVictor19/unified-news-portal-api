import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '../entities/categories.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = RepositorySearch;

type Output = CategoryEntity[];

@Injectable()
export class SearchCategoriesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: RepositorySearch): Promise<Output> {
    return this.databaseService.categories.search(input);
  }
}
