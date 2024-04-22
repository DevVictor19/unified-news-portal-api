import { EntityProps, Entity } from '@/common/domain/entities/entity';

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
