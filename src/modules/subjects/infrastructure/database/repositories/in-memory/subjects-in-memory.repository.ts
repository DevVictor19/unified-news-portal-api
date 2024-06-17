import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { SubjectEntity } from '@/modules/subjects/domain/entities/subjects.entity';
import { ISubjectsRepository } from '@/modules/subjects/domain/repositories/subjects-repository.interface';

export class SubjectsInMemoryRepository
  extends InMemoryBaseRepository<SubjectEntity>
  implements ISubjectsRepository
{
  async search(
    params: RepositorySearchParams,
  ): Promise<RepositorySearchResponse<SubjectEntity>> {
    return params as any;
  }

  async findByName(name: string): Promise<SubjectEntity | null> {
    const existentSubject = this.items.find((s) => s.name === name);

    if (!existentSubject) {
      return null;
    }

    return existentSubject;
  }
}
