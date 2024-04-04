import { NotFoundException } from '@nestjs/common';

import { ISubjectsRepository } from '../database/repositories/subjects-repository.interface';

import { IBaseUseCase } from '@/common/abstractions/usecases/base-usecase.abstraction';

type Input = {
  subjectId: string;
};

type Output = void;

export class DeleteSubjectsUseCase implements IBaseUseCase<Input, Output> {
  constructor(private subjectsRepository: ISubjectsRepository) {}

  async execute(input: Input): Promise<Output> {
    const existentSubject = await this.subjectsRepository.findById(
      input.subjectId,
    );

    if (!existentSubject) {
      throw new NotFoundException('Subject not found');
    }

    await this.subjectsRepository.delete(input.subjectId);
  }
}
