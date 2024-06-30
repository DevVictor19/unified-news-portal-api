import { DeleteUserUseCase } from '../../delete-user.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';

describe('DeleteUserUseCase unit tests', () => {
  let databaseService: DatabaseServiceMock;
  let sut: DeleteUserUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new DeleteUserUseCase(databaseService);
  });

  it('should throw NotFoundError when user is not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { user_id: 'user_id' };

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(findByIdSpy).toHaveBeenCalledWith(input.user_id);
  });

  it('should delete the user when found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.users, 'findById');
    const deleteSpy = jest.spyOn(databaseService.users, 'delete');

    const user = { id: 'user_id' } as UserEntity;
    findByIdSpy.mockResolvedValue(user);

    const input = { user_id: 'user_id' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.user_id);
    expect(deleteSpy).toHaveBeenCalledWith(input.user_id);
  });
});
