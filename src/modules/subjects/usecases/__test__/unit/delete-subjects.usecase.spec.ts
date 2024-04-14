import { NotFoundException } from '@nestjs/common';

import { DeleteSubjectsUseCase } from '../../delete-subjects.usecase';

import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';
import { SubjectEntity } from '@/modules/subjects/entities/subjects.entity';

describe('DeleteSubjectsUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: DeleteSubjectsUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new DeleteSubjectsUseCase(databaseService);
  });

  it('Should throw a NotFoundException if subject is not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.subjects, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { subjectId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.subjectId);
  });

  it('Should delete a subject with provided id', async () => {
    const findByIdSpy = jest.spyOn(databaseService.subjects, 'findById');
    findByIdSpy.mockResolvedValue({} as SubjectEntity);
    const deleteSpy = jest.spyOn(databaseService.subjects, 'delete');

    const input = { subjectId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.subjectId);
    expect(deleteSpy).toHaveBeenCalledWith(input.subjectId);
  });
});
