import { NotFoundException } from '@nestjs/common';

import { ICoursesRepository } from '../database/repositories/courses-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  courseId: string;
};

type Output = void;

export class DeleteCoursesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private coursesRepository: ICoursesRepository) {}

  async execute(input: Input): Promise<Output> {
    const existentCourse = await this.coursesRepository.findById(
      input.courseId,
    );

    if (!existentCourse) {
      throw new NotFoundException('Course not found');
    }

    await this.coursesRepository.delete(input.courseId);
  }
}
