import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';
import { ICoursesRepository } from '@/modules/courses/domain/repositories/courses-repository.interface';

export class CoursesInMemoryRepository
  extends InMemoryBaseRepository<CourseEntity>
  implements ICoursesRepository
{
  async search(
    params: RepositorySearchParams,
  ): Promise<RepositorySearchResponse<CourseEntity>> {
    return params as any;
  }

  async findByName(name: string): Promise<CourseEntity | null> {
    const existentCourse = this.items.find((s) => s.name === name);

    if (!existentCourse) {
      return null;
    }

    return existentCourse;
  }
}
