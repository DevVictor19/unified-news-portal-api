import { NotFoundException } from '@nestjs/common';

import { DeleteSubjectsUseCase } from '../../delete-subjects.usecase';

import { SubjectsInMemoryRepository } from '@/modules/subjects/database/repositories/in-memory/subjects-in-memory.repository';
import { ISubjectsRepository } from '@/modules/subjects/database/repositories/subjects-repository.interface';
import { SubjectEntity } from '@/modules/subjects/entities/subjects.entity';

describe('DeleteSubjectsUseCase unit tests', () => {
  let subjectsRepository: ISubjectsRepository;
  let sut: DeleteSubjectsUseCase;

  beforeEach(() => {
    subjectsRepository = new SubjectsInMemoryRepository();
    sut = new DeleteSubjectsUseCase(subjectsRepository);
  });

  it('Should throw a NotFoundException if subject is not found', async () => {
    const findByIdSpy = jest.spyOn(subjectsRepository, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { subjectId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.subjectId);
  });

  it('Should delete a subject with provided id', async () => {
    const findByIdSpy = jest.spyOn(subjectsRepository, 'findById');
    findByIdSpy.mockResolvedValue({} as SubjectEntity);
    const deleteSpy = jest.spyOn(subjectsRepository, 'delete');

    const input = { subjectId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.subjectId);
    expect(deleteSpy).toHaveBeenCalledWith(input.subjectId);
  });
});
