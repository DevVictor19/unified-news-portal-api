import {
  Entity,
  EntityProps,
} from '@/common/abstractions/entities/entity.abstraction';

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
