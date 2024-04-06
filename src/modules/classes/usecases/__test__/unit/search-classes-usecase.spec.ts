import { SearchClassesUseCase } from '../../search-classes.usecase';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { IClassesRepository } from '@/modules/classes/database/repositories/classes-repository.interface';
import { ClassesInMemoryRepository } from '@/modules/classes/database/repositories/in-memory/classes-in-memory.repository';

describe('SearchClassesUseCase unit tests', () => {
  let repository: IClassesRepository;
  let sut: SearchClassesUseCase;

  beforeEach(() => {
    repository = new ClassesInMemoryRepository();
    sut = new SearchClassesUseCase(repository);
  });

  it('Should search for classes with the provided search params', async () => {
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
