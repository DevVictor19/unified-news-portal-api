import { CreateSubjectsUseCase } from '../../create-subjects.usecase';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { SubjectEntity } from '@/modules/subjects/domain/entities/subjects.entity';

describe('CreateSubjectsUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: CreateSubjectsUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new CreateSubjectsUseCase(databaseService);
  });

  it('Should throw a BadRequestError if subject already exists', async () => {
    const findByNameSpy = jest.spyOn(databaseService.subjects, 'findByName');
    findByNameSpy.mockResolvedValue({} as SubjectEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestError,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new subject', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(databaseService.subjects, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const insertSpy = jest.spyOn(databaseService.subjects, 'insert');

    await sut.execute(input);

    expect(insertSpy).toHaveBeenCalled();
  });
});
