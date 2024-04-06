import { IClassesRepository } from '../database/repositories/classes-repository.interface';
import { ClassEntity } from '../entities/classes.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = RepositorySearch;

type Output = ClassEntity[];

export class SearchClassesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private classesRepository: IClassesRepository) {}

  execute(input: Input): Promise<Output> {
    return this.classesRepository.search(input);
  }
}
