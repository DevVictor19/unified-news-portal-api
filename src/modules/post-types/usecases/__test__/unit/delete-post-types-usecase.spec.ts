import { NotFoundException } from '@nestjs/common';

import { DeletePostTypesUseCase } from '../../delete-post-types.usecase';

import { PostTypesInMemoryRepository } from '@/modules/post-types/database/repositories/in-memory/post-types-in-memory.repository';
import { IPostTypesRepository } from '@/modules/post-types/database/repositories/post-types-repository.interface';
import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';

describe('DeletePostTypesUseCase unit tests', () => {
  let repository: IPostTypesRepository;
  let sut: DeletePostTypesUseCase;

  beforeEach(() => {
    repository = new PostTypesInMemoryRepository();
    sut = new DeletePostTypesUseCase(repository);
  });

  it('Should throw a NotFoundException if postType is not found', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { postTypeId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.postTypeId);
  });

  it('Should delete a postType with provided id', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById');
    findByIdSpy.mockResolvedValue({} as PostTypeEntity);
    const deleteSpy = jest.spyOn(repository, 'delete');

    const input = { postTypeId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.postTypeId);
    expect(deleteSpy).toHaveBeenCalledWith(input.postTypeId);
  });
});
