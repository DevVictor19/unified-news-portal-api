import { BadRequestException, Injectable } from '@nestjs/common';

import { ClassEntity } from '../entities/classes.entity';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

type Input = {
  name: string;
};

type Output = void;

@Injectable()
export class CreateClassesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const existentClass = await this.databaseService.classes.findByName(
      input.name,
    );

    if (existentClass) {
      throw new BadRequestException('Class already exists');
    }

    const classEntity = new ClassEntity(input);

    await this.databaseService.classes.insert(classEntity);
  }
}
