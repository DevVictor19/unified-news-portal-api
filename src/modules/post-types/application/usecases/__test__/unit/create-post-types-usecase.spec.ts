import { BadRequestException } from '@nestjs/common';

import { CreatePostTypesUseCase } from '../../create-post-types.usecase';

import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { PostTypeEntity } from '@/modules/post-types/domain/entities/post-types.entity';

describe('CreatePostTypesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: CreatePostTypesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new CreatePostTypesUseCase(databaseService);
  });

  it('Should throw a BadRequestException if postType already exists', async () => {
    const findByNameSpy = jest.spyOn(databaseService.postTypes, 'findByName');
    findByNameSpy.mockResolvedValue({} as PostTypeEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new postType', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(databaseService.postTypes, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const insertSpy = jest.spyOn(databaseService.postTypes, 'insert');

    await sut.execute(input);

    expect(insertSpy).toHaveBeenCalled();
  });
});
