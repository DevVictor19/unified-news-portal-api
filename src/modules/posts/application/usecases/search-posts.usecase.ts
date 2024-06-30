import { Injectable } from '@nestjs/common';

import { PostsEntity } from '../../domain/entities/posts.entity';

import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = RepositorySearchParams;

type Output = RepositorySearchResponse<PostsEntity>;

@Injectable()
export class SearchPostsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: RepositorySearchParams): Promise<Output> {
    return this.databaseService.posts.search(input);
  }
}
