import { ICategoriesRepository } from '../../../../domain/repositories/categories-repository.interface';

import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { CategoryEntity } from '@/modules/categories/domain/entities/categories.entity';

export class CategoriesInMemoryRepository
  extends InMemoryBaseRepository<CategoryEntity>
  implements ICategoriesRepository
{
  async findByName(name: string): Promise<CategoryEntity | null> {
    const existentCategory = this.items.find((s) => s.name === name);

    if (!existentCategory) {
      return null;
    }

    return existentCategory;
  }

  async search(
    params: RepositorySearchParams,
  ): Promise<RepositorySearchResponse<CategoryEntity>> {
    return params as any;
  }
}
