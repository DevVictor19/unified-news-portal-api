import {
  Entity,
  EntityProps,
} from '@/common/abstractions/entities/entity.abstraction';

export type PostTypeEntityProps = EntityProps & {
  name: string;
};

export class PostTypeEntity extends Entity {
  name: string;

  constructor(props: PostTypeEntityProps) {
    const { id, created_at, ...postTypesEntityProps } = props;
    super({ id, created_at });
    Object.assign(this, postTypesEntityProps);
  }
}
