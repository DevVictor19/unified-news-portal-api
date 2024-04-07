import { CourseEntity } from '../../entities/courses.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export interface ICoursesRepository
  extends IBaseSearchRepository<CourseEntity> {
  findByName(name: string): Promise<CourseEntity | null>;
}
