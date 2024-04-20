import { ICoursesRepository } from '../courses-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { InMemoryBaseRepository } from '@/common/abstractions/repositories/in-memory/in-memory-base-repository.abstraction';
import { CourseEntity } from '@/modules/courses/entities/courses.entity';

export class CoursesInMemoryRepository
  extends InMemoryBaseRepository<CourseEntity>
  implements ICoursesRepository
{
  async search(params: RepositorySearch): Promise<CourseEntity[]> {
    const { limitPerPage, pageNumber, searchTerm } = params;
    const skipAmount = (pageNumber - 1) * limitPerPage;

    let results = this.items;

    if (searchTerm) {
      results = this.items.filter(({ name }) => name.includes(searchTerm));
    }

    const paginatedResults = results.slice(
      skipAmount,
      skipAmount + limitPerPage,
    );

    return paginatedResults;
  }

  async findByName(name: string): Promise<CourseEntity | null> {
    const existentCourse = this.items.find((s) => s.name === name);

    if (!existentCourse) {
      return null;
    }

    return existentCourse;
  }
}
