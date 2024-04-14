import { CourseEntity } from '../../entities/courses.entity';

import { IBaseSearchRepository } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export abstract class ICoursesRepository extends IBaseSearchRepository<CourseEntity> {
  abstract findByName(name: string): Promise<CourseEntity | null>;
}
