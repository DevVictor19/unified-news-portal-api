import { SubjectEntity } from '../../entities/subjects.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export abstract class ISubjectsRepository extends IBaseSearchRepository<SubjectEntity> {
  abstract findByName(name: string): Promise<SubjectEntity | null>;
}
