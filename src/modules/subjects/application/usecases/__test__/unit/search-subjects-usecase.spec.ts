import { SearchSubjectsUseCase } from '../../search-subjects.usecase';

import { RepositorySearchParams } from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('SearchSubjectsUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: SearchSubjectsUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new SearchSubjectsUseCase(databaseService);
  });

  it('Should search for subjects with the provided search params', async () => {
    const input: RepositorySearchParams = {
      limitPerPage: 10,
      pageNumber: 1,
    };

    const searchSpy = jest.spyOn(databaseService.subjects, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });
});
