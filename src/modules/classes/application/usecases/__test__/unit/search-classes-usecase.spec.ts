import { SearchClassesUseCase } from '../../search-classes.usecase';

import { RepositorySearchParams } from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('SearchClassesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: SearchClassesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new SearchClassesUseCase(databaseService);
  });

  it('Should search for classes with the provided search params', async () => {
    const input: RepositorySearchParams = {
      limitPerPage: 10,
      pageNumber: 1,
    };

    const searchSpy = jest.spyOn(databaseService.classes, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });
});
