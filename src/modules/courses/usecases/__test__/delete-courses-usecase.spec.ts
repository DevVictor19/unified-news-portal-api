import { NotFoundException } from '@nestjs/common';

import { ICoursesRepository } from '../../database/repositories/courses-repository.interface';
import { CoursesInMemoryRepository } from '../../database/repositories/in-memory/courses-in-memory.repository';
import { CourseEntity } from '../../entities/courses.entity';
import { DeleteCoursesUseCase } from '../delete-courses.usecase';

describe('DeleteCoursesUseCase unit tests', () => {
  let repository: ICoursesRepository;
  let sut: DeleteCoursesUseCase;

  beforeEach(() => {
    repository = new CoursesInMemoryRepository();
    sut = new DeleteCoursesUseCase(repository);
  });

  it('Should throw a NotFoundException if course is not found', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById');
    findByIdSpy.mockResolvedValue(null);

    const input = { courseId: 'uuid' };

    await expect(sut.execute(input)).rejects.toBeInstanceOf(NotFoundException);
    expect(findByIdSpy).toHaveBeenCalledWith(input.courseId);
  });

  it('Should delete a course with provided id', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById');
    findByIdSpy.mockResolvedValue({} as CourseEntity);
    const deleteSpy = jest.spyOn(repository, 'delete');

    const input = { courseId: 'uuid' };

    await sut.execute(input);

    expect(findByIdSpy).toHaveBeenCalledWith(input.courseId);
    expect(deleteSpy).toHaveBeenCalledWith(input.courseId);
  });
});
