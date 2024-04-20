import { faker } from '@faker-js/faker';

import { CategoryEntity, CategoryEntityProps } from '../../categories.entity';

describe('CategoryEntity unit tests', () => {
  it('Should create a category with all provided props', () => {
    const props: CategoryEntityProps = { name: faker.internet.domainName() };
    const category = new CategoryEntity(props);
    expect(category).toBeInstanceOf(CategoryEntity);
    expect(category.name).toBe(props.name);
  });
});
