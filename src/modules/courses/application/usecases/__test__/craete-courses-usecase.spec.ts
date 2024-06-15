import { CreateCoursesUseCase } from '../create-courses.usecase';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';

describe('CreateCoursesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: CreateCoursesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new CreateCoursesUseCase(databaseService);
  });

  it('Should throw a BadRequestError if course already exists', async () => {
    const findByNameSpy = jest.spyOn(databaseService.courses, 'findByName');
    findByNameSpy.mockResolvedValue({} as CourseEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestError,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new course', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(databaseService.courses, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const insertSpy = jest.spyOn(databaseService.courses, 'insert');

    await sut.execute(input);

    expect(insertSpy).toHaveBeenCalled();
  });
});
