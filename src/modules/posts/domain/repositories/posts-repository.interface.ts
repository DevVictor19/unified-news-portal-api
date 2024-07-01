import { PostsEntity } from '../entities/posts.entity';

import { IBaseSearchRepository } from '@/common/domain/repositories/base-search-repository.interface';

export abstract class IPostsRepository extends IBaseSearchRepository<PostsEntity> {}
