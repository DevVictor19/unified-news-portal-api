import { ISubjectsRepository } from '../subjects-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { InMemoryBaseRepository } from '@/common/abstractions/repositories/in-memory/in-memory-base-repository.abstraction';
import { SubjectEntity } from '@/modules/subjects/entities/subjects.entity';

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
