import { Injectable, BadRequestException } from '@nestjs/common';

import { CourseEntity } from '../../domain/entities/courses.entity';

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
      throw new BadRequestException('Course already exists');
    }

    const courseEntity = new CourseEntity(input);

    await this.databaseService.courses.insert(courseEntity);
  }
}
