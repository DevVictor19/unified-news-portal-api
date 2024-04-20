import { CourseEntity } from '../entities/courses.entity';

export class CoursesPresenter {
  static format(input: CourseEntity) {
    return {
      id: input.id,
      name: input.name,
      created_at: input.created_at,
    };
  }
}
