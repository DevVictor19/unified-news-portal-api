import { faker } from '@faker-js/faker';

import { DeletePostUseCase } from '../../delete-post.usecase';

import {
  ForbiddenError,
  NotFoundError,
} from '@/common/application/errors/application-errors';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { PostsEntity } from '@/modules/posts/domain/entities/posts.entity';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';

describe('DeletePostUseCase unit tests', () => {
  let input: any;
  let databaseService: DatabaseServiceMock;
  let sut: DeletePostUseCase;

  beforeEach(() => {
    input = {
      post_id: faker.database.mongodbObjectId(),
      user_id: faker.database.mongodbObjectId(),
    };

    databaseService = new DatabaseServiceMock();
    sut = new DeletePostUseCase(databaseService);
  });

  it("Should throw NotFoundError if post doesn't exist", async () => {
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce(null);
    const userFindByIdSpy = jest.spyOn(databaseService.users, 'findById');
    postFindByIdSpy.mockResolvedValueOnce({} as any);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
    expect(userFindByIdSpy).toHaveBeenCalledWith(input.user_id);
  });

  it("Should throw NotFoundError if user doesn't exist", async () => {
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce({} as any);
    const userFindByIdSpy = jest.spyOn(databaseService.users, 'findById');
    postFindByIdSpy.mockResolvedValueOnce(null);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      NotFoundError,
    );
    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
    expect(userFindByIdSpy).toHaveBeenCalledWith(input.user_id);
  });

  it('Should throw ForbiddenError if user is not post owner', async () => {
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce({
      user_id: 'not-owner-id',
    } as PostsEntity);
    const userFindByIdSpy = jest.spyOn(databaseService.users, 'findById');
    userFindByIdSpy.mockResolvedValueOnce({
      id: input.user_id,
    } as UserEntity);

    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      ForbiddenError,
    );
    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
    expect(userFindByIdSpy).toHaveBeenCalledWith(input.user_id);
  });

  it('Should delete a post', async () => {
    const postFindByIdSpy = jest.spyOn(databaseService.posts, 'findById');
    postFindByIdSpy.mockResolvedValueOnce({
      user_id: input.user_id,
    } as PostsEntity);
    const userFindByIdSpy = jest.spyOn(databaseService.users, 'findById');
    userFindByIdSpy.mockResolvedValueOnce({
      id: input.user_id,
    } as UserEntity);
    const postDeleteSpy = jest.spyOn(databaseService.posts, 'delete');

    await sut.execute(input);

    expect(postFindByIdSpy).toHaveBeenCalledWith(input.post_id);
    expect(userFindByIdSpy).toHaveBeenCalledWith(input.user_id);
    expect(postDeleteSpy).toHaveBeenCalledWith(input.post_id);
  });
});
