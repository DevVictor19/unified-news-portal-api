import { faker } from '@faker-js/faker';

import { ChangeUserRoleUseCase } from '../../change-user-role.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { ROLES } from '@/common/domain/enums/roles.enum';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';

describe('ChangeUserRoleUseCase unit tests', () => {
  let databaseService: DatabaseServiceMock;
  let sut: ChangeUserRoleUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new ChangeUserRoleUseCase(databaseService);
  });

  it('should throw NotFoundError if user is not found', async () => {
    const userId = faker.database.mongodbObjectId();
    const findByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { user_id: userId, role: ROLES.ADMIN };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundError);
    expect(findByIdSpy).toHaveBeenCalledWith(userId);
  });

  it('should update user role', async () => {
    const userId = faker.database.mongodbObjectId();
    const user = { role: ROLES.STUDENT } as UserEntity;
    const findByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findByIdSpy.mockResolvedValue(user);

    const updateSpy = jest.spyOn(databaseService.users, 'update');

    const input = { user_id: userId, role: ROLES.ADMIN };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(userId);
    expect(updateSpy).toHaveBeenCalledWith(userId, { role: ROLES.ADMIN });
  });
});
