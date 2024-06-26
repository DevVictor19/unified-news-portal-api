import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { PostTypeEntity } from '@/modules/post-types/domain/entities/post-types.entity';
import { IPostTypesRepository } from '@/modules/post-types/domain/repositories/post-types-repository.interface';

export class PostTypesInMemoryRepository
  extends InMemoryBaseRepository<PostTypeEntity>
  implements IPostTypesRepository
{
  async search(
    params: RepositorySearchParams,
  ): Promise<RepositorySearchResponse<PostTypeEntity>> {
    return params as any;
  }

  async findByName(name: string): Promise<PostTypeEntity | null> {
    const existentPostType = this.items.find((s) => s.name === name);

    if (!existentPostType) {
      return null;
    }

    return existentPostType;
  }
}
