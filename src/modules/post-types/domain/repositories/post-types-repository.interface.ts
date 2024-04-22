import { PostTypeEntity } from '../entities/post-types.entity';

import { IBaseSearchRepository } from '@/common/domain/repositories/base-search-repository.interface';

export abstract class IPostTypesRepository extends IBaseSearchRepository<PostTypeEntity> {
  abstract findByName(name: string): Promise<PostTypeEntity | null>;
}
