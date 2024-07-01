import { faker } from '@faker-js/faker';

import { UpdateSubscriptionsUseCase } from '../../update-subscriptions.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';

describe('UpdateSubscriptionsUseCase unit tests', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: UpdateSubscriptionsUseCase;

  beforeEach(() => {
    input = {
      user_id: faker.database.mongodbObjectId(),
      payload: {
        categories: [faker.lorem.word()],
        courses: [faker.lorem.word()],
        classes: [faker.lorem.word()],
        subjects: [faker.lorem.word()],
        post_type: [faker.lorem.word()],
      },
    };

    databaseService = new DatabaseServiceMock();
    sut = new UpdateSubscriptionsUseCase(databaseService);
  });

  it('should throw NotFoundError if user is not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findByIdSpy.mockResolvedValue(null);

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundError);
    expect(findByIdSpy).toHaveBeenCalledWith(input.user_id);
  });

  it('should update user subscriptions', async () => {
    const user = {
      subscriptions: {},
    } as UserEntity;

    const findByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findByIdSpy.mockResolvedValue(user);
    const updateSpy = jest.spyOn(databaseService.users, 'update');

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.user_id);
    expect(user.subscriptions).toEqual(input.payload);
    expect(updateSpy).toHaveBeenCalledWith(input.user_id, user);
  });
});
