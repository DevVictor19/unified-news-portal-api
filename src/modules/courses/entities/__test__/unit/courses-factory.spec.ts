import { CourseEntityProps } from '../../courses.entity';
import { CourseEntityFactory } from '../../courses.factory';

describe('CourseEntityFactory unit tests', () => {
  let sut: CourseEntityFactory;
  let props: CourseEntityProps;

  beforeEach(() => {
    sut = new CourseEntityFactory();

    props = {
      name: 'course name',
    };
  });

  it('Should create a course with all provided props', () => {
    const course = sut.create(props);
    expect(course.name).toBe(props.name);
  });
});
