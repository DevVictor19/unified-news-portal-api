import { NotFoundException } from '@nestjs/common';

import { DeleteCategoriesUseCase } from '../../delete-categories.usecase';

import { CategoryEntity } from '@/modules/categories/domain/entities/categories.entity';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('DeleteCategoriesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: DeleteCategoriesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new DeleteCategoriesUseCase(databaseService);
  });

  it('Should throw a NotFoundException if category not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.categories, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { categoryId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.categoryId);
  });

  it('Should delete a category with provided id', async () => {
    const findByIdSpy = jest.spyOn(databaseService.categories, 'findById');
    findByIdSpy.mockResolvedValue({} as CategoryEntity);
    const deleteSpy = jest.spyOn(databaseService.categories, 'delete');

    const input = { categoryId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.categoryId);
    expect(deleteSpy).toHaveBeenCalledWith(input.categoryId);
  });
});
