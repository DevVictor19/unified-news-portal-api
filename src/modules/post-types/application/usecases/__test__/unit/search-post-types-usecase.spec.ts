import { SearchPostTypesUseCase } from '../../search-post-types.usecase';

import { RepositorySearchParams } from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('SearchPostTypesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: SearchPostTypesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new SearchPostTypesUseCase(databaseService);
  });

  it('Should search for postTypes with the provided search params', async () => {
    const input: RepositorySearchParams = {
      limitPerPage: 10,
      pageNumber: 1,
    };

    const searchSpy = jest.spyOn(databaseService.postTypes, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });
});
