import { BadRequestException } from '@nestjs/common';

import { IClassesRepository } from '../database/repositories/classes-repository.interface';
import { ClassEntityFactory } from '../entities/classes.factory';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  name: string;
};

type Output = void;

export class CreateClassesUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private classEntityFactory: ClassEntityFactory,
    private classesRepository: IClassesRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existentClass = await this.classesRepository.findByName(input.name);

    if (existentClass) {
      throw new BadRequestException('Class already exists');
    }

    const classEntity = this.classEntityFactory.create(input);

    await this.classesRepository.insert(classEntity);
  }
}
