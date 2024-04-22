import { RepositorySearch } from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { ClassEntity } from '@/modules/classes/domain/entities/classes.entity';
import { IClassesRepository } from '@/modules/classes/domain/repositories/classes-repository.interface';

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
