import { IClassesRepository } from '../classes-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { InMemoryBaseRepository } from '@/common/abstractions/repositories/in-memory/in-memory-base-repository.abstraction';
import { ClassEntity } from '@/modules/classes/entities/classes.entity';

export class ClassesInMemoryRepository
  extends InMemoryBaseRepository<ClassEntity>
  implements IClassesRepository
{
  async search(params: RepositorySearch): Promise<ClassEntity[]> {
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

  async findByName(name: string): Promise<ClassEntity | null> {
    const existentClass = this.items.find((s) => s.name === name);

    if (!existentClass) {
      return null;
    }

    return existentClass;
  }
}
