import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '../users-repository.interface';

import { InMemoryBaseRepository } from '@/common/abstractions/repositories/in-memory/in-memory-base-repository.abstraction';
import { UserEntity } from '@/modules/users/entities/users.entity';

@Injectable()
export class UsersInMemoryRepository
  extends InMemoryBaseRepository<UserEntity>
  implements IUsersRepository
{
  constructor() {
    super();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const existentUser = this.items.find((u) => u.email === email);

    if (!existentUser) {
      return null;
    }

    return existentUser;
  }
}
