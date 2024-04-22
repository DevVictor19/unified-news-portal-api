import { CourseEntity } from '../entities/courses.entity';

import { IBaseSearchRepository } from '@/common/domain/repositories/base-search-repository.interface';

export abstract class ICoursesRepository extends IBaseSearchRepository<CourseEntity> {
  abstract findByName(name: string): Promise<CourseEntity | null>;
}
