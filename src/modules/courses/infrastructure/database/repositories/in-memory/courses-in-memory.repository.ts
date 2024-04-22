import { RepositorySearch } from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';
import { ICoursesRepository } from '@/modules/courses/domain/repositories/courses-repository.interface';

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
