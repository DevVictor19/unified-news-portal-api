import { Injectable } from '@nestjs/common';

import { ClassEntity } from '../../domain/entities/classes.entity';

import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = RepositorySearchParams;

type Output = RepositorySearchResponse<ClassEntity>;

@Injectable()
export class SearchClassesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: Input): Promise<Output> {
    return this.databaseService.classes.search(input);
  }
}
