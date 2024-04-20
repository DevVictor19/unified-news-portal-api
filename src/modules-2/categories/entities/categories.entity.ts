import {
  Entity,
  EntityProps,
} from '@/common/abstractions/entities/entity.abstraction';

export type CategoryEntityProps = EntityProps & {
  name: string;
};

export class CategoryEntity extends Entity {
  name: string;

  constructor(props: CategoryEntityProps) {
    const { id, created_at, ...categoryEntityProps } = props;
    super({ id, created_at });
    Object.assign(this, categoryEntityProps);
  }
}
