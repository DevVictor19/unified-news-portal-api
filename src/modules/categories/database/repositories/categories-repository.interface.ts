import { CategoryEntity } from '../../entities/categories.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export interface ICategoriesRepository
  extends IBaseSearchRepository<CategoryEntity> {
  findByName(name: string): Promise<CategoryEntity | null>;
}
