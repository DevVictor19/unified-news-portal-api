import { EntityProps, Entity } from '@/common/domain/entities/entity';

export type CourseEntityProps = EntityProps & {
  name: string;
};

export class CourseEntity extends Entity {
  name: string;

  constructor(props: CourseEntityProps) {
    const { id, created_at, ...courseEntityProps } = props;
    super({ id, created_at });
    Object.assign(this, courseEntityProps);
  }
}
