import { Injectable } from '@nestjs/common';

import { PostTypeEntity } from '../../domain/entities/post-types.entity';

import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { RepositorySearch } from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = RepositorySearch;

type Output = PostTypeEntity[];

@Injectable()
export class SearchPostTypesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: RepositorySearch): Promise<Output> {
    return this.databaseService.postTypes.search(input);
  }
}
