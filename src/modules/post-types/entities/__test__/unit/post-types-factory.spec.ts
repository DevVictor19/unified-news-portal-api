import { PostTypeEntityProps } from '../../post-types.entity';
import { PostTypeEntityFactory } from '../../post-types.factory';

describe('PostTypeEntityFactory unit tests', () => {
  let sut: PostTypeEntityFactory;
  let props: PostTypeEntityProps;

  beforeEach(() => {
    sut = new PostTypeEntityFactory();

    props = {
      name: 'post-type name',
    };
  });

  it('Should create a post-type with all provided props', () => {
    const entity = sut.create(props);
    expect(entity.name).toBe(props.name);
  });
});
