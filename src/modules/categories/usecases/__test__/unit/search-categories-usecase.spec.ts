import { SearchCategoriesUseCase } from '../../search-categories.usecase';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { ICategoriesRepository } from '@/modules/categories/database/repositories/categories-repository.interface';
import { CategoriesInMemoryRepository } from '@/modules/categories/database/repositories/in-memory/categories-in-memory.repository';

describe('SearchCategoriesUseCase unit tests', () => {
  let repository: ICategoriesRepository;
  let sut: SearchCategoriesUseCase;

  beforeEach(() => {
    repository = new CategoriesInMemoryRepository();
    sut = new SearchCategoriesUseCase(repository);
  });

  it('Should search for categories with the provided search params', async () => {
    const input: RepositorySearch = {
      limitPerPage: 10,
      pageNumber: 1,
      searchTerm: 'searchTerm',
    };

    const searchSpy = jest.spyOn(repository, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });
});
