import { PostTypeEntity } from '../../entities/post-types.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export interface IPostTypesRepository
  extends IBaseSearchRepository<PostTypeEntity> {
  findByName(name: string): Promise<PostTypeEntity | null>;
}
