import { IPostTypesRepository } from '../post-types-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { InMemoryBaseRepository } from '@/common/abstractions/repositories/in-memory/in-memory-base-repository.abstraction';
import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';

export class PostTypesInMemoryRepository
  extends InMemoryBaseRepository<PostTypeEntity>
  implements IPostTypesRepository
{
  async search(params: RepositorySearch): Promise<PostTypeEntity[]> {
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

  async findByName(name: string): Promise<PostTypeEntity | null> {
    const existentPostType = this.items.find((s) => s.name === name);

    if (!existentPostType) {
      return null;
    }

    return existentPostType;
  }
}
