import { CategoryEntityProps } from '../../categories.entity';
import { CategoryEntityFactory } from '../../categories.factory';

describe('CategoryEntityFactory unit tests', () => {
  let sut: CategoryEntityFactory;
  let props: CategoryEntityProps;

  beforeEach(() => {
    sut = new CategoryEntityFactory();

    props = {
      name: 'category name',
    };
  });

  it('Should create a category with all provided props', () => {
    const category = sut.create(props);
    expect(category.name).toBe(props.name);
  });
});
