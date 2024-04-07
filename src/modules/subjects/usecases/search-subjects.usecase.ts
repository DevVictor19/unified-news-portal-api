import { ISubjectsRepository } from '../database/repositories/subjects-repository.interface';
import { SubjectEntity } from '../entities/subjects.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = RepositorySearch;

type Output = SubjectEntity[];

export class SearchSubjectsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private subjectsRepository: ISubjectsRepository) {}

  execute(input: Input): Promise<Output> {
    return this.subjectsRepository.search(input);
  }
}
