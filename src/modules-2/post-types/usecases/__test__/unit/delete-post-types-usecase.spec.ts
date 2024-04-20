import { NotFoundException } from '@nestjs/common';

import { DeletePostTypesUseCase } from '../../delete-post-types.usecase';

import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';
import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';

describe('DeletePostTypesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: DeletePostTypesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new DeletePostTypesUseCase(databaseService);
  });

  it('Should throw a NotFoundException if postType is not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.postTypes, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { postTypeId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.postTypeId);
  });

  it('Should delete a postType with provided id', async () => {
    const findByIdSpy = jest.spyOn(databaseService.postTypes, 'findById');
    findByIdSpy.mockResolvedValue({} as PostTypeEntity);
    const deleteSpy = jest.spyOn(databaseService.postTypes, 'delete');

    const input = { postTypeId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.postTypeId);
    expect(deleteSpy).toHaveBeenCalledWith(input.postTypeId);
  });
});
