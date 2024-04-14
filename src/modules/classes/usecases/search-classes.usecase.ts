import { ClassEntity } from '../entities/classes.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = RepositorySearch;

type Output = ClassEntity[];

export class SearchClassesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: Input): Promise<Output> {
    return this.databaseService.classes.search(input);
  }
}
