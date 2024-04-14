import { BadRequestException } from '@nestjs/common';

import { CreateClassesUseCase } from '../../create-classes.usecase';

import { ClassEntity } from '@/modules/classes/entities/classes.entity';
import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

describe('CreateClassesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: CreateClassesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new CreateClassesUseCase(databaseService);
  });

  it('Should throw a BadRequestException if class already exists', async () => {
    const findByNameSpy = jest.spyOn(databaseService.classes, 'findByName');
    findByNameSpy.mockResolvedValue({} as ClassEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new class', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(databaseService.classes, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const insertSpy = jest.spyOn(databaseService.classes, 'insert');

    await sut.execute(input);

    expect(insertSpy).toHaveBeenCalled();
  });
});
