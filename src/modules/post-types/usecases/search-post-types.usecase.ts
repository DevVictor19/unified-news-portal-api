import { IPostTypesRepository } from '../database/repositories/post-types-repository.interface';
import { PostTypeEntity } from '../entities/post-types.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = RepositorySearch;

type Output = PostTypeEntity[];

export class SearchPostTypesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private postTypesRepository: IPostTypesRepository) {}

  execute(input: RepositorySearch): Promise<Output> {
    return this.postTypesRepository.search(input);
  }
}
