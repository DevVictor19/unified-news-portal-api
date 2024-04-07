import { BadRequestException } from '@nestjs/common';

import { CreateClassesUseCase } from '../../create-classes.usecase';

import { IClassesRepository } from '@/modules/classes/database/repositories/classes-repository.interface';
import { ClassesInMemoryRepository } from '@/modules/classes/database/repositories/in-memory/classes-in-memory.repository';
import { ClassEntity } from '@/modules/classes/entities/classes.entity';
import { ClassEntityFactory } from '@/modules/classes/entities/classes.factory';

describe('CreateClassesUseCase unit tests', () => {
  let factory: ClassEntityFactory;
  let repository: IClassesRepository;
  let sut: CreateClassesUseCase;

  beforeEach(() => {
    factory = new ClassEntityFactory();
    repository = new ClassesInMemoryRepository();
    sut = new CreateClassesUseCase(factory, repository);
  });

  it('Should throw a BadRequestException if class already exists', async () => {
    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue({} as ClassEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new class', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const createClassSpy = jest.spyOn(factory, 'create');
    const insertSpy = jest.spyOn(repository, 'insert');

    await sut.execute(input);

    const classEntity = await createClassSpy.mock.results[0].value;

    expect(createClassSpy).toHaveBeenCalledWith(input);
    expect(insertSpy).toHaveBeenCalledWith(classEntity);
  });
});
