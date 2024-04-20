import {
  Entity,
  EntityProps,
} from '@/common/abstractions/entities/entity.abstraction';

export type ClassEntityProps = EntityProps & {
  name: string;
};

export class ClassEntity extends Entity {
  name: string;

  constructor(props: ClassEntityProps) {
    const { created_at, id, ...classEntityProps } = props;
    super({ created_at, id });
    Object.assign(this, classEntityProps);
  }
}
