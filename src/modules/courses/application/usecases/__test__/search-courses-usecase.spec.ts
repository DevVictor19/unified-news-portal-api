import { SearchCoursesUseCase } from '../search-courses.usecase';

import { RepositorySearchParams } from '@/common/domain/repositories/base-search-repository.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('SearchCoursesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: SearchCoursesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new SearchCoursesUseCase(databaseService);
  });

  it('Should search for courses with the provided search params', async () => {
    const input: RepositorySearchParams = {
      limitPerPage: 10,
      pageNumber: 1,
    };

    const searchSpy = jest.spyOn(databaseService.courses, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });
});
