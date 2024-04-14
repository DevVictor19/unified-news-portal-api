import { NotFoundException } from '@nestjs/common';

import { CourseEntity } from '../../entities/courses.entity';
import { DeleteCoursesUseCase } from '../delete-courses.usecase';

import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';

describe('DeleteCoursesUseCase unit tests', () => {
  let databaseService: IDatabaseService;
  let sut: DeleteCoursesUseCase;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    sut = new DeleteCoursesUseCase(databaseService);
  });

  it('Should throw a NotFoundException if course is not found', async () => {
    const findByIdSpy = jest.spyOn(databaseService.courses, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { courseId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
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
