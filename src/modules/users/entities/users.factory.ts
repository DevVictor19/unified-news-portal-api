import { Injectable } from '@nestjs/common';

import { UserEntity, UserEntityProps } from './users.entity';

@Injectable()
export class UserEntityFactory {
  create(props: UserEntityProps): UserEntity {
    return new UserEntity(props);
  }
}
