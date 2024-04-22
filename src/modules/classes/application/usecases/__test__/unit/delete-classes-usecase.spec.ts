import { NotFoundException } from '@nestjs/common';

import { DeleteClassesUseCase } from '../../delete-classes.usecase';

import { ClassEntity } from '@/modules/classes/domain/entities/classes.entity';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('DeleteClassesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: DeleteClassesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new DeleteClassesUseCase(databaseService);
  });

  it('Should throw a NotFoundException if class not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.classes, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { classId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.classId);
  });

  it('Should delete a class with provided id', async () => {
    const findByIdSpy = jest.spyOn(databaseService.classes, 'findById');
    findByIdSpy.mockResolvedValue({} as ClassEntity);
    const deleteSpy = jest.spyOn(databaseService.classes, 'delete');

    const input = { classId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.classId);
    expect(deleteSpy).toHaveBeenCalledWith(input.classId);
  });
});
