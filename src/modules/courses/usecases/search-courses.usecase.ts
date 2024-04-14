import { Injectable } from '@nestjs/common';

import { CourseEntity } from '../entities/courses.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = RepositorySearch;

type Output = CourseEntity[];

@Injectable()
export class SearchCoursesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  execute(input: RepositorySearch): Promise<Output> {
    return this.databaseService.courses.search(input);
  }
}
