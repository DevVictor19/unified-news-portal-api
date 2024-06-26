import { DeleteSubjectsUseCase } from '../../delete-subjects.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { SubjectEntity } from '@/modules/subjects/domain/entities/subjects.entity';

describe('DeleteSubjectsUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: DeleteSubjectsUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new DeleteSubjectsUseCase(databaseService);
  });

  it('Should throw a NotFoundError if subject is not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.subjects, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { subjectId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundError);
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
