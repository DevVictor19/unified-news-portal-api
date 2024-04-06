import { ClassEntityProps } from '../../classes.entity';
import { ClassEntityFactory } from '../../classes.factory';

describe('ClassEntityFactory unit tests', () => {
  let sut: ClassEntityFactory;
  let props: ClassEntityProps;

  beforeEach(() => {
    sut = new ClassEntityFactory();

    props = {
      name: 'class name',
    };
  });

  it('Should create a class with all provided props', () => {
    const classEntity = sut.create(props);
    expect(classEntity.name).toBe(props.name);
  });
});
