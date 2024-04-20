import { Injectable } from '@nestjs/common';

import { PostTypeEntity } from '../entities/post-types.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = RepositorySearch;

type Output = PostTypeEntity[];

@Injectable()
export class SearchPostTypesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: RepositorySearch): Promise<Output> {
    return this.databaseService.postTypes.search(input);
  }
}
