import { ClassEntity } from '../entities/classes.entity';

import { IBaseSearchRepository } from '@/common/domain/repositories/base-search-repository.interface';

export abstract class IClassesRepository extends IBaseSearchRepository<ClassEntity> {
  abstract findByName(name: string): Promise<ClassEntity | null>;
}
