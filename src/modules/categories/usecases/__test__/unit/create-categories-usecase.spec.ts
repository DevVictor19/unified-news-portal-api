import { BadRequestException } from '@nestjs/common';

import { CreateCategoriesUseCase } from '../../create-categories.usecase';

import { ICategoriesRepository } from '@/modules/categories/database/repositories/categories-repository.interface';
import { CategoriesInMemoryRepository } from '@/modules/categories/database/repositories/in-memory/categories-in-memory.repository';
import { CategoryEntity } from '@/modules/categories/entities/categories.entity';
import { CategoryEntityFactory } from '@/modules/categories/entities/categories.factory';

describe('CreateCategoriesUseCase unit tests', () => {
  let factory: CategoryEntityFactory;
  let repository: ICategoriesRepository;
  let sut: CreateCategoriesUseCase;

  beforeEach(() => {
    factory = new CategoryEntityFactory();
    repository = new CategoriesInMemoryRepository();
    sut = new CreateCategoriesUseCase(factory, repository);
  });

  it('Should throw a BadRequestException if category already exists', async () => {
    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue({} as CategoryEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new category', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const createCategorySpy = jest.spyOn(factory, 'create');
    const insertSpy = jest.spyOn(repository, 'insert');

    await sut.execute(input);

    const categoryEntity = await createCategorySpy.mock.results[0].value;

    expect(createCategorySpy).toHaveBeenCalledWith(input);
    expect(insertSpy).toHaveBeenCalledWith(categoryEntity);
  });
});
