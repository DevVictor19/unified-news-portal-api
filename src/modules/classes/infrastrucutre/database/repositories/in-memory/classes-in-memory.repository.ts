import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { ClassEntity } from '@/modules/classes/domain/entities/classes.entity';
import { IClassesRepository } from '@/modules/classes/domain/repositories/classes-repository.interface';

export class ClassesInMemoryRepository
  extends InMemoryBaseRepository<ClassEntity>
  implements IClassesRepository
{
  async search(
    params: RepositorySearchParams,
  ): Promise<RepositorySearchResponse<ClassEntity>> {
    return params as any;
  }

  async findByName(name: string): Promise<ClassEntity | null> {
    const existentClass = this.items.find((s) => s.name === name);

    if (!existentClass) {
      return null;
    }

    return existentClass;
  }
}
