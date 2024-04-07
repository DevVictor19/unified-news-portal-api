import { ICategoriesRepository } from '../database/repositories/categories-repository.interface';
import { CategoryEntity } from '../entities/categories.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = RepositorySearch;

type Output = CategoryEntity[];

export class SearchCategoriesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(input: RepositorySearch): Promise<Output> {
    return this.categoriesRepository.search(input);
  }
}
