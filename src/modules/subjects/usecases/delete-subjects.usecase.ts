import { Injectable, NotFoundException } from '@nestjs/common';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

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
      throw new NotFoundException('Subject not found');
    }

    await this.databaseService.subjects.delete(input.subjectId);
  }
}
