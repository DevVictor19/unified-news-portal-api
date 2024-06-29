import { faker } from '@faker-js/faker';

import { FindByIdPostUseCase } from '../../find-by-id-post.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { PostsEntity } from '@/modules/posts/domain/entities/posts.entity';

describe('FindByIdPostUseCase unit tests', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: FindByIdPostUseCase;

  beforeEach(() => {
    input = {
      post_id: faker.database.mongodbObjectId(),
    };
    databaseService = new DatabaseServiceMock();
    sut = new FindByIdPostUseCase(databaseService);
  });

  it("Should throw NotFoundError if post doesn't exist", async () => {
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
  });

  it('Should return post if it exists', async () => {
    const post = {};
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce(post as PostsEntity);

    const result = await sut.execute(input);

    expect(result).toEqual(post);
  });
});
