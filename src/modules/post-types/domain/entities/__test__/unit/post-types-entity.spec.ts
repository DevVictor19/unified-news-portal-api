import { faker } from '@faker-js/faker';

import { PostTypeEntity, PostTypeEntityProps } from '../../post-types.entity';

describe('PostTypeEntity unit tests', () => {
  it('Should create a post-type with all provided props', () => {
    const props: PostTypeEntityProps = { name: faker.internet.domainName() };
    const entity = new PostTypeEntity(props);
    expect(entity).toBeInstanceOf(PostTypeEntity);
    expect(entity.name).toBe(props.name);
  });
});
