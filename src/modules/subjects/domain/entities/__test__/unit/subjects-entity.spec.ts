import { faker } from '@faker-js/faker';

import { SubjectEntity, SubjectEntityProps } from '../../subjects.entity';

describe('Subjects entity unit tests', () => {
  it('Should create a subject with all provided props', () => {
    const props: SubjectEntityProps = { name: faker.internet.domainName() };
    const subject = new SubjectEntity(props);
    expect(subject).toBeInstanceOf(SubjectEntity);
    expect(subject.name).toBe(props.name);
  });
});
