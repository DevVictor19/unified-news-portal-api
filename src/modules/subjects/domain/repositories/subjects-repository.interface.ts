import { SubjectEntity } from '../entities/subjects.entity';

import { IBaseSearchRepository } from '@/common/domain/repositories/base-search-repository.interface';

export abstract class ISubjectsRepository extends IBaseSearchRepository<SubjectEntity> {
  abstract findByName(name: string): Promise<SubjectEntity | null>;
}
