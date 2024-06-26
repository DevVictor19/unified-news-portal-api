import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  classId: string;
};

type Output = void;

@Injectable()
export class DeleteClassesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentClass = await this.databaseService.classes.findById(
      input.classId,
    );

    if (!existentClass) {
      throw new NotFoundError();
    }

    await this.databaseService.classes.delete(input.classId);
  }
}
