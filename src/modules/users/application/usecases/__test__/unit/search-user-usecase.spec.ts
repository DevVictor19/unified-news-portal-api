import { SearchUsersUseCase } from '../../search-users.usecase';

import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('SearchUsersUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: SearchUsersUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new SearchUsersUseCase(databaseService);
  });

  it('should call the search method of the databaseService with the provided input', async () => {
    const input = { name: 'John Doe' } as any;
    const searchSpy = jest.spyOn(databaseService.users, 'search');

    await sut.execute(input);

    expect(searchSpy).toHaveBeenCalledWith(input);
  });

  it('should return the result of the search method from the databaseService', async () => {
    const input = { name: 'John Doe' } as any;
    const expectedOutput = [{ id: '1', name: 'John Doe' }] as any;
    jest
      .spyOn(databaseService.users, 'search')
      .mockResolvedValue(expectedOutput);

    const result = await sut.execute(input);

    expect(result).toEqual(expectedOutput);
  });
});
