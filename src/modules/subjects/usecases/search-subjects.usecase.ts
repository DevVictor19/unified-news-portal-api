import { Injectable } from '@nestjs/common';

import { SubjectEntity } from '../entities/subjects.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = RepositorySearch;

type Output = SubjectEntity[];

@Injectable()
export class SearchSubjectsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: Input): Promise<Output> {
    return this.databaseService.subjects.search(input);
  }
}
