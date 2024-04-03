import { SearchSubjectsUseCase } from '../../search-subjects.usecase';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { SubjectsInMemoryRepository } from '@/modules/subjects/database/repositories/in-memory/subjects-in-memory.repository';
import { ISubjectsRepository } from '@/modules/subjects/database/repositories/subjects-repository.interface';

describe('SearchSubjectsUseCase unit tests', () => {
  let repository: ISubjectsRepository;
  let sut: SearchSubjectsUseCase;

  beforeEach(() => {
    repository = new SubjectsInMemoryRepository();
    sut = new SearchSubjectsUseCase(repository);
  });

  it('Should search for subjects with the provided search params', async () => {
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
