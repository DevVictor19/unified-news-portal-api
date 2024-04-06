import { BadRequestException } from '@nestjs/common';

import { ICoursesRepository } from '../../database/repositories/courses-repository.interface';
import { CoursesInMemoryRepository } from '../../database/repositories/in-memory/courses-in-memory.repository';
import { CourseEntity } from '../../entities/courses.entity';
import { CourseEntityFactory } from '../../entities/courses.factory';
import { CreateCoursesUseCase } from '../create-courses.usecase';

describe('CreateCoursesUseCase unit tests', () => {
  let factory: CourseEntityFactory;
  let repository: ICoursesRepository;
  let sut: CreateCoursesUseCase;

  beforeEach(() => {
    factory = new CourseEntityFactory();
    repository = new CoursesInMemoryRepository();
    sut = new CreateCoursesUseCase(factory, repository);
  });

  it('Should throw a BadRequestException if course already exists', async () => {
    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue({} as CourseEntity);

    await expect(() => sut.execute({ name: 'name' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(findByNameSpy).toHaveBeenCalled();
  });

  it('Should create and save a new course', async () => {
    const input = { name: 'name' };

    const findByNameSpy = jest.spyOn(repository, 'findByName');
    findByNameSpy.mockResolvedValue(null);

    const createCourseSpy = jest.spyOn(factory, 'create');
    const insertSpy = jest.spyOn(repository, 'insert');

    await sut.execute(input);

    const course = await createCourseSpy.mock.results[0].value;

    expect(createCourseSpy).toHaveBeenCalledWith(input);
    expect(insertSpy).toHaveBeenCalledWith(course);
  });
});
