import { SubjectEntity } from '../../entities/subjects.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export interface ISubjectsRepository
  extends IBaseSearchRepository<SubjectEntity> {
  findByName(name: string): Promise<SubjectEntity | null>;
}
