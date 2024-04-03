import { randomUUID } from 'crypto';

export type EntityProps = {
  id?: string;
  created_at?: Date;
};

export abstract class Entity {
  id: string;
  created_at: Date;

  constructor(props: EntityProps) {
    props.id = props.id ?? randomUUID();
    props.created_at = props.created_at ?? new Date();
    Object.assign(this, props);
  }
}
