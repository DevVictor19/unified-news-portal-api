import { Injectable } from '@nestjs/common';

import { CourseEntity } from '../../domain/entities/courses.entity';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  name: string;
};

type Output = void;

@Injectable()
export class CreateCoursesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentCourse = await this.databaseService.courses.findByName(
      input.name,
    );

    if (existentCourse) {
      throw new BadRequestError();
    }

    const courseEntity = new CourseEntity(input);

    await this.databaseService.courses.insert(courseEntity);
  }
}
