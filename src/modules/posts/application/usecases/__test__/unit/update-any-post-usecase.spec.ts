import { faker } from '@faker-js/faker';

import { UpdateAnyPostUseCase } from '../../update-any-post.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { PostsEntity } from '@/modules/posts/domain/entities/posts.entity';

describe('UpdateAnyPostUseCase unit tests', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: UpdateAnyPostUseCase;

  beforeEach(() => {
    input = {
      post_id: faker.database.mongodbObjectId(),
      user_id: faker.database.mongodbObjectId(),
      payload: {
        text: faker.lorem.paragraph(),
        title: faker.lorem.paragraph(),
        categories: [faker.lorem.word()],
        courses: [faker.lorem.word()],
        classes: [faker.lorem.word()],
        subjects: [faker.lorem.word()],
        post_types: [faker.lorem.word()],
      },
    };

    databaseService = new DatabaseServiceMock();
    sut = new UpdateAnyPostUseCase(databaseService);
  });

  it("Should throw NotFoundError if post doesn't exist", async () => {
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
  });

  it('Should update a post', async () => {
    const databasePost = {
      user_id: input.user_id,
    } as PostsEntity;

    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce(databasePost);
    const postUpdateSpy = jest.spyOn(databaseService.posts, 'update');

    await sut.execute(input);

    const updatedPost = { ...databasePost };
    Object.assign(updatedPost, input.payload);

    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
    expect(postUpdateSpy).toHaveBeenCalledWith(input.post_id, databasePost);
    expect(databasePost).toEqual(updatedPost);
  });
});
