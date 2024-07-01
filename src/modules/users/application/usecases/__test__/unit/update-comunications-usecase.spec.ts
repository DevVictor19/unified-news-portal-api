import { faker } from '@faker-js/faker';

import { UpdateComunicationsUseCase } from '../../update-comunications.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';

describe('UpdateComunicationsUseCase unit tests', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: UpdateComunicationsUseCase;

  beforeEach(() => {
    input = {
      user_id: faker.database.mongodbObjectId(),
      payload: [faker.lorem.word()],
    };

    databaseService = new DatabaseServiceMock();
    sut = new UpdateComunicationsUseCase(databaseService);
  });

  it('should throw NotFoundError if user not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findByIdSpy.mockResolvedValue(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(findByIdSpy).toHaveBeenCalledWith(input.user_id);
  });

  it("should update user's comunications", async () => {
    const user = {} as UserEntity;
    const findByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findByIdSpy.mockResolvedValue(user);
    const updateSpy = jest.spyOn(databaseService.users, 'update');

    await sut.execute(input);

    const updatedUser = {} as UserEntity;
    updatedUser.comunications = input.payload;

    expect(findByIdSpy).toHaveBeenCalledWith(input.user_id);
    expect(updateSpy).toHaveBeenCalledWith(input.user_id, updatedUser);
  });
});
