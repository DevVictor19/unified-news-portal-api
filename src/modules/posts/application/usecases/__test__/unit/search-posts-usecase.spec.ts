import { SearchPostsUseCase } from '../../search-posts.usecase';

import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('SearchPostsUseCase unit tests', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: SearchPostsUseCase;

  beforeEach(() => {
    input = {
      page: 1,
      limit: 10,
      search: '',
    };

    databaseService = new DatabaseServiceMock();
    sut = new SearchPostsUseCase(databaseService);
  });

  it('Should search for posts', async () => {
    const postSearchSpy = jest.spyOn(databaseService.posts, 'search');

    await sut.execute(input);

    expect(postSearchSpy).toHaveBeenCalledWith(input);
  });
});
