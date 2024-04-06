import { BadRequestException } from '@nestjs/common';

import { ICoursesRepository } from '../database/repositories/courses-repository.interface';
import { CourseEntityFactory } from '../entities/courses.factory';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  name: string;
};

type Output = void;

export class CreateCoursesUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private courseEntityFactory: CourseEntityFactory,
    private coursesRepository: ICoursesRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existentCourse = await this.coursesRepository.findByName(input.name);

    if (existentCourse) {
      throw new BadRequestException('Course already exists');
    }

    const courseEntity = this.courseEntityFactory.create(input);

    await this.coursesRepository.insert(courseEntity);
  }
}
