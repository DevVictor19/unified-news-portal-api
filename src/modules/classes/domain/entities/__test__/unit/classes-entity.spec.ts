import { faker } from '@faker-js/faker';

import { ClassEntity, ClassEntityProps } from '../../classes.entity';

describe('ClassEntity unit tests', () => {
  it('Should create a class with all provided props', () => {
    const props: ClassEntityProps = { name: faker.internet.domainName() };
    const classEntity = new ClassEntity(props);
    expect(classEntity).toBeInstanceOf(ClassEntity);
    expect(classEntity.name).toBe(props.name);
  });
});
