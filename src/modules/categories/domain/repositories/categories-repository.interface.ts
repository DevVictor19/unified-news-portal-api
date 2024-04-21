import { CategoryEntity } from '../entities/categories.entity';

import { IBaseSearchRepository } from '@/common/domain/repositories/base-search-repository.interface';

export abstract class ICategoriesRepository extends IBaseSearchRepository<CategoryEntity> {
  abstract findByName(name: string): Promise<CategoryEntity | null>;
}
