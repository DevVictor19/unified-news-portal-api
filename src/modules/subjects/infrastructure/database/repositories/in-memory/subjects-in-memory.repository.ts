import { RepositorySearch } from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { SubjectEntity } from '@/modules/subjects/domain/entities/subjects.entity';
import { ISubjectsRepository } from '@/modules/subjects/domain/repositories/subjects-repository.interface';

export class SubjectsInMemoryRepository
  extends InMemoryBaseRepository<SubjectEntity>
  implements ISubjectsRepository
{
  async search(params: RepositorySearch): Promise<SubjectEntity[]> {
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

  async findByName(name: string): Promise<SubjectEntity | null> {
    const existentSubject = this.items.find((s) => s.name === name);

    if (!existentSubject) {
      return null;
    }

    return existentSubject;
  }
}
