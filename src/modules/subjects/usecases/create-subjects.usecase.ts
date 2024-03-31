import { BadRequestException } from '@nestjs/common';

import { SubjectsFactory } from '../entities/subjects.factory';
import { ISubjectsRepository } from '../repositories/subjects-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  name: string;
};

type Output = void;

export class CreateSubjectsUseCase implements IBaseUseCase<Input, Output> {
  constructor(
    private subjectsFactory: SubjectsFactory,
    private subjectsRepository: ISubjectsRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existentSubject = await this.subjectsRepository.findByName(
      input.name,
    );

    if (existentSubject) {
      throw new BadRequestException('Subject already exists');
    }

    const subject = this.subjectsFactory.create(input);

    await this.subjectsRepository.insert(subject);
  }
}
