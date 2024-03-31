import { BadRequestException } from '@nestjs/common';

import { CreateSubjectsUseCase } from '../../create-subjects.usecase';

import { Subject } from '@/modules/subjects/entities/subjects.entity';
import { SubjectsFactory } from '@/modules/subjects/entities/subjects.factory';
import { SubjectsInMemoryRepository } from '@/modules/subjects/repositories/in-memory/subjects-in-memory.repository';
import { ISubjectsRepository } from '@/modules/subjects/repositories/subjects-repository.interface';

describe('CreateSubjectsUseCase unit tests', () => {
  let factory: SubjectsFactory;
  let repository: ISubjectsRepository;
  let sut: CreateSubjectsUseCase;

  beforeEach(() => {
    factory = new SubjectsFactory();
    repository = new SubjectsInMemoryRepository();
    sut = new CreateSubjectsUseCase(factory, repository);
  });

  it('Should throw a BadRequestException if subject already exists', async () => {
    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue({} as Subject);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new subject', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const createSubjectSpy = jest.spyOn(factory, 'create');
    const insertSpy = jest.spyOn(repository, 'insert');

    await sut.execute(input);

    const subject = await createSubjectSpy.mock.results[0].value;

    expect(createSubjectSpy).toHaveBeenCalledWith(input);
    expect(insertSpy).toHaveBeenCalledWith(subject);
  });
});
