import { DeleteCoursesUseCase } from '../delete-courses.usecase';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';

describe('DeleteCoursesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: DeleteCoursesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new DeleteCoursesUseCase(databaseService);
  });

  it('Should throw a NotFoundError if course is not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.courses, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { courseId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundError);
    expect(findByIdSpy).toHaveBeenCalledWith(input.courseId);
  });

  it('Should delete a course with provided id', async () => {
    const findByIdSpy = jest.spyOn(databaseService.courses, 'findById');
    findByIdSpy.mockResolvedValue({} as CourseEntity);
    const deleteSpy = jest.spyOn(databaseService.courses, 'delete');

    const input = { courseId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.courseId);
    expect(deleteSpy).toHaveBeenCalledWith(input.courseId);
  });
});
