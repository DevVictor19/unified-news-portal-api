import { UserEntity, UserEntityProps } from './users.entity';

export class UserEntityFactory {
  create(props: UserEntityProps): UserEntity {
    return new UserEntity(props);
  }
}
