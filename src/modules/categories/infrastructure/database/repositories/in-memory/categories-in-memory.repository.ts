import { ICategoriesRepository } from '../../../../domain/repositories/categories-repository.interface';

import { RepositorySearch } from '@/common/domain/repositories/base-search-repository.interface';
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

  async search(params: RepositorySearch): Promise<CategoryEntity[]> {
    const { limitPerPage, pageNumber, searchTerm } = params;
    const skipAmount = (pageNumber - 1) * limitPerPage;

    let results = this.items;

    if (searchTerm) {
      results = this.items.filter(({ name }) => name.includes(searchTerm));
    }

    const paginatedResults = results.slice(
      skipAmount,
      skipAmount + limitPerPage,
    );

    return paginatedResults;
  }
}
