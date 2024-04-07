import { NotFoundException } from '@nestjs/common';

import { DeleteCategoriesUseCase } from '../../delete-categories.usecase';

import { ICategoriesRepository } from '@/modules/categories/database/repositories/categories-repository.interface';
import { CategoriesInMemoryRepository } from '@/modules/categories/database/repositories/in-memory/categories-in-memory.repository';
import { CategoryEntity } from '@/modules/categories/entities/categories.entity';

describe('DeleteCategoriesUseCase unit tests', () => {
  let repository: ICategoriesRepository;
  let sut: DeleteCategoriesUseCase;

  beforeEach(() => {
    repository = new CategoriesInMemoryRepository();
    sut = new DeleteCategoriesUseCase(repository);
  });

  it('Should throw a NotFoundException if category not found', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { categoryId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.categoryId);
  });

  it('Should delete a category with provided id', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById');
    findByIdSpy.mockResolvedValue({} as CategoryEntity);
    const deleteSpy = jest.spyOn(repository, 'delete');

    const input = { categoryId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.categoryId);
    expect(deleteSpy).toHaveBeenCalledWith(input.categoryId);
  });
});
