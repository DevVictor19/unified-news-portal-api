import { Subscriptions } from '@/common/domain/@types/subscriptions';
import { Entity, EntityProps } from '@/common/domain/entities/entity';
import { COMUNICATIONS } from '@/common/domain/enums/comunications.enum';
import { ROLES } from '@/common/domain/enums/roles.enum';

export type UserEntityProps = EntityProps & {
  role?: ROLES;
  photo_url?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  email_is_verified?: boolean;
  subscriptions?: Subscriptions;
  comunications?: COMUNICATIONS[];
};
export class UserEntity extends Entity {
  role: ROLES = ROLES.STUDENT;
  photo_url?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  email_is_verified: boolean;
  subscriptions: Subscriptions;
  comunications: COMUNICATIONS[];

  constructor(props: UserEntityProps) {
    const { id, created_at, ...userProps } = props;

    super({ id, created_at });

    userProps.role = userProps.role ?? ROLES.STUDENT;
    userProps.email_is_verified = userProps.email_is_verified ?? false;
    userProps.subscriptions = userProps.subscriptions ?? {
      categories: [],
      classes: [],
      courses: [],
      post_type: [],
      subjects: [],
    };
    userProps.comunications = userProps.comunications ?? [];

    Object.assign(this, userProps);
  }
}
