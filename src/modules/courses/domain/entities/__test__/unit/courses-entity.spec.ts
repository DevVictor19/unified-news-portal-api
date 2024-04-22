import { faker } from '@faker-js/faker';

import { CourseEntity, CourseEntityProps } from '../../courses.entity';

describe('CourseEntity unit tests', () => {
  it('Should create a course with all provided props', () => {
    const props: CourseEntityProps = { name: faker.internet.domainName() };
    const subject = new CourseEntity(props);
    expect(subject).toBeInstanceOf(CourseEntity);
    expect(subject.name).toBe(props.name);
  });
});
