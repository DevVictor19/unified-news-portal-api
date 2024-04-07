import { ICoursesRepository } from '../database/repositories/courses-repository.interface';
import { CourseEntity } from '../entities/courses.entity';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = RepositorySearch;

type Output = CourseEntity[];

export class SearchCoursesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private coursesRepository: ICoursesRepository) {}

  execute(input: RepositorySearch): Promise<Output> {
    return this.coursesRepository.search(input);
  }
}
