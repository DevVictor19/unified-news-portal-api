import { ClassEntity } from '../../entities/classes.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export abstract class IClassesRepository extends IBaseSearchRepository<ClassEntity> {
  abstract findByName(name: string): Promise<ClassEntity | null>;
}
