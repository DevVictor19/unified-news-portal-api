import { Injectable } from '@nestjs/common';

import { SubjectEntity } from '../../domain/entities/subjects.entity';

import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import {
  RepositorySearchParams,
  RepositorySearchResponse,
} from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = RepositorySearchParams;

type Output = RepositorySearchResponse<SubjectEntity>;

@Injectable()
export class SearchSubjectsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: Input): Promise<Output> {
    return this.databaseService.subjects.search(input);
  }
}
