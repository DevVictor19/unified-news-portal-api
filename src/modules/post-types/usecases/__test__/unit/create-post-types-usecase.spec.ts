import { BadRequestException } from '@nestjs/common';

import { CreatePostTypesUseCase } from '../../create-post-types.usecase';

import { PostTypesInMemoryRepository } from '@/modules/post-types/database/repositories/in-memory/post-types-in-memory.repository';
import { IPostTypesRepository } from '@/modules/post-types/database/repositories/post-types-repository.interface';
import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';
import { PostTypeEntityFactory } from '@/modules/post-types/entities/post-types.factory';

describe('CreatePostTypesUseCase unit tests', () => {
  let factory: PostTypeEntityFactory;
  let repository: IPostTypesRepository;
  let sut: CreatePostTypesUseCase;

  beforeEach(() => {
    factory = new PostTypeEntityFactory();
    repository = new PostTypesInMemoryRepository();
    sut = new CreatePostTypesUseCase(factory, repository);
  });

  it('Should throw a BadRequestException if postType already exists', async () => {
    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue({} as PostTypeEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new postType', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const createPostType = jest.spyOn(factory, 'create');
    const insertSpy = jest.spyOn(repository, 'insert');

    await sut.execute(input);

    const postType = await createPostType.mock.results[0].value;

    expect(createPostType).toHaveBeenCalledWith(input);
    expect(insertSpy).toHaveBeenCalledWith(postType);
  });
});
