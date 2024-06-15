import { Injectable } from '@nestjs/common';

import { SubjectEntity } from '../../domain/entities/subjects.entity';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  name: string;
};

type Output = void;

@Injectable()
export class CreateSubjectsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentSubject = await this.databaseService.subjects.findByName(
      input.name,
    );

    if (existentSubject) {
      throw new BadRequestError();
    }

    const subject = new SubjectEntity(input);

    await this.databaseService.subjects.insert(subject);
  }
}
