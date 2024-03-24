import { User } from './users.entity';

import { COMUNICATIONS } from '@/common/enums/comunications.enum';
import { ROLES } from '@/common/enums/roles.enum';

export type CreateUserProps = {
  _id?: string;
  role?: ROLES;
  photo_url?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  email_is_verified?: boolean;
  subscriptions?: string[];
  comunications?: COMUNICATIONS[];
};

export class UsersFactory {
  create(props: CreateUserProps): User {
    const user = new User();
    Object.assign(user, props);
    return user;
  }
}
