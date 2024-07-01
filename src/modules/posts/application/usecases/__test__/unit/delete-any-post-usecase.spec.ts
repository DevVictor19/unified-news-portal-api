import { faker } from '@faker-js/faker';

import { DeleteAnyPostUseCase } from '../../delete-any-post.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { PostsEntity } from '@/modules/posts/domain/entities/posts.entity';

describe('DeleteAnyPostUseCase unit tests', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: DeleteAnyPostUseCase;

  beforeEach(() => {
    input = {
      post_id: faker.database.mongodbObjectId(),
    };

    databaseService = new DatabaseServiceMock();
    sut = new DeleteAnyPostUseCase(databaseService);
  });

  it("Should throw NotFoundError if post doesn't exist", async () => {
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
  });

  it('Should delete a post', async () => {
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce({
      user_id: input.user_id,
    } as PostsEntity);
    const postDeleteSpy = jest.spyOn(databaseService.posts, 'delete');

    await sut.execute(input);

    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
    expect(postDeleteSpy).toHaveBeenCalledWith(input.post_id);
  });
});
