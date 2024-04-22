import { RepositorySearch } from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { PostTypeEntity } from '@/modules/post-types/domain/entities/post-types.entity';
import { IPostTypesRepository } from '@/modules/post-types/domain/repositories/post-types-repository.interface';

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
