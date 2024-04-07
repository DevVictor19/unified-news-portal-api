import { NotFoundException } from '@nestjs/common';

import { IClassesRepository } from '../database/repositories/classes-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  classId: string;
};

type Output = void;

export class DeleteClassesUseCase implements IBaseUseCase<Input, Output> {
  constructor(private classesRepository: IClassesRepository) {}

  async execute(input: Input): Promise<Output> {
    const existentClass = await this.classesRepository.findById(input.classId);

    if (!existentClass) {
      throw new NotFoundException('Class not found');
    }

    await this.classesRepository.delete(input.classId);
  }
}
