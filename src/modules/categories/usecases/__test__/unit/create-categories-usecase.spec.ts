import { BadRequestException } from '@nestjs/common';

import { CreateCategoriesUseCase } from '../../create-categories.usecase';

import { CategoryEntity } from '@/modules/categories/entities/categories.entity';
import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

describe('CreateCategoriesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: CreateCategoriesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new CreateCategoriesUseCase(databaseService);
  });

  it('Should throw a BadRequestException if category already exists', async () => {
    const findByNameSpy = jest.spyOn(databaseService.categories, 'findByName');
    findByNameSpy.mockResolvedValue({} as CategoryEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new category', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(databaseService.categories, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const insertSpy = jest.spyOn(databaseService.categories, 'insert');

    await sut.execute(input);

    expect(insertSpy).toHaveBeenCalled();
  });
});
