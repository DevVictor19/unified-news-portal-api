import { ClassEntity } from '../../entities/classes.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export interface IClassesRepository extends IBaseSearchRepository<ClassEntity> {
  findByName(name: string): Promise<ClassEntity | null>;
}
