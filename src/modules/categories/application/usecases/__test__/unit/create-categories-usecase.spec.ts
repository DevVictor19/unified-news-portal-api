import { CreateCategoriesUseCase } from '../../create-categories.usecase';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { CategoryEntity } from '@/modules/categories/domain/entities/categories.entity';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('CreateCategoriesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: CreateCategoriesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new CreateCategoriesUseCase(databaseService);
  });

  it('Should throw a BadRequestError if category already exists', async () => {
    const findByNameSpy = jest.spyOn(databaseService.categories, 'findByName');
    findByNameSpy.mockResolvedValue({} as CategoryEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestError,
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
