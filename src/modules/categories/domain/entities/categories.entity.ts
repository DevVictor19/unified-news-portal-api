import { EntityProps, Entity } from '@/common/domain/entities/entity';

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
