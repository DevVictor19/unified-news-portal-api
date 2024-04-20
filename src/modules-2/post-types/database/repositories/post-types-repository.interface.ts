import { PostTypeEntity } from '../../entities/post-types.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export abstract class IPostTypesRepository extends IBaseSearchRepository<PostTypeEntity> {
  abstract findByName(name: string): Promise<PostTypeEntity | null>;
}
