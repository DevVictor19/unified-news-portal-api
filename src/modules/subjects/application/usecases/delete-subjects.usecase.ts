import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  subjectId: string;
};

type Output = void;

@Injectable()
export class DeleteSubjectsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentSubject = await this.databaseService.subjects.findById(
      input.subjectId,
    );

    if (!existentSubject) {
      throw new NotFoundError();
    }

    await this.databaseService.subjects.delete(input.subjectId);
  }
}
