import { faker } from '@faker-js/faker';

import { FindByIdUserUseCase } from '../../find-by-id-user.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';

describe('FindByIdUserUseCase', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: FindByIdUserUseCase;

  beforeEach(() => {
    input = { user_id: faker.database.mongodbObjectId() };
    databaseService = new DatabaseServiceMock();
    sut = new FindByIdUserUseCase(databaseService);
  });

  it('should throw NotFoundError when user is not found', async () => {
    const findUserByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findUserByIdSpy.mockResolvedValue(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(findUserByIdSpy).toHaveBeenCalledWith(input.user_id);
  });

  it('should return the user when found', async () => {
    const user = { id: faker.database.mongodbObjectId() } as UserEntity;

    const findUserByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findUserByIdSpy.mockResolvedValue(user);

    const result = await sut.execute(input);

    expect(result).toEqual(user);
    expect(databaseService.users.findById).toHaveBeenCalledWith(input.user_id);
  });
});
