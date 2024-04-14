import { SearchSubjectsUseCase } from '../../search-subjects.usecase';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

describe('SearchSubjectsUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: SearchSubjectsUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new SearchSubjectsUseCase(databaseService);
  });

  it('Should search for subjects with the provided search params', async () => {
    const input: RepositorySearch = {
      limitPerPage: 10,
      pageNumber: 1,
      searchTerm: 'searchTerm',
    };

    const searchSpy = jest.spyOn(databaseService.subjects, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });
});
