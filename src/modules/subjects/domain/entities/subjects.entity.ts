import { EntityProps, Entity } from '@/common/domain/entities/entity';

export type SubjectEntityProps = EntityProps & {
  name: string;
};

export class SubjectEntity extends Entity {
  name: string;

  constructor(props: SubjectEntityProps) {
    const { id, created_at, ...subjectProps } = props;
    super({ id, created_at });
    Object.assign(this, subjectProps);
  }
}
