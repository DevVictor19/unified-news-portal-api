import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { PostsEntity } from '@/modules/posts/domain/entities/posts.entity';
import { IPostsRepository } from '@/modules/posts/domain/repositories/posts-repository.interface';

export class PostsInMemoryRepository
  extends InMemoryBaseRepository<PostsEntity>
  implements IPostsRepository
{
  async search(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: RepositorySearchParams,
  ): Promise<RepositorySearchResponse<PostsEntity>> {
    return {
      data: [],
      pages: 0,
      results: 0,
    };
  }
}
