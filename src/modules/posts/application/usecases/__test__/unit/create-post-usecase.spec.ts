import { faker } from '@faker-js/faker';

import { CreatePostUseCase } from '../../create-post.usecase';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';

describe('CreatePostUseCase unit tests', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: CreatePostUseCase;

  beforeEach(() => {
    input = {
      user_id: faker.database.mongodbObjectId(),
      payload: {
        text: faker.string.sample(),
        title: faker.string.sample(),
        categories: [faker.string.sample()],
        courses: [faker.string.sample()],
        classes: [faker.string.sample()],
        subjects: [faker.string.sample()],
        post_types: [faker.string.sample()],
      },
    };

    databaseService = new DatabaseServiceMock();
    sut = new CreatePostUseCase(databaseService);
  });

  it('Should throw BadRequestError if user not found', async () => {
    const findUserByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findUserByIdSpy.mockResolvedValue(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      BadRequestError,
    );
    expect(findUserByIdSpy).toHaveBeenCalledWith(input.user_id);
  });

  it('Should create a post', async () => {
    const findUserByIdSpy = jest.spyOn(databaseService.users, 'findById');
    findUserByIdSpy.mockResolvedValue({} as any);
    const insertPostSpy = jest.spyOn(databaseService.posts, 'insert');

    await sut.execute(input);

    expect(findUserByIdSpy).toHaveBeenCalledWith(input.user_id);
    expect(insertPostSpy).toHaveBeenCalled();
  });
});
