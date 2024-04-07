import { SearchPostTypesUseCase } from '../../search-post-types.usecase';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { PostTypesInMemoryRepository } from '@/modules/post-types/database/repositories/in-memory/post-types-in-memory.repository';
import { IPostTypesRepository } from '@/modules/post-types/database/repositories/post-types-repository.interface';

describe('SearchPostTypesUseCase unit tests', () => {
  let repository: IPostTypesRepository;
  let sut: SearchPostTypesUseCase;

  beforeEach(() => {
    repository = new PostTypesInMemoryRepository();
    sut = new SearchPostTypesUseCase(repository);
  });

  it('Should search for postTypes with the provided search params', async () => {
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
