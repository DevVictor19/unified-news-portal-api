import { Subject } from '../entities/subjects.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export interface ISubjectsRepository extends IBaseSearchRepository<Subject> {
  findByName(name: string): Promise<Subject | null>;
}
