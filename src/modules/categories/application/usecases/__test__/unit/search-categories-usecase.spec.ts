import { SearchCategoriesUseCase } from '../../search-categories.usecase';

import { RepositorySearchParams } from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('SearchCategoriesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: SearchCategoriesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new SearchCategoriesUseCase(databaseService);
  });

  it('Should search for categories with the provided search params', async () => {
    const input: RepositorySearchParams = {
      limitPerPage: 10,
      pageNumber: 1,
    };

    const searchSpy = jest.spyOn(databaseService.categories, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });
});
