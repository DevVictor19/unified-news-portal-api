import { NotFoundException } from '@nestjs/common';

import { DeleteClassesUseCase } from '../../delete-classes.usecase';

import { IClassesRepository } from '@/modules/classes/database/repositories/classes-repository.interface';
import { ClassesInMemoryRepository } from '@/modules/classes/database/repositories/in-memory/classes-in-memory.repository';
import { ClassEntity } from '@/modules/classes/entities/classes.entity';

describe('DeleteClassesUseCase unit tests', () => {
  let repository: IClassesRepository;
  let sut: DeleteClassesUseCase;

  beforeEach(() => {
    repository = new ClassesInMemoryRepository();
    sut = new DeleteClassesUseCase(repository);
  });

  it('Should throw a NotFoundException if class not found', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { classId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.classId);
  });

  it('Should delete a class with provided id', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById');
    findByIdSpy.mockResolvedValue({} as ClassEntity);
    const deleteSpy = jest.spyOn(repository, 'delete');

    const input = { classId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.classId);
    expect(deleteSpy).toHaveBeenCalledWith(input.classId);
  });
});
