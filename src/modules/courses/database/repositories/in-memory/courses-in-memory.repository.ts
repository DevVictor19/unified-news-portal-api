import { ICoursesRepository } from '../courses-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { CourseEntity } from '@/modules/courses/entities/courses.entity';

export class CoursesInMemoryRepository implements ICoursesRepository {
  courses: CourseEntity[] = [];

  async insert(entity: CourseEntity): Promise<void> {
    this.courses.push(entity);
  }

  async search(params: RepositorySearch): Promise<CourseEntity[]> {
    const { limitPerPage, pageNumber, searchTerm } = params;
    const skipAmount = (pageNumber - 1) * limitPerPage;

    let results = this.courses;

    if (searchTerm) {
      results = this.courses.filter(({ name }) => name.includes(searchTerm));
    }

    const paginatedResults = results.slice(
      skipAmount,
      skipAmount + limitPerPage,
    );

    return paginatedResults;
  }

  async findAll(): Promise<CourseEntity[]> {
    return this.courses;
  }

  async findByName(name: string): Promise<CourseEntity | null> {
    const existentCourse = this.courses.find((s) => s.name === name);

    if (!existentCourse) {
      return null;
    }

    return existentCourse;
  }

  async findById(id: string): Promise<CourseEntity | null> {
    const existentCourse = this.courses.find((s) => s.id === id);

    if (!existentCourse) {
      return null;
    }

    return existentCourse;
  }

  async update(id: string, entity: CourseEntity): Promise<void> {
    const existentCourse = this.courses.find((s) => s.id === id);

    if (!existentCourse) {
      return;
    }

    Object.assign(existentCourse, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedCourse = this.courses.filter((s) => s.id !== id);
    this.courses = updatedCourse;
  }
}
