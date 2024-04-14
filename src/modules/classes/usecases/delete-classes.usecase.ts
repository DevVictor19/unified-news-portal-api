import { NotFoundException } from '@nestjs/common';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = {
  classId: string;
};

type Output = void;

export class DeleteClassesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentClass = await this.databaseService.classes.findById(
      input.classId,
    );

    if (!existentClass) {
      throw new NotFoundException('Class not found');
    }

    await this.databaseService.classes.delete(input.classId);
  }
}
