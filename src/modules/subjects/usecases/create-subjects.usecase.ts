import { BadRequestException, Injectable } from '@nestjs/common';

import { SubjectEntity } from '../entities/subjects.entity';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

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
      throw new BadRequestException('Subject already exists');
    }

    const subject = new SubjectEntity(input);

    await this.databaseService.subjects.insert(subject);
  }
}
