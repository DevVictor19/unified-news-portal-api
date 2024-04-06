import { ClassEntity, ClassEntityProps } from './classes.entity';

export class ClassEntityFactory {
  create(props: ClassEntityProps): ClassEntity {
    return new ClassEntity(props);
  }
}
