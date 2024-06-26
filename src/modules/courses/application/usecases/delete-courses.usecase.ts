import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  courseId: string;
};

type Output = void;

@Injectable()
export class DeleteCoursesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentCourse = await this.databaseService.courses.findById(
      input.courseId,
    );

    if (!existentCourse) {
      throw new NotFoundError();
    }

    await this.databaseService.courses.delete(input.courseId);
  }
}
