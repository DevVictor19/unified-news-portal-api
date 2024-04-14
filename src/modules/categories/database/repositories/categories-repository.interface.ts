import { CategoryEntity } from '../../entities/categories.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export abstract class ICategoriesRepository extends IBaseSearchRepository<CategoryEntity> {
  abstract findByName(name: string): Promise<CategoryEntity | null>;
}
