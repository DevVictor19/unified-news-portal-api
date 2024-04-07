import { CourseEntity, CourseEntityProps } from './courses.entity';

export class CourseEntityFactory {
  create(props: CourseEntityProps): CourseEntity {
    return new CourseEntity(props);
  }
}
